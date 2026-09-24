import React from 'react';
import './Marquee.css';

export default function Marquee() {
  const items = [
    'MERN DEVELOPMENT',
    'UI/UX DESIGN',
    'DIGITAL MARKETING',
    'CREATIVE DEVELOPMENT',
    'SEO',
    'PERFORMANCE MARKETING',
    'REST APIS',
    'FIGMA SYSTEMS'
  ];

  return (
    <div className="marquee-wrapper">
      {/* Track 1 - Forward */}
      <div className="marquee-track track-forward">
        <div className="marquee-content">
          {items.map((item, idx) => (
            <span key={`f1-${idx}`} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <span className="marquee-star">✦</span>
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`f2-${idx}`} className="marquee-item">
              <span className="marquee-text">{item}</span>
              <span className="marquee-star">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Track 2 - Reverse Subtle */}
      <div className="marquee-track track-reverse">
        <div className="marquee-content reverse-content">
          {items.map((item, idx) => (
            <span key={`r1-${idx}`} className="marquee-item item-subtle">
              <span className="marquee-text">{item}</span>
              <span className="marquee-star">✳</span>
            </span>
          ))}
        </div>
        <div className="marquee-content reverse-content" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`r2-${idx}`} className="marquee-item item-subtle">
              <span className="marquee-text">{item}</span>
              <span className="marquee-star">✳</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
