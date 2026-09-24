import React from 'react';
import { techCategories } from '../data/techStack';
import {
  Code,
  FileCode,
  Globe,
  Palette,
  Layout,
  Server,
  Cpu,
  Network,
  ShieldCheck,
  Database,
  HardDrive,
  Image,
  PenTool,
  Search,
  Target,
  TrendingUp,
  BarChart3,
  Compass,
  Sparkles,
  MoveDown,
  Wind,
  Zap
} from 'lucide-react';
import './TechStack.css';

export default function TechStack() {
  const getSkillIcon = (iconName) => {
    const iconProps = { size: 16, className: 'tech-pill-icon' };
    switch (iconName) {
      case 'Code': return <Code {...iconProps} />;
      case 'FileCode': return <FileCode {...iconProps} />;
      case 'Globe': return <Globe {...iconProps} />;
      case 'Palette': return <Palette {...iconProps} />;
      case 'Layout': return <Layout {...iconProps} />;
      case 'Server': return <Server {...iconProps} />;
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'Network': return <Network {...iconProps} />;
      case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
      case 'Database': return <Database {...iconProps} />;
      case 'HardDrive': return <HardDrive {...iconProps} />;
      case 'Figma': return <Palette {...iconProps} />;
      case 'Image': return <Image {...iconProps} />;
      case 'PenTool': return <PenTool {...iconProps} />;
      case 'Search': return <Search {...iconProps} />;
      case 'Target': return <Target {...iconProps} />;
      case 'TrendingUp': return <TrendingUp {...iconProps} />;
      case 'BarChart3': return <BarChart3 {...iconProps} />;
      case 'Compass': return <Compass {...iconProps} />;
      case 'Sparkles': return <Sparkles {...iconProps} />;
      case 'MoveDown': return <MoveDown {...iconProps} />;
      case 'Wind': return <Wind {...iconProps} />;
      case 'Zap': return <Zap {...iconProps} />;
      default: return <Code {...iconProps} />;
    }
  };

  return (
    <section id="stack" className="section tech-stack-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="dot" />
            <span>ARSENAL & TECHNOLOGIES</span>
          </div>
          <h2 className="section-title">
            TOOLS I USE TO
            <br />
            <span className="text-accent">TURN IDEAS INTO REALITY.</span>
          </h2>
          <p className="section-subtitle">
            A modern, production-tested stack selected for scalability, developer agility, and world-class user experiences.
          </p>
        </div>

        {/* Categorized Tech Grid */}
        <div className="tech-stack-grid">
          {techCategories.map((group, index) => (
            <div key={index} className="tech-group-card glass-panel">
              <div className="tech-group-header">
                <h3 className="tech-group-title">{group.category}</h3>
                <span className="tech-count-badge">{group.skills.length} TOOLS</span>
              </div>

              <p className="tech-group-desc">{group.description}</p>

              <div className="tech-pills-list">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="tech-pill-item"
                    data-cursor-text={skill.level}
                  >
                    {getSkillIcon(skill.icon)}
                    <span className="tech-pill-name">{skill.name}</span>
                    <span className="tech-pill-level">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
