import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, Layers, Cpu, Compass } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './About.css';

export default function About() {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate the 03+ counter
          let start = 0;
          const end = 3;
          const timer = setInterval(() => {
            start++;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, 150);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="about" className="section about-section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="dot" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="section-title">
            I DON'T JUST BUILD WEBSITES.
            <br />
            <span className="text-accent">I BUILD DIGITAL EXPERIENCES.</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="about-grid">
          {/* Left Column: Narrative */}
          <div className="about-narrative">
            <p className="narrative-lead">
              I'm <strong>Parminder</strong>, a multidisciplinary Full Stack MERN Developer, UI/UX Designer and Digital Marketer.
            </p>
            <p className="narrative-body">
              My approach combines development, design and marketing so that every product I build is not only technically strong but also intuitive, visually memorable and focused on real business goals.
            </p>
            <p className="narrative-body">
              From planning the user experience in Figma to building React interfaces, developing Node.js APIs, designing MongoDB architectures and creating digital marketing strategies, I enjoy working across the complete digital product journey.
            </p>

            <div className="about-pillars">
              <div className="pillar-item">
                <CheckCircle2 size={18} className="text-accent" />
                <span>End-to-End Product Architecture</span>
              </div>
              <div className="pillar-item">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Conversion-Focused Design Systems</span>
              </div>
              <div className="pillar-item">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Scalable Cloud & Database Schemas</span>
              </div>
            </div>

            <div className="about-cta-row">
              <MagneticButton
                href="#contact"
                className="btn-primary"
                cursorText="CONNECT"
              >
                <span>LET'S COLLABORATE</span>
                <ArrowUpRight size={18} />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Animated Statistics & Value Cards */}
          <div className="about-stats-grid">
            <div className="stat-card glass-panel">
              <div className="stat-num-wrapper">
                <span className="stat-num text-accent">0{count}+</span>
              </div>
              <div className="stat-label">CORE DISCIPLINES</div>
              <p className="stat-desc">Development, UI/UX & Digital Marketing under one roof.</p>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-num-wrapper">
                <span className="stat-num text-electric">FULL</span>
              </div>
              <div className="stat-label">STACK DEVELOPMENT</div>
              <p className="stat-desc">Seamless integration from MongoDB collections to React DOM.</p>
            </div>

            <div className="stat-card glass-panel">
              <div className="stat-num-wrapper">
                <span className="stat-num">100%</span>
              </div>
              <div className="stat-label">RESPONSIVE THINKING</div>
              <p className="stat-desc">Pixel-perfect fluid layouts across mobile, tablet, and ultra-wide displays.</p>
            </div>

            <div className="stat-card glass-panel stat-card-infinity">
              <div className="stat-num-wrapper">
                <span className="stat-num text-accent">∞</span>
              </div>
              <div className="stat-label">CURIOSITY</div>
              <p className="stat-desc">Continually mastering cutting-edge frontend tools, AI workflows, and frameworks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
