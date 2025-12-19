import React, { useEffect, useState, useRef } from 'react';
import { Heart, Leaf, GraduationCap, Users, Globe, Award, TrendingUp, Target, CheckCircle, Zap, Rocket, Star } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Local image/video imports
import tree1 from '../assets/images/tree.jpg'
import tree2 from '../assets/images/tree1.jpg';
import tree3 from '../assets/images/tree2.jpg';
import treeVid1 from '../assets/images/tree3.mp4';

import road1 from '../assets/images/road.jpg';
import road2 from '../assets/images/road2.jpg';
import road3 from '../assets/images/road3.jpg';
import road4 from '../assets/images/road1.jpg';

import walk1 from '../assets/images/walk1.jpg';
import walk2 from '../assets/images/walk2.jpg';
import walk3 from '../assets/images/walk3.png';
import walk4 from '../assets/images/walk4.png';

import code1 from '../assets/images/code.jpeg';
import code2 from '../assets/images/code2.jpeg';
import code3 from '../assets/images/code3.jpg';
import code4 from '../assets/images/code4.jpg';

import health1 from '../assets/images/health1.png';
import health2 from '../assets/images/health2.mp4';
import health3 from '../assets/images/health3.jpg';
import health4 from '../assets/images/health4.jpeg';
import health5 from '../assets/images/health5.jpeg';

gsap.registerPlugin(useGSAP);

type MediaItem = {
  src: string;
  type: 'image' | 'video';
};

