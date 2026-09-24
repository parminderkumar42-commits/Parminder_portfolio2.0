import React from 'react';
import { experienceData } from '../data/experience';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="dot" />
            <span>CAREER PATH & EVOLUTION</span>
          </div>
          <h2 className="section-title">
            EXPERIENCE &amp;
            <br />
            <span className="text-accent">JOURNEY</span>
          </h2>
          <p className="section-subtitle">
            From foundational network engineering and technical education to high-impact full-stack development and digital marketing.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="timeline-container">
          <div className="timeline-line-track" />

          <div className="timeline-items">
            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className={`timeline-item ${exp.isCurrent ? 'current-item' : ''}`}
              >
                {/* Milestone Node */}
                <div className="timeline-node">
                  <div className="node-outer-ring">
                    <div className="node-inner-dot" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="timeline-card glass-panel" data-cursor-text={exp.period}>
                  <div className="timeline-card-header">
                    <div className="timeline-period-badge">
                      <Calendar size={13} className="text-accent" />
                      <span>{exp.period}</span>
                    </div>
                    {exp.isCurrent && (
                      <span className="live-status-pill">
                        <Sparkles size={12} />
                        ACTIVE FOCUS
                      </span>
                    )}
                  </div>

                  <h3 className="timeline-role">{exp.role}</h3>

                  <div className="timeline-company-row">
                    <span className="timeline-company">
                      <Briefcase size={14} className="text-muted" />
                      {exp.company}
                    </span>
                    <span className="timeline-location">
                      <MapPin size={14} className="text-muted" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="timeline-desc">{exp.description}</p>

                  <div className="timeline-tags">
                    {exp.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="timeline-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
