import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Facebook, Linkedin, Github, Youtube } from 'lucide-react';
import esonLogo from '../assets/images/esonpo.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/eson_infotech?igsh=MXY2YW10OTV4ZGpxMg==', label: 'Instagram' },
    // { icon: Twitter, href: 'https://twitter.com/eson', label: 'Twitter' },
    { icon: Facebook, href: 'https://www.facebook.com/printapp1', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com/company/eson', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Eson-tuty', label: 'GitHub' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UCgP2ilffMitNsB3REOvDNwA', label: 'YouTube' },
  ];

  return (
    <>
      {/* Blue Progress Bar */}
      <div
        className="fixed top-0 left-0 w-full h-1 z-50"
        style={{ backgroundColor: 'rgba(84, 172, 191, 0.2)' }}
      >
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #54acbf, #A7ebf2, #26658c)',
          }}
        />
      </div>

      {/* White Navigation */}
      <nav
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 backdrop-blur-md border rounded-full px-6 py-3 shadow-lg max-w-5xl"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(84, 172, 191, 0.3)',
          boxShadow: '0 8px 32px rgba(84, 172, 191, 0.15)',
        }}
      >
        <div className="flex items-center justify-between space-x-6">
          {/* Company Logo and Name */}
          <div className="flex items-center space-x-4 cursor-pointer group">
            {/* Logo Image */}
            <div className="flex-shrink-0">
              <img
                src={esonLogo}
                alt="ESON Infotech Pvt Ltd Logo"
                className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(84, 172, 191, 0.2))',
                }}
              />
            </div>

            {/* Company Name - Hidden on smaller screens to save space */}
            <div className="hidden lg:block">
              <div
                className="text-lg font-bold transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(45deg, #023859, #54acbf)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {/* ESON INFOTECH PVT LTD */}
              </div>
            </div>
          </div>

          {/* Desktop Social Media Icons */}
          <div className="hidden md:flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:scale-110 transition-all duration-300 hover:shadow-md"
                style={{
                  color: '#26658c',
                  backgroundColor: 'rgba(84, 172, 191, 0.1)',
                }}
                title={social.label}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(84, 172, 191, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(84, 172, 191, 0.1)';
                }}
              >
                <social.icon size={16} color="#26658c" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:scale-110 transition-all duration-300 flex-shrink-0"
            style={{
              color: '#26658c',
              backgroundColor: 'rgba(84, 172, 191, 0.1)',
            }}
          >
            {isOpen ? <X size={20} color="#26658c" /> : <Menu size={20} color="#26658c" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 mt-2 backdrop-blur-md border rounded-2xl p-6"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderColor: 'rgba(84, 172, 191, 0.3)',
              boxShadow: '0 8px 32px rgba(84, 172, 191, 0.15)',
            }}
          >
            {/* Company Logo and Name Display */}
            <div
              className="mb-4 pb-4 border-b text-center"
              style={{ borderColor: 'rgba(84, 172, 191, 0.2)' }}
            >
              <div className="flex flex-col items-center space-y-3">
                {/* Mobile Logo */}
                <img
                  src={esonLogo}
                  alt="ESON Infotech Pvt Ltd Logo"
                  className="h-12 w-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(84, 172, 191, 0.2))',
                  }}
                />

                {/* Mobile Company Name */}
                <div>
                  <h2
                    className="text-lg font-bold"
                    style={{
                      background: 'linear-gradient(45deg, #023859, #54acbf)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    ESON INFOTECH PVT LTD
                  </h2>
                  <p className="text-sm mt-1" style={{ color: '#26658c' }}>
                    Technology Solutions & Services
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Social Media Icons */}
            <div>
              <p className="text-sm font-semibold mb-4 text-center" style={{ color: '#26658c' }}>
                Connect With Us
              </p>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full hover:scale-110 transition-all duration-300 hover:shadow-md"
                    style={{
                      color: '#26658c',
                      backgroundColor: 'rgba(84, 172, 191, 0.1)',
                    }}
                    title={social.label}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(84, 172, 191, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(84, 172, 191, 0.1)';
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    <social.icon size={20} color="#26658c" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
