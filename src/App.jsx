import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';

// Animation & Global Layer Components
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import MouseTrail from './components/MouseTrail';
import ScrollProgress from './components/ScrollProgress';
import ScrollParallax from './components/ScrollParallax';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';

// Page Sections
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Process from './components/Process';
import WhyMe from './components/WhyMe';
import Experience from './components/Experience';
import Philosophy from './components/Philosophy';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);

  // Initialize Lenis smooth scroll linked with GSAP ticker
  useLenis();

  return (
    <div className="portfolio-app-root">
      {/* Intro Page Loader */}
      {!loaderFinished && (
        <PageLoader onComplete={() => setLoaderFinished(true)} />
      )}

      {/* Physics Cursor & Interactive Pointer Trail */}
      <CustomCursor />
      <MouseTrail />

      {/* Global Scroll Progress Bar */}
      <ScrollProgress />

      {/* Global Scroll-Triggered Parallax Controller (registers after mount) */}
      {loaderFinished && <ScrollParallax />}

      {/* Ambient Cybernetic Grid & Glow */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="ambient-glow-top" />
        <div className="ambient-glow-purple" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content — Sections */}
      <main id="main-content">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <TechStack />
        <Process />
        <WhyMe />
        <Experience />
        <Philosophy />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Connect WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
