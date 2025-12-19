import React, { useEffect, useState, useRef } from 'react';
import { Award, Users, Globe, TrendingUp, Building, Calendar, User, Monitor, Briefcase, Code, Sparkles, Zap, Heart, Star, Layers, ArrowRight, BarChart3, Clock, Shield, Target, Infinity, Mail, Phone, MapPin, ExternalLink, DollarSign, Landmark, Network, Eye, Lightbulb, Rocket, Brain, TrendingUp as Growth, PieChart, ChevronRight } from 'lucide-react';
import subbiah from '../assets/images/Subbiah.jpeg';
import Anitha from '../assets/images/Anitha.jpg';
import marshall from '../assets/images/marshall.jpeg';

const CompanyOverview = () => {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const directorsScrollRef = useRef(null);

  const pastelColors = {
    softPink: '#FFB3BA',
    lavender: '#BFAED9',
    mintGreen: '#B4F2E1',
    peach: '#FFD1A0',
    skyBlue: '#3498db',
    lightBlue: '#A7ebf2',
    coral: '#FFB5B5'
  };

  const darkerColors = {
    softPink: '#E5889F',
    lavender: '#9B7BBF',
    mintGreen: '#7FD4C1',
    peach: '#E5A870',
    skyBlue: '#2574A9',
    lightBlue: '#75C9D6',
    coral: '#E58A8A'
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const directors = [
    { 
      name: 'R. Subbiah', 
      role: 'Director', 
      image: subbiah,
      color: pastelColors.skyBlue,
      darkColor: darkerColors.skyBlue,
      skillsets: ['Business Strategy', 'Operations', 'Growth Leadership', 'Multisector head']
    },
    { 
      name: 'S. Anitha', 
      role: 'Director', 
      image: Anitha,
      color: pastelColors.lavender,
      darkColor: darkerColors.lavender,
      skillsets: ['Business Architect', 'Strategic Planning', 'Innovation', 'Tech Leadership']
    },
    { 
      name: 'RX. Marshall', 
      role: 'Director', 
      image: marshall,
      color: pastelColors.peach,
      darkColor: darkerColors.peach,
      skillsets: ['Visionary leader', 'Corporate Polymath', 'Digital Transform', 'Strategic Planning']
    },
  ];

  const scrollDirectorsRight = () => {
    if (!directorsScrollRef.current || !isMobile) return;
    
    const nextSlide = (currentSlide + 1) % directors.length;
    const container = directorsScrollRef.current;
    const scrollAmount = container.offsetWidth * nextSlide;
    
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    setCurrentSlide(nextSlide);
  };

  const companyPillars = [
    {
      title: 'Foundation',
      icon: Building,
      color: pastelColors.skyBlue,
      darkColor: darkerColors.skyBlue,
      items: [
        { label: 'Company Name', value: 'ESON INFOTECH', icon: Building, description: 'Your Technology Partner' },
        { label: 'Founded', value: '2017', icon: Calendar, description: 'Years of Excellence' },
        { label: 'Headquarters', value: 'Chennai, India', icon: MapPin, description: 'Main Operations Center' }
      ]
    },
    {
      title: 'Vision & Mission',
      icon: Eye,
      color: pastelColors.lavender,
      darkColor: darkerColors.lavender,
      items: [
        { label: 'Vision', value: 'Leading Digital Transformation', icon: Eye, description: 'Empowering businesses through innovative technology solutions' },
        { label: 'Mission', value: 'Excellence in Innovation', icon: Lightbulb, description: 'Delivering cutting-edge solutions with uncompromising quality' },
        { label: 'Industry', value: 'Information Technology', icon: Monitor, description: 'Digital Solutions Provider' }
      ]
    },
    {
      title: 'Operations',
      icon: Network,
      color: pastelColors.mintGreen,
      darkColor: darkerColors.mintGreen,
      items: [
        { label: 'Employees', value: '89+ Professionals', icon: Users, description: 'Expert Team' },
        { label: 'Offices in', value: 'Tamilnadu, Maharastra, Karnataka', icon: MapPin, description: 'Regional Office' },
        { label: 'Website', value: 'esoninfotech.com', icon: Globe, description: 'Digital Presence' }
      ]
    }
  ];

  const dashboardStats = [
    { title: 'Projects', value: '49+', icon: BarChart3, color: pastelColors.skyBlue, darkColor: '#000000', x: '12%', y: '20%' },
    { title: 'Employees', value: '89+', icon: Users, color: pastelColors.lavender, darkColor: '#000000', x: '35%', y: '15%' },
    { title: 'Departments', value: '15+', icon: Heart, color: pastelColors.coral, darkColor: '#000000', x: '62%', y: '25%' },
    { title: 'Retention', value: '95%', icon: Target, color: pastelColors.peach, darkColor: '#000000', x: '85%', y: '18%' },
    { title: 'Uptime', value: '24/7', icon: Clock, color: pastelColors.mintGreen, darkColor: '#000000', x: '18%', y: '55%' },
    { title: 'Industries', value: '11+', icon: Globe, color: pastelColors.skyBlue, darkColor: '#000000', x: '45%', y: '60%' },
    { title: 'Quality', value: '100%', icon: Code, color: pastelColors.lavender, darkColor: '#000000', x: '72%', y: '52%' },
    { title: 'Satisfaction', value: '100%', icon: Star, color: pastelColors.coral, darkColor: '#000000', x: '50%', y: '85%' }
  ];

  return (
    <section 
      id="overview" 
      style={{ 
        minHeight: '100vh',
        padding: '2rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      {/* Subtle background particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${pastelColors.skyBlue}90, ${pastelColors.lightBlue}70)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 64, position: 'relative', paddingTop: isMobile ? '40px' : '0' }}>
          <svg 
            style={{ 
              position: 'absolute', 
              top: -60, 
              left: '50%', 
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 900,
              height: 250,
              pointerEvents: 'none',
              zIndex: -1,
              display: isMobile ? 'none' : 'block'
            }}
          >
            <line x1="15%" y1="40%" x2="30%" y2="20%" stroke={`${pastelColors.skyBlue}40`} strokeWidth="1.5" />
            <line x1="30%" y1="20%" x2="50%" y2="15%" stroke={`${pastelColors.lavender}40`} strokeWidth="1.5" />
            <line x1="50%" y1="15%" x2="70%" y2="20%" stroke={`${pastelColors.mintGreen}40`} strokeWidth="1.5" />
            <line x1="70%" y1="20%" x2="85%" y2="40%" stroke={`${pastelColors.peach}40`} strokeWidth="1.5" />
            <line x1="15%" y1="40%" x2="25%" y2="60%" stroke={`${pastelColors.skyBlue}40`} strokeWidth="1.5" />
            <line x1="25%" y1="60%" x2="50%" y2="70%" stroke={`${pastelColors.lavender}40`} strokeWidth="1.5" />
            <line x1="50%" y1="70%" x2="75%" y2="60%" stroke={`${pastelColors.mintGreen}40`} strokeWidth="1.5" />
            <line x1="75%" y1="60%" x2="85%" y2="40%" stroke={`${pastelColors.peach}40`} strokeWidth="1.5" />
            <circle cx="15%" cy="40%" r="4" fill={pastelColors.skyBlue} opacity="0.4" />
            <circle cx="30%" cy="20%" r="5" fill={pastelColors.lavender} opacity="0.4" />
            <circle cx="50%" cy="15%" r="6" fill={pastelColors.mintGreen} opacity="0.4" />
            <circle cx="70%" cy="20%" r="5" fill={pastelColors.peach} opacity="0.4" />
            <circle cx="85%" cy="40%" r="4" fill={pastelColors.skyBlue} opacity="0.4" />
            <circle cx="25%" cy="60%" r="4" fill={pastelColors.lavender} opacity="0.4" />
            <circle cx="50%" cy="70%" r="5" fill={pastelColors.mintGreen} opacity="0.4" />
            <circle cx="75%" cy="60%" r="4" fill={pastelColors.peach} opacity="0.4" />
          </svg>

          <h2 
            style={{
              fontSize: isMobile ? '2.2rem' : '3.5rem',
              fontWeight: 900,
              marginBottom: 16,
              color: '#333333',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              position: 'relative',
              zIndex: 2
            }}
          >
            The Eson OVERVIEW
          </h2>
          <div 
            style={{
              height: 5,
              width: 280,
              background: '#3498db',
              borderRadius: 8,
              margin: '12px auto 0'
            }}
          />
          <p 
            style={{ 
              fontSize: isMobile ? 16 : 18,
              maxWidth: '800px',
              margin: '20px auto 0',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#000000',
              padding: isMobile ? '0 10px' : '0'
            }}
          >
            Empowering businesses through innovative technology solutions and uncompromising quality
          </p>
        </div>

        {/* Company Pillars Section */}
        <div style={{ marginBottom: 96, position: 'relative' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            
            {!isMobile && (
              <div style={{ 
                position: 'relative', 
                height: 40, 
                marginBottom: 30
              }}>
                <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                  <line x1="15%" y1="5" x2="85%" y2="5" stroke={pastelColors.skyBlue} strokeWidth="2" />
                  <line x1="15%" y1="5" x2="12%" y2="30" stroke={pastelColors.skyBlue} strokeWidth="2" />
                  <line x1="85%" y1="5" x2="88%" y2="30" stroke={pastelColors.skyBlue} strokeWidth="2" />
                  <line x1="12%" y1="30" x2="88%" y2="30" stroke={pastelColors.skyBlue} strokeWidth="2" strokeDasharray="4,4" />
                </svg>
                
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '76%',
                  left: '12%',
                  height: 20,
                  background: `linear-gradient(135deg, ${pastelColors.skyBlue}, ${pastelColors.lightBlue})`,
                  clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                  border: `2px solid ${pastelColors.skyBlue}`
                }} />
              </div>
            )}
            
            <div className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32 }}>
              {companyPillars.map((pillar, pillarIndex) => {
                const PillarIcon = pillar.icon;
                return (
                  <div key={pillarIndex} style={{ position: 'relative' }}>
                    <div style={{
                      background: `${pillar.color}30`,
                      border: `2px solid ${pillar.color}`,
                      borderRadius: '12px 12px 0 0',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      minHeight: 384
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 24,
                        borderRadius: '12px 12px 0 0',
                        background: `${pillar.color}E6`,
                        position: 'relative'
                      }}>
                        <PillarIcon style={{ width: 48, height: 48, color: '#333333', marginBottom: 12, strokeWidth: 2.5 }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#000000', textAlign: 'center', textTransform: 'UPPERCASE', letterSpacing: '1px' }}>
                          {pillar.title}
                        </h3>
                      </div>

                      <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {pillar.items.map((item, itemIndex) => {
                          const ItemIcon = item.icon;
                          return (
                            <div key={itemIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                              <div style={{
                                width: 48, height: 48,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                backgroundColor: `${pillar.color}40`,
                                border: `2px solid ${pillar.color}`,
                                color: pillar.darkColor
                              }}>
                                <ItemIcon style={{ width: 24, height: 24, strokeWidth: 2.5 }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: pillar.darkColor, textTransform: 'UPPERCASE' }}>
                                  {item.label}
                                </p>
                                <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 18, color: '#000000' }}>
                                  {item.value}
                                </p>
                                <p style={{ fontSize: 14, lineHeight: 1.5, color: '#000000' }}>
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div style={{
                      height: 20,
                      background: pillar.color,
                      clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)'
                    }} />
                  </div>
                );
              })}
            </div>

            {!isMobile && (
              <div style={{ 
                position: 'relative', 
                height: 40, 
                marginTop: 30
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  width: '80%',
                  left: '10%',
                  height: 20,
                  background: `linear-gradient(135deg, ${pastelColors.mintGreen}, ${pastelColors.skyBlue})`,
                  clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                  border: `2px solid ${pastelColors.skyBlue}`
                }} />
                
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 20 }}>
                  <line x1="12%" y1="0" x2="88%" y2="0" stroke={pastelColors.skyBlue} strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="12%" y1="0" x2="15%" y2="25" stroke={pastelColors.skyBlue} strokeWidth="2" />
                  <line x1="88%" y1="0" x2="85%" y2="25" stroke={pastelColors.skyBlue} strokeWidth="2" />
                  <line x1="15%" y1="25" x2="85%" y2="25" stroke={pastelColors.skyBlue} strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Directors Section */}
        <div style={{ marginBottom: 120 }}>
          <div style={{ textAlign: 'center', marginBottom: 60, position: 'relative' }}>
            <h3 style={{
              fontSize: isMobile ? '2rem' : '3.8rem',
              fontWeight: 900,
              marginBottom: 20,
              color: '#333333',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: isMobile ? '0 20px' : '0'
            }}>
              Minds Behind The Mission
            </h3>
            <div style={{
              height: 4,
              width: 200,
              background: '#3498db',
              borderRadius: 2,
              margin: '0 auto'
            }}></div>
          </div>

          <div style={{
            position: 'relative',
            maxWidth: 1200,
            margin: '0 auto',
            padding: isMobile ? '0 0' : '0 20px'
          }}>
            <div 
              ref={directorsScrollRef}
              style={{
                position: 'relative',
                overflowX: isMobile ? 'auto' : 'visible',
                overflowY: 'hidden',
                scrollSnapType: isMobile ? 'x mandatory' : 'none',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: isMobile ? 'flex-start' : 'center',
                alignItems: 'flex-start',
                position: 'relative',
                gap: isMobile ? 0 : 60,
                flexWrap: isMobile ? 'nowrap' : 'wrap'
              }}>
                {directors.map((director, index) => (
                  <div key={index} style={{
                    flex: isMobile ? '0 0 100%' : '0 0 calc(33.333% - 40px)',
                    width: isMobile ? '100%' : 'calc(33.333% - 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2,
                    scrollSnapAlign: isMobile ? 'start' : 'none',
                    padding: isMobile ? '0 30px' : '0',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{
                      width: isMobile ? 160 : 180,
                      height: isMobile ? 160 : 180,
                      borderRadius: '50%',
                      border: `6px solid ${director.color}`,
                      overflow: 'hidden',
                      marginBottom: isMobile ? 20 : 30,
                      boxShadow: `0 10px 32px ${director.color}50`
                    }}>
                      <img 
                        src={director.image} 
                        alt={director.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center top'
                        }}
                      />
                    </div>

                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <h4 style={{
                        fontSize: isMobile ? '1.1rem' : '1.25rem',
                        fontWeight: 900,
                        marginBottom: 8,
                        color: '#333333',
                        textTransform: 'uppercase'
                      }}>
                        {director.name}
                      </h4>

                      <div style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        borderRadius: 18,
                        background: director.color,
                        marginBottom: isMobile ? 12 : 18
                      }}>
                        <p style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          margin: 0,
                          color: '#000000',
                          textTransform: 'uppercase'
                        }}>
                          {director.role}
                        </p>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 8,
                        justifyContent: 'center',
                        width: '100%'
                      }}>
                        {director.skillsets.map((skill, idx) => (
                          <div key={idx} style={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            color: '#000000',
                            padding: '8px 10px',
                            borderRadius: 8,
                            background: `${director.color}40`,
                            border: `1.5px solid ${director.color}`,
                            textAlign: 'center',
                            wordWrap: 'break-word',
                            lineHeight: '1.3'
                          }}>
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isMobile && (
              <button
                onClick={scrollDirectorsRight}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: pastelColors.skyBlue,
                  border: '3px solid #fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 100,
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s ease'
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(0.95)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronRight style={{ width: 28, height: 28, color: '#fff', strokeWidth: 3 }} />
              </button>
            )}
          </div>
        </div>

        {/* Stats Section - Desktop */}
        <div 
          className="stats-container desktop-stats" 
          style={{
            background: `${pastelColors.skyBlue}15`,
            border: `2px solid ${pastelColors.skyBlue}`,
            borderRadius: 24,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '50px 40px',
            position: 'relative',
            minHeight: 500
          }}
        >
          
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            {dashboardStats.map((stat, index) => 
              dashboardStats.slice(index + 1).map((nextStat, nextIndex) => (
                <line
                  key={`${index}-${nextIndex}`}
                  x1={stat.x}
                  y1={stat.y}
                  x2={nextStat.x}
                  y2={nextStat.y}
                  stroke={stat.color}
                  strokeWidth="1.5"
                  opacity="0.2"
                  strokeDasharray="4,4"
                />
              ))
            )}
          </svg>

          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const isHovered = hoveredStat === index;

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: stat.x,
                  top: stat.y,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered ? 20 : 10
                }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div style={{
                  position: 'relative',
                  width: 120, height: 120,
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  background: `${stat.color}E6`,
                  border: `3px solid ${stat.color}`,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                }}>
                  <IconComponent style={{ width: 28, height: 28, marginBottom: 6, color: '#000000', strokeWidth: 2.5 }} />
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#000000' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: stat.darkColor, textTransform: 'UPPERCASE' }}>
                    {stat.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Stats Grid */}
        <div className="mobile-stats-grid" style={{ display: 'none' }}>
          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                style={{
                  background: `${stat.color}E6`,
                  border: `3px solid ${stat.color}`,
                  borderRadius: 16,
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 140,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                <IconComponent style={{ width: 36, height: 36, marginBottom: 10, color: '#000000', strokeWidth: 2.5 }} />
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#000000', marginBottom: 6 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: stat.darkColor, textTransform: 'UPPERCASE', textAlign: 'center' }}>
                  {stat.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Subtle particle pulse - very minimal */
        @keyframes subtlePulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }

        .particle {
          animation: subtlePulse 4s ease-in-out infinite;
        }

        .particle:nth-child(2n) {
          animation-delay: 1s;
        }

        .particle:nth-child(3n) {
          animation-delay: 2s;
        }

        /* Hide scrollbar for directors */
        div[style*="overflowX"]::-webkit-scrollbar {
          display: none;
        }

        /* Responsive Styles */
        @media screen and (max-width: 1023px) {
          html, body {
            overflow-x: hidden !important;
          }
          
          .desktop-stats {
            display: none !important;
          }
          
          .mobile-stats-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 8px !important;
            max-width: 100% !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media screen and (min-width: 320px) and (max-width: 374px) {
          .mobile-stats-grid {
            gap: 3px !important;
            padding: 0 3px !important;
          }
          
          .mobile-stats-grid > div {
            min-height: 52px !important;
            padding: 3px 1px !important;
            border-radius: 10px !important;
            border-width: 2px !important;
          }
          
          .mobile-stats-grid svg {
            width: 10px !important;
            height: 10px !important;
            margin-bottom: 2px !important;
          }
          
          .mobile-stats-grid > div > div:nth-child(2) {
            font-size: 0.7rem !important;
            margin-bottom: 1px !important;
          }
          
          .mobile-stats-grid > div > div:nth-child(3) {
            font-size: 5px !important;
            line-height: 1 !important;
          }
        }

        @media screen and (min-width: 375px) and (max-width: 479px) {
          .mobile-stats-grid {
            gap: 4px !important;
            padding: 0 4px !important;
          }
          
          .mobile-stats-grid > div {
            min-height: 58px !important;
            padding: 4px 2px !important;
          }
          
          .mobile-stats-grid svg {
            width: 12px !important;
            height: 12px !important;
          }
          
          .mobile-stats-grid > div > div:nth-child(2) {
            font-size: 0.8rem !important;
          }
          
          .mobile-stats-grid > div > div:nth-child(3) {
            font-size: 5.5px !important;
          }
        }

        @media screen and (min-width: 480px) and (max-width: 639px) {
          .mobile-stats-grid {
            gap: 5px !important;
          }
          
          .mobile-stats-grid > div {
            min-height: 65px !important;
          }
          
          .mobile-stats-grid svg {
            width: 14px !important;
            height: 14px !important;
          }
        }

        @media screen and (min-width: 640px) and (max-width: 767px) {
          .mobile-stats-grid {
            gap: 6px !important;
          }
          
          .mobile-stats-grid > div {
            min-height: 75px !important;
          }
        }

        @media screen and (min-width: 768px) and (max-width: 1023px) {
          .mobile-stats-grid {
            gap: 8px !important;
          }
          
          .mobile-stats-grid > div {
            min-height: 85px !important;
          }
        }

        @media screen and (min-width: 1024px) and (max-width: 1439px) {
          .pillars-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          
          .desktop-stats {
            display: none !important;
          }
          
          .mobile-stats-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 12px !important;
          }
        }

        @media screen and (min-width: 1440px) {
          .mobile-stats-grid {
            display: none !important;
          }
          
          .desktop-stats {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CompanyOverview;