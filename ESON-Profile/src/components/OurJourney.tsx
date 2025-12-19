import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const OurJourney = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleMilestones, setVisibleMilestones] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const milestonesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const pastelPalette = [
    "#3498db", // Sky Blue
    "#BFAED9", // Lavender
    "#FFD1A0", // Peach
    "#FFF2B3", // Lemon Yellow
    "#FFB3BA"  // Soft Pink
  ];

  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r}, ${b}, ${b}, ${alpha})`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const milestones = [
    { year: '2017', title: 'The Beginning', description: 'Started as a small team with a big dream to revolutionize digital solutions.', color: '#3498db' },
    { year: '2019', title: 'Expansion Phase', description: 'Expanded operations and established presence across South India.', color: '#BFAED9' },
    { year: '2021', title: 'Innovation Era', description: 'Pivoted to enterprise-grade solutions and cutting-edge technologies.', color: '#FFD1A0' },
    { year: '2023', title: 'Industry Leader', description: 'Recognized as a trusted technology partner across multiple sectors.', color: '#FFF2B3' },
    { year: '2025', title: 'Global Vision', description: 'Shaping the future through innovation, technology, and global partnerships.', color: '#FFB3BA' }
  ];

  // ✅ Header Animation (kept)
  useGSAP(() => {
    if (!mounted || !headerRef.current || !underlineRef.current || !descriptionRef.current) return;

    gsap.set(headerRef.current, { opacity: 0, y: -30 });
    gsap.set(underlineRef.current, { scaleX: 0 });
    gsap.set(descriptionRef.current, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    })
    .to(
      underlineRef.current,
      {
        scaleX: 1,
        duration: 0.7,
        ease: 'power2.out',
      },
      '-=0.5'
    )
    .to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    );
  }, { scope: sectionRef, dependencies: [mounted] });

  // ❌ QUOTE GSAP REMOVED COMPLETELY

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleMilestones(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    milestonesRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    const timer = setTimeout(() => {
      setVisibleMilestones(new Set([0, 1, 2, 3, 4]));
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          text-shadow: none !important;
          box-shadow: none !important;
        }

        .journey-transparent-bg {
          background: transparent;
          position: relative;
          min-height: 100vh;
          overflow-y: auto;
        }

        .journey-mouse-glow {
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.3s ease-out;
          background: radial-gradient(
            circle,
            rgba(191, 174, 217, 0.15) 0%,
            rgba(180, 242, 225, 0.1) 40%,
            transparent 70%
          );
          filter: blur(40px);
          z-index: 1;
        }

        .zigzag-timeline-wrapper {
          max-width: 1600px;
          margin: 0 auto;
          padding: 2rem;
          position: relative;
        }

        .zigzag-timeline-container {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 220px 0 200px 0;
        }

        .timeline-horizontal-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            to right,
            rgba(52, 152, 219, 0.3) 0%,
            #3498db 15%,
            #BFAED9 35%,
            #FFD1A0 50%,
            #FFF2B3 65%,
            #FFB3BA 85%,
            rgba(255, 179, 186, 0.3) 100%
          );
          transform: translateY(-50%);
          z-index: 1;
        }

        .timeline-horizontal-line::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          background: #3498db;
          border-radius: 50%;
          animation: travel-horizontal 8s ease-in-out infinite;
        }

        @keyframes travel-horizontal {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        .zigzag-timeline-item {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
        }

        .zigzag-card {
          position: absolute;
          width: 260px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 24px;
          padding: 1.5rem;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          overflow: hidden;
          border: 2px solid var(--card-color);
        }

        .zigzag-card.top {
          bottom: 100px;
          transform: translateY(80px) scale(0.8) rotateX(-15deg);
        }

        .zigzag-card.bottom {
          top: 100px;
          transform: translateY(-80px) scale(0.8) rotateX(15deg);
        }

        .zigzag-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1) rotateX(0deg);
        }

        .zigzag-card:hover {
          transform: translateY(-15px) scale(1.05);
        }

        .zigzag-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: var(--card-color);
          border-radius: 24px 24px 0 0;
        }

        .zigzag-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            var(--card-color-alpha) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          border-radius: 24px;
        }

        .zigzag-card:hover::after {
          opacity: 1;
        }

        .zigzag-dot {
          width: 90px;
          height: 90px;
          background: var(--card-color);
          border: 5px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: 900;
          color: #000;
          position: relative;
          z-index: 10;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: pulse-grow 3s ease-in-out infinite;
        }

        @keyframes pulse-grow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        .zigzag-timeline-item:hover .zigzag-dot {
          transform: scale(1.15) rotate(360deg);
        }

        .zigzag-connector {
          position: absolute;
          left: 50%;
          width: 3px;
          background: var(--card-color);
          transform: translateX(-50%);
          opacity: 0.6;
          transition: all 0.4s ease;
        }

        .zigzag-connector.top {
          bottom: 45px;
          height: 55px;
          background: linear-gradient(to bottom, var(--card-color), transparent);
        }

        .zigzag-connector.bottom {
          top: 45px;
          height: 55px;
          background: linear-gradient(to top, var(--card-color), transparent);
        }

        .zigzag-timeline-item:hover .zigzag-connector {
          opacity: 1;
          transform: translateX(-50%) scaleY(1.1);
        }

        .zigzag-card-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #000;
          margin-bottom: 0.8rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 2;
        }

        .zigzag-card-description {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #000;
          font-weight: 500;
          position: relative;
          z-index: 2;
        }

        /* ✅ QUOTE BOX STYLES - STATIC, ALWAYS VISIBLE */
        .royal-quote-section {
          max-width: 1400px;
          margin: 5rem auto 3rem;
          padding: 0 2rem;
          position: relative;
          perspective: 1500px;
          perspective-origin: center top;
        }

        .royal-quote-container {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(191, 174, 217, 0.15) 0%,
            rgba(180, 242, 225, 0.12) 50%,
            rgba(255, 209, 160, 0.15) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 2rem 5rem;
          border-radius: 20px;
          overflow: visible;
          max-height: 180px;
          transform-style: preserve-3d;
          border: 2px solid rgba(191, 174, 217, 0.4);
          /* make sure it's visible */
          opacity: 1;
          transform: none;
        }

        .royal-quote-container::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 8%;
          right: 8%;
          height: 30px;
          background: radial-gradient(
            ellipse at center,
            rgba(191, 174, 217, 0.3) 0%,
            rgba(180, 242, 225, 0.15) 30%,
            transparent 70%
          );
          filter: blur(15px);
          opacity: 0.7;
          z-index: -1;
          border-radius: 50%;
        }

        .royal-quote-container::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 3px solid rgba(191, 174, 217, 0.5);
          border-radius: 16px;
          pointer-events: none;
          animation: border-glow 4s ease-in-out infinite;
        }

        @keyframes border-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
          }
        }

        .royal-corner {
          position: absolute;
          width: 55px;
          height: 55px;
          pointer-events: none;
          z-index: 10;
          will-change: transform;
        }

        .royal-corner::before,
        .royal-corner::after {
          content: '';
          position: absolute;
          background: linear-gradient(135deg, #BFAED9 0%, #B4F2E1 100%);
        }

        .royal-corner.top-left {
          top: -8px;
          left: -8px;
        }

        .royal-corner.top-left::before {
          top: 0;
          left: 0;
          width: 38px;
          height: 4px;
          border-radius: 2px 0 0 2px;
        }

        .royal-corner.top-left::after {
          top: 0;
          left: 0;
          width: 4px;
          height: 38px;
          border-radius: 2px 2px 0 0;
        }

        .royal-corner.top-right {
          top: -8px;
          right: -8px;
        }

        .royal-corner.top-right::before {
          top: 0;
          right: 0;
          width: 38px;
          height: 4px;
          border-radius: 0 2px 2px 0;
        }

        .royal-corner.top-right::after {
          top: 0;
          right: 0;
          width: 4px;
          height: 38px;
          border-radius: 2px 2px 0 0;
        }

        .royal-corner.bottom-left {
          bottom: -8px;
          left: -8px;
        }

        .royal-corner.bottom-left::before {
          bottom: 0;
          left: 0;
          width: 38px;
          height: 4px;
          border-radius: 2px 0 0 2px;
        }

        .royal-corner.bottom-left::after {
          bottom: 0;
          left: 0;
          width: 4px;
          height: 38px;
          border-radius: 0 0 2px 2px;
        }

        .royal-corner.bottom-right {
          bottom: -8px;
          right: -8px;
        }

        .royal-corner.bottom-right::before {
          bottom: 0;
          right: 0;
          width: 38px;
          height: 4px;
          border-radius: 0 2px 2px 0;
        }

        .royal-corner.bottom-right::after {
          bottom: 0;
          right: 0;
          width: 4px;
          height: 38px;
          border-radius: 0 0 2px 2px;
        }

        .royal-quote-content {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 0 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          transform-style: preserve-3d;
        }

        .royal-quote-mark {
          font-size: 5.5rem;
          line-height: 0.8;
          font-family: Georgia, serif;
          color: #BFAED9;
          opacity: 0.12;
          position: absolute;
          top: -15px;
          left: 15px;
          z-index: 0;
          font-weight: 900;
        }

        .royal-quote-mark.closing {
          bottom: -25px;
          top: auto;
          right: 15px;
          left: auto;
          transform: rotate(180deg);
        }

        .royal-quote-text {
          font-size: 1.35rem;
          line-height: 1.6;
          color: #333333;
          font-weight: 600;
          font-style: italic;
          margin-bottom: 0.9rem;
          position: relative;
          z-index: 2;
        }

        .royal-quote-author {
          font-size: 1.05rem;
          font-weight: 800;
          color: #3978D7;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          position: relative;
          z-index: 2;
        }

        .royal-quote-author::before {
          content: '';
          display: block;
          width: 60px;
          height: 2px;
          background: linear-gradient(to right, transparent, #BFAED9, transparent);
          margin: 0 auto 0.7rem;
        }

        .royal-flourish {
          position: absolute;
          font-size: 1.8rem;
          color: #BFAED9;
          opacity: 0.3;
          animation: flourish-pulse 3s ease-in-out infinite;
        }

        .royal-flourish.left {
          left: 35px;
          top: 50%;
          transform: translateY(-50%);
        }

        .royal-flourish.right {
          right: 35px;
          top: 50%;
          transform: translateY(-50%) scaleX(-1);
        }

        @keyframes flourish-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes gradientSlide {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* RESPONSIVE (same as before) */
        @media (max-width: 1024px) {
          .zigzag-timeline-wrapper { 
            padding: 1.5rem 0.5rem; 
          }
          
          .zigzag-timeline-container {
            flex-direction: column;
            padding: 2rem 0;
            gap: 100px;
          }

          .timeline-horizontal-line {
            top: 0;
            bottom: 0;
            left: 70px;
            width: 4px;
            height: 100%;
            transform: none;
            background: linear-gradient(
              to bottom,
              rgba(52, 152, 219, 0.3) 0%,
              #3498db 15%,
              #BFAED9 35%,
              #FFD1A0 50%,
              #FFF2B3 65%,
              #FFB3BA 85%,
              rgba(255, 179, 186, 0.3) 100%
            );
          }

          .timeline-horizontal-line::before {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            animation: travel-vertical 8s ease-in-out infinite;
          }

          @keyframes travel-vertical {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }

          .zigzag-timeline-item {
            width: 100%;
            flex-direction: row;
            justify-content: flex-start;
            padding-left: 0;
            align-items: center;
          }

          .zigzag-card {
            width: calc(100% - 140px);
            max-width: 600px;
            position: relative;
            left: 0;
            margin-left: 130px;
          }

          .zigzag-card.top,
          .zigzag-card.bottom {
            position: relative;
            top: auto;
            bottom: auto;
            transform: translateX(-50px) scale(0.8);
          }

          .zigzag-card.visible {
            transform: translateX(0) scale(1);
          }

          .zigzag-connector { display: none; }

          .zigzag-dot {
            position: absolute;
            left: 25px;
            top: 50%;
            transform: translateY(-50%);
          }

          .zigzag-timeline-item:hover .zigzag-dot {
            transform: translateY(-50%) scale(1.15) rotate(360deg);
          }

          .royal-quote-container { 
            padding: 2rem 3rem; 
            max-height: none; 
          }

          .royal-quote-content { 
            padding: 0 2rem; 
          }

          .royal-quote-text { 
            font-size: 1.2rem; 
          }

          .royal-flourish { 
            font-size: 1.6rem; 
          }
        }

        @media (max-width: 768px) {
          .zigzag-timeline-wrapper { 
            padding: 1rem 0.5rem; 
          }
          
          .zigzag-timeline-container { 
            gap: 80px; 
            padding: 1.5rem 0; 
          }
          
          .timeline-horizontal-line {
            left: 55px;
          }
          
          .zigzag-timeline-item { 
            padding-left: 0; 
          }
          
          .zigzag-card { 
            width: calc(100% - 120px); 
            padding: 1.2rem;
            margin-left: 110px;
          }
          
          .zigzag-dot { 
            width: 70px; 
            height: 70px; 
            font-size: 1.1rem; 
            left: 20px; 
          }
          
          .zigzag-card-title { 
            font-size: 1.2rem; 
          }
          
          .zigzag-card-description { 
            font-size: 0.85rem; 
            line-height: 1.5; 
          }
          
          .royal-quote-section { 
            margin: 4rem auto 2rem; 
            padding: 0 1rem; 
          }
          
          .royal-quote-container { 
            padding: 2rem 2rem; 
          }
          
          .royal-quote-text { 
            font-size: 1.15rem; 
            line-height: 1.5; 
          }
          
          .royal-quote-author { 
            font-size: 0.95rem; 
            letter-spacing: 0.1em; 
          }
          
          .royal-corner { 
            width: 48px; 
            height: 48px; 
          }
          
          .royal-flourish { 
            display: none; 
          }
        }

        @media (max-width: 640px) {
          .zigzag-timeline-wrapper { 
            padding: 1rem 0.3rem; 
          }
          
          .zigzag-timeline-container { 
            gap: 70px; 
            padding: 1rem 0; 
          }
          
          .timeline-horizontal-line {
            left: 45px;
          }
          
          .zigzag-timeline-item { 
            padding-left: 0; 
          }
          
          .zigzag-card { 
            width: calc(100% - 100px); 
            padding: 1.1rem;
            margin-left: 95px;
          }
          
          .zigzag-dot {
            width: 60px;
            height: 60px;
            font-size: 1rem;
            left: 15px;
            border: 4px solid white;
          }
          
          .zigzag-card-title { 
            font-size: 1.15rem; 
            margin-bottom: 0.6rem; 
          }
          
          .zigzag-card-description { 
            font-size: 0.83rem; 
          }
        }

        @media (max-width: 480px) {
          .zigzag-timeline-wrapper { 
            padding: 0.5rem 0.2rem; 
          }
          
          .zigzag-timeline-container { 
            gap: 60px; 
            padding: 1rem 0; 
          }
          
          .timeline-horizontal-line {
            left: 40px;
          }
          
          .zigzag-timeline-item { 
            padding-left: 0; 
          }
          
          .zigzag-card { 
            width: calc(100% - 90px); 
            padding: 1rem;
            margin-left: 85px;
          }
          
          .zigzag-dot {
            width: 55px;
            height: 55px;
            font-size: 0.95rem;
            left: 12px;
            border: 3px solid white;
          }
          
          .zigzag-card-title { 
            font-size: 1.1rem; 
            margin-bottom: 0.6rem; 
          }
          
          .zigzag-card-description { 
            font-size: 0.8rem; 
          }
          
          .royal-quote-container { 
            padding: 1.8rem 1.5rem; 
          }
          
          .royal-quote-content { 
            padding: 0 0.5rem; 
          }
          
          .royal-quote-text { 
            font-size: 1.05rem; 
            line-height: 1.5;
            margin-bottom: 1.2rem;
          }
          
          .royal-quote-author { 
            font-size: 0.85rem; 
          }
          
          .royal-corner { 
            width: 40px; 
            height: 40px; 
          }
          
          .royal-corner::before { 
            width: 28px !important; 
          }
          
          .royal-corner::after { 
            height: 28px !important; 
          }
          
          .royal-quote-mark { 
            font-size: 5rem; 
          }
        }

        @media (max-width: 375px) {
          .timeline-horizontal-line {
            left: 35px;
          }
          
          .zigzag-card { 
            width: calc(100% - 80px); 
            margin-left: 75px;
          }
          
          .zigzag-dot {
            width: 50px;
            height: 50px;
            font-size: 0.9rem;
            left: 10px;
          }
        }

        @media (max-width: 320px) {
          .timeline-horizontal-line {
            left: 30px;
          }
          
          .zigzag-card { 
            width: calc(100% - 70px); 
            margin-left: 65px;
            padding: 0.9rem;
          }
          
          .zigzag-dot {
            width: 45px;
            height: 45px;
            font-size: 0.85rem;
            left: 8px;
          }
          
          .zigzag-card-title { 
            font-size: 1rem; 
          }
          
          .zigzag-card-description { 
            font-size: 0.75rem; 
          }
        }
      `}</style>

      <section ref={sectionRef} className="py-8 relative overflow-hidden journey-transparent-bg">
        <div
          className="journey-mouse-glow"
          style={{ left: mousePosition.x - 250, top: mousePosition.y - 250 }}
        />

        <div className="relative z-10 w-full">
          <div style={{ textAlign: 'center', marginBottom: 40, padding: '2rem 1rem 0' }}>
            <h2
              ref={headerRef}
              style={{
                fontSize: '3.2rem',
                fontWeight: 900,
                marginBottom: 16,
                textTransform: 'UPPERCASE',
                color: '#000000',
              }}
            >
              ESON THROUGH YEARS
            </h2>
            <div
              ref={underlineRef}
              style={{
                height: 5,
                width: 200,
                background: '#3498db',
                borderRadius: 8,
                margin: '12px auto 0',
                transformOrigin: 'center',
              }}
            />
            <p
              ref={descriptionRef}
              style={{
                fontSize: '1rem',
                marginTop: 16,
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontWeight: 500,
                color: '#000000',
              }}
            >
              From humble beginnings to global vision — our evolution through innovation
            </p>
          </div>

          <div className="zigzag-timeline-wrapper">
            <div className="zigzag-timeline-container">
              <div className="timeline-horizontal-line" />

              {milestones.map((milestone, index) => {
                const isVisible = visibleMilestones.has(index);
                const isTop = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className="zigzag-timeline-item"
                    style={
                      {
                        '--card-color': milestone.color,
                        '--card-color-alpha': hexToRgba(milestone.color, 0.2),
                      } as React.CSSProperties
                    }
                  >
                    <div className={`zigzag-connector ${isTop ? 'top' : 'bottom'}`} />
                    <div className="zigzag-dot">{milestone.year}</div>
                    <div
                      ref={el => (milestonesRef.current[index] = el)}
                      data-index={index}
                      className={`zigzag-card ${isTop ? 'top' : 'bottom'} ${
                        isVisible ? 'visible' : ''
                      }`}
                      style={{ transitionDelay: `${index * 0.15}s` }}
                      onMouseMove={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                      }}
                    >
                      <h3 className="zigzag-card-title">{milestone.title}</h3>
                      <p className="zigzag-card-description">{milestone.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ✅ QUOTE BOX - STATIC, ALWAYS RENDERED */}
          <div className="royal-quote-section">
            <div className="royal-quote-container">
              <div className="royal-corner top-left"></div>
              <div className="royal-corner top-right"></div>
              <div className="royal-corner bottom-left"></div>
              <div className="royal-corner bottom-right"></div>

              <div className="royal-flourish left">❦</div>
              <div className="royal-flourish right">❦</div>

              <div className="royal-quote-content">
                <div className="royal-quote-mark">"</div>
                <div className="royal-quote-mark closing">"</div>

                <p className="royal-quote-text">
                  The future is built by thinkers who dare to create
                </p>

                <div className="royal-quote-author">RX MARSHALL</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurJourney;
