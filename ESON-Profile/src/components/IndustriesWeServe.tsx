import React, { useEffect, useState, useRef } from 'react';
import { Building2, Heart, GraduationCap, Truck, ShoppingCart, Factory, Banknote, Gamepad2, Store, Home, TreePine, Hotel, Radio } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const IndustriesWeServe = () => {
  const [visibleIndustries, setVisibleIndustries] = useState<Set<number>>(new Set());
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const streetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const buildingRefs = useRef<Array<HTMLDivElement | null>>([]);
  const autoDisplayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const darkenColor = (hex: string, factor: number = 0.6): string => {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    const newR = Math.floor(r * factor);
    const newG = Math.floor(g * factor);
    const newB = Math.floor(b * factor);
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate industries every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAutoIndex((prev) => (prev + 1) % industries.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate auto-display panel
  useEffect(() => {
    if (autoDisplayRef.current) {
      gsap.fromTo(autoDisplayRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [currentAutoIndex]);

  // ✅ ANIMATE GLASSMORPHISM CONTAINER COLOR CHANGE
  useEffect(() => {
    if (containerRef.current && industries[currentAutoIndex]) {
      const currentColor = industries[currentAutoIndex].color;
      
      gsap.to(containerRef.current, {
        background: `linear-gradient(135deg, ${hexToRgba(currentColor, 0.15)} 0%, ${hexToRgba('#FFFFFF', 0.25)} 100%)`,
        borderColor: hexToRgba(currentColor, 0.35),
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }, [currentAutoIndex]);

  useGSAP(() => {
    if (!mounted || !headerRef.current || !underlineRef.current) return;

    gsap.set(headerRef.current, { opacity: 0, y: -50, scale: 0.9 });
    gsap.set(underlineRef.current, { scaleX: 0 });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.5)'
    })
    .to(underlineRef.current, {
      scaleX: 1,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.4');

  }, { scope: sectionRef, dependencies: [mounted] });

  const industries = [
    {
      name: 'Information Technology',
      icon: Building2,
      description: 'Enterprise software, cloud solutions, and digital transformation',
      services: ['Cloud Solutions', 'Enterprise Software', 'DevOps', 'IT Consulting', 'System Integration'],
      color: '#3498db',
      buildingHeight: 180
    },
    {
      name: 'Healthcare',
      icon: Heart,
      description: 'Medical software, patient management, and telemedicine platforms',
      services: ['Patient Management', 'Telemedicine', 'EHR Systems', 'Medical Billing', 'Healthcare Analytics'],
      color: '#FFB3BA',
      buildingHeight: 140
    },
    {
      name: 'Education',
      icon: GraduationCap,
      description: 'E-learning platforms, student management, and educational apps',
      services: ['LMS Development', 'Virtual Classrooms', 'Student Management', 'Educational Apps', 'Assessment Tools'],
      color: '#BFAED9',
      buildingHeight: 160
    },
    {
      name: 'Logistics',
      icon: Truck,
      description: 'Supply chain management, tracking systems, and fleet optimization',
      services: ['Supply Chain Management', 'Fleet Tracking', 'Warehouse Management', 'Route Optimization', 'Logistics Analytics'],
      color: '#B4F2E1',
      buildingHeight: 120
    },
    {
      name: 'E-commerce',
      icon: ShoppingCart,
      description: 'Online marketplaces, payment systems, and inventory management',
      services: ['Online Marketplaces', 'Payment Integration', 'Inventory Systems', 'Shopping Cart', 'Order Management'],
      color: '#FFD1A0',
      buildingHeight: 200
    },
    {
      name: 'Manufacturing',
      icon: Factory,
      description: 'Industrial automation, quality control, and production management',
      services: ['Industrial Automation', 'Quality Management', 'Production Planning', 'IoT Integration', 'Maintenance Systems'],
      color: '#3498db',
      buildingHeight: 150
    },
    {
      name: 'Finance',
      icon: Banknote,
      description: 'Fintech solutions, banking systems, and investment platforms',
      services: ['Core Banking', 'Payment Processing', 'Trading Platforms', 'Risk Management', 'Compliance Tools'],
      color: '#FFB5B5',
      buildingHeight: 190
    },
    {
      name: 'Entertainment',
      icon: Gamepad2,
      description: 'Gaming platforms, streaming services, and media applications',
      services: ['Gaming Platforms', 'Video Streaming', 'Content Management', 'Media Distribution', 'Interactive Apps'],
      color: '#B4F2E1',
      buildingHeight: 130
    },
    {
      name: 'Retail',
      icon: Store,
      description: 'Point of sale systems, inventory management, and customer analytics',
      services: ['POS Systems', 'Inventory Control', 'Customer Analytics', 'Loyalty Programs', 'Store Management'],
      color: '#3498db',
      buildingHeight: 145
    },
    {
      name: 'Real Estate',
      icon: Home,
      description: 'Property management, CRM systems, and virtual tour platforms',
      services: ['Property Management', 'Real Estate CRM', 'Virtual Tours', 'Listing Portals', 'Tenant Management'],
      color: '#FFB3BA',
      buildingHeight: 170
    },
    {
      name: 'Hospitality & Tourism',
      icon: Hotel,
      description: 'Hotel management, booking systems, and travel platforms',
      services: ['Hotel Management', 'Booking Systems', 'Channel Manager', 'Guest Experience', 'Travel Portals'],
      color: '#BFAED9',
      buildingHeight: 155
    },
    {
      name: 'Telecommunications',
      icon: Radio,
      description: 'Network solutions, customer management, and billing systems',
      services: ['Network Management', 'Billing Systems', 'Customer Care', 'OSS/BSS', 'Telecom Analytics'],
      color: '#B4F2E1',
      buildingHeight: 175
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleIndustries(prev => new Set([...prev, index]));
            }, index * 150);
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('[data-industry-card]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const currentIndustry = industries[currentAutoIndex];
  const CurrentIcon = currentIndustry.icon;

  return (
    <section 
      ref={sectionRef}
      id="industries" 
      style={{ 
        minHeight: '100vh',
        padding: ' 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div className="header-section" style={{ textAlign: 'center', marginBottom: 70, padding: '0' }}>
          <h2 
            ref={headerRef}
            className="main-title" 
            style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              marginBottom: 16,
              color: '#333333',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            Empowering Industries, Elevating Futures
          </h2>
          <div 
            ref={underlineRef}
            style={{
              height: 5,
              width: 280,
              background: '#3498db',
              borderRadius: 10,
              margin: '12px auto 0',
              transformOrigin: 'center'
            }}
          />
        </div>

        {/* ✅ GLASSMORPHISM CARD - Changes color based on current industry */}
        <div 
          ref={containerRef}
          className="city-container" 
          style={{
            background: `linear-gradient(135deg, ${hexToRgba(currentIndustry.color, 0.15)} 0%, ${hexToRgba('#FFFFFF', 0.25)} 100%)`,
            border: `3px solid ${hexToRgba(currentIndustry.color, 0.35)}`,
            borderRadius: '28px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '100px 0px 10',
            position: 'relative',
            minHeight: '00px',
            overflow: 'hidden',
            boxShadow: `
              0 30px 80px ${hexToRgba(currentIndustry.color, 0.25)},
              0 20px 50px ${hexToRgba(currentIndustry.color, 0.15)},
              0 10px 30px rgba(0, 0, 0, 0.1),
              0 5px 15px rgba(0, 0, 0, 0.08),
              inset 0 2px 4px rgba(255, 255, 255, 0.6),
              inset 0 -2px 4px rgba(0, 0, 0, 0.08)
            `,
            transition: 'all 0.8s ease'
          }}
        >
          {/* ✅ AUTO-ROTATING DISPLAY - Top Banner */}
          <div
            ref={autoDisplayRef}
            key={currentAutoIndex}
            className="auto-banner"
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              right: 20,
              zIndex: 100,
              background: hexToRgba(currentIndustry.color, 0.95),
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              borderRadius: 12,
              padding: '16px 20px',
              border: `2px solid ${currentIndustry.color}`,
              boxShadow: `0 4px 16px ${hexToRgba(currentIndustry.color, 0.3)}`,
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}
          >
            {/* Icon */}
            <div style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <CurrentIcon style={{ width: 22, height: 22, color: currentIndustry.color }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontSize: '0.95rem',
                fontWeight: 900,
                color: '#000',
                margin: '0 0 4px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {currentIndustry.name}
              </h3>
              <p style={{
                fontSize: '0.75rem',
                lineHeight: 1.3,
                color: '#000',
                margin: 0,
                fontWeight: 500,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {currentIndustry.description}
              </p>
            </div>

            {/* Services Pills */}
            <div className="service-pills" style={{ 
              display: 'flex', 
              gap: 6,
              flexShrink: 0
            }}>
              {currentIndustry.services.slice(0, 3).map((service, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.9)',
                    color: currentIndustry.color,
                    border: `1px solid ${currentIndustry.color}`,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 20% 50%, ${hexToRgba(currentIndustry.color, 0.12)} 0%, transparent 50%), 
                         radial-gradient(circle at 80% 50%, ${hexToRgba(currentIndustry.color, 0.08)} 0%, transparent 50%)`,
            pointerEvents: 'none',
            zIndex: 0,
            transition: 'background 0.8s ease'
          }} />

          <div ref={cityRef} className="city-content" style={{ position: 'relative', minHeight: '600px', zIndex: 1 }}>
            {Array.from({ length: 3 }).map((_, i) => {
              const birdColors = ['#3498db', '#FFB3BA', '#BFAED9'];
              return (
                <div
                  key={`bird-${i}`}
                  style={{
                    position: 'absolute',
                    top: `${5 + i * 8}%`,
                    left: '-5%',
                    animation: `birdFly ${15 + i * 3}s linear infinite`,
                    animationDelay: `${i * 2}s`,
                    zIndex: 10
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 20 20" style={{ fill: birdColors[i] }}>
                    <path d="M10 2 L5 7 L10 5 L15 7 Z" />
                  </svg>
                </div>
              );
            })}

            <div style={{ position: 'relative', height: '600px' }}>
              {Array.from({ length: 5 }).map((_, i) => {
                const treeColors = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0'];
                return (
                  <div
                    key={`tree-${i}`}
                    style={{
                      position: 'absolute',
                      bottom: 30,
                      left: `${5 + i * 20}%`,
                      animation: `treeSwing 4s ease-in-out infinite ${i * 0.5}s`,
                      zIndex: 15
                    }}
                  >
                    <TreePine style={{ 
                      width: 32, 
                      height: 42, 
                      color: treeColors[i % 5]
                    }} />
                  </div>
                );
              })}

              <div className="buildings-container" style={{ 
                display: 'flex', 
                alignItems: 'flex-end', 
                justifyContent: 'center', 
                gap: 12, 
                position: 'absolute', 
                bottom: 30, 
                left: 0, 
                right: 0 
              }}>
                {industries.map((industry, index) => {
                  const IconComponent = industry.icon;
                  const isVisible = visibleIndustries.has(index);
                  const darkerIconColor = darkenColor(industry.color, 0.4);

                  return (
                    <div
                      key={index}
                      ref={(el) => buildingRefs.current[index] = el}
                      data-industry-card="true"
                      data-index={index}
                      className="industry-building"
                      style={{ position: 'relative', width: '80px' }}
                    >
                    
                      {isVisible && (
                        <div className="industry-label" style={{
                          position: 'absolute',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          bottom: `${industry.buildingHeight + 150}px`,
                          animation: `labelFadeIn 0.6s ease-out forwards ${index * 0.15 + 0.8}s`,
                          opacity: 0,
                          pointerEvents: 'none',
                          zIndex: 50,
                          whiteSpace: 'nowrap'
                        }}>
                          <div style={{ 
                            fontSize: 10,
                            fontWeight: 'bold',
                            padding: '6px 11px',
                            borderRadius: 10,
                            background: industry.color,
                            color: '#000000',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)'
                          }}>
                            {industry.name}
                          </div>
                        </div>
                      )}

                      {isVisible && (
                        <svg
                          className="connection-line"
                          style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            pointerEvents: 'none',
                            bottom: `${industry.buildingHeight}px`,
                            height: '80px',
                            width: '3px',
                            zIndex: 20
                          }}
                        >
                          <line
                            x1="1.5"
                            y1="0"
                            x2="1.5"
                            y2="80"
                            stroke={industry.color}
                            strokeWidth="3"
                            strokeDasharray="6,6"
                            opacity="0.7"
                          />
                        </svg>
                      )}

                      {isVisible && (
                        <div 
                          className="floating-icon" 
                          style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bottom: `${industry.buildingHeight + 80}px`,
                            zIndex: 30,
                            animation: `iconFloat 3s ease-in-out infinite ${index * 0.2}s`,
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            background: industry.color,
                            border: '1px solid rgba(255,255,255,0.3)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            transition: 'all 0.3s ease'
                          }}>
                            <IconComponent style={{ 
                              width: 28, 
                              height: 28, 
                              color: darkerIconColor
                            }} />
                          </div>
                        </div>
                      )}

                      {isVisible && (
                        <div 
                          className="building" 
                          style={{
                            position: 'relative',
                            height: `${industry.buildingHeight}px`,
                            background: `linear-gradient(135deg, ${hexToRgba(industry.color, 0.2)} 0%, ${hexToRgba('#FFFFFF', 0.15)} 100%)`,
                            borderRadius: '6px 6px 0 0',
                            border: `1px solid ${industry.color}40`,
                            animation: `buildingRise 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards ${index * 0.15}s`,
                            opacity: 0,
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            borderBottom: 'none'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <div style={{
                            position: 'absolute',
                            top: -20,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 50,
                            height: 24,
                            background: industry.color,
                            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                            border: '1px solid rgba(255,255,255,0.3)'
                          }} />

                          <div style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            right: 10,
                            bottom: 10,
                            backgroundImage: `
                              repeating-linear-gradient(0deg, transparent, transparent 20px, ${hexToRgba(industry.color, 0.3)} 20px, ${hexToRgba(industry.color, 0.3)} 22px),
                              repeating-linear-gradient(90deg, transparent, transparent 20px, ${hexToRgba(industry.color, 0.3)} 20px, ${hexToRgba(industry.color, 0.3)} 22px)
                            `
                          }} />

                          <div style={{
                            position: 'absolute',
                            inset: 14,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 6
                          }}>
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  borderRadius: 3,
                                  background: Math.random() > 0.3 ? '#fef08a' : hexToRgba(industry.color, 0.2),
                                  opacity: Math.random() > 0.3 ? 0.95 : 0.5,
                                  border: `1px solid ${hexToRgba(industry.color, 0.4)}`
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div ref={streetRef} className="street-container" style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0,
                height: 30,
                background: 'linear-gradient(180deg, #6b7280 0%, #4b5563 100%)',
                borderTop: '2px solid #374151'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: 3,
                  background: '#fbbf24',
                  transform: 'translateY(-50%)',
                  backgroundImage: 'repeating-linear-gradient(90deg, #fbbf24 0px, #fbbf24 30px, transparent 30px, transparent 50px)'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes buildingRise {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        @keyframes labelFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @keyframes birdFly {
          from { left: -5%; transform: translateY(0); }
          50% { transform: translateY(-25px); }
          to { left: 105%; transform: translateY(0); }
        }

        @keyframes treeSwing {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }

        @media (min-width: 1400px) {
          .main-title { font-size: 4rem !important; }
        }

        @media (min-width: 1200px) and (max-width: 1399px) {
          .main-title { font-size: 3.5rem !important; }
          .city-container { padding: 80px 60px 0 !important; min-height: 800px !important; }
        }

        @media (min-width: 992px) and (max-width: 1199px) {
          .main-title { font-size: 3rem !important; }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .main-title { font-size: 2.8rem !important; }
          div[style*="width: 280px"] { width: 220px !important; }
          .city-container { padding: 40px 30px 0 !important; min-height: 600px !important; }
          .buildings-container { gap: 10px !important; }
          .industry-building { width: 65px !important; }
          .auto-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 14px 16px !important;
          }
          .service-pills {
            flex-wrap: wrap !important;
          }
        }

@media (max-width: 767px) {
  .buildings-container {
    flex-wrap: nowrap !important;
    overflow-x: auto;
    justify-content: flex-start !important;
    padding-left: 28px;
    padding-top: 190px;
    padding-bottom: 0px;
    gap: 1px !important; /* increase gap between icons */
  }

  .industry-building {
    position: relative !important;
    top: 0 !important;
    width: 60px !important; /* slightly smaller for mobile */
    flex: 0 0 auto;
    margin-bottom: 0 !important;
    cursor: pointer;
  }

  /* Zig-zag pattern: odd icons move up, even icons move down */
  .industry-building:nth-child(odd) {
    transform: translateY(-10px);
  }
  
  .industry-building:nth-child(even) {
    transform: translateY(10px);
  }
}

  .service-pills {
    display: none !important;
  }
  /* Add these overrides for description paragraph */
  .auto-banner p {
    font-size: 0.85rem !important; /* slightly bigger for readability */
    line-height: 1.4 !important;   /* loosen line-height to fit more lines */
    white-space: normal !important; /* allow wrapping */
    overflow: visible !important;   /* ensure no clipping */
    -webkit-line-clamp: unset !important; /* remove clamping */
    display: block !important; /* ensure paragraph displays fully */
    max-height: none !important; /* unset any height limits */
  }
}

        @media (max-width: 479px) {
          .main-title { font-size: 1.9rem !important; }
          div[style*="width: 280px"] { width: 160px !important; height: 4px !important; }
          section { padding: 3rem 0 !important; }
          .city-container { padding: 20px 12px 0 !important; min-height: 400px !important; }
          .industry-building { width: 28px !important; }
          .industry-label { display: none !important; }
          .auto-banner {
            top: 10px !important;
            left: 10px !important;
            right: 10px !important;
            padding: 10px 12px !important;
          }
          .auto-banner h3 {
            font-size: 0.8rem !important;
          }
          .auto-banner p {
            font-size: 0.7rem !important;
          }
        }

        @media (max-width: 360px) {
          .main-title { font-size: 1.7rem !important; }
          div[style*="width: 280px"] { width: 140px !important; }
        }
      `}</style>
    </section>
  );
};

export default IndustriesWeServe;
