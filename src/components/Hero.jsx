import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, ArrowDown, Sparkles, Globe } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Hero.css';

export default function Hero() {
  const roles = [
    'UI/UX DESIGNER',
    'DIGITAL MARKETER',
    'CREATIVE DEVELOPER',
    'FULL STACK MERN'
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  // Refs for parallax & mask effect
  const heroVisualRef = useRef(null);
  const imgWrapperRef = useRef(null);
  const maskRef = useRef(null);
  const [maskPos, setMaskPos] = useState({ x: 50, y: 50 });
  const [isMaskHovered, setIsMaskHovered] = useState(false);

  // Cycling roles
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setFadeState('fade-in');
      }, 400);
    }, 2800);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  // Mouse parallax on Hero Visual card
  useEffect(() => {
    const visual = heroVisualRef.current;
    if (!visual) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xOffset = (clientX / window.innerWidth - 0.5) * 18;
      const yOffset = (clientY / window.innerHeight - 0.5) * 14;
      visual.style.transform = `perspective(1200px) rotateY(${xOffset * 0.5}deg) rotateX(${-yOffset * 0.5}deg) translateZ(10px)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Image mask reveal on hover
  const handleImgMouseMove = (e) => {
    const wrapper = imgWrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMaskPos({ x, y });
  };

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
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Left: Editorial Headline & CTAs */}
        <div className="hero-content">
          {/* Eyebrow */}
          <div className="hero-eyebrow glass-pill">
            <span className="live-status-dot" />
            <span className="eyebrow-text">AVAILABLE FOR FREELANCE &amp; COLLABORATIONS</span>
          </div>

          {/* Editorial Title */}
          <h1 className="hero-title">
            <span className="title-line">FULL STACK</span>
            <span className="title-line text-accent">DEVELOPER</span>
            <span className="title-rotator-wrapper">
              <span className="rotator-prefix">✦</span>
              <span className={`title-rotator ${fadeState}`}>
                {roles[currentRoleIndex]}
              </span>
            </span>
          </h1>

          {/* Intro */}
          <p className="hero-intro">
            Hi, I'm <strong className="intro-name">Parminder</strong> — a Full Stack MERN Developer, UI/UX Designer and Digital Marketer creating high-performance digital experiences that look great, work flawlessly and help businesses grow.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <MagneticButton onClick={() => scrollTo('#projects')} className="btn-primary" cursorText="VIEW">
              <span>VIEW MY WORK</span>
              <ArrowUpRight size={18} />
            </MagneticButton>
            <MagneticButton onClick={() => scrollTo('#contact')} className="btn-secondary" cursorText="TALK">
              <span>LET'S TALK</span>
            </MagneticButton>
          </div>

          {/* Tech Pills */}
          <div className="hero-tech-pills">
            {['React', 'Node.js', 'MongoDB', 'Express', 'Figma', 'SEO', 'Meta Ads'].map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>

        {/* Right: Profile Image with Mask Hover Effect */}
        <div className="hero-visual-wrapper">
          <div className="hero-visual-card glass-panel" ref={heroVisualRef}>
            {/* Ambient glow */}
            <div className="visual-ambient-light" />
            <div className="visual-grid-overlay" />

            {/* IMAGE CONTAINER WITH MASK REVEAL EFFECT */}
            <div
              className={`profile-image-container ${isMaskHovered ? 'mask-active' : ''}`}
              ref={imgWrapperRef}
              onMouseMove={handleImgMouseMove}
              onMouseEnter={() => setIsMaskHovered(true)}
              onMouseLeave={() => setIsMaskHovered(false)}
              data-cursor-text="HELLO"
            >
              {/* Layer 1: Dark desaturated base image (always visible) */}
              <img
                src="/profile.webp"
                alt="Parminder — Full Stack MERN Developer"
                className="profile-img-base"
                loading="eager"
              />

              {/* Layer 2: Full color image revealed through circular mask on hover */}
              <img
                src="/profile.webp"
                alt=""
                aria-hidden="true"
                className="profile-img-reveal"
                style={{
                  maskImage: isMaskHovered
                    ? `radial-gradient(circle 130px at ${maskPos.x}% ${maskPos.y}%, black 30%, transparent 80%)`
                    : 'none',
                  WebkitMaskImage: isMaskHovered
                    ? `radial-gradient(circle 130px at ${maskPos.x}% ${maskPos.y}%, black 30%, transparent 80%)`
                    : 'none'
                }}
              />

              {/* Hover overlay text label */}
              <div className="img-hover-label">
                <span className="img-hover-text">PARMINDER</span>
                <span className="img-hover-role">Full Stack Developer</span>
              </div>

              {/* Scan line animation */}
              <div className="img-scan-line" />
            </div>

            {/* Floating UI badges */}
            <div className="floating-ui-card floating-card-top glass-panel">
              <div className="card-indicator">
                <Sparkles size={16} className="text-accent" />
              </div>
              <div>
                <div className="ui-card-title">MERN Architecture</div>
                <div className="ui-card-desc">React 19 • Node APIs • Mongo</div>
              </div>
            </div>

            <div className="floating-ui-card floating-card-bottom glass-panel">
              <div className="card-indicator">
                <Globe size={16} className="text-electric" />
              </div>
              <div>
                <div className="ui-card-title">Design &amp; Growth</div>
                <div className="ui-card-desc">Figma Systems • SEO • Performance</div>
              </div>
            </div>

            <div className="corner-tag top-left">SYS.VER // 2.0.26</div>
            <div className="corner-tag bottom-right">LAT 28.4089° N</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator" onClick={() => scrollTo('#about')}>
        <span className="scroll-indicator-text">SCROLL TO EXPLORE</span>
        <ArrowDown size={14} className="scroll-arrow" />
      </div>
    </section>
  );
}