const CSRActivities = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleActivities, setVisibleActivities] = useState<Set<number>>(new Set());
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [cardPositions, setCardPositions] = useState<{ [key: number]: DOMRect }>({});
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  
  const treePlanterRef = useRef<HTMLDivElement>(null);
  const tree1Ref = useRef<HTMLDivElement>(null);
  const tree2Ref = useRef<HTMLDivElement>(null);
  const tree3Ref = useRef<HTMLDivElement>(null);
  const treePathRef = useRef<SVGPathElement>(null);
  
  const treePlanter2Ref = useRef<HTMLDivElement>(null);
  const tree4Ref = useRef<HTMLDivElement>(null);
  const tree5Ref = useRef<HTMLDivElement>(null);
  const tree6Ref = useRef<HTMLDivElement>(null);
  const treePath2Ref = useRef<SVGPathElement>(null);
  
  const roadIcon1Ref = useRef<HTMLDivElement>(null);
  const roadIcon2Ref = useRef<HTMLDivElement>(null);
  const roadIcon3Ref = useRef<HTMLDivElement>(null);
  const roadIcon4Ref = useRef<HTMLDivElement>(null);
  
  const treePlanter3Ref = useRef<HTMLDivElement>(null);
  const tree7Ref = useRef<HTMLDivElement>(null);
  const tree8Ref = useRef<HTMLDivElement>(null);
  const tree9Ref = useRef<HTMLDivElement>(null);
  const treePath3Ref = useRef<SVGPathElement>(null);
  
  const treePlanter4Ref = useRef<HTMLDivElement>(null);
  const tree10Ref = useRef<HTMLDivElement>(null);
  const tree11Ref = useRef<HTMLDivElement>(null);
  const tree12Ref = useRef<HTMLDivElement>(null);
  const treePath4Ref = useRef<HTMLDivElement>(null);
  
  const codeElement1Ref = useRef<HTMLDivElement>(null);
  const codeElement2Ref = useRef<HTMLDivElement>(null);
  const designElement1Ref = useRef<HTMLDivElement>(null);
  const designElement2Ref = useRef<HTMLDivElement>(null);
  
  const healthIcon1Ref = useRef<HTMLDivElement>(null);
  const healthIcon2Ref = useRef<HTMLDivElement>(null);
  const healthIcon3Ref = useRef<HTMLDivElement>(null);
  const heartbeatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const newIndex = { ...prev };
        csrInitiatives.forEach((initiative, index) => {
          const currentIdx = newIndex[index] || 0;
          newIndex[index] = (currentIdx + 1) % initiative.media.length;
        });
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (video) {
        const [cardIndex, mediaIndex] = key.split('-').map(Number);
        const currentIdx = currentImageIndex[cardIndex] || 0;
        
        if (currentIdx === mediaIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentImageIndex]);

  useEffect(() => {
    const updatePositions = () => {
      const positions: { [key: number]: DOMRect } = {};
      Object.keys(cardRefs.current).forEach((key) => {
        const cardIndex = parseInt(key);
        const card = cardRefs.current[cardIndex];
        if (card) {
          positions[cardIndex] = card.getBoundingClientRect();
        }
      });
      setCardPositions(positions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions);

    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [visibleActivities]);

  useGSAP(() => {
    const treeTl = gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 5,
      defaults: { ease: 'power1.inOut' }
    });

    gsap.fromTo(treePathRef.current,
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 3, ease: 'power1.inOut' }
    );

    const treePositions = [
      { x: window.innerWidth * 0.7, y: window.innerHeight * 0.12 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.18 },
      { x: window.innerWidth * 0.3, y: window.innerHeight * 0.22 }
    ];

    treeTl
      .fromTo(treePlanterRef.current, 
        { x: window.innerWidth, y: -50, opacity: 0, scale: 0.5 },
        { x: treePositions[0].x, y: treePositions[0].y, opacity: 1, scale: 0.8, duration: 2.5 }
      )
      .to(treePlanterRef.current, { scaleY: 0.65, duration: 0.6 })
      .fromTo(tree1Ref.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' })
      .to(treePlanterRef.current, { scaleY: 0.8, duration: 0.6 })
      .to(treePlanterRef.current, { x: treePositions[1].x, y: treePositions[1].y, duration: 2 })
      .to(treePlanterRef.current, { scaleY: 0.65, duration: 0.6 })
      .fromTo(tree2Ref.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' })
      .to(treePlanterRef.current, { scaleY: 0.8, duration: 0.6 })
      .to(treePlanterRef.current, { x: treePositions[2].x, y: treePositions[2].y, duration: 2 })
      .to(treePlanterRef.current, { scaleY: 0.65, duration: 0.6 })
      .fromTo(tree3Ref.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' })
      .to(treePlanterRef.current, { scaleY: 0.8, duration: 0.6 })
      .to(treePlanterRef.current, { x: -150, y: window.innerHeight * 0.28, opacity: 0, duration: 2 });

    const tree2Tl = gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 5,
      defaults: { ease: 'power1.inOut' },
      delay: 2
    });

    gsap.fromTo(treePath2Ref.current,
      { strokeDashoffset: 800 },
      { strokeDashoffset: 0, duration: 3, ease: 'power1.inOut', delay: 2 }
    );

    const tree2Positions = [
      { x: window.innerWidth * 0.88, y: 80 },
      { x: window.innerWidth * 0.78, y: 140 },
      { x: window.innerWidth * 0.68, y: 200 }
    ];

    tree2Tl
      .fromTo(treePlanter2Ref.current,
        { x: window.innerWidth, y: 40, opacity: 0, scale: 0.5 },
        { x: tree2Positions[0].x, y: tree2Positions[0].y, opacity: 1, scale: 0.7, duration: 2.5 }
      )
      .to(treePlanter2Ref.current, { scaleY: 0.55, duration: 0.6 })
      .fromTo(tree4Ref.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' })
      .to(treePlanter2Ref.current, { scaleY: 0.7, duration: 0.6 })
      .to(treePlanter2Ref.current, { x: tree2Positions[1].x, y: tree2Positions[1].y, duration: 2 })
      .to(treePlanter2Ref.current, { scaleY: 0.55, duration: 0.6 })
      .fromTo(tree5Ref.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' })
      .to(treePlanter2Ref.current, { scaleY: 0.7, duration: 0.6 })
      .to(treePlanter2Ref.current, { x: tree2Positions[2].x, y: tree2Positions[2].y, duration: 2 })
      .to(treePlanter2Ref.current, { scaleY: 0.55, duration: 0.6 })
      .fromTo(tree6Ref.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' })
      .to(treePlanter2Ref.current, { scaleY: 0.7, duration: 0.6 })
      .to(treePlanter2Ref.current, { x: window.innerWidth * 0.58, y: 260, opacity: 0, duration: 2 });

  }, { scope: animationContainerRef, dependencies: [] });

  const csrInitiatives = [
    {
      title: 'Road Safety Initiative',
      icon: Globe,
      description: 'Installing speed breakers at accident-prone zones to control repeated accidents and ensure safer roads for our community through comprehensive safety measures.',
      programs: ['Speed Breaker Installation', 'Safety Signage', 'Accident Prevention', 'Community Awareness'],
      color: '#3498db',
      media: [
        { src: road1, type: 'image' as const },
        { src: road2, type: 'image' as const },
        { src: road3, type: 'image' as const },
        { src: road4, type: 'image' as const }
      ]
    },
    {
      title: 'Tree Plantation Drive',
      icon: Leaf,
      description: 'Large-scale tree plantation initiatives to combat climate change and create a greener environment for future generations with sustainable forestry practices.',
      programs: ['Urban Forestation', 'School Plantations', 'Maintenance Program', 'Native Species Focus'],
      color: '#FDFD96',
      media: [
        { src: tree1, type: 'image' as const },
        { src: tree2, type: 'image' as const },
        { src: tree3, type: 'image' as const },
        { src: treeVid1, type: 'video' as const }
      ]
    },
    {
      title: 'Walking Path Development',
      icon: Heart,
      description: 'Creating safe and accessible walking platforms for pedestrians, promoting healthy lifestyle and sustainable transportation in urban communities.',
      programs: ['Footpath Construction', 'Lighting Installation', 'Green Walkways', 'Accessibility Features'],
      color: '#BFAED9',
      media: [
        { src: walk1, type: 'image' as const },
        { src: walk2, type: 'image' as const },
        { src: walk3, type: 'image' as const },
        { src: walk4, type: 'image' as const }
      ]
    },
    {
      title: 'Coding Bootcamps',
      icon: GraduationCap,
      description: 'Free technology training and coding bootcamps empowering youth with digital skills for better career opportunities in the modern tech industry.',
      programs: ['Web Development', 'Python Programming', 'Mobile Apps', 'Career Guidance'],
      color: '#FFB3BA',
      media: [
        { src: code1, type: 'image' as const },
        { src: code2, type: 'image' as const },
        { src: code3, type: 'image' as const },
        { src: code4, type: 'image' as const }
      ]
    },
    {
      title: 'Employee Welfare',
      icon: Heart,
      description: 'Supporting employees through essential welfare facilities: medical coverage, financial wellness programs, safe office environment, hygienic canteen, and easy access to health resources—ensuring care and security in every workday.',
      programs: [  'Accident & Medical Support',
    'Workplace Safety',
    'Clean and Hygienic Canteen',
    'Provident Fund and ESI',
    'Financial Assistance',
    'Emergency Helpdesk'],
      color: '#3498db',
      media: [
        { src: health1, type: 'image' as const },
        { src: health2, type: 'video' as const },
        { src: health3, type: 'image' as const },
        { src: health4, type: 'image' as const },
        { src: health5, type: 'image' as const }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleActivities(prev => new Set([...prev, index]));
            }, index * 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('[data-csr-card]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const ProfessionalPerson = ({ color }: { color: string }) => (
    <svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
      <circle cx="30" cy="18" r="10" fill={color} opacity="0.9"/>
      <path d="M 30 28 L 30 55" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.9"/>
      <path d="M 30 35 L 20 50" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.9"/>
      <path d="M 30 35 L 40 50" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.9"/>
      <path d="M 30 55 L 23 75" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.9"/>
      <path d="M 30 55 L 37 75" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.9"/>
    </svg>
  );

  const ProfessionalTree = () => (
    <svg viewBox="0 0 50 70" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))' }}>
      <rect x="22" y="40" width="6" height="25" fill="#8B4513" rx="1"/>
      <path d="M 25 10 L 10 35 L 40 35 Z" fill="#6B8F5B" opacity="0.9"/>
      <path d="M 25 20 L 12 40 L 38 40 Z" fill="#7FA76E" opacity="0.85"/>
      <path d="M 25 30 L 15 45 L 35 45 Z" fill="#8FBD7E" opacity="0.8"/>
    </svg>
  );

  return (
    <section 
      id="csr" 
      style={{ 
        minHeight: '100vh',
        padding: '0',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      <div 
        ref={animationContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5
        }}
      >
        <svg style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
          <path
            ref={treePathRef}
            d={`M ${window.innerWidth} 80 Q ${window.innerWidth * 0.7} ${window.innerHeight * 0.12}, ${window.innerWidth * 0.5} ${window.innerHeight * 0.18} L ${window.innerWidth * 0.3} ${window.innerHeight * 0.22} L 0 ${window.innerHeight * 0.28}`}
            stroke="#3498db"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10 5"
            strokeDashoffset="1000"
            opacity="0.35"
          />
          <path
            ref={treePath2Ref}
            d={`M ${window.innerWidth} 40 L ${window.innerWidth * 0.88} 80 L ${window.innerWidth * 0.78} 140 L ${window.innerWidth * 0.68} 200 L ${window.innerWidth * 0.58} 260`}
            stroke="#FDFD96"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8 5"
            strokeDashoffset="800"
            opacity="0.35"
          />
        </svg>

        <div ref={treePlanterRef} style={{ position: 'absolute', width: '50px', height: '80px', opacity: 0 }}>
          <ProfessionalPerson color="#3498db" />
        </div>
        <div ref={tree1Ref} style={{ position: 'absolute', width: '45px', height: '65px', left: `${window.innerWidth * 0.7 - 22}px`, top: `${window.innerHeight * 0.12 + 10}px`, opacity: 0 }}>
          <ProfessionalTree />
        </div>
        <div ref={tree2Ref} style={{ position: 'absolute', width: '45px', height: '65px', left: `${window.innerWidth * 0.5 - 22}px`, top: `${window.innerHeight * 0.18 + 10}px`, opacity: 0 }}>
          <ProfessionalTree />
        </div>
        <div ref={tree3Ref} style={{ position: 'absolute', width: '45px', height: '65px', left: `${window.innerWidth * 0.3 - 22}px`, top: `${window.innerHeight * 0.22 + 10}px`, opacity: 0 }}>
          <ProfessionalTree />
        </div>

        <div ref={treePlanter2Ref} style={{ position: 'absolute', width: '45px', height: '70px', opacity: 0 }}>
          <ProfessionalPerson color="#FDFD96" />
        </div>
        <div ref={tree4Ref} style={{ position: 'absolute', width: '40px', height: '60px', left: `${window.innerWidth * 0.88 - 20}px`, top: '85px', opacity: 0 }}>
          <ProfessionalTree />
        </div>
        <div ref={tree5Ref} style={{ position: 'absolute', width: '40px', height: '60px', left: `${window.innerWidth * 0.78 - 20}px`, top: '145px', opacity: 0 }}>
          <ProfessionalTree />
        </div>
        <div ref={tree6Ref} style={{ position: 'absolute', width: '40px', height: '60px', left: `${window.innerWidth * 0.68 - 20}px`, top: '205px', opacity: 0 }}>
          <ProfessionalTree />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            marginBottom: 16,
            color: '#333333',
            textShadow: '0 2px 16px rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Creating impact beyond business.
          </h2>
          <div style={{
            height: 4,
            width: 240,
            background: 'linear-gradient(90deg, #3467db 0%, #3398db 33%, #3498db 66%, #3498db 100%)',
            borderRadius: 8,
            margin: '12px auto 0',
            boxShadow: '0 2px 10px rgba(52, 152, 219, 0.6)'
          }}/>
          <p style={{ 
            fontSize: 18,
            maxWidth: '800px',
            margin: '20px auto 0',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#000000',
            textShadow: '0 1px 4px rgba(255,255,255,0.5)'
          }}>
            ESON CSR — built on care, impact, and responsibility.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 80 }}>
          {csrInitiatives.map((initiative, index) => {
            const IconComponent = initiative.icon;
            const isVisible = visibleActivities.has(index);
            const isEven = index % 2 === 0;
            const isActive = activeCard === index;
            const currentImgIndex = currentImageIndex[index] || 0;

            const hexToRgba = (hex: string, alpha: number) => {
              const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
              return result 
                ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
                : `rgba(255, 255, 255, ${alpha})`;
            };

            return (
              <div
                key={index}
                ref={(el) => cardRefs.current[index] = el}
                data-csr-card="true"
                data-index={index}
                className="csr-activity-card"
                style={{
                  transform: isVisible ? 'translateX(0) scale(1)' : `translateX(${isEven ? '-20px' : '20px'}) scale(0.95)`,
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1s ease-out'
                }}
                onClick={() => setActiveCard(activeCard === index ? null : index)}
              >
                <div style={{
                  background: hexToRgba(initiative.color, 0.12),
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: isActive 
                    ? `2px solid ${hexToRgba(initiative.color, 0.5)}` 
                    : `1px solid ${hexToRgba(initiative.color, 0.25)}`,
                  borderRadius: 28,
                  overflow: 'hidden',
                  boxShadow: isActive 
                    ? `0 20px 60px ${hexToRgba(initiative.color, 0.35)}` 
                    : `0 8px 32px ${hexToRgba(initiative.color, 0.15)}`,
                  display: 'grid',
                  gridTemplateColumns: isEven ? '45% 55%' : '55% 45%',
                  minHeight: '380px',
                  transition: 'all 0.5s ease',
                  cursor: 'pointer'
                }}>
                  <div className="csr-media-container" style={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    height: '100%',
                    order: isEven ? 0 : 1 
                  }}>
                    {initiative.media.map((media, mediaIdx) => (
                      media.type === 'video' ? (
                        <video
                          key={mediaIdx}
                          ref={(el) => videoRefs.current[`${index}-${mediaIdx}`] = el}
                          src={media.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: currentImgIndex === mediaIdx ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                            pointerEvents: currentImgIndex === mediaIdx ? 'auto' : 'none'
                          }}
                        />
                      ) : (
                        <img
                          key={mediaIdx}
                          src={media.src}
                          alt={`${initiative.title} ${mediaIdx + 1}`}
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: currentImgIndex === mediaIdx ? 1 : 0,
                            transition: 'opacity 1s ease-in-out'
                          }}
                        />
                      )
                    ))}
                    
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, ${hexToRgba(initiative.color, 0.5)} 0%, transparent 60%)`,
                      pointerEvents: 'none'
                    }} />

                    <div style={{
                      position: 'absolute',
                      bottom: 16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: 8,
                      zIndex: 2
                    }}>
                      {initiative.media.map((_, mediaIdx) => (
                        <div
                          key={mediaIdx}
                          style={{
                            width: currentImgIndex === mediaIdx ? 24 : 8,
                            height: 8,
                            borderRadius: 4,
                            background: currentImgIndex === mediaIdx 
                              ? initiative.color 
                              : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            boxShadow: currentImgIndex === mediaIdx 
                              ? `0 0 8px ${hexToRgba(initiative.color, 0.6)}`
                              : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ 
                    padding: 40, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    order: isEven ? 1 : 0 
                  }}>
                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 16, color: '#000000' }}>
                        {initiative.title}
                      </h3>
                      <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24, color: '#000000' }}>
                        {initiative.description}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '1px', color: '#000000' }}>
                        KEY PROGRAMS
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {initiative.programs.map((program, pIndex) => (
                          <div
                            key={pIndex}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 500,
                              background: hexToRgba(initiative.color, 0.15),
                              backdropFilter: 'blur(5px)',
                              color: initiative.color === '#FDFD96' ? '#8B8000' : initiative.color,
                              border: `1px solid ${hexToRgba(initiative.color, 0.25)}`
                            }}
                          >
                            {program}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes particlePulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        @keyframes gentleFloat {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        /* MOBILE IMAGE FIX */
        @media (max-width: 1024px) {
          div[style*="padding: 40px"] {
            padding: 24px !important;
          }
          h2[style*="font-size: 3.2rem"] {
            font-size: 2.5rem !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          
          /* ENSURE IMAGES ARE VISIBLE ON MOBILE */
          .csr-media-container {
            position: relative !important;
            height: 250px !important;
            width: 100% !important;
            order: -1 !important;
          }
          
          .csr-media-container img,
          .csr-media-container video {
            display: block !important;
            visibility: visible !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="padding: 24px"] {
            padding: 16px !important;
          }
          h3[style*="font-size: 2rem"] {
            font-size: 1.5rem !important;
          }
          
          .csr-media-container {
            height: 200px !important;
          }
        }

        @media (max-width: 480px) {
          .csr-media-container {
            height: 180px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CSRActivities;
