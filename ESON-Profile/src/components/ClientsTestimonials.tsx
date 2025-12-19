import React, { useEffect, useState } from 'react';
import { Star, Quote, User } from 'lucide-react';
import esonLogo from '../assets/images/esonpo.png';
import boldly from '../assets/images/boldly.png';
import nimalan from '../assets/images/nimalan.png';
import printapp from '../assets/images/printapp.png';
import harrington from '../assets/images/harrington.png';
import drive from '../assets/images/drive.png';
import dealzta from '../assets/images/dealzta.png';
import dns from '../assets/images/dns.png';

const ClientsTestimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Subbaih',
      position: 'Managing Partner',
      company: 'Nimalaan Energies',
      rating: 5,
      testimonial:
        "Eson Infotech transformed our vision into a powerful online presence. Their team was professional, responsive, and delivered beyond expectations. Our new website truly reflects our brand's identity.",
      project: 'Website Development',
      color: '#3498db',
      companyId: 0,
    },
    {
      name: 'Shilpa',
      position: 'Chief Operating Officer',
      company: 'Boldly English',
      rating: 5,
      testimonial:
        "Working with Eson Infotech was a seamless experience. They understood our needs perfectly and built a platform that's fast, user-friendly, and visually appealing. Highly recommended!",
      project: 'Platform Development',
      color: '#FFF2B3',
      companyId: 1,
    },
    {
      name: 'Anitha',
      position: 'Operations Coordinator',
      company: 'The Print App',
      rating: 5,
      testimonial:
        'The Eson Infotech team delivered both our website and mobile app with great quality and attention to detail. Their technical expertise and commitment helped us scale our print business efficiently.',
      project: 'Website & Mobile App',
      color: '#BFAED9',
      companyId: 2,
    },
    {
      name: 'Lincy',
      position: 'Office Administrator',
      company: 'DNS Solutions',
      rating: 5,
      testimonial:
        'Exceptional service quality and technical expertise. Eson Infotech delivered our enterprise solution on time and within budget. Their ongoing support has been invaluable for our business growth.',
      project: 'Enterprise System',
      color: '#FFB3BA',
      companyId: 3,
    },
    {
      name: 'Chitra',
      position: 'Unit Manager',
      company: 'Drive & Style Automotive',
      rating: 5,
      testimonial:
        'Outstanding e-commerce platform development! The team understood our automotive business needs perfectly and created a user-friendly interface that significantly boosted our online sales.',
      project: 'E-commerce Platform',
      color: '#3498db',
      companyId: 4,
    },
    {
      name: 'Kathiresan',
      position: 'Placement Assistant',
      company: 'Harrington Medical Billing',
      rating: 5,
      testimonial:
        'Professional, reliable, and efficient. Eson Infotech developed a comprehensive medical billing system that streamlined our operations and improved our workflow tremendously.',
      project: 'Medical Billing System',
      color: '#FFF2B3',
      companyId: 5,
    },
    {
      name: 'Brinda',
      position: 'Vice President',
      company: 'Dealzta',
      rating: 5,
      testimonial:
        'Amazing team with great technical skills! They built our deals platform with excellent functionality and modern design. The project was completed ahead of schedule with exceptional quality.',
      project: 'Deals Platform',
      color: '#BFAED9',
      companyId: 6,
    },
  ];

  const clientLogos = [
    {
      name: 'Nimalaan Energies',
      shortName: 'Nimalaan',
      industry: 'Renewable Energy',
      image: nimalan,
      color: '#3498db',
    },
    {
      name: 'Boldly English',
      shortName: 'Boldly',
      industry: 'Education',
      image: boldly,
      color: '#FFF2B3',
    },
    {
      name: 'The Print App',
      shortName: 'PrintApp',
      industry: 'Printing Services',
      image: printapp,
      color: '#BFAED9',
    },
    {
      name: 'DNS Solutions',
      shortName: 'DNS',
      industry: 'IT Services',
      image: dns,
      color: '#FFB3BA',
    },
    {
      name: 'Drive & Style',
      shortName: 'Drive&Style',
      industry: 'Automotive',
      image: drive,
      color: '#3498db',
    },
    {
      name: 'Harrington Medical',
      shortName: 'Harrington',
      industry: 'Healthcare',
      image: harrington,
      color: '#FFF2B3',
    },
    {
      name: 'Dealzta',
      shortName: 'Dealzta',
      industry: 'E-commerce',
      image: dealzta,
      color: '#BFAED9',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getGradientColors = (color) => {
    const rgb = hexToRgb(color);
    if (!rgb) return { light: color, medium: color };
    return {
      light: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`,
      medium: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
      border: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`,
    };
  };

  const activeColors = getGradientColors(testimonials[activeTestimonial].color);
  const activeClient = clientLogos[testimonials[activeTestimonial].companyId] || clientLogos[0];

  return (
    <section
      id="testimonials"
      style={{
        padding: '4rem 0 3rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* Colorful Floating Particles - KEPT */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {Array.from({ length: 30 }).map((_, i) => {
          const colors = [
            'rgba(52, 152, 219, 0.5)',
            'rgba(255, 242, 179, 0.5)',
            'rgba(191, 174, 217, 0.5)',
            'rgba(255, 179, 186, 0.5)',
          ];
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: colors[i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particlePulse ${3 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 4}s`,
              }}
            />
          );
        })}
      </div>

      {/* REMOVED: Colorful Floating Geometric Elements */}

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header - REDUCED MARGIN BOTTOM */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2
            className="testimonials-header"
            style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              marginBottom: 16,
              color: '#333333',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            ESON SUCCESS NETWORKS
          </h2>
          <div
            style={{
              height: 5,
              width: 280,
              background: '#3498db',
              borderRadius: 10,
              margin: '12px auto 0',
              animation: 'gradientShift 8s ease-in-out infinite',
            }}
          />
          <p
            className="testimonials-description"
            style={{
              fontSize: 18,
              maxWidth: '800px',
              margin: '20px auto 0',
              fontWeight: 400,
              lineHeight: 1.6,
              color: '#000000',
            }}
          >
            At Eson Infotech Pvt. Ltd., our success is built on client satisfaction. Here's what some of our valued clients have to say about working with us.
          </p>
        </div>

        <div
          className="testimonial-card"
          style={{
            background: `linear-gradient(135deg, ${activeColors.light} 0%, ${activeColors.medium} 100%)`,
            border: `3px solid ${activeColors.border}`,
            borderRadius: 28,
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            padding: '60px 40px 40px 40px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.5s ease',
            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.2)`,
          }}
        >
          <div className="testimonial-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="quote-rating-wrapper" style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
                <Quote className="quote-icon" style={{ width: 52, height: 52, marginRight: 24, color: testimonials[activeTestimonial].color }} />
                <div style={{ display: 'flex' }}>
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="star-icon"
                      style={{
                        width: 32,
                        height: 32,
                        color: '#FFF2B3',
                        fill: '#FFF2B3',
                        stroke: '#8B8000',
                        strokeWidth: 1,
                      }}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="testimonial-text" style={{ fontSize: '1.5rem', lineHeight: 1.7, marginBottom: 32, fontStyle: 'italic', fontWeight: 500, color: '#000000' }}>
                "{testimonials[activeTestimonial].testimonial}"
              </blockquote>

              <div className="author-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  className="author-avatar"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 24,
                    background: `${testimonials[activeTestimonial].color}`,
                    border: '3px solid rgba(255,255,255,0.5)',
                  }}
                >
                  <User className="user-icon" style={{ width: 40, height: 40, color: testimonials[activeTestimonial].color === '#FFF2B3' ? '#333' : 'white' }} />
                </div>
                <div>
                  <div className="author-name" style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: 4, color: '#000000' }}>
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="author-position" style={{ fontSize: '1.1rem', marginBottom: 4, color: '#000000' }}>{testimonials[activeTestimonial].position}</div>
                  <div className="author-company" style={{ fontSize: '0.9rem', color: '#000000' }}>{testimonials[activeTestimonial].company}</div>
                </div>
              </div>
            </div>

            <div className="project-display" style={{ textAlign: 'center' }}>
              <div
                style={{
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img className="client-logo-large" src={activeClient.image} alt={activeClient.name} style={{ width: '220px', height: '220px', objectFit: 'contain' }} />
              </div>
              <div className="project-name" style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: 12, color: '#000000' }}>{testimonials[activeTestimonial].project}</div>
              <div className="project-label" style={{ fontWeight: 500, color: '#333333' }}>Project Delivered</div>
            </div>
          </div>

          {/* Trusted Partners Bar */}
          <div
            className="trusted-partners-wrapper"
            style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: `2px solid ${activeColors.border}`,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              className="partners-grid"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'transparent',
                borderRadius: 0,
                padding: '20px 0',
                border: 'none',
                outline: 'none',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              {clientLogos.map((client, index) => {
                const isActive = testimonials[activeTestimonial].companyId === index;

                return (
                  <div
                    key={index}
                    className="partner-item"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      opacity: isActive ? 1 : 0.6,
                      minWidth: 90,
                    }}
                    onClick={() => {
                      const testimonialIndex = testimonials.findIndex((t) => t.companyId === index);
                      if (testimonialIndex !== -1) setActiveTestimonial(testimonialIndex);
                    }}
                  >
                    <div
                      className="partner-logo-wrapper"
                      style={{
                        width: 80,
                        height: 50,
                        borderRadius: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 8,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        padding: 8,
                        overflow: 'hidden',
                      }}
                    >
                      <img 
                        className="partner-logo"
                        src={client.image} 
                        alt={client.name} 
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          objectFit: 'contain' 
                        }} 
                      />
                    </div>
                    <div
                      className="partner-name"
                      style={{
                        fontSize: isActive ? '0.85rem' : '0.7rem',
                        fontWeight: isActive ? 'bold' : '500',
                        color: '#000000',
                        textAlign: 'center',
                        opacity: isActive ? 1 : 0.7,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {client.shortName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40, gap: 14 }}>
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: index === activeTestimonial ? `3px solid ${testimonial.color}` : '2px solid rgba(156, 163, 175, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                transform: index === activeTestimonial ? 'scale(1.3)' : 'scale(1)',
                background: index === activeTestimonial ? `${testimonial.color}` : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(5px)',
              }}
              onClick={() => setActiveTestimonial(index)}
              onMouseEnter={(e) => {
                if (index !== activeTestimonial) e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                if (index !== activeTestimonial) e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
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

        @keyframes gradientShift {
          0%, 100% {
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(20deg) brightness(1.1);
          }
        }

        /* ===== LAPTOP (1024px - 1439px) ===== */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .testimonials-header {
            font-size: 2.8rem !important;
          }
          .testimonial-card {
            padding: 50px 35px 35px 35px !important;
          }
          .testimonial-text {
            font-size: 1.3rem !important;
          }
        }

        /* ===== TABLET (768px - 1023px) ===== */
        @media (min-width: 768px) and (max-width: 1023px) {
          .testimonials-header {
            font-size: 2.5rem !important;
          }
          .testimonials-description {
            font-size: 16px !important;
          }
          .testimonial-card {
            padding: 40px 30px 30px 30px !important;
          }
          .testimonial-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .testimonial-text {
            font-size: 1.2rem !important;
          }
          .client-logo-large {
            width: 180px !important;
            height: 180px !important;
          }
          .partners-grid {
            justify-content: center !important;
            gap: 16px !important;
          }
          .partner-item {
            min-width: 80px !important;
          }
          .partner-logo-wrapper {
            width: 70px !important;
            height: 45px !important;
          }
          .partner-logo {
            width: 70px !important;
            height: 70px !important;
          }
        }

        /* ===== MOBILE LARGE (640px - 767px) ===== */
        @media (min-width: 640px) and (max-width: 767px) {
          div[style*="margin-bottom: 32"] {
            margin-bottom: 24px !important;
          }
          .testimonials-header {
            font-size: 2.2rem !important;
            padding: 0 15px;
          }
          .testimonials-description {
            font-size: 15px !important;
            padding: 0 10px;
          }
          .testimonial-card {
            padding: 30px 20px 20px 20px !important;
            border-radius: 20px !important;
          }
          .testimonial-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .quote-rating-wrapper {
            margin-bottom: 20px !important;
          }
          .quote-icon {
            width: 40px !important;
            height: 40px !important;
            margin-right: 16px !important;
          }
          .star-icon {
            width: 24px !important;
            height: 24px !important;
          }
          .testimonial-text {
            font-size: 1.1rem !important;
            margin-bottom: 24px !important;
          }
          .author-avatar {
            width: 60px !important;
            height: 60px !important;
            margin-right: 16px !important;
          }
          .user-icon {
            width: 30px !important;
            height: 30px !important;
          }
          .author-name {
            font-size: 1.1rem !important;
          }
          .author-position {
            font-size: 0.95rem !important;
          }
          .author-company {
            font-size: 0.85rem !important;
          }
          .client-logo-large {
            width: 150px !important;
            height: 150px !important;
          }
          .project-name {
            font-size: 1.1rem !important;
          }
          .project-label {
            font-size: 0.9rem !important;
          }
          
          .trusted-partners-wrapper {
            margin-top: 32px !important;
            padding-top: 24px !important;
          }
          .partners-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 12px !important;
            padding: 16px 0 !important;
          }
          .partner-item {
            min-width: auto !important;
            width: 100% !important;
          }
          .partner-logo-wrapper {
            width: 60px !important;
            height: 40px !important;
            margin: 0 auto 6px !important;
          }
          .partner-logo {
            width: 60px !important;
            height: 60px !important;
          }
          .partner-name {
            font-size: 0.65rem !important;
          }
        }

        /* ===== MOBILE MEDIUM (480px - 639px) ===== */
        @media (min-width: 480px) and (max-width: 639px) {
          div[style*="margin-bottom: 32"] {
            margin-bottom: 20px !important;
          }
          .testimonials-header {
            font-size: 1.9rem !important;
            padding: 0 12px;
          }
          .testimonials-description {
            font-size: 14px !important;
            padding: 0 10px;
          }
          .testimonial-card {
            padding: 25px 18px 18px 18px !important;
            border-radius: 18px !important;
          }
          .testimonial-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .quote-rating-wrapper {
            margin-bottom: 16px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px;
          }
          .quote-icon {
            width: 36px !important;
            height: 36px !important;
            margin-right: 0 !important;
          }
          .star-icon {
            width: 20px !important;
            height: 20px !important;
          }
          .testimonial-text {
            font-size: 1rem !important;
            line-height: 1.6 !important;
            margin-bottom: 20px !important;
          }
          .author-wrapper {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
          }
          .author-avatar {
            width: 50px !important;
            height: 50px !important;
            margin-right: 0 !important;
            margin-bottom: 12px !important;
          }
          .user-icon {
            width: 25px !important;
            height: 25px !important;
          }
          .author-name {
            font-size: 1rem !important;
          }
          .author-position {
            font-size: 0.9rem !important;
          }
          .author-company {
            font-size: 0.8rem !important;
          }
          .project-display {
            display: none !important;
          }
          
          .trusted-partners-wrapper {
            margin-top: 28px !important;
            padding-top: 20px !important;
          }
          .partners-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 10px !important;
            padding: 14px 0 !important;
          }
          .partner-item {
            min-width: auto !important;
            width: 100% !important;
          }
          .partner-logo-wrapper {
            width: 50px !important;
            height: 35px !important;
            margin: 0 auto 5px !important;
          }
          .partner-logo {
            width: 50px !important;
            height: 50px !important;
          }
          .partner-name {
            font-size: 0.6rem !important;
          }
        }

        /* ===== MOBILE SMALL (375px - 479px) ===== */
        @media (min-width: 375px) and (max-width: 479px) {
          div[style*="margin-bottom: 32"] {
            margin-bottom: 18px !important;
          }
          .testimonials-header {
            font-size: 1.7rem !important;
            padding: 0 10px;
          }
          .testimonials-description {
            font-size: 13px !important;
            padding: 0 8px;
          }
          .testimonial-card {
            padding: 20px 15px 15px 15px !important;
            border-radius: 16px !important;
          }
          .testimonial-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .quote-rating-wrapper {
            margin-bottom: 14px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px;
          }
          .quote-icon {
            width: 32px !important;
            height: 32px !important;
            margin-right: 0 !important;
          }
          .star-icon {
            width: 18px !important;
            height: 18px !important;
          }
          .testimonial-text {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
            margin-bottom: 18px !important;
          }
          .author-wrapper {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
          }
          .author-avatar {
            width: 45px !important;
            height: 45px !important;
            margin-right: 0 !important;
            margin-bottom: 10px !important;
          }
          .user-icon {
            width: 22px !important;
            height: 22px !important;
          }
          .author-name {
            font-size: 0.95rem !important;
          }
          .author-position {
            font-size: 0.85rem !important;
          }
          .author-company {
            font-size: 0.75rem !important;
          }
          .project-display {
            display: none !important;
          }
          
          .trusted-partners-wrapper {
            margin-top: 24px !important;
            padding-top: 18px !important;
          }
          .partners-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 8px !important;
            padding: 12px 0 !important;
          }
          .partner-item {
            min-width: auto !important;
            width: 100% !important;
          }
          .partner-logo-wrapper {
            width: 45px !important;
            height: 30px !important;
            margin: 0 auto 4px !important;
            padding: 4px !important;
          }
          .partner-logo {
            width: 45px !important;
            height: 45px !important;
          }
          .partner-name {
            font-size: 0.55rem !important;
            line-height: 1.2;
          }
        }

        /* ===== MOBILE EXTRA SMALL (320px - 374px) ===== */
        @media (min-width: 320px) and (max-width: 374px) {
          div[style*="margin-bottom: 32"] {
            margin-bottom: 16px !important;
          }
          .testimonials-header {
            font-size: 1.5rem !important;
            padding: 0 8px;
          }
          .testimonials-description {
            font-size: 12px !important;
            padding: 0 6px;
          }
          .testimonial-card {
            padding: 18px 12px 12px 12px !important;
            border-radius: 14px !important;
          }
          .testimonial-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .quote-rating-wrapper {
            margin-bottom: 12px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px;
          }
          .quote-icon {
            width: 28px !important;
            height: 28px !important;
            margin-right: 0 !important;
          }
          .star-icon {
            width: 16px !important;
            height: 16px !important;
          }
          .testimonial-text {
            font-size: 0.85rem !important;
            line-height: 1.4 !important;
            margin-bottom: 16px !important;
          }
          .author-wrapper {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
          }
          .author-avatar {
            width: 40px !important;
            height: 40px !important;
            margin-right: 0 !important;
            margin-bottom: 8px !important;
          }
          .user-icon {
            width: 20px !important;
            height: 20px !important;
          }
          .author-name {
            font-size: 0.9rem !important;
          }
          .author-position {
            font-size: 0.8rem !important;
          }
          .author-company {
            font-size: 0.7rem !important;
          }
          .project-display {
            display: none !important;
          }
          
          .trusted-partners-wrapper {
            margin-top: 20px !important;
            padding-top: 16px !important;
          }
          .partners-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 6px !important;
            padding: 10px 0 !important;
          }
          .partner-item {
            min-width: auto !important;
            width: 100% !important;
          }
          .partner-logo-wrapper {
            width: 40px !important;
            height: 28px !important;
            margin: 0 auto 3px !important;
            padding: 3px !important;
          }
          .partner-logo {
            width: 40px !important;
            height: 40px !important;
          }
          .partner-name {
            font-size: 0.5rem !important;
            line-height: 1.1;
          }
        }

        /* ===== MOBILE VERY SMALL (<320px) ===== */
        @media (max-width: 319px) {
          div[style*="margin-bottom: 32"] {
            margin-bottom: 14px !important;
          }
          .testimonials-header {
            font-size: 1.3rem !important;
            padding: 0 6px;
          }
          .testimonials-description {
            font-size: 11px !important;
            padding: 0 5px;
          }
          .testimonial-card {
            padding: 15px 10px 10px 10px !important;
            border-radius: 12px !important;
          }
          .testimonial-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .quote-rating-wrapper {
            margin-bottom: 10px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px;
          }
          .quote-icon {
            width: 24px !important;
            height: 24px !important;
            margin-right: 0 !important;
          }
          .star-icon {
            width: 14px !important;
            height: 14px !important;
          }
          .testimonial-text {
            font-size: 0.8rem !important;
            line-height: 1.3 !important;
            margin-bottom: 14px !important;
          }
          .author-wrapper {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
          }
          .author-avatar {
            width: 35px !important;
            height: 35px !important;
            margin-right: 0 !important;
            margin-bottom: 6px !important;
          }
          .user-icon {
            width: 18px !important;
            height: 18px !important;
          }
          .author-name {
            font-size: 0.85rem !important;
          }
          .author-position {
            font-size: 0.75rem !important;
          }
          .author-company {
            font-size: 0.65rem !important;
          }
          .project-display {
            display: none !important;
          }
          
          .trusted-partners-wrapper {
            margin-top: 18px !important;
            padding-top: 14px !important;
          }
          .partners-grid {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 4px !important;
            padding: 8px 0 !important;
          }
          .partner-item {
            min-width: auto !important;
            width: 100% !important;
          }
          .partner-logo-wrapper {
            width: 35px !important;
            height: 25px !important;
            margin: 0 auto 2px !important;
            padding: 2px !important;
          }
          .partner-logo {
            width: 35px !important;
            height: 35px !important;
          }
          .partner-name {
            font-size: 0.45rem !important;
            line-height: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientsTestimonials;
