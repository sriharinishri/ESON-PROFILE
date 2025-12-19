import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Lightbulb, Shield, Users, Star, Heart, Zap, Target, Trophy,
  Handshake, Eye, CheckCircle, TrendingUp, ChevronRight
} from 'lucide-react';
import { gsap } from 'gsap';

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const darkenColor = (hex: string, factor: number = 0.6): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const newR = Math.floor(r * factor);
  const newG = Math.floor(g * factor);
  const newB = Math.floor(b * factor);
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

const CompanyValues: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const wordsContainerRef = useRef<HTMLDivElement | null>(null);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const iconsContainerRef = useRef<HTMLDivElement | null>(null);

  const coreValues = useMemo(() => ([
    {
      name: 'Innovation First',
      icon: Lightbulb,
      color: '#3498db',
      description: 'Innovation is our foundation. We push boundaries, turning ideas into intelligent systems that redefine what\'s possible and move industries forward.'
    },
    {
      name: 'Integrity in Every Byte',
      icon: Shield,
      color: '#BFAED9',
      description: 'Honesty drives our code and conduct. We build trust through transparency, reliability, and ethical excellence in every decision and delivery.'
    },
    {
      name: 'Excellence by Design',
      icon: Star,
      color: '#FFD1A0',
      description: 'Every product we craft is built on precision and purpose. We engineer excellence from concept to completion, ensuring quality in every detail.'
    },
    {
      name: 'Passion for Progress',
      icon: Heart,
      color: '#FFB3BA',
      description: 'Our passion fuels innovation. We bring energy, creativity, and dedication to every challenge, driving impact that lasts.'
    },
    {
      name: 'Agility & Adaptability',
      icon: Zap,
      color: '#3498db',
      description: 'We move fast, learn faster, and evolve constantly. Agility empowers us to stay ahead in a dynamic and ever-changing digital landscape.'
    },
    {
      name: 'Impact with Purpose',
      icon: Target,
      color: '#BFAED9',
      description: 'Every solution we deliver creates real-world impact — improving lives, advancing industries, and shaping a more connected, sustainable future.'
    },
    {
      name: 'Quality Without Compromise',
      icon: Trophy,
      color: '#FFD1A0',
      description: 'We hold ourselves to the highest standards. Quality is not a goal — it\'s our default mode of operation.'
    },
    {
      name: 'Collaborative Growth',
      icon: Handshake,
      color: '#FFF2B3',
      description: 'Together, we thrive. Our partnerships and teamwork amplify creativity, align strengths, and accelerate success across every project.'
    },
    {
      name: 'Vision for Tomorrow',
      icon: Eye,
      color: '#FFB3BA',
      description: 'We anticipate change, embrace innovation, and shape what\'s next. Our forward vision keeps us ahead of the curve — and the competition.'
    },
    {
      name: 'Reliability You Can Trust',
      icon: CheckCircle,
      color: '#3498db',
      description: 'Dependable delivery, consistent results, and unwavering commitment — reliability defines the way we work and the way we win.'
    },
    {
      name: 'Sustainable Growth',
      icon: TrendingUp,
      color: '#BFAED9',
      description: 'We grow with integrity — balancing innovation, sustainability, and human progress to build long-term value for all stakeholders.'
    }
  ]), []);

  const infiniteList = useMemo(() => [...coreValues, ...coreValues, ...coreValues], [coreValues]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % coreValues.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [coreValues.length]);

  useEffect(() => {
    if (!wordsContainerRef.current) return;

    const firstItem = wordsContainerRef.current.querySelector<HTMLDivElement>('.scroll-item');
    const itemHeight = firstItem ? firstItem.getBoundingClientRect().height : 60;

    const visibleIndex = 2;
    const offset = (coreValues.length + currentSlide - visibleIndex) * itemHeight;

    gsap.to(wordsContainerRef.current, {
      y: -offset,
      duration: 0.6,
      ease: 'power2.inOut'
    });

    const currentColor = coreValues[currentSlide].color;

    if (mainContainerRef.current) {
      gsap.to(mainContainerRef.current, {
        background: hexToRgba(currentColor, 0.15), // Increased from 0.06 to 0.15
        borderColor: hexToRgba(currentColor, 0.25), // Increased from 0.15 to 0.25
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    if (iconsContainerRef.current) {
      gsap.to(iconsContainerRef.current, {
        background: hexToRgba(currentColor, 0.18), // Increased from 0.08 to 0.18
        borderColor: hexToRgba(currentColor, 0.28), // Increased from 0.18 to 0.28
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }, [currentSlide, coreValues.length]);

  const currentValue = coreValues[currentSlide];
  const IconComponent = currentValue.icon;

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "transparent",
        position: "relative",
        padding: "0",
        
      }}
    >
      <div style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        left: mousePosition.x ? mousePosition.x - 200 : -9999,
        top: mousePosition.y ? mousePosition.y - 200 : -9999,
        background: `radial-gradient(circle, ${hexToRgba(currentValue.color, 0.08)} 0%, ${hexToRgba(currentValue.color, 0.04)} 40%, transparent 70%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        transition: 'all 0.6s ease-out',
        zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 15, padding: '0' }}>
          <h2
            className="main-heading"
            style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              marginBottom: 16,
              color: '#333333',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            THE ESON ETHOS
          </h2>
          <div
            className="header-underline"
            style={{
              height: 5,
              width: 280,
              background: 'linear-gradient(90deg, #3498db 0%, #2980b9 33%, #1f5f8f 66%, #3498db 100%)',
              borderRadius: 10,
              margin: '12px auto 0'
            }}
          />
          <p
            className="header-description"
            style={{
              fontSize: 18,
              maxWidth: '1000px',
              margin: '24px auto 0',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#333333'
            }}
          >
            Discover the core principles that drive our mission and shape our culture of excellence and innovation.
          </p>
        </div>

        <div className="icons-section" style={{ marginBottom: 40 }}>
          <div
            ref={iconsContainerRef}
            className="icons-container"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 28,
              flexWrap: 'wrap',
              background: hexToRgba(currentValue.color, 0.18), // Darker
              backdropFilter: 'blur(20px)', // Increased from 12px
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: `1px solid ${hexToRgba(currentValue.color, 0.28)}`, // Darker
              padding: '30px',
              transition: 'all 0.6s ease',
              boxShadow: `0 8px 32px ${hexToRgba(currentValue.color, 0.15)}` // Added shadow
            }}
          >
            {coreValues.map((value, index) => {
              const IconComp = value.icon;
              const isActive = index === currentSlide;
              const darkerIconColor = darkenColor(value.color, 0.6);

              return (
                <div
                  key={index}
                  className="icon-circle"
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    background: isActive
                      ? value.color
                      : hexToRgba(value.color, 0.25), // Darker from 0.15
                    backdropFilter: 'blur(12px)', // Increased from 8px
                    WebkitBackdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    transform: isActive ? 'scale(1.25)' : 'scale(1)',
                    border: isActive ? `2px solid ${value.color}` : `2px solid ${hexToRgba(value.color, 0.3)}` // Darker border
                  }}
                >
                  <IconComp style={{
                    width: isActive ? 36 : 30,
                    height: isActive ? 36 : 30,
                    color: isActive ? darkenColor(value.color, 0.3) : darkerIconColor,
                    transition: 'all 0.4s ease'
                  }} />
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={mainContainerRef}
          className="main-content-container"
          style={{
            background: hexToRgba(currentValue.color, 0.15), // Darker from 0.06
            border: `1px solid ${hexToRgba(currentValue.color, 0.25)}`, // Darker from 0.15
            borderRadius: '24px',
            backdropFilter: 'blur(25px)', // Increased from 15px
            WebkitBackdropFilter: 'blur(25px)',
            padding: '40px',
            margin: '0 auto 2rem', // Added bottom margin
            maxWidth: 1300,
            transition: 'all 0.6s ease',
            boxShadow: `0 8px 32px ${hexToRgba(currentValue.color, 0.2)}` // Added shadow
          }}
        >
          <div className="values-grid" style={{
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: 70,
            alignItems: 'center'
          }}>
            <div className="left-scroll-container" style={{
              position: 'relative',
              height: 400,
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 128,
                zIndex: 10,
                transition: 'all 0.6s ease'
              }}>
                <ChevronRight
                  className="chevron-arrow"
                  style={{
                    width: 38,
                    height: 38,
                    color: currentValue.color,
                    filter: `drop-shadow(0 2px 8px ${hexToRgba(currentValue.color, 0.4)})`,
                    transition: 'all 0.6s ease'
                  }}
                />
              </div>

              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                paddingLeft: 50
              }}>
                <div
                  ref={wordsContainerRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 50,
                    width: 'calc(100% - 50px)',
                    willChange: 'transform'
                  }}
                >
                  {infiniteList.map((value, index) => {
                    const n = coreValues.length;
                    const actualIndex = index % n;
                    const copyIndex = Math.floor(index / n);
                    const isActive = copyIndex === 1 && actualIndex === currentSlide;

                    return (
                      <div
                        key={`${actualIndex}-${index}`}
                        onClick={() => setCurrentSlide(actualIndex)}
                        className="scroll-item"
                        style={{
                          height: 60,
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.5s ease',
                          paddingRight: '10px',
                          paddingLeft: '6px',
                          position: 'relative'
                        }}
                      >
                        <span style={{
                          fontSize: isActive ? '0.9rem' : '0.92rem',
                          fontWeight: isActive ? 900 : 900,
                          color: isActive ? value.color : '#666',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                          transition: 'all 0.5s ease',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%',
                          display: 'block',
                          textShadow: isActive ? `0 2px 12px ${hexToRgba(value.color, 0.3)}` : 'none',
                          padding: isActive ? '8px 16px' : '8px 0',
                          borderRadius: isActive ? '12px' : '0',
                          border: isActive ? `2.5px solid ${value.color}` : '2.5px solid transparent',
                          background: isActive ? hexToRgba(value.color, 0.18) : 'transparent', // Darker from 0.12
                          backdropFilter: isActive ? 'blur(15px)' : 'none', // Increased from 10px
                          WebkitBackdropFilter: isActive ? 'blur(15px)' : 'none',
                          boxShadow: isActive ? `0 4px 20px ${hexToRgba(value.color, 0.25)}` : 'none'
                        }}>
                          {value.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="gradient-top" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 100,
                background: `linear-gradient(180deg, ${hexToRgba(currentValue.color, 0.2)} 0%, ${hexToRgba(currentValue.color, 0.1)} 60%, transparent 100%)`, // Darker
                pointerEvents: 'none',
                zIndex: 5,
                transition: 'all 0.6s ease'
              }} />

              <div className="gradient-bottom" style={{
                position: 'absolute',
                bottom: -16, // Added 1 inch (16px) extension
                left: 0,
                right: 0,
                height: 116, // Increased from 100 to 116 (100 + 16)
                background: `linear-gradient(0deg, ${hexToRgba(currentValue.color, 0.2)} 0%, ${hexToRgba(currentValue.color, 0.1)} 60%, transparent 100%)`, // Darker
                pointerEvents: 'none',
                zIndex: 5,
                transition: 'all 0.6s ease'
              }} />
            </div>

            <div
              ref={contentRef}
              className="right-content"
              style={{
                padding: '40px 20px',
                position: 'relative',
                minHeight: 350
              }}
            >
              <div className="content-header" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 25,
                marginBottom: 30
              }}>
                <div className="icon-large" style={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: currentValue.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: `3px solid ${hexToRgba(currentValue.color, 0.3)}`, // Darker from 0.2
                  backdropFilter: 'blur(12px)', // Increased from 8px
                  transition: 'all 0.6s ease'
                }}>
                  <IconComponent style={{
                    width: 45,
                    height: 45,
                    color: darkenColor(currentValue.color, 0.3),
                    transition: 'all 0.6s ease'
                  }} />
                </div>
                <h3 className="content-title" style={{
                  fontSize: '3rem',
                  fontWeight: 900,
                  color: '#333',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  margin: 0
                }}>
                  {currentValue.name}
                </h3>
              </div>
              <p className="content-description" style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#000',
                fontWeight: 500
              }}>
                {currentValue.description}
              </p>
              <div className="progress-bar-container" style={{
                marginTop: 35,
                height: 5,
                background: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 5,
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div
                  key={currentSlide}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    background: currentValue.color,
                    animation: 'progress 5s linear',
                    borderRadius: 5
                  }}
                />
              </div>
              <div className="dots-container" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 10,
                marginTop: 30
              }}>
                {coreValues.map((_val, index) => (
                  <div
                    key={index}
                    className="dot"
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: index === currentSlide ? currentValue.color : 'rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      transform: index === currentSlide ? 'scale(1.3)' : 'scale(1)',
                      border: index === currentSlide ? `2px solid ${currentValue.color}` : '2px solid transparent'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          text-shadow: none !important;
        }

        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @media (min-width: 1440px) {
          .main-heading { font-size: 4rem !important; }
          .header-description { font-size: 20px !important; }
          .icon-circle { width: 80px !important; height: 80px !important; }
          .content-title { font-size: 3.5rem !important; }
        }

        @media (min-width: 1200px) and (max-width: 1439px) {
          .main-heading { font-size: 3.2rem !important; }
          .header-description { font-size: 18px !important; }
          .values-grid { gap: 50px !important; }
          .content-title { font-size: 2.8rem !important; }
        }

        @media (min-width: 1024px) and (max-width: 1199px) {
          .main-heading { font-size: 2.8rem !important; }
          .header-description { font-size: 17px !important; }
          .values-grid { 
            grid-template-columns: 320px 1fr !important;
            gap: 40px !important;
          }
          .left-scroll-container { height: 350px !important; }
          .scroll-item { height: 50px !important; }
          .content-title { font-size: 2.5rem !important; }
          .content-description { font-size: 1rem !important; }
          .icon-circle { width: 60px !important; height: 60px !important; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          section { padding: 0 !important; padding-bottom: 1.5rem !important; }
          .main-heading { font-size: 2.5rem !important; }
          .header-underline { width: 220px !important; }
          .header-description { 
            font-size: 16px !important;
            padding: 0 20px !important;
          }
          .icons-container { 
            gap: 20px !important;
            padding: 25px !important;
          }
          .icon-circle { width: 55px !important; height: 55px !important; }
          .values-grid { 
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .left-scroll-container { 
            height: 300px !important;
            margin: 0 auto !important;
            max-width: 400px !important;
          }
          .main-content-container { padding: 30px !important; margin-bottom: 1.5rem !important; }
          .content-header { 
            flex-direction: column !important;
            text-align: center !important;
            gap: 15px !important;
          }
          .icon-large { width: 70px !important; height: 70px !important; }
          .content-title { 
            font-size: 2rem !important;
            line-height: 1.2 !important;
          }
          .content-description { font-size: 1rem !important; }
        }

        @media (min-width: 481px) and (max-width: 767px) {
          section { padding: 0 !important; padding-bottom: 1rem !important; }
          .main-heading { 
            font-size: 2rem !important;
            letter-spacing: 1px !important;
          }
          .header-underline { width: 180px !important; }
          .header-description { 
            font-size: 15px !important;
            padding: 0 15px !important;
          }
          .icons-container { 
            gap: 15px !important;
            padding: 20px !important;
          }
          .icon-circle { width: 50px !important; height: 50px !important; }
          .values-grid { 
            grid-template-columns: 1fr !important;
            gap: 25px !important;
          }
          .left-scroll-container { display: none !important; }
          .main-content-container { padding: 25px !important; margin-bottom: 1rem !important; }
          .content-header { 
            flex-direction: column !important;
            text-align: center !important;
            gap: 12px !important;
          }
          .icon-large { width: 60px !important; height: 60px !important; }
          .content-title { 
            font-size: 1.8rem !important;
            line-height: 1.2 !important;
          }
          .content-description { 
            font-size: 1rem !important;
            line-height: 1.6 !important;
          }
        }

        @media (max-width: 480px) {
          section { padding: 0 !important; padding-bottom: 1rem !important; }
          .main-heading { 
            font-size: 1.7rem !important;
            letter-spacing: 0.5px !important;
          }
          .header-underline { 
            width: 150px !important;
            height: 4px !important;
          }
          .header-description { 
            fontSize: 14px !important;
            padding: 0 10px !important;
            line-height: 1.5 !important;
          }
          .icons-container { 
            gap: 12px !important;
            padding: 18px !important;
          }
          .icon-circle { 
            width: 45px !important; 
            height: 45px !important;
          }
          .icon-circle svg {
            width: 22px !important;
            height: 22px !important;
          }
          .values-grid { 
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .left-scroll-container { display: none !important; }
          .main-content-container { 
            padding: 20px !important;
            border-radius: 20px !important;
            margin-bottom: 1rem !important;
          }
          .content-header { 
            flex-direction: column !important;
            text-align: center !important;
            gap: 10px !important;
            margin-bottom: 20px !important;
          }
          .icon-large { 
            width: 55px !important; 
            height: 55px !important;
          }
          .icon-large svg {
            width: 35px !important;
            height: 35px !important;
          }
          .content-title { 
            font-size: 1.5rem !important;
            line-height: 1.2 !important;
          }
          .content-description { 
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          .progress-bar-container { margin-top: 25px !important; }
          .dots-container { 
            gap: 8px !important;
            margin-top: 25px !important;
          }
          .dot { 
            width: 10px !important;
            height: 10px !important;
          }
        }

        @media (max-width: 360px) {
          .main-heading { font-size: 1.5rem !important; }
          .header-underline { width: 120px !important; }
          .header-description { font-size: 13px !important; }
          .icons-container { gap: 10px !important; padding: 15px !important; }
          .icon-circle { width: 40px !important; height: 40px !important; }
          .content-title { font-size: 1.3rem !important; }
          .content-description { font-size: 0.85rem !important; }
        }

        @media (max-width: 900px) and (orientation: landscape) {
          section { padding: 0 !important; padding-bottom: 1rem !important; }
          .main-heading { font-size: 1.8rem !important; }
          .left-scroll-container { display: none !important; }
          .content-header { flex-direction: row !important; }
          .icon-large { width: 50px !important; height: 50px !important; }
          .content-title { font-size: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
};

export default CompanyValues;
