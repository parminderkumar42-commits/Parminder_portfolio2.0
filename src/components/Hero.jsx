import React from 'react';
import './Hero.css';

export default function Hero() {
  const scrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -60, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="velorah-theme">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="velorah-bg-video"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      {/* Navigation Bar */}
      <nav className="velorah-nav">
        <h2 className="velorah-logo">
          Velorah<sup style={{ fontSize: '0.75rem', verticalAlign: 'super' }}>®</sup>
        </h2>
        <div className="velorah-nav-links">
          <a href="#hero" className="velorah-nav-link active" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}>Home</a>
          <a href="#projects" className="velorah-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('#projects'); }}>Studio</a>
          <a href="#about" className="velorah-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('#about'); }}>About</a>
          <a href="#process" className="velorah-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('#process'); }}>Journal</a>
          <a href="#contact" className="velorah-nav-link" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>Reach Us</a>
        </div>
        <button className="liquid-glass velorah-btn-sm" onClick={() => scrollTo('#projects')}>
          Begin Journey
        </button>
      </nav>

      {/* Hero Content */}
      <div className="velorah-hero-content">
        <h1 className="velorah-h1 animate-fade-rise">
          Where <em>dreams</em> rise<br /><em>through the silence.</em>
        </h1>
        <p className="velorah-subtext animate-fade-rise-delay">
          We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>
        <button className="liquid-glass velorah-btn-lg animate-fade-rise-delay-2" onClick={() => scrollTo('#about')}>
          Begin Journey
        </button>
      </div>
    </section>
  );
}
