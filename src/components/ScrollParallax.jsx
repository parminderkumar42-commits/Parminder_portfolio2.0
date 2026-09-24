import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollParallax
 * Automatically registers scroll-triggered 3D parallax animations on all major page sections.
 * Must be mounted once inside App.jsx after the main layout renders.
 */
export default function ScrollParallax() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ── 1. Section Entrance Animations (fade-up + slight Y translate) ──────────
    const sectionSelectors = [
      '#about',
      '#services',
      '#projects',
      '#stack',
      '#process',
      '#experience',
      '.why-me-section',
      '.testimonials-section',
      '#contact'
    ];

    const sectionAnimations = [];

    sectionSelectors.forEach((sel) => {
      const el = document.querySelector(sel);
      if (!el) return;

      const anim = gsap.fromTo(
        el,
        { y: isMobile ? 25 : 55, opacity: 0.75 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
      sectionAnimations.push(anim);
    });

    // ── 2. Parallax Y movement on internal content blocks ────────────────────
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    const parallaxAnims = [];

    parallaxElements.forEach((el) => {
      const depth = parseFloat(el.dataset.depth || '1');
      const anim = gsap.fromTo(
        el,
        { yPercent: -8 * depth },
        {
          yPercent: 8 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        }
      );
      parallaxAnims.push(anim);
    });

    // ── 3. Hero section 3D perspective card depth ────────────────────────────
    if (!isMobile) {
      const heroVisual = document.querySelector('.hero-visual-card');
      if (heroVisual) {
        const heroAnim = gsap.fromTo(
          heroVisual,
          { y: 0 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.8
            }
          }
        );
        parallaxAnims.push(heroAnim);
      }

      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        const heroContentAnim = gsap.fromTo(
          heroContent,
          { y: 0 },
          {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 2.5
            }
          }
        );
        parallaxAnims.push(heroContentAnim);
      }
    }

    // ── 4. Stagger-in for individual stat cards and skill pills ──────────────
    const cardGroups = [
      '.about-stats-grid .stat-card',
      '.services-grid .service-card',
      '.tech-group-card',
      '.process-step-card',
      '.pillar-card',
      '.timeline-item'
    ];

    const cardGroupAnims = [];

    cardGroups.forEach((sel) => {
      const cards = document.querySelectorAll(sel);
      if (!cards.length) return;

      const groupAnim = gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0].closest('section') || cards[0],
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
      cardGroupAnims.push(groupAnim);
    });

    // ── 5. Project card rows animate in from alternate sides ─────────────────
    if (!isMobile) {
      const projectRows = document.querySelectorAll('.project-card-row');
      projectRows.forEach((row, i) => {
        const fromLeft = i % 2 === 0;
        const rowAnim = gsap.fromTo(
          row,
          { x: fromLeft ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
        cardGroupAnims.push(rowAnim);
      });
    }

    // ── 6. Philosophy manifesto large text slide-in ───────────────────────────
    const manifestoLines = document.querySelectorAll('.manifesto-line');
    if (manifestoLines.length) {
      manifestoLines.forEach((line, i) => {
        const fromRight = i % 2 !== 0;
        const lineAnim = gsap.fromTo(
          line,
          { x: fromRight ? 60 : -60, opacity: 0.2 },
          {
            x: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 88%',
              end: 'top 45%',
              scrub: 1
            }
          }
        );
        cardGroupAnims.push(lineAnim);
      });
    }

    // ── 7. Footer headline character reveal on scroll ─────────────────────────
    const footerHeadline = document.querySelector('.footer-headline');
    if (footerHeadline) {
      const footerAnim = gsap.fromTo(
        footerHeadline,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerHeadline,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
      cardGroupAnims.push(footerAnim);
    }

    return () => {
      [...sectionAnimations, ...parallaxAnims, ...cardGroupAnims].forEach((anim) => {
        if (anim && anim.scrollTrigger) anim.scrollTrigger.kill();
        if (anim && anim.kill) anim.kill();
      });
    };
  }, []);

  return null; // No DOM output — pure animation side-effects
}
