import React, { useEffect, useState, useRef } from 'react';
import {
  Code, Smartphone, Cloud, Brain, Shield, Palette, 
  Headphones, TestTube, Globe, CheckCircle, Zap, Database,
  Server, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';

const PageHeader = ({ title, width = '200px' }: { title: string, width?: string }) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ textAlign: 'center', marginBottom: 70, padding: '0' }} className="page-header">
      <h2 
        ref={headerRef}
        className="page-header-title"
        style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          marginBottom: 16,
          color: '#333333',
          textTransform: 'uppercase' as const,
          letterSpacing: '2px'
        }}
      >
        {title}
      </h2>
      <div 
        ref={underlineRef}
        className="page-header-underline"
        style={{
          height: 5,
          width: width,
          background: 'linear-gradient(90deg, #3498db 0%, #2980b9 33%, #1f5f8f 66%, #3498db 100%)',
          borderRadius: 10,
          margin: '12px auto 0'
        }}
      />
    </div>
  );
};

const DigitalSolution = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const primaryColor = '#3498db';
  
  const pastelColors = {
    lavender: '#A88FCC',
    mintGreen: '#8FE0CC',
    skyBlue: '#2E86C1',
    lightBlue: '#7FCCE0'
  };

  const darkerColors = {
    lavender: '#8B6FB8',
    mintGreen: '#6DC4AD',
    skyBlue: '#1F6292',
    lightBlue: '#5BADC4'
  };

  const solutions = [
    {
      title: 'Custom Software Development',
      description: 'Tailored software solutions designed to meet your unique business requirements and drive digital transformation.',
      icon: Code,
      color: pastelColors.skyBlue,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      features: ['Agile Development', 'Scalable Architecture', 'Clean Code', 'API Integration']
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
      icon: Smartphone,
      color: pastelColors.lavender,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      features: ['iOS & Android', 'React Native', 'Flutter', 'Progressive Web Apps']
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services leveraging AWS, Azure, and Google Cloud platforms.',
      icon: Cloud,
      color: pastelColors.mintGreen,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
      features: ['AWS', 'Azure', 'Google Cloud', 'DevOps']
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning for predictive analytics and automation.',
      icon: Brain,
      color: pastelColors.lightBlue,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      features: ['Neural Networks', 'NLP', 'Computer Vision', 'Predictive Analytics']
    },
    {
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.',
      icon: Shield,
      color: pastelColors.lavender,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
      features: ['Penetration Testing', 'Security Audits', 'Compliance', 'Threat Detection']
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user-centric principles for maximum engagement and satisfaction.',
      icon: Palette,
      color: pastelColors.mintGreen,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
      title: 'IT Consulting',
      description: 'Strategic technology consulting to help you make informed decisions and optimize your IT infrastructure.',
      icon: Headphones,
      color: pastelColors.lightBlue,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      features: ['Strategy', 'Digital Transformation', 'Process Optimization', 'Technology Roadmap']
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous testing methodologies ensuring your software is reliable, secure, and performs flawlessly.',
      icon: TestTube,
      color: pastelColors.skyBlue,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      features: ['Automated Testing', 'Manual Testing', 'Performance Testing', 'Security Testing']
    },
    {
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies and best practices.',
      icon: Globe,
      color: pastelColors.lavender,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
      features: ['React', 'Angular', 'Vue.js', 'Node.js']
    },
    {
      title: 'Database Solutions',
      description: 'Robust database design, optimization, and management for efficient data storage and retrieval.',
      icon: Database,
      color: pastelColors.mintGreen,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      features: ['SQL', 'NoSQL', 'Data Modeling', 'Performance Tuning']
    },
    {
      title: 'Enterprise Solutions',
      description: 'Comprehensive enterprise software systems including ERP, CRM, and custom business applications.',
      icon: Server,
      color: pastelColors.lightBlue,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      features: ['ERP Systems', 'CRM', 'Business Intelligence', 'Workflow Automation']
    },
    {
      title: 'DevOps Services',
      description: 'Streamlined development and operations with CI/CD pipelines, automation, and infrastructure as code.',
      icon: Settings,
      color: pastelColors.skyBlue,
      iconColor: '#FFFFFF',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop',
      features: ['CI/CD', 'Docker', 'Kubernetes', 'Monitoring']
    }
  ];

  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setRotation(prev => prev - 30);
      setActiveIndex(prev => (prev + 1) % solutions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoRotating, solutions.length]);

  const ITEMS_PER_VIEW = 4;

  useEffect(() => {
    if (!isAutoScrolling) return;

    autoScrollIntervalRef.current = setInterval(() => {
      setCurrentStartIndex(prev => {
        const next = prev + 1;
        return next >= solutions.length ? 0 : next;
      });
    }, 2000);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, solutions.length]);

  const handleNext = () => {
    setIsAutoScrolling(false);
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    setCurrentStartIndex(prev => {
      const next = prev + 1;
      return next >= solutions.length ? 0 : next;
    });
  };

  const handlePrev = () => {
    setIsAutoScrolling(false);
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    setCurrentStartIndex(prev => {
      const next = prev - 1;
      return next < 0 ? solutions.length - 1 : next;
    });
  };

  const getVisibleSolutions = () => {
    const visible = [];
    for (let i = 0; i < ITEMS_PER_VIEW; i++) {
      const index = (currentStartIndex + i) % solutions.length;
      visible.push(solutions[index]);
    }
    return visible;
  };

  return (
    <section style={{
      minHeight: '100vh',
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent'
    }}>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        
        <PageHeader title="DIGITAL SOLUTIONS - makes you the revolution" width="280px" />

        <p style={{
          fontSize: 18,
          maxWidth: '1000px',
          margin: '0 auto 10px',
          marginBottom: 0,
          fontWeight: 400,
          lineHeight: 1.6,
          color: '#555555',
          textAlign: 'center'
        }}
        className="header-description"
        >
          Comprehensive technology solutions tailored to transform your business and drive digital innovation across all platforms.
        </p>

        {/* 3D ROTATING WHEEL */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -100,
          marginBottom: -99,
          perspective: '1500px',
          height: '600px'
        }}
        className="rotating-wheel-container"
        >
          <div
            style={{
              position: 'relative',
              width: '500px',
              height: '500px',
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: isAutoRotating ? 'transform 0.8s ease-out' : 'none'
            }}
            className="rotating-wheel-inner"
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
          >
            {solutions.map((solution, index) => {
              const angle = (360 / solutions.length) * index;
              const isActive = index === activeIndex;
              const IconComponent = solution.icon;

              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    left: '150px',
                    top: '150px',
                    transform: `rotateY(${angle}deg) translateZ(350px)`,
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.3s ease'
                  }}
                  className="wheel-card"
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: isActive
                        ? `rgba(${parseInt(solution.color.slice(1,3), 16)}, ${parseInt(solution.color.slice(3,5), 16)}, ${parseInt(solution.color.slice(5,7), 16)}, 0.65)`
                        : `rgba(${parseInt(solution.color.slice(1,3), 16)}, ${parseInt(solution.color.slice(3,5), 16)}, ${parseInt(solution.color.slice(5,7), 16)}, 0.25)`,
                      borderRadius: 20,
                      border: isActive 
                        ? `3px solid ${solution.color}` 
                        : `3px solid ${solution.color}40`,
                      backdropFilter: isActive 
                        ? 'blur(35px) brightness(0.75) saturate(1.6) contrast(1.1)' 
                        : 'blur(20px)',
                      WebkitBackdropFilter: isActive 
                        ? 'blur(35px) brightness(0.75) saturate(1.6) contrast(1.1)' 
                        : 'blur(20px)',
                      padding: 24,
                      display: 'flex',
                      flexDirection: 'column' as const,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 16,
                      boxShadow: isActive 
                        ? `0 25px 70px ${solution.color}70, inset 0 2px 4px rgba(255,255,255,0.2)` 
                        : `0 8px 25px ${solution.color}15`,
                      transform: isActive ? 'scale(1.1) rotateY(0deg)' : 'scale(1) rotateY(0deg)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onClick={() => {
                      setIsAutoRotating(false);
                      const targetRotation = -angle;
                      setRotation(targetRotation);
                      setActiveIndex(index);
                    }}
                  >
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                        borderRadius: '20px 20px 0 0',
                        pointerEvents: 'none',
                        zIndex: 1
                      }} />
                    )}
                    
                    <div style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: solution.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isActive 
                        ? `0 15px 40px ${solution.color}70` 
                        : `0 10px 30px ${solution.color}60`,
                      border: isActive 
                        ? '4px solid rgba(255,255,255,0.5)' 
                        : '3px solid rgba(255,255,255,0.4)',
                      position: 'relative',
                      zIndex: 2
                    }}
                    className="wheel-icon"
                    >
                      <IconComponent style={{ width: 36, height: 36, color: solution.iconColor }} />
                    </div>
                    <h3 style={{
                      fontSize: isActive ? '1.05rem' : '1rem',
                      fontWeight: isActive ? 800 : 700,
                      color: '#000000',
                      textAlign: 'center',
                      margin: 0,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px',
                      position: 'relative',
                      zIndex: 2
                    }}
                    className="wheel-title"
                    >
                      {solution.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Solution Details */}
        <div style={{
          background: `rgba(${parseInt(solutions[activeIndex].color.slice(1,3), 16)}, ${parseInt(solutions[activeIndex].color.slice(3,5), 16)}, ${parseInt(solutions[activeIndex].color.slice(5,7), 16)}, 0.2)`,
          borderRadius: 28,
          overflow: 'hidden',
          border: `2px solid ${solutions[activeIndex].color}50`,
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          boxShadow: `0 20px 60px ${solutions[activeIndex].color}30`,
          marginBottom: 80
        }}
        className="active-solution-detail"
        >
          <div style={{ display: 'flex', alignItems: 'stretch', flexWrap: 'wrap' as const }}>
            <div style={{ 
              flex: '0 0 70%',
              padding: 50, 
              minWidth: '300px', 
              display: 'flex', 
              flexDirection: 'column' as const, 
              justifyContent: 'center' 
            }} 
            className="solution-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                <div style={{
                  minWidth: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: solutions[activeIndex].color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 15px 40px ${solutions[activeIndex].color}60`,
                  border: '4px solid rgba(255,255,255,0.5)'
                }}>
                  {React.createElement(solutions[activeIndex].icon, {
                    style: { width: 40, height: 40, color: solutions[activeIndex].iconColor }
                  })}
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: '#000000',
                  margin: 0,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '1px'
                }}
                className="solution-title"
                >
                  {solutions[activeIndex].title}
                </h3>
              </div>
              
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#555555',
                marginBottom: 24
              }}
              className="solution-description"
              >
                {solutions[activeIndex].description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12 }}>
                {solutions[activeIndex].features.map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 12,
                      background: `rgba(${parseInt(solutions[activeIndex].color.slice(1,3), 16)}, ${parseInt(solutions[activeIndex].color.slice(3,5), 16)}, ${parseInt(solutions[activeIndex].color.slice(5,7), 16)}, 0.3)`,
                      border: `2px solid ${solutions[activeIndex].color}60`,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <CheckCircle style={{ width: 16, height: 16, color: solutions[activeIndex].color }} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              flex: '0 0 30%',
              minWidth: '250px',
              minHeight: '350px',
              position: 'relative'
            }}
            className="solution-image-container"
            >
              <img 
                src={solutions[activeIndex].image} 
                alt={solutions[activeIndex].title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div style={{ position: 'relative', marginBottom: 60 }}>
          <div style={{ position: 'relative', overflow: 'visible', padding: '0 80px' }} className="carousel-wrapper">
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: pastelColors.skyBlue,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: `0 8px 25px ${pastelColors.skyBlue}40`,
                transition: 'all 0.3s ease'
              }}
              className="carousel-btn-left"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = `0 12px 35px ${pastelColors.skyBlue}60`;
                e.currentTarget.style.background = darkerColors.skyBlue;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${pastelColors.skyBlue}40`;
                e.currentTarget.style.background = pastelColors.skyBlue;
              }}
            >
              <ChevronLeft style={{ width: 28, height: 28, color: 'white' }} />
            </button>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24
            }}
            className="carousel-grid desktop-carousel"
            >
              {getVisibleSolutions().map((solution, idx) => {
                const IconComponent = solution.icon;
                
                return (
                  <div
                    key={idx}
                    style={{
                      background: `rgba(${parseInt(solution.color.slice(1,3), 16)}, ${parseInt(solution.color.slice(3,5), 16)}, ${parseInt(solution.color.slice(5,7), 16)}, 0.25)`,
                      borderRadius: 20,
                      padding: 28,
                      border: `2px solid ${solution.color}50`,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: `0 8px 25px ${solution.color}25`,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      minHeight: 280
                    }}
                    className="carousel-card"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = `0 15px 40px ${solution.color}40`;
                      e.currentTarget.style.borderColor = solution.color + '80';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 8px 25px ${solution.color}25`;
                      e.currentTarget.style.borderColor = solution.color + '50';
                    }}
                  >
                    <div style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: solution.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                      boxShadow: `0 8px 20px ${solution.color}50`,
                      border: '3px solid rgba(255,255,255,0.3)'
                    }}
                    className="carousel-icon"
                    >
                      <IconComponent style={{ width: 30, height: 30, color: solution.iconColor }} />
                    </div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#000000',
                      marginBottom: 12,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px'
                    }}
                    className="carousel-title"
                    >
                      {solution.title}
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: '#555',
                      margin: 0
                    }}
                    className="carousel-description"
                    >
                      {solution.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile Cards */}
            <div className="mobile-cards-container" style={{ display: 'none' }}>
              {solutions.map((solution, idx) => {
                const IconComponent = solution.icon;
                
                return (
                  <div
                    key={idx}
                    style={{
                      background: `rgba(${parseInt(solution.color.slice(1,3), 16)}, ${parseInt(solution.color.slice(3,5), 16)}, ${parseInt(solution.color.slice(5,7), 16)}, 0.25)`,
                      borderRadius: 20,
                      padding: 20,
                      border: `2px solid ${solution.color}50`,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: `0 8px 25px ${solution.color}25`,
                      marginBottom: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16
                    }}
                    className="mobile-card"
                  >
                    <div style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: solution.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 8px 20px ${solution.color}50`,
                      border: '3px solid rgba(255,255,255,0.3)'
                    }}
                    className="mobile-icon"
                    >
                      <IconComponent style={{ width: 30, height: 30, color: solution.iconColor }} />
                    </div>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#000000',
                      margin: 0,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.5px',
                      flex: 1
                    }}
                    className="mobile-title"
                    >
                      {solution.title}
                    </h4>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: pastelColors.lavender,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: `0 8px 25px ${pastelColors.lavender}40`,
                transition: 'all 0.3s ease'
              }}
              className="carousel-btn-right"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = `0 12px 35px ${pastelColors.lavender}60`;
                e.currentTarget.style.background = darkerColors.lavender;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${pastelColors.lavender}40`;
                e.currentTarget.style.background = pastelColors.lavender;
              }}
            >
              <ChevronRight style={{ width: 28, height: 28, color: 'white' }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        * {
          text-shadow: none !important;
          box-sizing: border-box;
        }

        .mobile-cards-container {
          display: none;
        }

        /* =================================
           DESKTOP - 1920px and above
           ================================= */
        @media (min-width: 1920px) {
          .page-header-title {
            font-size: 4rem !important;
          }
          .page-header-underline {
            width: 280px !important;
          }
          .carousel-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 24px !important;
          }
        }

        /* =================================
           LARGE DESKTOP - 1440px to 1919px
           ================================= */
        @media (min-width: 1440px) and (max-width: 1919px) {
          .page-header-title {
            font-size: 3.5rem !important;
          }
          .carousel-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }

        /* =================================
           MEDIUM DESKTOP - 1200px to 1439px
           ================================= */
        @media (min-width: 1200px) and (max-width: 1439px) {
          .page-header-title {
            font-size: 3.2rem !important;
          }
          .carousel-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 22px !important;
          }
        }

        /* =================================
           SMALL DESKTOP/LAPTOP - 1024px to 1199px
           ================================= */
        @media (min-width: 1024px) and (max-width: 1199px) {
          .page-header-title {
            font-size: 2.8rem !important;
          }
          .rotating-wheel-container {
            height: 500px !important;
          }
          .rotating-wheel-inner {
            width: 450px !important;
            height: 450px !important;
          }
          .carousel-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .carousel-wrapper {
            padding: 0 70px !important;
          }
          .solution-content {
            padding: 40px !important;
          }
        }

        /* =================================
           TABLET LANDSCAPE - 768px to 1023px
           ================================= */
        @media (min-width: 768px) and (max-width: 1023px) {
          .page-header {
            margin-bottom: 50px !important;
            padding: 1.5rem 1rem 0 !important;
          }
          .page-header-title {
            font-size: 2.5rem !important;
          }
          .page-header-underline {
            width: 220px !important;
            height: 4px !important;
          }
          .header-description {
            font-size: 16px !important;
            line-height: 1.5 !important;
          }
          
          /* Rotating Wheel Adjustments */
          .rotating-wheel-container {
            height: 450px !important;
            margin-top: -80px !important;
            margin-bottom: -60px !important;
            padding-bottom: 3rem !important;
          }
          .rotating-wheel-inner {
            width: 400px !important;
            height: 400px !important;
          }
          .wheel-card {
            width: 180px !important;
            height: 180px !important;
            left: 110px !important;
            top: 110px !important;
          }
          .wheel-icon {
            width: 60px !important;
            height: 60px !important;
          }
          .wheel-title {
            font-size: 0.9rem !important;
          }
          
          /* Active Solution Detail */
          .active-solution-detail {
            margin-top: 3rem !important;
            margin-bottom: 60px !important;
          }
          .solution-content {
            padding: 35px !important;
            flex: 0 0 100% !important;
          }
          .solution-title {
            font-size: 1.6rem !important;
          }
          .solution-description {
            font-size: 1rem !important;
          }
          .solution-image-container {
            flex: 0 0 100% !important;
            min-height: 300px !important;
          }
          
          /* Carousel */
          .carousel-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px !important;
          }
          .carousel-wrapper {
            padding: 0 70px !important;
          }
          .carousel-btn-left {
            left: 10px !important;
          }
          .carousel-btn-right {
            right: 10px !important;
          }
        }

        /* =================================
           TABLET PORTRAIT - 600px to 767px
           ================================= */
        @media (min-width: 600px) and (max-width: 767px) {
          .page-header {
            margin-bottom: 40px !important;
            padding: 1.2rem 0.8rem 0 !important;
          }
          .page-header-title {
            font-size: 2.2rem !important;
            letter-spacing: 1px !important;
          }
          .page-header-underline {
            width: 200px !important;
            height: 4px !important;
          }
          .header-description {
            font-size: 15px !important;
            line-height: 1.5 !important;
            padding: 0 10px !important;
          }
          
          /* Rotating Wheel Adjustments */
          .rotating-wheel-container {
            height: 400px !important;
            margin-top: -70px !important;
            margin-bottom: -50px !important;
            padding-bottom: 3rem !important;
          }
          .rotating-wheel-inner {
            width: 350px !important;
            height: 350px !important;
          }
          .wheel-card {
            width: 160px !important;
            height: 160px !important;
            left: 95px !important;
            top: 95px !important;
          }
          .wheel-icon {
            width: 55px !important;
            height: 55px !important;
          }
          .wheel-icon svg {
            width: 30px !important;
            height: 30px !important;
          }
          .wheel-title {
            font-size: 0.85rem !important;
          }
          
          /* Active Solution Detail */
          .active-solution-detail {
            margin-top: 2.5rem !important;
            margin-bottom: 50px !important;
          }
          .solution-content {
            padding: 30px !important;
            flex: 0 0 100% !important;
          }
          .solution-title {
            font-size: 1.5rem !important;
          }
          .solution-description {
            font-size: 0.95rem !important;
          }
          .solution-image-container {
            flex: 0 0 100% !important;
            min-height: 250px !important;
          }
          
          /* Mobile View */
          .desktop-carousel {
            display: none !important;
          }
          .mobile-cards-container {
            display: block !important;
          }
          .carousel-btn-left,
          .carousel-btn-right {
            display: none !important;
          }
          .carousel-wrapper {
            padding: 0 20px !important;
          }
          .mobile-card {
            padding: 24px !important;
            margin-bottom: 14px !important;
          }
        }

        /* =================================
           MOBILE LARGE - 480px to 599px
           iPhone 14/15 Pro Max, Galaxy S23+
           ================================= */
        @media (min-width: 480px) and (max-width: 599px) {
          .page-header {
            margin-bottom: 35px !important;
            padding: 1rem 0.8rem 0 !important;
          }
          .page-header-title {
            font-size: 2rem !important;
            letter-spacing: 0.8px !important;
          }
          .page-header-underline {
            width: 180px !important;
            height: 3px !important;
          }
          .header-description {
            font-size: 14px !important;
            line-height: 1.4 !important;
            padding: 0 5px !important;
          }
          
          /* Rotating Wheel Adjustments */
          .rotating-wheel-container {
            height: 350px !important;
            margin-top: -60px !important;
            margin-bottom: -40px !important;
            padding-bottom: 3rem !important;
          }
          .rotating-wheel-inner {
            width: 300px !important;
            height: 300px !important;
          }
          .wheel-card {
            width: 140px !important;
            height: 140px !important;
            left: 80px !important;
            top: 80px !important;
          }
          .wheel-icon {
            width: 50px !important;
            height: 50px !important;
          }
          .wheel-icon svg {
            width: 26px !important;
            height: 26px !important;
          }
          .wheel-title {
            font-size: 0.75rem !important;
            line-height: 1.1 !important;
          }
          
          /* Active Solution Detail */
          .active-solution-detail {
            margin-top: 2rem !important;
            margin-bottom: 40px !important;
            border-radius: 24px !important;
          }
          .solution-content {
            padding: 25px !important;
            flex: 0 0 100% !important;
          }
          .solution-title {
            font-size: 1.4rem !important;
          }
          .solution-description {
            font-size: 0.95rem !important;
            line-height: 1.6 !important;
          }
          .solution-image-container {
            flex: 0 0 100% !important;
            min-height: 220px !important;
          }
          
          /* Mobile View */
          .desktop-carousel {
            display: none !important;
          }
          .mobile-cards-container {
            display: block !important;
          }
          .carousel-btn-left,
          .carousel-btn-right {
            display: none !important;
          }
          .carousel-wrapper {
            padding: 0 20px !important;
          }
          .mobile-card {
            padding: 20px !important;
            margin-bottom: 14px !important;
          }
          .mobile-title {
            font-size: 0.95rem !important;
          }
        }

        /* =================================
           MOBILE MEDIUM - 375px to 479px
           iPhone 13/14/15 Pro, Galaxy S21
           ================================= */
        @media (min-width: 375px) and (max-width: 479px) {
          .page-header {
            margin-bottom: 30px !important;
            padding: 1rem 0.5rem 0 !important;
          }
          .page-header-title {
            font-size: 1.8rem !important;
            letter-spacing: 0.5px !important;
          }
          .page-header-underline {
            width: 160px !important;
            height: 3px !important;
          }
          .header-description {
            font-size: 13px !important;
            line-height: 1.4 !important;
          }
          
          /* Rotating Wheel Adjustments */
          .rotating-wheel-container {
            height: 320px !important;
            margin-top: -50px !important;
            margin-bottom: -30px !important;
            padding-bottom: 2.5rem !important;
          }
          .rotating-wheel-inner {
            width: 260px !important;
            height: 260px !important;
          }
          .wheel-card {
            width: 120px !important;
            height: 120px !important;
            left: 70px !important;
            top: 70px !important;
          }
          .wheel-icon {
            width: 45px !important;
            height: 45px !important;
          }
          .wheel-icon svg {
            width: 24px !important;
            height: 24px !important;
          }
          .wheel-title {
            font-size: 0.7rem !important;
            line-height: 1.1 !important;
          }
          
          /* Active Solution Detail */
          .active-solution-detail {
            margin-top: 1.5rem !important;
            margin-bottom: 35px !important;
            border-radius: 20px !important;
          }
          .solution-content {
            padding: 20px !important;
            flex: 0 0 100% !important;
          }
          .solution-title {
            font-size: 1.2rem !important;
          }
          .solution-description {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          .solution-image-container {
            flex: 0 0 100% !important;
            min-height: 180px !important;
          }
          
          /* Mobile View */
          .desktop-carousel {
            display: none !important;
          }
          .mobile-cards-container {
            display: block !important;
          }
          .carousel-btn-left,
          .carousel-btn-right {
            display: none !important;
          }
          .carousel-wrapper {
            padding: 0 15px !important;
          }
          .mobile-card {
            padding: 18px !important;
            margin-bottom: 12px !important;
            border-radius: 16px !important;
          }
          .mobile-icon {
            width: 55px !important;
            height: 55px !important;
          }
          .mobile-icon svg {
            width: 28px !important;
            height: 28px !important;
          }
          .mobile-title {
            font-size: 0.95rem !important;
          }
        }

        /* =================================
           MOBILE SMALL - 360px to 374px
           Galaxy A series, Pixel 5
           ================================= */
        @media (min-width: 360px) and (max-width: 374px) {
          .page-header {
            margin-bottom: 25px !important;
            padding: 0.8rem 0.5rem 0 !important;
          }
          .page-header-title {
            font-size: 1.6rem !important;
            letter-spacing: 0.5px !important;
          }
          .page-header-underline {
            width: 140px !important;
            height: 3px !important;
          }
          .header-description {
            font-size: 12px !important;
            line-height: 1.3 !important;
          }
          
          /* Rotating Wheel Adjustments */
          .rotating-wheel-container {
            height: 290px !important;
            margin-top: -45px !important;
            margin-bottom: -25px !important;
            padding-bottom: 2rem !important;
          }
          .rotating-wheel-inner {
            width: 240px !important;
            height: 240px !important;
          }
          .wheel-card {
            width: 110px !important;
            height: 110px !important;
            left: 65px !important;
            top: 65px !important;
          }
          .wheel-icon {
            width: 42px !important;
            height: 42px !important;
          }
          .wheel-icon svg {
            width: 22px !important;
            height: 22px !important;
          }
          .wheel-title {
            font-size: 0.65rem !important;
          }
          
          /* Active Solution Detail */
          .active-solution-detail {
            margin-top: 1.5rem !important;
            margin-bottom: 30px !important;
          }
          .solution-content {
            padding: 18px !important;
          }
          .solution-title {
            font-size: 1.1rem !important;
          }
          .solution-description {
            font-size: 0.85rem !important;
          }
          .solution-image-container {
            min-height: 170px !important;
          }
          
          /* Mobile View */
          .desktop-carousel {
            display: none !important;
          }
          .mobile-cards-container {
            display: block !important;
          }
          .carousel-btn-left,
          .carousel-btn-right {
            display: none !important;
          }
          .carousel-wrapper {
            padding: 0 12px !important;
          }
          .mobile-card {
            padding: 16px !important;
            margin-bottom: 12px !important;
          }
          .mobile-icon {
            width: 52px !important;
            height: 52px !important;
          }
          .mobile-icon svg {
            width: 26px !important;
            height: 26px !important;
          }
          .mobile-title {
            font-size: 0.9rem !important;
          }
        }

        /* =================================
           MOBILE EXTRA SMALL - 320px to 359px
           iPhone SE, older Android
           ================================= */
        @media (min-width: 320px) and (max-width: 359px) {
          .page-header {
            margin-bottom: 20px !important;
            padding: 0.7rem 0.4rem 0 !important;
          }
          .page-header-title {
            font-size: 1.4rem !important;
            letter-spacing: 0.3px !important;
          }
          .page-header-underline {
            width: 120px !important;
            height: 2px !important;
          }
          .header-description {
            font-size: 11px !important;
            line-height: 1.3 !important;
          }
          
          /* Rotating Wheel Adjustments */
          .rotating-wheel-container {
            height: 260px !important;
            margin-top: -40px !important;
            margin-bottom: -20px !important;
            padding-bottom: 2rem !important;
          }
          .rotating-wheel-inner {
            width: 210px !important;
            height: 210px !important;
          }
          .wheel-card {
            width: 100px !important;
            height: 100px !important;
            left: 55px !important;
            top: 55px !important;
          }
          .wheel-icon {
            width: 38px !important;
            height: 38px !important;
          }
          .wheel-icon svg {
            width: 20px !important;
            height: 20px !important;
          }
          .wheel-title {
            font-size: 0.6rem !important;
          }
          
          /* Active Solution Detail */
          .active-solution-detail {
            margin-top: 1.2rem !important;
            margin-bottom: 25px !important;
          }
          .solution-content {
            padding: 16px !important;
          }
          .solution-title {
            font-size: 1rem !important;
          }
          .solution-description {
            font-size: 0.8rem !important;
          }
          .solution-image-container {
            min-height: 160px !important;
          }
          
          /* Mobile View */
          .desktop-carousel {
            display: none !important;
          }
          .mobile-cards-container {
            display: block !important;
          }
          .carousel-btn-left,
          .carousel-btn-right {
            display: none !important;
          }
          .carousel-wrapper {
            padding: 0 10px !important;
          }
          .mobile-card {
            padding: 14px !important;
            margin-bottom: 10px !important;
          }
          .mobile-icon {
            width: 48px !important;
            height: 48px !important;
          }
          .mobile-icon svg {
            width: 24px !important;
            height: 24px !important;
          }
          .mobile-title {
            font-size: 0.85rem !important;
          }
        }

        /* =================================
           MOBILE TINY - below 320px
           Very old devices
           ================================= */
        @media (max-width: 319px) {
          .page-header {
            margin-bottom: 18px !important;
            padding: 0.5rem 0.3rem 0 !important;
          }
          .page-header-title {
            font-size: 1.2rem !important;
          }
          .page-header-underline {
            width: 100px !important;
            height: 2px !important;
          }
          .header-description {
            font-size: 10px !important;
          }
          
          .rotating-wheel-container {
            height: 240px !important;
            margin-top: -35px !important;
            margin-bottom: -15px !important;
          }
          .rotating-wheel-inner {
            width: 180px !important;
            height: 180px !important;
          }
          .wheel-card {
            width: 90px !important;
            height: 90px !important;
            left: 45px !important;
            top: 45px !important;
          }
          .wheel-icon {
            width: 35px !important;
            height: 35px !important;
          }
          .wheel-icon svg {
            width: 18px !important;
            height: 18px !important;
          }
          .wheel-title {
            font-size: 0.55rem !important;
          }
          
          .active-solution-detail {
            margin-top: 1rem !important;
            margin-bottom: 20px !important;
          }
          .solution-content {
            padding: 14px !important;
          }
          .solution-title {
            font-size: 0.95rem !important;
          }
          .solution-description {
            font-size: 0.75rem !important;
          }
          
          .desktop-carousel {
            display: none !important;
          }
          .mobile-cards-container {
            display: block !important;
          }
          .carousel-btn-left,
          .carousel-btn-right {
            display: none !important;
          }
          .carousel-wrapper {
            padding: 0 8px !important;
          }
          .mobile-card {
            padding: 12px !important;
            margin-bottom: 10px !important;
          }
          .mobile-icon {
            width: 45px !important;
            height: 45px !important;
          }
          .mobile-icon svg {
            width: 22px !important;
            height: 22px !important;
          }
          .mobile-title {
            font-size: 0.8rem !important;
          }
        }

        /* =================================
           LANDSCAPE ORIENTATION
           ================================= */
        @media (max-height: 600px) and (orientation: landscape) {
          .rotating-wheel-container {
            height: 280px !important;
            margin-top: -50px !important;
            padding-bottom: 2rem !important;
          }
          .rotating-wheel-inner {
            width: 250px !important;
            height: 250px !important;
          }
        }

        @media (max-width: 667px) and (orientation: landscape) {
          .page-header-title {
            font-size: 1.6rem !important;
          }
          .rotating-wheel-container {
            height: 260px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DigitalSolution;
