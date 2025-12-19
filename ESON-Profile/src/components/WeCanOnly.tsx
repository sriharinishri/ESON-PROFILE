import { useEffect, useRef } from 'react';
import { Target, Lightbulb, MessageSquare, Sparkles } from 'lucide-react';

const planningItems = [
  {
    title: 'Strategic Planning',
    description: 'Defining vision, setting goals, and aligning resources for success',
    icon: Target,
    color: '#3498db',
    cornerPosition: { top: '8%', left: '8%' }
  },
  {
    title: 'Idea Development',
    description: 'Generating breakthrough ideas that drive innovation and business transformation.',
    icon: Lightbulb,
    color: '#FDFD99',
    cornerPosition: { top: '8%', right: '8%' }
  },
  {
    title: 'Collaborative Solutions',
    description: 'Working together to solve challenges through shared expertise.',
    icon: MessageSquare,
    color: '#BFAED9',
    cornerPosition: { bottom: '8%', left: '8%' }
  },
  {
    title: 'Innovation Excellence',
    description: 'Relentless pursuit of innovation excellence that disrupts and leads.',
    icon: Sparkles,
    color: '#FFB3BA',
    cornerPosition: { bottom: '8%', right: '8%' }
  }
];

const WeCanOnly = () => {
  const sectionRef = useRef(null);
  const boardRef = useRef(null);
  const headerRef = useRef(null);
  const underlineRef = useRef(null);

  const boxRefs = useRef([]);
  const cornerIconRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      style={{
        minHeight: '100vh',
        padding: '2rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%'
        }}
      >
        <div
          ref={headerRef}
          className="animate-on-scroll"
          style={{ textAlign: 'center', marginBottom: 70, padding: '2rem 1rem 0' }}
        >
          <h2
            style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              marginBottom: 16,
              color: '#333333',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            WE DO IT BETTER
          </h2>
          <div
            ref={underlineRef}
            style={{
              height: 5,
              width: 280,
              background:
                'linear-gradient(90deg, #3498db 0%, #2980b9 33%, #1f5f8f 66%, #3498db 100%)',
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
            A bold vision statement that defines our unique position in shaping the future of technology and transforming possibilities into reality.
          </p>
        </div>

        <div
          className="content-wrapper"
          style={{
            position: 'relative',
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 50
          }}
        >
          <div
            className="content-boxes"
            style={{
              flex: '0 0 48%',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              zIndex: 20
            }}
          >
            {planningItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (boxRefs.current[index] = el)}
                  className={`content-box content-box-${index} animate-on-scroll`}
                  style={{
                    background: `linear-gradient(135deg, ${item.color}50, ${item.color}35 50%, ${item.color}20 100%)`,
                    border: `2px solid ${item.color}`,
                    borderRadius: 20,
                    padding: '26px 30px',
                    backdropFilter: 'blur(28px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(28px) saturate(160%)',
                    display: 'flex',
                    gap: 22,
                    alignItems: 'flex-start',
                    transition: 'all 0.6s ease',
                    boxShadow: '0 14px 38px rgba(0,0,0,0.22)',
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <div
                    className="icon-circle"
                    style={{
                      minWidth: 65,
                      height: 65,
                      borderRadius: '50%',
                      background: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(255, 255, 255, 0.28)',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 26px rgba(0,0,0,0.14)'
                    }}
                  >
                    <IconComponent
                      style={{
                        width: 32,
                        height: 32,
                        color: item.color === '#FDFD99' ? '#333' : 'white'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 'bold',
                        color: '#000000',
                        marginBottom: 12,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '1.05rem',
                        lineHeight: 1.65,
                        color: '#000000',
                        opacity: 0.92,
                        margin: 0,
                        wordBreak: 'break-word'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="glass-card-container"
            style={{
              flex: '0 0 45%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div
              ref={boardRef}
              className="glass-board animate-on-scroll"
              style={{
                width: 500,
                height: 500,
             
                   background:'linear-gradient(135deg, rgba(24, 119, 242, 0.18) 0%, rgba(24, 119, 242, 0.32) 35%, rgba(24, 119, 242, 0.18) 70%, rgba(24, 119, 242, 0.12) 100%)',
                borderRadius: 24,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 50px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
                transition: 'all 0.8s ease'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.06), rgba(255,255,255,0.02))',
                  pointerEvents: 'none',
                  zIndex: 2,
                  borderRadius: 24
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(45deg, rgba(52, 152, 219, 0.03) 0%, rgba(253, 253, 150, 0.02) 25%, rgba(191, 174, 217, 0.03) 50%, rgba(255, 179, 186, 0.02) 75%, rgba(52, 152, 219, 0.03) 100%)',
                  backgroundSize: '400% 400%',
                  animation: 'gradientAnimation 15s ease infinite',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />
              <div
                className="board-quote animate-on-scroll"
                style={{
                  textAlign: 'center',
                  zIndex: 5,
                  maxWidth: '85%',
                  position: 'relative',
                  transition: 'all 0.8s ease 0.2s'
                }}
              >
                <p
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    lineHeight: 1.55,
                    color: '#000000',
                    margin: 0,
                    wordBreak: 'break-word'
                  }}
                >
                  "In a world of infinite possibilities,
                  <span
                    style={{
                      color: '#3498db',
                      fontWeight: 900,
                      display: 'block',
                      marginTop: 10,
                      fontSize: '1.5rem',
                      letterSpacing: '0.5px'
                    }}
                  >
                    we are the architects
                  </span>
                  <span style={{ display: 'block', marginTop: 10 }}>
                    who turn the impossible into inevitable."
                  </span>
                </p>
              </div>
              {planningItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => (cornerIconRefs.current[index] = el)}
                    className={`corner-icon-wrapper corner-icon-${index} animate-on-scroll`}
                    style={{
                      position: 'absolute',
                      ...item.cornerPosition,
                      zIndex: 10,
                      transition: 'all 0.6s ease',
                      transitionDelay: `${0.4 + index * 0.1}s`
                    }}
                  >
                    <div
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        background: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        position: 'relative',
                        boxShadow: '0 10px 26px rgba(0,0,0,0.12)'
                      }}
                    >
                      <IconComponent
                        style={{
                          width: 35,
                          height: 35,
                          color: item.color === '#FDFD99' ? '#333' : 'white'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: -8,
                          borderRadius: '50%',
                          border: `1px solid ${item.color}`,
                          opacity: 0.4
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Animation classes */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .content-box.animate-on-scroll {
          transform: translateX(-40px) translateY(0);
          opacity: 0;
        }
        
        .content-box.animate-on-scroll.animate-in {
          transform: translateX(0) translateY(0);
          opacity: 1;
        }
        
        .glass-board.animate-on-scroll {
          transform: scale(0.92);
          opacity: 0;
        }
        
        .glass-board.animate-on-scroll.animate-in {
          transform: scale(1);
          opacity: 1;
        }
        
        .corner-icon-wrapper.animate-on-scroll {
          transform: scale(0) rotate(-90deg);
          opacity: 0;
        }
        
        .corner-icon-wrapper.animate-on-scroll.animate-in {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
        
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .content-box {
          transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease;
        }
        
        .content-box:hover {
          transform: translateX(10px) translateY(0) !important;
          box-shadow: 0 22px 48px rgba(0,0,0,0.28);
        }
        
        .icon-circle {
          transition: transform 0.3s ease;
        }
        
        .content-box:hover .icon-circle {
          transform: scale(1.1) rotate(8deg);
        }
        
        .board-quote p, .content-box p {
          word-wrap: break-word;
          overflow-wrap: anywhere;
        }
        
        /* Responsive Media Queries */
        @media (max-width: 1200px) {
          .content-wrapper {
            flex-direction: column !important;
            gap: 32px !important;
            align-items: center !important;
          }
          .content-boxes, .glass-card-container {
            flex: 1 1 100% !important;
            max-width: 480px;
            margin: 0 auto;
          }
          .glass-card-container {
            width: 100% !important;
            padding: 0 15px;
            box-sizing: border-box;
          }
          .glass-board {
            width: 100% !important;
            max-width: 420px !important;
            height: 340px !important;
            padding: 32px 20px !important;
            box-sizing: border-box;
          }
          h2 {
            font-size: 2.1rem !important;
          }
          .content-box h3 {
            font-size: 1.09rem !important;
          }
          .content-box p {
            font-size: 0.98rem !important;
          }
        }
        
        @media (max-width: 768px) {
          #vision {
            padding: 1.75rem 0 !important;
          }
          .glass-card-container {
            padding: 0 10px;
          }
          .glass-board {
            max-width: 100% !important;
            width: 100% !important;
            height: 260px !important;
            padding: 24px 16px !important;
            box-sizing: border-box;
          }
          .corner-icon-wrapper > div {
            width: 35px !important;
            height: 35px !important;
          }
          .corner-icon-wrapper svg {
            width: 18px !important;
            height: 18px !important;
          }
          .content-box {
            padding: 14px 12px !important;
            gap: 11px !important;
            border-radius: 12px !important;
          }
          .icon-circle {
            min-width: 30px !important;
            height: 30px !important;
          }
          .icon-circle svg {
            width: 15px !important;
            height: 15px !important;
          }
          .content-box h3 {
            font-size: 1rem !important;
            margin-bottom: 7px !important;
          }
          .content-box p, .board-quote p {
            font-size: 0.93rem !important;
            line-height: 1.38 !important;
          }
          h2 {
            font-size: 1.27rem !important;
            margin-bottom: 10px !important;
          }
        }
        
        @media (max-width: 480px) {
          .glass-card-container {
            padding: 0 8px;
          }
          .glass-board {
            width: 100% !important;
            max-width: 100vw !important;
            height: 150px !important;
            padding: 14px 8px !important;
            border-radius: 10px !important;
            box-sizing: border-box;
          }
          .content-wrapper {
            min-height: unset !important;
            gap: 17px !important;
          }
          .content-boxes, .glass-card-container {
            max-width: 98vw !important;
          }
          .content-box {
            padding: 10px 5px !important;
            gap: 8px !important;
          }
          .icon-circle {
            min-width: 24px !important;
            height: 24px !important;
          }
          .corner-icon-wrapper > div {
            width: 17px !important;
            height: 17px !important;
            border-radius: 6px !important;
          }
          .corner-icon-wrapper svg {
            width: 9px !important;
            height: 9px !important;
          }
          h2 {
            font-size: 1rem !important;
          }
          .content-box h3 {
            font-size: 0.9rem !important;
          }
          .content-box p, .board-quote p {
            font-size: 0.85rem !important;
            line-height: 1.25 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WeCanOnly;
