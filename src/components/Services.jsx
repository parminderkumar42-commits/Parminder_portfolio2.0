import React, { useRef } from 'react';
import { servicesData } from '../data/services';
import TiltCard from './TiltCard';
import { ArrowUpRight, Code, PenTool, TrendingUp, Sparkles } from 'lucide-react';
import './Services.css';

export default function Services() {
  const getIcon = (id) => {
    switch (id) {
      case '01': return <Code size={24} className="service-icon" />;
      case '02': return <PenTool size={24} className="service-icon" />;
      case '03': return <TrendingUp size={24} className="service-icon" />;
      case '04': return <Sparkles size={24} className="service-icon" />;
      default: return <Code size={24} className="service-icon" />;
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="services" className="section services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="dot" />
            <span>DISCIPLINES & EXPERTISE</span>
          </div>
          <h2 className="section-title">WHAT I DO</h2>
          <p className="section-subtitle">
            Crafting comprehensive digital solutions where full-stack engineering, bespoke visual design, and performance marketing converge.
          </p>
        </div>

        {/* Services 2x2 Grid */}
        <div className="services-grid">
          {servicesData.map((service) => (
            <TiltCard
              key={service.id}
              className="service-card glass-panel"
              maxTilt={4}
              scale={1.01}
              cursorText="EXPLORE"
              onMouseMove={handleMouseMove}
            >
              <div className="service-spotlight" />

              <div className="service-card-header">
                <div className="service-id-badge">
                  <span className="service-id">{service.id}</span>
                  <div className="service-icon-box">{getIcon(service.id)}</div>
                </div>
                <div className="service-highlight-pill">{service.highlight}</div>
              </div>

              <div className="service-card-body">
                <h3 className="service-title">{service.title}</h3>
                <h4 className="service-subtitle">{service.subtitle}</h4>
                <p className="service-desc">{service.description}</p>
              </div>

              <div className="service-card-footer">
                <div className="service-skills-tags">
                  {service.skills.map((skill, idx) => (
                    <span key={idx} className="service-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
