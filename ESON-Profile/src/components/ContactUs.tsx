import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Globe,
  Briefcase,
  Users,
  Award,
  Server,
  Heart,
  Star,
  Target,
  Zap,
  Building,
  Activity,
  Smile
} from 'lucide-react';

const ContactUs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [chartAnimationComplete, setChartAnimationComplete] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const allStats = [
    { label: 'Projects', value: 49, suffix: '+', icon: Briefcase, color: '#FFB3BA', maxValue: 50, name: 'Foundation' },
    { label: 'Clients', value: 7, suffix: '+', icon: Globe, color: '#BFAED9', maxValue: 10, name: 'Vision' },
    { label: 'Experience', value: 7, suffix: 'Yrs', icon: Award, color: '#B4F2E1', maxValue: 10, name: 'Operations' },
    { label: 'Support', value: 24, suffix: '/7', icon: Clock, color: '#3498db', maxValue: 24, name: 'Design' },
    { label: 'Employees', value: 89, suffix: '+', icon: Users, color: '#FFB3BA', maxValue: 100, name: 'Management' },
    { label: 'Departments', value: 15, suffix: '+', icon: Building, color: '#BFAED9', maxValue: 20, name: 'Development' },
    { label: 'Retention', value: 95, suffix: '%', icon: Heart, color: '#FFD1A0', maxValue: 100, name: 'Retention' },
    { label: 'Uptime', value: 24, suffix: '/7', icon: Server, color: '#3498db', maxValue: 24, name: 'Uptime' },
    { label: 'Industries', value: 11, suffix: '+', icon: Target, color: '#FFF2B3', maxValue: 15, name: 'Industries' },
    { label: 'Satisfaction', value: 99.99, suffix: '%', icon: Star, color: '#C8E6C9', maxValue: 100, name: 'Satisfaction' },
    { label: 'Happy Clients', value: 15, suffix: '+', icon: Smile, color: '#FFB5B5', maxValue: 20, name: 'Production' },
    { label: 'Technologies', value: 25, suffix: '+', icon: Zap, color: '#B4F2E1', maxValue: 30, name: 'Operations' },
    { label: 'CSR Projects', value: 5, suffix: '+', icon: Target, color: '#FFB3BA', maxValue: 10, name: 'Marshall' },
    { label: 'Investment', value: 32, suffix: 'L', icon: Activity, color: '#FFD1A0', maxValue: 50, name: 'Finance' },
    { label: 'Beneficiaries', value: 23500, suffix: '+', icon: Users, color: '#B4F2E1', maxValue: 30000, name: 'Subbiah' },
    { label: 'Trees Planted', value: 2000, suffix: '+', icon: Activity, color: '#BFAED9', maxValue: 3000, name: 'Anitha' }
  ];

  useEffect(() => {
    allStats.forEach((stat) => {
      let current = 0;
      const increment = stat.value / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [stat.label]: current }));
      }, 25);
    });

    const chartCompleteTimer = setTimeout(() => {
      setChartAnimationComplete(true);
    }, 2000);

    return () => clearTimeout(chartCompleteTimer);
  }, []);

  return (
    <section style={{ 
      minHeight: '100vh',
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent'
    }}>
      {/* Mouse Follow Effect */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        pointerEvents: 'none',
        transition: 'all 0.3s ease-out',
        borderRadius: '50%',
        left: mousePosition.x - 300,
        top: mousePosition.y - 300,
        background: 'radial-gradient(circle, rgba(52, 152, 219, 0.08) 0%, rgba(255, 179, 186, 0.05) 40%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1600px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header - NO ANIMATION, BLUE GRADIENT UNDERLINE */}
        <div style={{ textAlign: 'center', marginBottom: 80, padding: '0' }}>
          <h2 
            style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              marginBottom: 16,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            VISION PERFORMANCE
          </h2>
          <div 
            style={{
              height: 5,
              width: 280,
              background: 'linear-gradient(90deg, #3498db 0%, #2980b9 33%, #1f5f8f 66%, #3498db 100%)',
              borderRadius: 10,
              margin: '12px auto 0'
            }}
          />
          <p 
            style={{ 
              fontSize: 18,
              maxWidth: '800px',
              margin: '24px auto 0',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#000000'
            }}
          >
            Discover our comprehensive metrics and achievements that define our excellence and commitment to innovation.
          </p>
        </div>

        {/* Radial Sunburst Visualization */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginBottom: 80,
            position: 'relative'
          }}>
            <svg width="800" height="800" viewBox="0 0 800 800" style={{ maxWidth: '100%', height: 'auto' }}>
              {/* Center Circle */}
              <circle
                className="eson-center-circle"
                cx="400"
                cy="400"
                r="80"
                fill="url(#centerGradient)"
              />
              
              {/* Radial Segments */}
              {allStats.map((stat, index) => {
                const angle = (360 / allStats.length) * index;
                const nextAngle = (360 / allStats.length) * (index + 1);
                const innerRadius = 100;
                const outerRadius = 100 + ((animatedValues[stat.label] || 0) / stat.maxValue) * 200;
                
                const startAngleRad = (angle - 90) * (Math.PI / 180);
                const endAngleRad = (nextAngle - 90) * (Math.PI / 180);
                
                const x1 = 400 + innerRadius * Math.cos(startAngleRad);
                const y1 = 400 + innerRadius * Math.sin(startAngleRad);
                const x2 = 400 + outerRadius * Math.cos(startAngleRad);
                const y2 = 400 + outerRadius * Math.sin(startAngleRad);
                const x3 = 400 + outerRadius * Math.cos(endAngleRad);
                const y3 = 400 + outerRadius * Math.sin(endAngleRad);
                const x4 = 400 + innerRadius * Math.cos(endAngleRad);
                const y4 = 400 + innerRadius * Math.sin(endAngleRad);
                
                const largeArc = nextAngle - angle > 180 ? 1 : 0;
                
                const path = `
                  M ${x1} ${y1}
                  L ${x2} ${y2}
                  A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3}
                  L ${x4} ${y4}
                  A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}
                  Z
                `;
                
                const labelRadius = outerRadius + 30;
                const labelAngle = ((angle + nextAngle) / 2 - 90) * (Math.PI / 180);
                const labelX = 400 + labelRadius * Math.cos(labelAngle);
                const labelY = 400 + labelRadius * Math.sin(labelAngle);
                
                const displayValue = stat.suffix === '%' ? (animatedValues[stat.label] || 0).toFixed(2) : 
                                   stat.value >= 1000 ? Math.floor(animatedValues[stat.label] || 0).toLocaleString() : 
                                   Math.floor(animatedValues[stat.label] || 0);
                
                const lightColors = ['#FFF2B3', '#FFD1A0', '#FFB5B5', '#C8E6C9', '#B4F2E1'];
                const textColor = lightColors.includes(stat.color) ? '#666' : stat.color;
                
                return (
                  <g key={index}>
                    <path
                      d={path}
                      fill={stat.color}
                      opacity={hoveredBar === index ? 0.9 : 0.7}
                      style={{
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                    {chartAnimationComplete && (
                      <>
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor="middle"
                          style={{
                            fill: '#333',
                            fontSize: '12px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            pointerEvents: 'none'
                          }}
                        >
                          {stat.label}
                        </text>
                        <text
                          x={labelX}
                          y={labelY + 15}
                          textAnchor="middle"
                          style={{
                            fill: textColor,
                            fontSize: '16px',
                            fontWeight: 900,
                            pointerEvents: 'none'
                          }}
                        >
                          {displayValue}{stat.suffix}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
              
              {/* Center Text */}
              <text
                x="400"
                y="395"
                textAnchor="middle"
                style={{
                  fill: '#fff',
                  fontSize: '24px',
                  fontWeight: 900,
                  textTransform: 'uppercase'
                }}
              >
                ESON
              </text>
              <text
                x="400"
                y="420"
                textAnchor="middle"
                style={{
                  fill: '#fff',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                Performance
              </text>
              
              <defs>
                <radialGradient id="centerGradient">
                  <stop offset="0%" stopColor="#3498db" />
                  <stop offset="50%" stopColor="#BFAED9" />
                  <stop offset="100%" stopColor="#FFB3BA" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Contact Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.05), rgba(191, 174, 217, 0.05))',
          borderRadius: 20,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '40px 50px',
          border: '1px solid rgba(52, 152, 219, 0.15)',
          marginTop: 60
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            marginBottom: 30,
            color: '#3498db',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'center'
          }}>
            Engage with Eson
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 25
          }}>
            {[
              { 
                icon: MapPin, 
                title: 'Chennai HQ', 
                content: '2nd Floor, No. 152, Maruthi Complex, JN Street, Arumbakkam, Chennai - 600106',
                color: '#3498db'
              },
              
              { 
                icon: Phone, 
                title: 'Call Us', 
                content: '+91 9003923500 | +91 8754138137',
                color: '#FFB3BA'
              },
              { 
                icon: Mail, 
                title: 'Email Us', 
                content: 'esontuty@gmail.com | dealzta.ai@gmail.com',
                color: '#B4F2E1'
              },
              { 
                icon: Clock, 
                title: 'Working Hours', 
                content: 'Mon-Fri: 9AM-6PM | Sat: 9AM-4PM | Sun: Closed',
                color: '#BFAED9'
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              
              return (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    gap: 15, 
                    alignItems: 'flex-start',
                    padding: 0,
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: `1px solid ${item.color}20`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = item.color + '40';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = item.color + '20';
                  }}
                >
                  <div style={{
                    minWidth: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: item.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComponent style={{ width: 20, height: 20, color: item.color }} />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: '0.95rem', 
                      fontWeight: 700, 
                      marginBottom: 6, 
                      color: '#333',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{ 
                      fontSize: '0.85rem', 
                      color: '#555', 
                      lineHeight: 1.5,
                      margin: 0,
                      fontWeight: 500
                    }}>
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        * {
          text-shadow: none !important;
          box-shadow: none !important;
        }

        @media (min-width: 1440px) {
          h2 { font-size: 3.5rem !important; }
        }

        @media (max-width: 1023px) {
          h2 { font-size: 2.8rem !important; }
          svg[viewBox="0 0 800 800"] { max-width: 600px; }
        }

        @media (max-width: 767px) {
          h2 { font-size: 2.3rem !important; }
          div[style*="width: 280px"] { width: 220px !important; }
          svg[viewBox="0 0 800 800"] { max-width: 450px; }
          svg text { font-size: 10px !important; }
        }

        /* Large-screen fixes: ensure the Engage card has extra bottom padding so it isn't hidden,
           and make the central ESON performance circle solid blue on large screens */
        @media (min-width: 1024px) {
          div[style*="padding: 40px 50px"] { padding: 40px 50px 120px !important; }
          .eson-center-circle { fill: #3498db !important; }
          section { padding-bottom: 4rem !important; }
        }

        @media (max-width: 479px) {
          h2 { font-size: 1.9rem !important; }
          div[style*="width: 280px"] { width: 160px !important; }
          svg text { font-size: 8px !important; }
          div[style*="padding: 40px 50px"] { padding: 20px 15px !important; }
        }
      `}</style>
    </section>
  );
};

export default ContactUs;
