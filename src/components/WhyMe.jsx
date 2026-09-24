import React from 'react';
import { Palette, Terminal, TrendingUp, Sparkles, Plus } from 'lucide-react';
import './WhyMe.css';

export default function WhyMe() {
  const pillars = [
    {
      title: 'DESIGN',
      tagline: 'Beautiful and intuitive experiences.',
      description:
        'Human-centric interface design built in Figma with rigorous attention to typography, spacing, atomic component hierarchies, and micro-interactions.',
      icon: Palette,
      accent: '#C7FF3D',
      stats: 'Aesthetic • Intuitive • Brand-First'
    },
    {
      title: 'DEVELOPMENT',
      tagline: 'Fast and scalable applications.',
      description:
        'Engineering performant MERN web architectures, responsive frontends, clean modular codebases, resilient REST APIs, and bulletproof database queries.',
      icon: Terminal,
      accent: '#00FF88',
      stats: 'Scalable • 60 FPS • Accessible'
    },
    {
      title: 'MARKETING',
      tagline: 'Digital experiences built around real growth goals.',
      description:
        'Targeted digital marketing funnels, data-backed landing page optimization, technical SEO strategies, and high-ROI Meta/Google ad executions.',
      icon: TrendingUp,
      accent: '#00E5FF',
      stats: 'Conversion • ROAS • Search Ranking'
    }
  ];

  return (
    <section className="section why-me-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center-header">
          <div className="section-eyebrow">
            <span className="dot" />
            <span>THE MULTIDISCIPLINARY ADVANTAGE</span>
          </div>
          <h2 className="section-title">
            DESIGN. CODE.
            <br />
            <span className="text-accent">GROWTH.</span>
          </h2>
          <div className="why-me-statement">
            <p className="statement-line">Most developers think only about <em>code</em>.</p>
            <p className="statement-line">Most designers think only about <em>visuals</em>.</p>
            <p className="statement-line">Most marketers think only about <em>traffic</em>.</p>
            <p className="statement-conclusion text-accent">I bring all three perspectives together.</p>
          </div>
        </div>

        {/* Three Connected Cards */}
        <div className="pillars-connected-grid">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <React.Fragment key={pillar.title}>
                <div className="pillar-card glass-panel" style={{ '--pillar-accent': pillar.accent }}>
                  <div className="pillar-card-top">
                    <div className="pillar-icon-box">
                      <Icon size={24} />
                    </div>
                    <span className="pillar-num">0{idx + 1}</span>
                  </div>

                  <h3 className="pillar-title">{pillar.title}</h3>
                  <h4 className="pillar-tagline">{pillar.tagline}</h4>
                  <p className="pillar-desc">{pillar.description}</p>

                  <div className="pillar-footer">
                    <Sparkles size={14} className="pillar-sparkle" />
                    <span>{pillar.stats}</span>
                  </div>
                </div>

                {idx < pillars.length - 1 && (
                  <div className="pillar-connector">
                    <span className="connector-line" />
                    <span className="connector-node">
                      <Plus size={14} />
                    </span>
                    <span className="connector-line" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
