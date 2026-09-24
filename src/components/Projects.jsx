import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import TiltCard from './TiltCard';
import { ArrowUpRight, ExternalLink, Code2, Layers, Sparkles } from 'lucide-react';
import { Github } from './BrandIcons';
import MagneticButton from './MagneticButton';
import './Projects.css';

export default function Projects() {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'FULL STACK', 'CREATIVE', 'DESIGN', 'MARKETING'];

  const filteredProjects = projectsData.filter((project) => {
    if (filter === 'ALL') return true;
    if (filter === 'FULL STACK') return project.category.toLowerCase().includes('full stack') || project.category.toLowerCase().includes('mern');
    if (filter === 'CREATIVE') return project.category.toLowerCase().includes('creative');
    if (filter === 'DESIGN') return project.category.toLowerCase().includes('design');
    if (filter === 'MARKETING') return project.category.toLowerCase().includes('marketing');
    return true;
  });

  // Generates high-fidelity themed graphical preview representation for each project
  const renderProjectVisual = (project) => {
    return (
      <div className="project-visual-preview" style={{ '--project-accent': project.accent }}>
        <div className="preview-ambient-glow" />
        <div className="preview-grid" />
        
        {/* Terminal Header */}
        <div className="preview-chrome">
          <div className="chrome-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="chrome-title">{project.title.toLowerCase().replace(/\s+/g, '-')}.parminder.dev</div>
          <div className="chrome-badge">{project.category}</div>
        </div>

        {/* Dynamic Project Graphic Content */}
        <div className="preview-screen-content">
          <div className="mockup-header-bar">
            <div className="mockup-logo-pill" />
            <div className="mockup-nav-lines">
              <span /><span /><span />
            </div>
          </div>

          <div className="mockup-hero-block">
            <div className="mockup-heading-line" />
            <div className="mockup-sub-line" />
            <div className="mockup-tags-row">
              {project.technologies.slice(0, 3).map((t, idx) => (
                <span key={idx} className="mockup-mini-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="mockup-cards-row">
            <div className="mockup-stat-box">
              <div className="mockup-stat-val text-accent">{project.metrics.split('•')[0]}</div>
              <div className="mockup-stat-lbl">Key Achievement</div>
            </div>
            <div className="mockup-graph-box">
              <div className="graph-bars">
                <span style={{ height: '40%' }} />
                <span style={{ height: '65%' }} />
                <span style={{ height: '85%' }} />
                <span style={{ height: '100%', backgroundColor: project.accent }} />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Reveal Overlay */}
        <div className="visual-hover-overlay">
          <span className="hover-explore-btn">
            <span>VIEW CASE STUDY</span>
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header with Category Filter */}
        <div className="projects-header-wrapper">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="section-eyebrow">
              <span className="dot" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="section-title">
              SELECTED
              <br />
              <span className="text-accent">WORK</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="projects-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
                data-cursor-text="FILTER"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="projects-list">
          {filteredProjects.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={project.id}
                className={`project-card-row ${isReversed ? 'row-reversed' : ''}`}
              >
                {/* Visual Column with 3D Tilt */}
                <div className="project-visual-col">
                  <TiltCard
                    maxTilt={5}
                    scale={1.015}
                    cursorText="VIEW"
                    className="project-tilt-container"
                  >
                    {renderProjectVisual(project)}
                  </TiltCard>
                </div>

                {/* Narrative Details Column */}
                <div className="project-info-col">
                  <div className="project-meta-top">
                    <span className="project-number">#{project.id}</span>
                    <span className="project-category-badge">{project.category}</span>
                    <span className="project-year">{project.year}</span>
                  </div>

                  <h3 className="project-item-title">{project.title}</h3>

                  <p className="project-item-desc">{project.description}</p>

                  <div className="project-metric-banner">
                    <Sparkles size={16} className="text-accent" />
                    <span>{project.metrics}</span>
                  </div>

                  {/* Tech stack tags */}
                  <div className="project-tech-tags">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="project-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="project-actions">
                    <MagneticButton
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary project-action-btn"
                      cursorText="OPEN"
                    >
                      <span>LIVE PREVIEW</span>
                      <ArrowUpRight size={16} />
                    </MagneticButton>

                    <MagneticButton
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary project-action-btn"
                      cursorText="CODE"
                    >
                      <Github size={16} />
                      <span>SOURCE</span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
