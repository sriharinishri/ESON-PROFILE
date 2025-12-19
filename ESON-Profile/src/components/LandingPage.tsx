import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGesture } from '@use-gesture/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ===== 3D DOME GALLERY UTILITIES =====
type ImageItem = string | { src: string; alt?: string; name?: string; color?: string };

type ItemDef = {
  src: string;
  alt: string;
  name: string;
  color: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) return coords.map(c => ({ ...c, src: '', alt: '', name: '', color: '' }));

  const normalizedImages = pool.map(image => {
    if (typeof image === 'string') return { src: image, alt: '', name: '', color: '' };
    return {
      src: image.src || '',
      alt: image.alt || '',
      name: image.name || '',
      color: image.color || '#3498db'
    };
  });

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);
  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
    name: usedImages[i].name,
    color: usedImages[i].color
  }));
}

// ===== 3D DOME GALLERY COMPONENT =====
const DomeGallery: React.FC<{ images: ImageItem[] }> = ({ images }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const autoRotateRAF = useRef<number | null>(null);

  const segments = 30;
  const maxVerticalRotationDeg = 5;
  const dragSensitivity = 20;
  const dragDampening = 2;

  const items = useMemo(() => buildItems(images, segments), [images]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  }, []);

  const startAutoRotate = useCallback(() => {
    const step = () => {
      if (!draggingRef.current) {
        const nextY = wrapAngleSigned(rotationRef.current.y + 0.15);
        rotationRef.current = { ...rotationRef.current, y: nextY };
        applyTransform(rotationRef.current.x, nextY);
      }
      autoRotateRAF.current = requestAnimationFrame(step);
    };
    autoRotateRAF.current = requestAnimationFrame(step);
  }, [applyTransform]);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRAF.current) {
      cancelAnimationFrame(autoRotateRAF.current);
      autoRotateRAF.current = null;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => {
      const minDim = Math.min(window.innerWidth, window.innerHeight);
      let radius = minDim * 0.55;
      radius = clamp(radius, 300, 800);
      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });

    ro.observe(root);
    startAutoRotate();

    return () => {
      ro.disconnect();
      stopAutoRotate();
      if (inertiaRAF.current) cancelAnimationFrame(inertiaRAF.current);
    };
  }, [startAutoRotate, stopAutoRotate, applyTransform]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback((vx: number, vy: number) => {
    const MAX_V = 1.4;
    let vX = clamp(vx, -MAX_V, MAX_V) * 80;
    let vY = clamp(vy, -MAX_V, MAX_V) * 80;
    let frames = 0;
    const frictionMul = 0.94 + 0.055 * dragDampening;
    const stopThreshold = 0.015 - 0.01 * dragDampening;
    const maxFrames = Math.round(90 + 270 * dragDampening);

    const step = () => {
      vX *= frictionMul;
      vY *= frictionMul;
      if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
        inertiaRAF.current = null;
        startAutoRotate();
        return;
      }
      if (++frames > maxFrames) {
        inertiaRAF.current = null;
        startAutoRotate();
        return;
      }
      const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
      rotationRef.current = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
      inertiaRAF.current = requestAnimationFrame(step);
    };
    stopInertia();
    stopAutoRotate();
    inertiaRAF.current = requestAnimationFrame(step);
  }, [stopInertia, startAutoRotate, stopAutoRotate, applyTransform]);

  useGesture({
    onDragStart: ({ event }) => {
      stopInertia();
      stopAutoRotate();
      const evt = event as PointerEvent;
      draggingRef.current = true;
      movedRef.current = false;
      startRotRef.current = { ...rotationRef.current };
      startPosRef.current = { x: evt.clientX, y: evt.clientY };
    },
    onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
      if (!draggingRef.current || !startPosRef.current) return;

      const evt = event as PointerEvent;
      const dxTotal = evt.clientX - startPosRef.current.x;
      const dyTotal = evt.clientY - startPosRef.current.y;

      if (!movedRef.current && (dxTotal * dxTotal + dyTotal * dyTotal > 16)) {
        movedRef.current = true;
      }

      const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);

      if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
      }

      if (last) {
        draggingRef.current = false;
        let [vMagX, vMagY] = velocity;
        const [dirX, dirY] = direction;
        let vx = vMagX * dirX;
        let vy = vMagY * dirY;

        if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
          const [mx, my] = movement;
          vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
          vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);
        }

        if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) {
          startInertia(vx, vy);
        } else {
          startAutoRotate();
        }
        movedRef.current = false;
      }
    }
  }, { target: mainRef, eventOptions: { passive: true } });

  return (
    <div ref={rootRef} className="sphere-root">
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div key={`${it.x},${it.y},${i}`} className="item" style={{
                ['--offset-x' as any]: it.x,
                ['--offset-y' as any]: it.y,
                ['--item-size-x' as any]: it.sizeX,
                ['--item-size-y' as any]: it.sizeY
              }}>
                <div className="item__image">
                  <img src={it.src} draggable={false} alt={it.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// ===== MAIN LANDING PAGE =====
const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const oceanSectionRef = useRef<HTMLDivElement>(null);
  const brandSectionRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const techImages: ImageItem[] = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', name: 'React', color: '#61DAFB' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js', name: 'Node.js', color: '#339933' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript', name: 'TypeScript', color: '#3178C6' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python', name: 'Python', color: '#3776AB' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB', name: 'MongoDB', color: '#47A248' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', alt: 'PostgreSQL', name: 'PostgreSQL', color: '#336791' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', alt: 'Docker', name: 'Docker', color: '#2496ED' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', alt: 'AWS', name: 'AWS', color: '#FF9900' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', alt: 'Kubernetes', name: 'Kubernetes', color: '#326CE5' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', alt: 'GraphQL', name: 'GraphQL', color: '#E10098' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', alt: 'Redis', name: 'Redis', color: '#DC382D' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', alt: 'Next.js', name: 'Next.js', color: '#000000' }
  ];

  useGSAP(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
        limitCallbacks: true
      });

      // OCEAN WAVES SECTION - Always runs
      const oceanTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: oceanSectionRef.current,
          start: 'top top',
          end: '+=100%', // Changed from +=150% to +=100%
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true
        }
      });

      // Ensure text starts fully visible, no fade-in or move
      oceanTimeline.fromTo('.ocean-title',
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 1, y: 0, scale: 1, duration: 0 },
        0
      );

      // Brand Section animations (desktop only)
      gsap.matchMedia().add({
        "(min-width: 1024px)": () => {
          const brandTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: brandSectionRef.current,
              start: 'top 70%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
              scrub: 1,
              invalidateOnRefresh: true
            }
          });

          brandTimeline.fromTo('.brand-line-1 .eson-letter',
            { opacity: 0, x: -100, rotationX: -90 },
            { opacity: 1, x: 0, rotationX: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
            0
          );

          brandTimeline.fromTo('.brand-line-2 .eson-letter',
            { opacity: 0, x: 100, rotationX: 90 },
            { opacity: 1, x: 0, rotationX: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
            0.1
          );

          brandTimeline.fromTo('.brand-tagline',
            { opacity: 0, y: 50, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
            0.4
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef, dependencies: [isLoaded] });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="app-container">
      {/* FIRST SCREEN - OCEAN WAVES */}
      <section ref={oceanSectionRef} className="ocean-section">
        <div className="sun"></div>
        <div className="stars"></div>
        <div className="horizon-glow"></div>
        <div className="ocean-container">
          <div className="wave-group">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
            <div className="wave wave-4"></div>
            <div className="interference interference-1"></div>
            <div className="interference interference-2"></div>
            <div className="interference interference-3"></div>
          </div>
        </div>

        <div className="ocean-content">
          <h1 className="ocean-title">TRANSFORMING IDEAS INTO REALITY</h1>
        </div>
      </section>

      {/* SECOND SCREEN - BRAND SECTION (Desktop Only) */}
      <section ref={brandSectionRef} className="brand-section-two-column desktop-only">
        <div className="brand-column-left">
          <div className="brand-text">
            <div className="brand-line-1">
              {'ESON'.split('').map((letter, i) => (
                <span key={i} className="eson-letter">{letter}</span>
              ))}
            </div>
            <div className="brand-line-2">
              {'INFOTECH'.split('').map((letter, i) => (
                <span key={i} className="eson-letter">{letter}</span>
              ))}
            </div>
          </div>
          <div className="brand-tagline">Transforming Ideas Into Reality</div>
        </div>

        <div className="brand-column-right">
          <DomeGallery images={techImages} />
        </div>
      </section>

      <style>{`
        * { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
        }
        
        html, body { 
          scroll-behavior: smooth;
          overflow-x: hidden;
          width: 100%;
          margin: 0;
          padding: 0;
          -webkit-overflow-scrolling: touch;
        }
        
        body { 
          font-family: 'Roboto', 'Open Sans', sans-serif;
          background-color: #ffffff;
          color: #333;
        }

        .app-container {
          position: relative;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        /* ========== OCEAN WAVES SECTION ========== */
        .ocean-section {
          height: 100vh;
          width: 100vw;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(180deg, #7FCCE0 0%, #2E86C1 50%, #8FE0CC 100%);
          animation: skyCycle 24s ease-in-out infinite;
        }

        .ocean-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 2rem;
          width: 100%;
        }

        .ocean-title {
          font-size: clamp(2rem, 6vw, 8rem);
          font-weight: 900;
          letter-spacing: clamp(2px, 0.5vw, 8px);
          color: white;
          text-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
          text-align: center;
          margin: 0;
          will-change: transform, opacity;
          opacity: 1 !important; /* Ensure always visible */
          transform: none !important; /* No initial move */
        }

        .ocean-container {
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
        }

        .sun {
          position: absolute;
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 200, 0.4) 0%,
            rgba(255, 255, 200, 0.2) 40%,
            transparent 70%
          );
          pointer-events: none;
          animation: sunPath 24s linear infinite;
          z-index: 1;
          will-change: transform, opacity;
        }

        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 0.1%),
            radial-gradient(circle at 25% 15%, rgba(255, 255, 255, 0.4) 0%, transparent 0.08%),
            radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.5) 0%, transparent 0.09%),
            radial-gradient(circle at 45% 18%, rgba(255, 255, 255, 0.7) 0%, transparent 0.12%),
            radial-gradient(circle at 55% 22%, rgba(255, 255, 255, 0.4) 0%, transparent 0.08%),
            radial-gradient(circle at 65% 16%, rgba(255, 255, 255, 0.5) 0%, transparent 0.1%),
            radial-gradient(circle at 75% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 0.11%),
            radial-gradient(circle at 85% 24%, rgba(255, 255, 255, 0.4) 0%, transparent 0.08%);
          animation: starsAppear 24s ease-in-out infinite;
          z-index: 0;
          will-change: opacity;
        }

        .horizon-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40%;
          pointer-events: none;
          background: radial-gradient(
            ellipse at 50% 100%,
            rgba(143, 224, 204, 0.3) 0%,
            rgba(127, 204, 224, 0.15) 20%,
            transparent 50%
          );
          animation: horizonGlow 24s ease-in-out infinite;
          z-index: 0;
          will-change: opacity;
        }

        .wave-group {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          min-width: 56.25rem;
          transform: scaleY(0.65);
          transform-origin: bottom;
        }

        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: #A88FCC;
          transform-origin: center bottom;
          will-change: transform;
        }

        .wave-1 {
          --ty: 0;
          opacity: 0.3;
          animation: waveMove 7s ease-in-out infinite;
          clip-path: polygon(0 70%, 20% 60%, 40% 70%, 60% 60%, 80% 70%, 100% 60%, 100% 100%, 0 100%);
        }

        .wave-2 {
          --ty: 2.5%;
          background: #8FE0CC;
          opacity: 0.25;
          animation: waveMove 9s ease-in-out infinite;
          animation-delay: -2.25s;
          width: 300%;
          clip-path: polygon(0 75%, 25% 65%, 50% 75%, 75% 65%, 100% 75%, 100% 100%, 0 100%);
        }

        .wave-3 {
          --ty: 5%;
          background: #2E86C1;
          opacity: 0.2;
          animation: waveMove 9s ease-in-out infinite;
          animation-delay: -4.5s;
          clip-path: polygon(0 80%, 20% 70%, 40% 80%, 60% 70%, 80% 80%, 100% 70%, 100% 100%, 0 100%);
        }

        .wave-4 {
          --ty: 7.5%;
          background: #7FCCE0;
          opacity: 0.15;
          animation: waveMove 7s ease-in-out infinite;
          animation-delay: -3.5s;
          width: 300%;
          clip-path: polygon(0 65%, 25% 55%, 50% 65%, 75% 55%, 100% 65%, 100% 100%, 0 100%);
        }

        .interference {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 400%;
          height: 100%;
          opacity: 0.12;
          transform-origin: center bottom;
          will-change: transform, opacity;
          background: #A88FCC;
        }

        .interference-1 {
          opacity: 0.2;
          clip-path: polygon(0 71%, 10% 70%, 20% 71%, 30% 70%, 40% 71%, 50% 70%, 60% 71%, 70% 70%, 80% 71%, 90% 70%, 100% 71%, 100% 100%, 0 100%);
          animation: interferenceMove1 10s ease-in-out infinite, interferencePulse1 7s ease-in-out infinite;
        }

        .interference-2 {
          opacity: 0.3;
          clip-path: polygon(0 76%, 12% 77%, 25% 76%, 37% 77%, 50% 76%, 62% 77%, 75% 76%, 87% 77%, 100% 76%, 100% 100%, 0 100%);
          animation: interferenceMove2Reverse 15s ease-in-out infinite, interferencePulse2 9s ease-in-out infinite;
        }

        .interference-3 {
          opacity: 0.5;
          clip-path: polygon(0 81%, 10% 80.5%, 20% 81%, 30% 80.5%, 40% 81%, 50% 80.5%, 60% 81%, 70% 80.5%, 80% 81%, 90% 80.5%, 100% 81%, 100% 100%, 0 100%);
          animation: interferenceMove3 19s ease-in-out infinite, interferencePulse3 11s ease-in-out infinite;
        }

        @keyframes skyCycle {
          0%, 100% { background: linear-gradient(180deg, #7FCCE0 0%, #2E86C1 50%, #8FE0CC 100%); }
          50% { background: linear-gradient(180deg, #A88FCC 0%, #7FCCE0 50%, #2E86C1 100%); }
        }

        @keyframes sunPath {
          0% { left: -20%; top: 70%; opacity: 0; }
          10% { left: 10%; top: 48%; opacity: 0.5; }
          33.3% { left: 50%; top: 18%; opacity: 1; }
          58% { left: 90%; top: 48%; opacity: 0.5; }
          66.6% { left: 120%; top: 70%; opacity: 0; }
          100% { left: 120%; top: 70%; opacity: 0; }
        }

        @keyframes starsAppear {
          0%, 30%, 100% { opacity: 0; }
          65%, 85% { opacity: 0.8; }
        }

        @keyframes horizonGlow {
          0%, 25%, 83.3%, 100% { opacity: 0; }
          10%, 66.6% { opacity: 1; }
        }

        @keyframes waveMove {
          0%, 100% { transform: translate3d(0, var(--ty), 0); }
          50% { transform: translate3d(-50%, var(--ty), 0); }
        }

        @keyframes interferenceMove1 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-12.5%, -0.5%, 0); }
        }

        @keyframes interferenceMove2Reverse {
          0% { transform: translate3d(-25%, 0, 0); }
          50% { transform: translate3d(-12.5%, 0.4%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes interferenceMove3 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-12.5%, -0.4%, 0); }
        }

        @keyframes interferencePulse1 {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.1; }
        }

        @keyframes interferencePulse2 {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.08; }
        }

        @keyframes interferencePulse3 {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.07; }
        }

        /* ========== BRAND SECTION (Desktop Only) ========== */
        .brand-section-two-column {
          min-height: 100vh;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          padding: 0;
          margin: 0;
          gap: 0;
        }

        .brand-column-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 2rem 0.75rem 2rem;
          gap: 1.75rem;
          background: #ffffff;
          z-index: 10;
        }

        .brand-column-right {
          flex: 1;
          height: 100vh;
          background: transparent;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .brand-line-1,
        .brand-line-2 {
          font-size: clamp(3.5rem, 6.5vw, 6.5rem);
          font-weight: 900;
          text-transform: uppercase;
          color: #3498db;
          text-align: center;
          line-height: 1;
          display: flex;
          gap: clamp(5px, 0.7vw, 7px);
        }

        .eson-letter {
          display: inline-block;
          transform-style: preserve-3d;
          text-shadow: 0 3px 15px rgba(52, 152, 219, 0.3);
          will-change: transform, opacity;
        }

        .brand-tagline {
          font-size: clamp(1.1rem, 2vw, 1.7rem);
          font-weight: 600;
          color: #666;
          text-align: center;
          letter-spacing: clamp(1px, 0.3vw, 3px);
          text-transform: uppercase;
          will-change: transform, opacity;
          margin: 0;
          padding: 0;
        }

        /* ========== 3D SPHERE ========== */
        .sphere-root {
          position: relative;
          width: 100%;
          height: 100%;
          --radius: 380px;
          --circ: calc(var(--radius) * 3.14);
          --segments-x: 30;
          --segments-y: 30;
          --rot-y: calc((360deg / var(--segments-x)) / 2);
          --rot-x: calc((360deg / var(--segments-y)) / 2);
          --item-width: calc(var(--circ) / var(--segments-x));
          --item-height: calc(var(--circ) / var(--segments-y));
        }

        .sphere, .item, .item__image {
          transform-style: preserve-3d;
        }

        .sphere-main {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          overflow: hidden;
          touch-action: pan-x;
          user-select: none;
          background: transparent;
        }

        .stage {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          perspective: calc(var(--radius) * 2);
          perspective-origin: 50% 50%;
        }

        .sphere {
          transform: translateZ(calc(var(--radius) * -1));
          will-change: transform;
        }

        .item {
          width: calc(var(--item-width) * var(--item-size-x));
          height: calc(var(--item-height) * var(--item-size-y));
          position: absolute;
          top: -999px;
          bottom: -999px;
          left: -999px;
          right: -999px;
          margin: auto;
          transform-origin: 50% 50%;
          backface-visibility: hidden;
          transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2))))
            rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2))))
            translateZ(var(--radius));
        }

        .item__image {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          inset: 8px;
          border-radius: 12px;
          background: white;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 300ms ease;
        }

        .item__image:hover {
          transform: scale(1.08);
        }

        .item__image img {
          width: 70%;
          height: 70%;
          object-fit: contain;
          pointer-events: none;
        }

        /* ========== MOBILE: Hide desktop section ========== */
        @media only screen and (max-width: 1023px) {
          .desktop-only {
            display: none !important;
          }

          .ocean-title {
            font-size: clamp(1.8rem, 6vw, 3.5rem);
          }
        }

        /* ========== DESKTOP: Show desktop section ========== */
        @media only screen and (min-width: 1024px) {
          .desktop-only {
            display: flex !important;
          }

          .ocean-title {
            font-size: clamp(3rem, 7vw, 8rem);
          }
        }

        /* Large Desktop */
        @media only screen and (min-width: 1280px) {
          .brand-line-1,
          .brand-line-2 {
            font-size: clamp(4rem, 6.5vw, 7rem);
          }

          .sphere-root {
            --radius: 420px;
          }
        }

        /* Extra Large Desktop */
        @media only screen and (min-width: 1440px) {
          .brand-line-1,
          .brand-line-2 {
            font-size: clamp(5rem, 6.5vw, 7.5rem);
          }

          .sphere-root {
            --radius: 480px;
          }
        }

        /* Ultra Wide Desktop */
        @media only screen and (min-width: 1920px) {
          .brand-line-1,
          .brand-line-2 {
            font-size: clamp(6rem, 6.5vw, 8rem);
          }

          .sphere-root {
            --radius: 550px;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
