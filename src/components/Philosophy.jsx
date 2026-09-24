import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Philosophy.css';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax scroll on lines
      gsap.fromTo(
        line1Ref.current,
        { x: -50, opacity: 0.4 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        line2Ref.current,
        { x: 50, opacity: 0.4 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1
          }
        }
      );

      gsap.fromTo(
        line3Ref.current,
        { x: -30, opacity: 0.4 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 10%',
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section philosophy-section" ref={sectionRef}>
      <div className="container philosophy-container">
        <div className="philosophy-eyebrow">
          <span className="dot" />
          <span>CORE CREATIVE MANIFESTO</span>
        </div>

        <div className="philosophy-manifesto">
          <div className="manifesto-line line-1" ref={line1Ref}>
            <span className="accent-quote">"</span>GOOD DESIGN
            <span className="hollow-text"> GETS ATTENTION.</span>
          </div>

          <div className="manifesto-line line-2" ref={line2Ref}>
            GOOD DEVELOPMENT
            <span className="text-accent"> MAKES IT WORK.</span>
          </div>

          <div className="manifesto-line line-3" ref={line3Ref}>
            GOOD MARKETING
            <span className="hollow-text"> MAKES IT MATTER.</span>
            <span className="accent-quote">"</span>
          </div>
        </div>

        <div className="philosophy-credit">
          <span className="credit-author">PARMINDER®</span>
          <span className="credit-tagline">DIGITAL PRODUCT ARCHITECT</span>
        </div>
      </div>
    </section>
  );
}
