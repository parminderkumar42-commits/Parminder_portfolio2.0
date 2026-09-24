import React, { useState } from 'react';
import { Search, PenTool, Code, Gauge, Rocket, ArrowRight } from 'lucide-react';
import './Process.css';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Research & Strategy',
      description:
        'Deep-dive into business objectives, target personas, competitors, and functional requirements to establish clear scope and conversion targets.',
      icon: Search,
      deliverables: ['Product Discovery', 'User Journey Mapping', 'Technical Scope Document']
    },
    {
      num: '02',
      title: 'DESIGN',
      subtitle: 'UI/UX & Design Systems',
      description:
        'Craft intuitive wireframes, responsive UI concepts, and scalable Figma design systems focused on visual clarity, branding, and micro-interactions.',
      icon: PenTool,
      deliverables: ['High-Fidelity Wireframes', 'Interactive Prototypes', 'Component Design System']
    },
    {
      num: '03',
      title: 'DEVELOP',
      subtitle: 'Clean Code Engineering',
      description:
        'Transform approved Figma interfaces into high-performance React frontends, robust Node/Express backends, and optimized MongoDB schemas.',
      icon: Code,
      deliverables: ['Modern React Frontends', 'RESTful API Services', 'Database Architecture']
    },
    {
      num: '04',
      title: 'OPTIMIZE',
      subtitle: 'Performance & SEO',
      description:
        'Fine-tune Core Web Vitals, implement semantic on-page SEO, set up conversion tracking (Google Analytics & Meta Pixel), and stress-test responsiveness.',
      icon: Gauge,
      deliverables: ['Lighthouse 95+ Scores', 'Technical SEO Tags', 'Conversion Analytics Setup']
    },
    {
      num: '05',
      title: 'LAUNCH',
      subtitle: 'Deployment & Growth',
      description:
        'Deploy production-ready code with CI/CD pipelines, SSL encryption, staging QA tests, and ongoing growth monitoring for peak reliability.',
      icon: Rocket,
      deliverables: ['Production CI/CD Deploy', 'Comprehensive QA Testing', 'Handover & Growth Support']
    }
  ];

  return (
    <section id="process" className="section process-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="dot" />
            <span>METHODOLOGY & EXECUTION</span>
          </div>
          <h2 className="section-title">
            HOW I
            <br />
            <span className="text-accent">WORK</span>
          </h2>
          <p className="section-subtitle">
            A structured five-step lifecycle ensuring every product is delivered on time, engineered cleanly, and built to scale.
          </p>
        </div>

        {/* Process Steps Layout */}
        <div className="process-layout">
          {/* Timeline Steps Cards */}
          <div className="process-cards-grid">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.num}
                  className={`process-step-card glass-panel ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  data-cursor-text="STEP"
                >
                  <div className="step-card-top">
                    <span className="step-number">{step.num}</span>
                    <div className="step-icon-wrap">
                      <IconComponent size={20} />
                    </div>
                  </div>

                  <div className="step-card-mid">
                    <h3 className="step-title">{step.title}</h3>
                    <span className="step-subtitle">{step.subtitle}</span>
                    <p className="step-desc">{step.description}</p>
                  </div>

                  <div className="step-deliverables">
                    <div className="deliverables-title">Deliverables:</div>
                    <ul className="deliverables-list">
                      {step.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="deliverable-item">
                          <span className="deliverable-bullet">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="step-indicator-bar" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
