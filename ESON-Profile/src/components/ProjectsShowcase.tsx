import esonLogo from '../assets/images/esonpo.png';
import boldly from '../assets/images/boldly.png';
import nimalan from '../assets/images/nimalan.png';
import printapp from '../assets/images/printapp.png';
import harrington from '../assets/images/harrington.png';
import drive from '../assets/images/drive.png';
import dealzta from '../assets/images/dealzta.png';
import dns from '../assets/images/dns.png';

import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Calendar, Sparkles, Rocket, Target, Zap, Code, Palette, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectsShowcase = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const primaryColor = '#3498db';
  
  const pastelColors = {
    lavender: '#BFAED9',
    mintGreen: '#B4F2E1',
    skyBlue: '#3498db',
    lightBlue: '#A7ebf2'
  };

  const darkerColors = {
    lavender: '#9B7BBF',
    mintGreen: '#7FD4C1',
    skyBlue: '#2574A9',
    lightBlue: '#75C9D6'
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

  const projects = [
    {
      name: 'Nimalaan Energies',
      category: 'Renewable Energy',
      description: 'Nimalaan Energies is a renewable energy company committed to sustainable power solutions across solar and wind sectors.',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      year: '2024',
      status: 'Live',
      color: pastelColors.skyBlue,
      darkColor: darkerColors.skyBlue,
      icon: Zap,
      liveUrl: 'https://nimalaanenergies.com/',
      projectImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: nimalan
    },
    {
      name: 'Boldly English',
      category: 'Educational Platform',
      description: 'Boldly English is an online learning platform helping individuals enhance their English communication skills globally.',
      technologies: ['Next.js', 'Python', 'MongoDB', 'Azure'],
      year: '2025',
      status: 'Live',
      color: pastelColors.lavender,
      darkColor: darkerColors.lavender,
      icon: Sparkles,
      liveUrl: 'https://boldlyenglish.com/',
      projectImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: boldly
    },
    {
      name: 'The Printapp - Mobile',
      category: 'E-commerce',
      description: 'The Print App mobile application brings professional print design capabilities to smartphones and tablets.',
      technologies: ['React Native', 'Java', 'MySQL', 'GCP'],
      year: '2025',
      status: 'Live',
      color: pastelColors.mintGreen,
      darkColor: darkerColors.mintGreen,
      icon: Rocket,
      liveUrl: 'https://www.theprintapp.com/',
      projectImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: printapp
    },
    {
      name: 'The Printapp - Website',
      category: 'E-commerce',
      description: 'Complete Web-to-Print Solution for Custom Design & Ordering.',
      technologies: ['Vue.js', 'C#', 'PostgreSQL', 'AWS'],
      year: '2025',
      status: 'Live',
      color: pastelColors.lightBlue,
      darkColor: darkerColors.lightBlue,
      icon: Target,
      liveUrl: 'https://www.theprintapp.com/',
      projectImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: esonLogo
    },
    {
      name: 'The Printapp - Admin',
      category: 'Order & Task Management',
      description: 'The Print Apps admin-side task management system is a powerful workforce coordination platform.',
      technologies: ['React', 'Go', 'Redis', 'Azure'],
      year: '2025',
      status: 'Live',
      color: pastelColors.lavender,
      darkColor: darkerColors.lavender,
      icon: Palette,
      liveUrl: 'https://www.esoninfotech.com/',
      projectImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: harrington
    },
    {
      name: 'Smart City Dashboard',
      category: 'Government',
      description: 'Real-time city monitoring system with IoT sensors and predictive maintenance capabilities.',
      technologies: ['React', 'Python', 'InfluxDB', 'AWS'],
      year: '2025',
      status: 'Live',
      color: pastelColors.mintGreen,
      darkColor: darkerColors.mintGreen,
      icon: Code,
      liveUrl: 'https://www.esoninfotech.com/',
      projectImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: drive
    },
    {
      name: 'Enterprise ERP System',
      category: 'Business Management',
      description: 'Comprehensive Enterprise Resource Planning system designed for medium to large businesses.',
      technologies: ['Angular', 'Java Spring', 'Oracle', 'Docker'],
      year: '2024',
      status: 'Live',
      color: pastelColors.skyBlue,
      darkColor: darkerColors.skyBlue,
      icon: Target,
      liveUrl: 'https://www.esoninfotech.com/',
      projectImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: dealzta
    },
    {
      name: 'Driven Style',
      category: 'E-commerce & Automotive',
      description: 'Driven Style is a premium automotive accessories e-commerce platform.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      year: '2024',
      status: 'Live',
      color: pastelColors.lightBlue,
      darkColor: darkerColors.lightBlue,
      icon: Rocket,
      liveUrl: 'https://www.esoninfotech.com/',
      projectImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      logo: dns
    }
  ];

  const totalProjects = projects.length;
  const angleStep = 360 / totalProjects;

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  useGSAP(() => {
    if (!mounted || !listRef.current) return;

    // Check if we're on mobile (width < 768px)
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
      // Only apply animation on desktop
      const listItems = gsap.utils.toArray('.project-list-item');
      
      gsap.fromTo(listItems,
        { 
          x: -50, 
          opacity: 0,
          scale: 0.9
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reset'
          }
        }
      );
    }

  }, { scope: listRef, dependencies: [mounted] });

  useGSAP(() => {
    if (!mounted || !listRef.current) return;

    const listItems = gsap.utils.toArray('.project-list-item');
    
    gsap.fromTo(listItems,
      { 
        x: -50, 
        opacity: 0,
        scale: 0.9
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      }
    );

  }, { scope: listRef, dependencies: [mounted] });

  useEffect(() => {
    if (!isAutoRotating) return;

    let animationFrame: number;
    let lastTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      
      setRotation((prev) => {
        const newRotation = (prev - 0.03 * deltaTime) % 360;
        const currentSegment = Math.round(Math.abs(newRotation) / angleStep);
        setActiveProject(currentSegment % totalProjects);
        return newRotation;
      });

      lastTime = currentTime;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isAutoRotating, angleStep, totalProjects]);

  useEffect(() => {
    if (!isAutoScrolling) return;

    autoScrollIntervalRef.current = setInterval(() => {
      setCurrentStartIndex((prev) => (prev + 1) % totalProjects);
    }, 2000);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, totalProjects]);

  const handleIconClick = (index: number) => {
    setIsAutoRotating(false);

    const diff = index - activeProject;
    const rotationDiff = -diff * angleStep;

    setIsSnapping(true);
    setRotation((prev) => prev + rotationDiff);
    setActiveProject(index);

    setTimeout(() => setIsSnapping(false), 820);
    setTimeout(() => setIsAutoRotating(true), 2400);
  };

  const handlePrevCards = () => {
    setIsAutoScrolling(false);
    setCurrentStartIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  const handleNextCards = () => {
    setIsAutoScrolling(false);
    setCurrentStartIndex((prev) => (prev + 1) % totalProjects);
    
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  const handleCardMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleCardMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentStartIndex + i) % totalProjects;
      cards.push(projects[index]);
    }
    return cards;
  };

  const active = projects[activeProject];
  const visibleCards = getVisibleCards();

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      style={{ 
        minHeight: '100vh',
        padding: '0',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      <div className="mouse-follower" style={{
        position: 'absolute',
        width: 400,
        height: 400,
        pointerEvents: 'none',
        transition: 'all 0.4s ease-out',
        borderRadius: '50%',
        left: mousePosition.x - 200,
        top: mousePosition.y - 200,
        background: `radial-gradient(circle, ${hexToRgba(primaryColor, 0.08)} 0%, ${hexToRgba(pastelColors.lavender, 0.06)} 40%, transparent 70%)`,
        filter: 'blur(30px)',
        zIndex: 1
      }} />

      <div className="particles-container" style={{ position: 'absolute', inset: '0 20px', overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 25 }).map((_, i) => {
          const colors = [
            hexToRgba(pastelColors.skyBlue, 0.5),
            hexToRgba(pastelColors.lavender, 0.5),
            hexToRgba(pastelColors.mintGreen, 0.5),
            hexToRgba(pastelColors.lightBlue, 0.5)
          ];
          return (
            <div
              key={i}
              className="particle"
              style={{
                position: 'absolute',
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: colors[i % 4],
                left: `${5 + Math.random() * 90}%`,
                top: `${Math.random() * 100}%`,
                animation: `particlePulse ${3 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 4}s`
              }}
            />
          );
        })}
      </div>

      <div className="content-wrapper" style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div className="header-section" style={{ textAlign: 'center', marginBottom: 50, padding: '0 1rem' }}>
          <h2 
            ref={headerRef}
            className="main-title" 
            style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              marginBottom: 16,
              color: '#333333',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            A glimpse of ESON's projects.
          </h2>
          <div 
            ref={underlineRef}
            style={{
              height: 5,
              width: 200,
              background: '#3498db',
              borderRadius: 8,
              margin: '12px auto 0',
              transformOrigin: 'center'
            }}
          />
        </div>

        <div ref={carouselRef} className="carousel-main-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          minHeight: '650px',
          flexWrap: 'wrap',
          marginBottom: 50
        }}>
          <div 
            className="circular-carousel"
            style={{
              position: 'relative',
              width: 650,
              height: 650,
              flexShrink: 0,
              cursor: 'grab'
            }}
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
          >
            <div className="center-circle" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: `${hexToRgba(active.color, 0.12)}`,
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              border: `2px solid ${hexToRgba(active.color, 0.18)}`,
              animation: 'centerPulse 2s ease-in-out infinite',
              overflow: 'hidden',
              transition: 'transform 0.45s cubic-bezier(.22,.9,.3,1), box-shadow 0.45s ease'
            }}>
              <div style={{
                width: '86%',
                height: '86%',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxSizing: 'border-box',
                padding: 10,
                border: `3px solid ${hexToRgba('#ffffff', 0.6)}`
              }}>
                <img
                  src={active.logo}
                  alt={`${active.name} center logo`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '50%',
                    display: 'block'
                  }}
                />
              </div>
            </div>

            <div className="rotating-circles" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              willChange: 'transform',
              transition: isSnapping ? 'transform 0.8s cubic-bezier(.22,.9,.3,1)' : 'none'
            }}>
              {projects.map((project, index) => {
                const angle = index * angleStep;
                const isCurrentActive = index === activeProject;
                
                return (
                  <div
                    key={index}
                    onClick={() => handleIconClick(index)}
                    className="rotating-logo-item"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 105,
                      height: 105,
                      marginLeft: -52.5,
                      marginTop: -52.5,
                      transform: `rotate(${angle}deg) translateY(-260px) rotate(-${angle + rotation}deg)`,
                      cursor: 'pointer',
                      transition: 'all 0.32s cubic-bezier(.2,.9,.2,1)',
                      opacity: 1,
                      zIndex: isCurrentActive ? 15 : 5,
                      willChange: 'transform'
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: isCurrentActive ? `${hexToRgba(project.color, 0.2)}` : `${hexToRgba(project.color, 0.08)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.32s cubic-bezier(.2,.9,.2,1), box-shadow 0.45s ease, background 0.3s ease',
                      overflow: 'hidden',
                      boxShadow: isCurrentActive ? '0 12px 34px rgba(0,0,0,0.14)' : 'none',
                      border: `1px solid ${hexToRgba(project.color, 0.15)}`
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrentActive) {
                        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.12)';
                        (e.currentTarget as HTMLDivElement).style.zIndex = '20';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrentActive) {
                        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                        (e.currentTarget as HTMLDivElement).style.zIndex = '5';
                      }
                    }}>
                      <div style={{
                        width: '78%',
                        height: '78%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}>
                        <img
                          src={project.logo}
                          alt={`${project.name} logo`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="slideshow-panel" style={{
            flex: 1,
            minWidth: 400,
            maxWidth: 600,
            borderRadius: 24,
            overflow: 'hidden',
            background: `${hexToRgba(active.color, 0.25)}`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `2px solid ${hexToRgba(active.color, 0.40)}`,
            height: 'fit-content'
          }}>
            <div style={{
              position: 'relative',
              height: 280,
              overflow: 'hidden'
            }}>
              <img
                src={active.projectImage}
                alt={active.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s ease',
                  animation: 'slideZoom 6s ease-in-out infinite'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${hexToRgba(active.color, 0.60)}, transparent)`
              }} />
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14, gap: 10, flexWrap: 'wrap' }}>
                <div style={{
                  padding: '6px 14px',
                  borderRadius: 18,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#2C2C2C',
                  background: active.color,
                  border: '1px solid rgba(0,0,0,0.08)'
                }}>
                  {active.category}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 600, color: '#5A5A5A' }}>
                  <Calendar style={{ width: 14, height: 14, marginRight: 4 }} />
                  {active.year}
                </div>
              </div>

              <h3 style={{
                fontSize: '1.6rem',
                fontWeight: 'bold',
                color: active.darkColor,
                textTransform: 'uppercase',
                marginBottom: 14
              }}>
                {active.name}
              </h3>

              <p style={{
                fontSize: 14,
                color: '#4A4A4A',
                lineHeight: 1.5,
                marginBottom: 18
              }}>
                {active.description}
              </p>

              <div style={{ marginBottom: 18 }}>
                <h4 style={{
                  fontWeight: 'bold',
                  marginBottom: 8,
                  fontSize: '0.9rem',
                  color: '#2C2C2C',
                  textTransform: 'uppercase'
                }}>
                  Technologies
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {active.technologies.map((tech, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '5px 10px',
                      borderRadius: 14,
                      background: `${hexToRgba(active.color, 0.40)}`,
                      border: `1px solid ${hexToRgba(active.color, 0.60)}`
                    }}>
                      <CheckCircle style={{ width: 12, height: 12, color: active.darkColor, strokeWidth: 2.5 }} />
                      <span style={{ fontSize: 11, fontWeight: 500, color: '#2C2C2C' }}>
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '10px 20px',
                    fontWeight: 600,
                    borderRadius: 10,
                    background: active.color,
                    color: '#2C2C2C',
                    textDecoration: 'none',
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    fontSize: 14
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <ExternalLink style={{ width: 14, height: 14, marginRight: 6 }} />
                  View Live
                </a>
                <span style={{
                  padding: '6px 14px',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#2C2C2C',
                  background: `${hexToRgba(active.color, 0.40)}`,
                  border: `1px solid ${hexToRgba(active.color, 0.60)}`
                }}>
                  {active.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="bottom-carousel desktop-carousel" 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            marginTop: 40
          }}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
        >
          <button
            onClick={handlePrevCards}
            className="nav-button"
            style={{
              width: 55,
              height: 55,
              borderRadius: '50%',
              border: `2px solid ${hexToRgba(pastelColors.skyBlue, 0.60)}`,
              background: `${hexToRgba(pastelColors.skyBlue, 0.30)}`,
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: darkerColors.skyBlue,
              transition: 'all 0.3s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${hexToRgba(pastelColors.skyBlue, 0.50)}`;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${hexToRgba(pastelColors.skyBlue, 0.30)}`;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>

          <div className="cards-wrapper" style={{
            flex: 1,
            maxWidth: 1200,
            overflow: 'hidden'
          }}>
            <div className="cards-container" style={{
              display: 'flex',
              gap: 16,
              transition: 'transform 0.5s ease'
            }}>
              {visibleCards.map((project, idx) => {
                const globalIndex = (currentStartIndex + idx) % totalProjects;
                return (
                  <ProjectCard 
                    key={globalIndex} 
                    project={project} 
                    isActive={globalIndex === activeProject}
                    onClick={() => handleIconClick(globalIndex)}
                    hexToRgba={hexToRgba}
                  />
                );
              })}
            </div>
          </div>

          <button
            onClick={handleNextCards}
            className="nav-button"
            style={{
              width: 55,
              height: 55,
              borderRadius: '50%',
              border: `2px solid ${hexToRgba(pastelColors.lavender, 0.60)}`,
              background: `${hexToRgba(pastelColors.lavender, 0.30)}`,
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: darkerColors.lavender,
              transition: 'all 0.3s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${hexToRgba(pastelColors.lavender, 0.50)}`;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${hexToRgba(pastelColors.lavender, 0.30)}`;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>

        <div 
          ref={listRef}
          className="mobile-project-list" 
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 16,
            marginTop: 50,
            padding: '0 10px'
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-list-item"
              onClick={() => handleIconClick(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 16,
                borderRadius: 16,
                background: `${hexToRgba(project.color, 0.25)}`,
                border: `2px solid ${hexToRgba(project.color, 0.45)}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
                e.currentTarget.style.background = `${hexToRgba(project.color, 0.35)}`;
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = `${hexToRgba(project.color, 0.25)}`;
              }}
            >
              <div style={{
                width: 70,
                height: 70,
                borderRadius: 12,
                overflow: 'hidden',
                flexShrink: 0,
                border: `2px solid ${hexToRgba(project.color, 0.60)}`,
                background: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8
              }}>
                <img
                  src={project.logo}
                  alt={project.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: project.darkColor,
                  marginBottom: 4,
                  textTransform: 'uppercase'
                }}>
                  {project.name}
                </h3>
                <p style={{
                  fontSize: 13,
                  color: '#5A5A5A',
                  margin: 0
                }}>
                  {project.category}
                </p>
              </div>
              {/* <ChevronRight 
                style={{ 
                  width: 24, 
                  height: 24, 
                  color: project.darkColor,
                  flexShrink: 0
                }} 
              /> */}
            </div>
          ))}
        </div>
      </div>

      <style>{`
  * {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  *::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  body {
    overflow-x: hidden;
  }

  #projects {
    overflow-x: hidden !important;
  }

  @keyframes particlePulse {
    0%, 100% {
      opacity: 0.4;
      transform: scale(0.8);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.2);
    }
  }

  @keyframes slideZoom {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.08);
    }
  }

  @keyframes centerPulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
    }
  }

  #projects,
  #projects * {
    max-width: 100%;
    box-sizing: border-box;
  }

  .particles-container {
    left: 5% !important;
    right: 5% !important;
    width: 90% !important;
  }

  /* ===== MOBILE SCREENS (< 768px) - HIDE CAROUSEL ===== */
  @media (max-width: 767px) {
    .mouse-follower {
      display: none !important;
    }

    .particles-container {
      display: none !important;
    }

    #projects {
      padding: 3rem 0 !important;
    }

    .header-section {
      margin-bottom: 35px !important;
      padding: 0.75rem 0.5rem 0 !important;
    }

    .main-title {
      font-size: 1.6rem !important;
      line-height: 1.3 !important;
      padding: 0 0.5rem;
    }

    .carousel-main-container {
      flex-direction: column !important;
      gap: 0 !important;
      min-height: auto !important;
      margin-bottom: 40px !important;
      padding: 0 10px !important;
    }

    .circular-carousel {
      display: none !important;
    }

    .slideshow-panel {
      min-width: calc(100% - 20px) !important;
      max-width: calc(100% - 20px) !important;
      margin: 0 10px !important;
      border-radius: 18px !important;
    }

    .slideshow-panel > div:first-child {
      height: 200px !important;
    }

    .slideshow-panel > div:last-child {
      padding: 20px !important;
    }

    .slideshow-panel h3 {
      font-size: 1.25rem !important;
      margin-bottom: 12px !important;
    }

    .slideshow-panel p {
      font-size: 13px !important;
      margin-bottom: 16px !important;
    }

    .desktop-carousel {
      display: none !important;
    }

    .mobile-project-list {
      display: flex !important;
    }
  }

  /* ===== EXTRA SMALL MOBILE (320px - 479px) ===== */
  @media (min-width: 320px) and (max-width: 479px) {
    .main-title {
      font-size: 1.4rem !important;
    }

    .slideshow-panel > div:first-child {
      height: 180px !important;
    }

    .slideshow-panel > div:last-child {
      padding: 16px !important;
    }

    .slideshow-panel h3 {
      font-size: 1.1rem !important;
    }

    .slideshow-panel p {
      font-size: 12px !important;
    }

    .project-list-item {
      gap: 12px !important;
      padding: 12px !important;
    }

    .project-list-item > div:first-child {
      width: 60px !important;
      height: 60px !important;
    }

    .project-list-item h3 {
      font-size: 0.9rem !important;
    }

    .project-list-item p {
      font-size: 12px !important;
    }
  }

  /* ===== MEDIUM MOBILE (480px - 639px) ===== */
  @media (min-width: 480px) and (max-width: 639px) {
    .main-title {
      font-size: 1.7rem !important;
    }
  }

  /* ===== LARGE MOBILE (640px - 767px) ===== */
  @media (min-width: 640px) and (max-width: 767px) {
    .main-title {
      font-size: 2rem !important;
    }
  }

  /* ===== TABLET (768px - 991px) ===== */
 /* Ensure mobile project list is visible on small screens */
