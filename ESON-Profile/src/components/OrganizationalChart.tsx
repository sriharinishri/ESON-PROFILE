import React, { useEffect, useState, useRef } from 'react';
import { 
  Crown, 
  Briefcase, 
  Code, 
  Shield, 
  Palette, 
  Settings,
  Users,
  DollarSign,
  Cloud,
  Database,
  Monitor,
  Award,
  BrainCircuit,
  Cog,
  Layers,
  Globe,
  Smartphone,
  Server,
  TestTube,
  Lock,
  Eye,
  Wrench
} from 'lucide-react';

const PageHeader = ({ title, width = '200px' }: { title: string, width?: string }) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ textAlign: 'center', marginBottom: 70, padding: '0 1rem' }}> {/* ✅ CHANGED: Removed 2rem top padding */}
      <h2 
        ref={headerRef}
        className="page-header-title"
        style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          marginBottom: 16,
          color: '#333333',
          textTransform: 'UPPERCASE',
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

const OrganizationalChart = () => {
  const [visibleNodes, setVisibleNodes] = useState<Set<number>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [legendVisible, setLegendVisible] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const legendRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleNodes(new Set());
    setLegendVisible(false);
    setChartVisible(false);
    
    return () => {
      setVisibleNodes(new Set());
      setLegendVisible(false);
      setChartVisible(false);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setChartVisible(true);
            setVisibleNodes(new Set());
            setTimeout(() => {
              const interval = setInterval(() => {
                setVisibleNodes(prev => {
                  const newSet = new Set(prev);
                  newSet.add(prev.size);
                  if (prev.size >= organizationNodes.length - 1) {
                    clearInterval(interval);
                  }
                  return newSet;
                });
              }, 120);
            }, 300);
          } else {
            setChartVisible(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLegendVisible(true);
          } else {
            setLegendVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (legendRef.current) {
      observer.observe(legendRef.current);
    }

    return () => {
      if (legendRef.current) {
        observer.unobserve(legendRef.current);
      }
    };
  }, []);

  const departmentLegend = [
    { dept: 'Executive', color: '#3498db', icon: Crown },
    { dept: 'Management', color: '#FFB3BA', icon: Briefcase },
    { dept: 'Development', color: '#BFAED9', icon: Code },
    { dept: 'Cloud & DevOps', color: '#B4F2E1', icon: Cloud },
    { dept: 'Data & Analytics', color: '#FFD1A0', icon: BrainCircuit },
    { dept: 'Security & QA', color: '#FFF2B3', icon: Shield },
    { dept: 'Design', color: '#FFB5B5', icon: Palette },
    { dept: 'Support', color: '#C8E6C9', icon: Settings }
  ];

  const organizationNodes = [
    { 
      id: 0, x: 50, y: 45, size: 'large', color: '#3498db', icon: Crown,
      title: 'Managing Directors', subtitle: 'Marshall • Subhaiya • Anitha S', connections: [1, 2, 3, 4, 5, 6]
    },
    { id: 1, x: 50, y: 22, size: 'medium', color: '#FFB3BA', icon: Briefcase, title: 'Management & Operations', connections: [7, 8, 9, 10, 11] },
    { id: 2, x: 75, y: 28, size: 'medium', color: '#BFAED9', icon: Code, title: 'Software Development', connections: [12, 13, 14, 15, 16, 17, 18] },
    { id: 3, x: 82, y: 55, size: 'medium', color: '#B4F2E1', icon: Cloud, title: 'Cloud & DevOps', connections: [19, 20, 21, 22, 23] },
    { id: 4, x: 65, y: 72, size: 'medium', color: '#FFD1A0', icon: BrainCircuit, title: 'Data & Analytics', connections: [24, 25, 26, 27] },
    { id: 5, x: 35, y: 72, size: 'medium', color: '#FFF2B3', icon: Shield, title: 'Security & Quality', connections: [28, 29, 30, 31, 32] },
    { id: 6, x: 18, y: 55, size: 'medium', color: '#FFB5B5', icon: Palette, title: 'Design & Production', connections: [33, 34, 35, 36] },
    { id: 7, x: 35, y: 10, size: 'small', color: '#C8E6C9', icon: Users, title: 'HR', connections: [] },
    { id: 8, x: 50, y: 7, size: 'small', color: '#3498db', icon: Users, title: 'HR Manager', connections: [] },
    { id: 9, x: 65, y: 10, size: 'small', color: '#FFB3BA', icon: DollarSign, title: 'Finance', connections: [] },
    { id: 10, x: 40, y: 16, size: 'small', color: '#BFAED9', icon: Briefcase, title: 'Project Manager', connections: [] },
    { id: 11, x: 60, y: 16, size: 'small', color: '#B4F2E1', icon: Settings, title: 'Project Planner', connections: [] },
    { id: 12, x: 82, y: 18, size: 'small', color: '#FFD1A0', icon: Code, title: 'Software Developer', connections: [] },
    { id: 13, x: 90, y: 21, size: 'small', color: '#FFF2B3', icon: Globe, title: 'Angular Developer', connections: [] },
    { id: 14, x: 92, y: 38, size: 'small', color: '#FFB5B5', icon: Monitor, title: 'React.js Developer', connections: [] },
    { id: 15, x: 77, y: 10, size: 'small', color: '#C8E6C9', icon: Code, title: 'PHP Developer', connections: [] },
    { id: 16, x: 90, y: 48, size: 'small', color: '#3498db', icon: Server, title: 'Backend Developer', connections: [] },
    { id: 17, x: 85, y: 40, size: 'small', color: '#FFB3BA', icon: Globe, title: 'Web Developer', connections: [] },
    { id: 18, x: 95, y: 30, size: 'small', color: '#BFAED9', icon: Smartphone, title: 'App Developer', connections: [] },
    { id: 19, x: 92, y: 60, size: 'small', color: '#B4F2E1', icon: Cloud, title: 'Cloud App Developer', connections: [] },
    { id: 20, x: 90, y: 69, size: 'small', color: '#FFD1A0', icon: Cloud, title: 'Cloud Service Engineer', connections: [] },
    { id: 21, x: 95, y: 51, size: 'small', color: '#FFF2B3', icon: Layers, title: 'Cloud Architect', connections: [] },
    { id: 22, x: 78, y: 64, size: 'small', color: '#FFB5B5', icon: Settings, title: 'DevOps Engineer', connections: [] },
    { id: 23, x: 80, y: 74, size: 'small', color: '#C8E6C9', icon: Wrench, title: 'IT Operations', connections: [] },
    { id: 24, x: 75, y: 80, size: 'small', color: '#3498db', icon: BrainCircuit, title: 'Data Analyst', connections: [] },
    { id: 25, x: 65, y: 86, size: 'small', color: '#FFB3BA', icon: Database, title: 'Data Engineer', connections: [] },
    { id: 26, x: 55, y: 82, size: 'small', color: '#BFAED9', icon: Database, title: 'Database Manager', connections: [] },
    { id: 27, x: 72, y: 89, size: 'small', color: '#B4F2E1', icon: Server, title: 'Database Admin', connections: [] },
    { id: 28, x: 25, y: 82, size: 'small', color: '#FFD1A0', icon: Shield, title: 'Cyber Security', connections: [] },
    { id: 29, x: 35, y: 86, size: 'small', color: '#FFF2B3', icon: Lock, title: 'Security Officer', connections: [] },
    { id: 30, x: 45, y: 80, size: 'small', color: '#FFB5B5', icon: Award, title: 'QA Engineer', connections: [] },
    { id: 31, x: 28, y: 89, size: 'small', color: '#C8E6C9', icon: TestTube, title: 'QA Tester', connections: [] },
    { id: 32, x: 42, y: 89, size: 'small', color: '#3498db', icon: Eye, title: 'Software Tester', connections: [] },
    { id: 33, x: 8, y: 64, size: 'small', color: '#FFB3BA', icon: Palette, title: 'UI/UX Designer', connections: [] },
    { id: 34, x: 12, y: 46, size: 'small', color: '#BFAED9', icon: Palette, title: 'Product Designer', connections: [] },
    { id: 35, x: 5, y: 55, size: 'small', color: '#B4F2E1', icon: Users, title: 'Design Team', connections: [] },
    { id: 36, x: 19, y: 21, size: 'small', color: '#FFD1A0', icon: Cog, title: 'Production Team', connections: [] },
  ];

  const getNodeSize = (size: string) => {
    switch (size) {
      case 'large': return { width: 90, height: 90 };
      case 'medium': return { width: 70, height: 70 };
      case 'small': return { width: 50, height: 50 };
      default: return { width: 55, height: 55 };
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getGradientForConnection = (node1Color: string, node2Color: string) => {
    return `linear-gradient(45deg, ${node1Color}, ${node2Color})`;
  };

  return (
    <section style={{ 
      minHeight: '100vh',
      padding: '0', // ✅ CHANGED: Removed all padding (was '3rem 0')
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent'
    }}>
      {/* Colorful Floating Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {Array.from({ length: 30 }).map((_, i) => {
          const colors = [
            'rgba(52, 152, 219, 0.7)',
            'rgba(255, 179, 186, 0.7)',
            'rgba(191, 174, 217, 0.7)',
            'rgba(180, 242, 225, 0.7)',
            'rgba(255, 209, 160, 0.7)',
            'rgba(255, 242, 179, 0.7)',
            'rgba(255, 181, 181, 0.7)',
            'rgba(200, 230, 201, 0.7)'
          ];
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: colors[i % 8],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particlePulse ${3 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 4}s`
              }}
            />
          );
        })}
      </div>

      <div style={{ position: 'relative',zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <PageHeader title="ESON STRUCTURE MAP" />

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            {/* Single Line Horizontal Legend */}
            <div 
              ref={legendRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
                padding: '16px 20px',
                marginBottom: 12,
                flexWrap: 'wrap',
                opacity: legendVisible ? 1 : 0,
                transform: legendVisible ? 'translateY(0)' : 'translateY(-30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {departmentLegend.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={idx}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 8,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      opacity: legendVisible ? 1 : 0,
                      transform: legendVisible ? 'scale(1)' : 'scale(0.8)',
                      transitionDelay: legendVisible ? `${idx * 0.1}s` : '0s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <div style={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '50%', 
                      backgroundColor: item.color,
                      border: '1px solid rgba(255,255,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }}>
                      <IconComponent style={{ width: 16, height: 16, color: '#2C2C2C' }} />
                    </div>
                    <span style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: '#2C2C2C',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.dept}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Organizational Chart */}
            <div 
              ref={chartRef}
              style={{
                background: 'linear-gradient(135deg, rgba(180, 242, 295, 0.15) 0%, rgba(180, 242, 225, 0.15) 80%, rgba(255, 179, 186, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 24,
                backdropFilter: 'blur(25px)',
                padding: '32px 32px 70px 32px',
                position: 'relative',
                minHeight: '850px',
                height: 'auto',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                opacity: chartVisible ? 1 : 0,
                transform: chartVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 50%, rgba(255, 179, 186, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(180, 242, 225, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              
              {/* Connection Lines */}
              {organizationNodes.map(node => 
                node.connections.map(targetId => {
                  const targetNode = organizationNodes.find(n => n.id === targetId);
                  if (!targetNode) return null;
                  
                  const deltaX = targetNode.x - node.x;
                  const deltaY = targetNode.y - node.y;
                  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                  
                  return (
                    <div
                      key={`${node.id}-${targetId}`}
                      style={{
                        position: 'absolute',
                        background: getGradientForConnection(node.color, targetNode.color),
                        height: hoveredNode === node.id || hoveredNode === targetId ? 4 : 3,
                        transformOrigin: 'left center',
                        opacity: visibleNodes.has(node.id) && visibleNodes.has(targetId) ? 
                          (hoveredNode === node.id || hoveredNode === targetId ? 0.9 : 0.5) : 0,
                        transition: 'all 0.5s ease',
                        zIndex: 1,
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: `${distance * 0.7}%`,
                        transform: `rotate(${angle}deg)`,
                        transitionDelay: `${Math.max(node.id, targetId) * 0.05}s`,
                        borderRadius: '2px'
                      }}
                    />
                  );
                })
              )}

              {/* Organization Nodes */}
              {organizationNodes.map((node, index) => {
                const IconComponent = node.icon;
                const nodeSize = getNodeSize(node.size);
                const zIndex = node.id === 0 ? 50 : (hoveredNode === node.id ? 10 : 2);
                const rgb = hexToRgb(node.color);
                const glowColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)` : node.color;

                return (
                  <div
                    key={node.id}
                    style={{
                      position: 'absolute',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.4s ease',
                      transform: visibleNodes.has(index) ? 
                        (hoveredNode === node.id ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)') :
                        'translate(-50%, -50%) scale(0)',
                      opacity: visibleNodes.has(index) ? 1 : 0,
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      zIndex: zIndex,
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      width: `${nodeSize.width}px`,
                      height: `${nodeSize.height}px`,
                      backgroundColor: node.color,
                      animationDelay: `${index * 0.08}s`,
                      filter: hoveredNode === node.id ? 'brightness(1.1)' : 'brightness(1)'
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <IconComponent 
                      style={{
                        width: node.size === 'large' ? 42 : node.size === 'medium' ? 30 : 22,
                        height: node.size === 'large' ? 42 : node.size === 'medium' ? 30 : 22,
                        color: '#2C2C2C',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: hoveredNode === node.id ? 'translateX(-50%) scale(1.05)' : 'translateX(-50%)',
                      marginTop: 8,
                      fontSize: hoveredNode === node.id ? 11 : 10,
                      fontWeight: 700,
                      color: '#000',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      zIndex: 20,
                      background: `linear-gradient(135deg, ${node.color}30, rgba(255, 255, 255, 0.95))`,
                      padding: hoveredNode === node.id ? '6px 12px' : '5px 10px',
                      borderRadius: 8,
                      maxWidth: 140,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      transition: 'all 0.3s ease',
                      border: `1px solid ${node.color}40`,
                      backdropFilter: 'blur(10px)'
                    }}>
                      {node.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          text-shadow: none !important;
          box-shadow: none !important;
        }

        @keyframes particlePulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        /* Desktop Large (1920px+) */
        @media (min-width: 1920px) {
          .page-header-title {
            font-size: 4rem !important;
          }
        }

        /* Desktop (1440px - 1919px) */
        @media (min-width: 1440px) and (max-width: 1919px) {
          .page-header-title {
            font-size: 3.5rem !important;
          }
        }

        /* Laptop & Small Desktop (1200px - 1439px) */
        @media (min-width: 1200px) and (max-width: 1439px) {
          .page-header-title {
            font-size: 3.2rem !important;
          }
        }

        /* Laptop (1024px - 1199px) */
        @media (min-width: 1024px) and (max-width: 1199px) {
          .page-header-title {
            font-size: 2.8rem !important;
          }
          div[style*="minHeight: 850px"] {
            min-height: 700px !important;
          }
        }

        /* Tablet Landscape (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .page-header-title {
            font-size: 2.8rem !important;
          }
          .page-header-underline {
            width: 240px !important;
          }
          div[style*="padding: 32px 32px 70px 32px"] {
            padding: 24px 24px 60px 24px !important;
          }
          div[style*="minHeight: 850px"] {
            min-height: 650px !important;
          }
        }

        /* Tablet Portrait & Large Mobile (600px - 767px) */
        @media (min-width: 600px) and (max-width: 767px) {
          .page-header-title {
            font-size: 2.3rem !important;
          }
          .page-header-underline {
            width: 200px !important;
          }
          div[style*="padding: 32px 32px 70px 32px"] {
            padding: 20px 20px 50px 20px !important;
          }
          div[style*="minHeight: 850px"] {
            min-height: 600px !important;
          }
        }

        /* Mobile Large (480px - 599px) */
        @media (min-width: 480px) and (max-width: 599px) {
          .page-header-title {
            font-size: 2.3rem !important;
            letter-spacing: 1px !important;
          }
          .page-header-underline {
            width: 180px !important;
          }
          div[style*="minHeight: 850px"] {
            min-height: 550px !important;
          }
        }

        /* Mobile Medium & Small (max 479px) */
        @media (max-width: 479px) {
          .page-header-title {
            font-size: 1.9rem !important;
            letter-spacing: 1px !important;
          }
          .page-header-underline {
            width: 160px !important;
            height: 4px !important;
          }
          div[style*="padding: 32px 32px 70px 32px"] {
            padding: 16px 16px 40px 16px !important;
          }
          div[style*="minHeight: 850px"] {
            min-height: 500px !important;
          }
          div[style*="gap: 24"] {
            gap: 16px !important;
          }
        }

        /* Extra Small Mobile (max 360px) */
        @media (max-width: 360px) {
          .page-header-title {
            font-size: 1.7rem !important;
          }
          .page-header-underline {
            width: 140px !important;
          }
        }

        /* Landscape Orientation */
        @media (max-height: 600px) and (orientation: landscape) {
          div[style*="minHeight: 850px"] {
            min-height: 450px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OrganizationalChart;
