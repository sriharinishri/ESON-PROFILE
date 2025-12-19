import React from 'react';
import LandingPage from './components/LandingPage';
import CompanyOverview from './components/CompanyOverview';
import OurJourney from './components/OurJourney';
import CompanyValues from './components/CompanyValues';
import OrganizationalChart from './components/OrganizationalChart';
import DigitalSolution from './components/DigitalSolution';
import IndustriesWeServe from './components/IndustriesWeServe';
import ProjectsShowcase from './components/ProjectsShowcase';

import ClientsTestimonials from './components/ClientsTestimonials';
import WeCanOnly from './components/WeCanOnly';

import CSRActivities from './components/CSRActivities';
import ContactUs from './components/ContactUs';
import Navigation from './components/Navigation';

import './global.css';


import bgVideo from './assets/images/background.mp4'; 
// import bgVideo from './assets/images/bluee.mp4'; 
function App() {
  return (
    <>
      {/* Video Background */}
      <video
        className="video-bg-fixed"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="min-h-screen bg-transparent text-white overflow-x-hidden relative z-10">
        <Navigation />
        <LandingPage />
        <CompanyOverview />
        <OurJourney />
        <CompanyValues />
        <OrganizationalChart />
        <DigitalSolution />
        <IndustriesWeServe />
        <ProjectsShowcase />
        <ClientsTestimonials />
        <WeCanOnly />
      
        <CSRActivities />
       
        <ContactUs/>
      </div>

      <style >{`
        .video-bg-fixed {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
          opacity: 15%;
          background: white;
        }
        /* Ensure main content overlays the video */
        .min-h-screen.relative.z-10 {
          position: relative;
          z-index: 10;
          background: transparent;
        }
      `}</style>
    </>
  );
}

export default App;