@media (max-width: 767px) {
  .mobile-project-list {
    display: flex !important; /* Force enable display on mobile */
    flex-direction: column;
    gap: 16px; /* Maintain spacing for items */
    margin-top: 50px;
    padding: 0 10px;
  }

  .desktop-carousel {
    display: none !important; /* Hide desktop carousel on mobile */
  }

  /* Additional adjustments to projects container and cards */
  .carousel-main-container {
    flex-direction: column !important;
    gap: 0 !important;
    min-height: auto !important;
    margin-bottom: 40px !important;
    padding: 0 10px !important;
  }

  .circular-carousel {
    display: none !important;
  }

  .slideshow-panel {
    min-width: calc(100% - 20px) !important;
    max-width: calc(100% - 20px) !important;
    margin: 0 10px !important;
    border-radius: 18px !important;
  }

  .slideshow-panel > div:first-child {
    height: 200px !important;
  }

  .slideshow-panel > div:last-child {
    padding: 20px !important;
  }

  .slideshow-panel h3 {
    font-size: 1.25rem !important;
    margin-bottom: 12px !important;
  }

  .slideshow-panel p {
    font-size: 13px !important;
    margin-bottom: 16px !important;
  }
}

    .slideshow-panel > div:first-child {
      height: 260px !important;
    }

    .slideshow-panel > div:last-child {
      padding: 28px !important;
    }

    .cards-container > div {
      flex: 1 1 calc(33.333% - 11px) !important;
      min-width: calc(33.333% - 11px) !important;
    }
  }

  /* ===== LAPTOP (992px - 1399px) ===== */
  @media (min-width: 992px) and (max-width: 1399px) {
    #projects {
      padding: 4rem 0 3rem !important;
    }

    .header-section {
      margin-bottom: 45px !important;
    }

    .carousel-main-container {
      gap: 35px !important;
      min-height: 600px !important;
      margin-bottom: 45px !important;
    }

    .bottom-carousel {
      margin-top: 35px !important;
    }

    .mobile-project-list {
      display: none !important;
    }

    .desktop-carousel {
      display: flex !important;
    }
    
    .circular-carousel {
      display: block !important;
    }
  }

  /* ===== LARGE DESKTOP (1400px+) ===== */
  @media (min-width: 1400px) {
    .mobile-project-list {
      display: none !important;
    }

    .desktop-carousel {
      display: flex !important;
    }
    
    .circular-carousel {
      display: block !important;
    }
  }
