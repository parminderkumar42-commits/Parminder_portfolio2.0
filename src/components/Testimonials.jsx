import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Clearly marked demo testimonials per strict instructions
  const testimonials = [
    {
      id: 1,
      quote:
        'Working with Parminder transformed our platform vision into reality. His ability to balance full-stack MERN architecture with high-converting UI/UX design is exceptional.',
      role: 'Startup Founder & CEO',
      company: 'TechVentures Studio (Demo Showcase)',
      project: 'MERN Platform Architecture',
      rating: 5,
      isDemo: true
    },
    {
      id: 2,
      quote:
        'Parminder executed our digital marketing and landing page optimization with precision. Lead quality improved significantly within 30 days of deployment.',
      role: 'Head of Growth',
      company: 'Digital Commerce Co. (Demo Showcase)',
      project: 'Paid Meta Acquisition Funnel',
      rating: 5,
      isDemo: true
    },
    {
      id: 3,
      quote:
        'A rare creative developer who understands both frontend aesthetics and scalable Node backend systems. Deliverables were punctual, clean, and well-documented.',
      role: 'Product Lead',
      company: 'Agency Collective (Demo Showcase)',
      project: 'Interactive Web Experience',
      rating: 5,
      isDemo: true
    }
  ];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="dot" />
            <span>ENDORSEMENTS & COLLABORATIONS</span>
          </div>
          <h2 className="section-title">
            WHAT COLLABORATORS
            <br />
            <span className="text-accent">SAY</span>
          </h2>
          <div className="demo-notice-pill">
            <Sparkles size={13} className="text-accent" />
            <span>Client Testimonial Showcase Architecture • Verified Reviews Upon Request</span>
          </div>
        </div>

        {/* Testimonial Card Slider */}
        <div className="testimonial-slider-wrap">
          <div className="testimonial-main-card glass-panel">
            <div className="quote-icon-box">
              <Quote size={32} className="text-accent" />
            </div>

            <p className="testimonial-quote">
              "{testimonials[current].quote}"
            </p>

            <div className="testimonial-card-bottom">
              <div className="author-meta">
                <div className="author-role-title">{testimonials[current].role}</div>
                <div className="author-company-title">{testimonials[current].company}</div>
                <div className="author-project-tag">Project: {testimonials[current].project}</div>
              </div>

              {/* Slider Controls */}
              <div className="slider-controls">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="slider-btn"
                  aria-label="Previous testimonial"
                  data-cursor-text="PREV"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="slider-counter">
                  <span className="current-num">0{current + 1}</span>
                  <span className="divider-slash">/</span>
                  <span className="total-num">0{testimonials.length}</span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="slider-btn"
                  aria-label="Next testimonial"
                  data-cursor-text="NEXT"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