`}</style>

    </section>
  );
};

const ProjectCard = ({ project, isActive, onClick, hexToRgba }: any) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderRadius: 18,
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        background: `${hexToRgba(project.color, 0.30)}`,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `2px solid ${hexToRgba(project.color, 0.50)}`,
        flex: '1 1 calc(25% - 12px)',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.background = `${hexToRgba(project.color, 0.45)}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.background = `${hexToRgba(project.color, 0.30)}`;
      }}
    >
      <img
        src={project.projectImage}
        alt={project.name}
        style={{
          width: '100%',
          height: 170,
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: 14 }}>
        <h3 style={{
          fontSize: '0.95rem',
          fontWeight: 'bold',
          marginBottom: 8,
          color: project.darkColor,
          textTransform: 'uppercase'
        }}>
          {project.name}
        </h3>
        <p style={{
          fontSize: 12,
          marginBottom: 10,
          lineHeight: 1.4,
          color: '#4A4A4A',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.technologies.slice(0, 3).map((tech: string, i: number) => (
            <span
              key={i}
              style={{
                fontSize: 10,
                padding: '3px 7px',
                borderRadius: 14,
                fontWeight: 600,
                background: `${hexToRgba(project.color, 0.80)}`,
                color: '#2C2C2C',
                border: `1px solid ${project.color}`
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsShowcase;
