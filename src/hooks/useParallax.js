import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useParallax — attaches a GSAP ScrollTrigger parallax effect to a target element.
 * @param {Object} options
 * @param {number} options.yPercent  - Vertical shift (default: 20)
 * @param {number} options.scale     - Scale while in view (default: 1.04)
 * @param {string} options.start     - ScrollTrigger start (default: "top bottom")
 * @param {string} options.end       - ScrollTrigger end (default: "bottom top")
 * @returns ref to attach to DOM element
 */
export function useParallax({
  yPercent = 20,
  scale = 1.0,
  start = 'top bottom',
  end = 'bottom top'
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -yPercent / 2, scale: scale },
        {
          yPercent: yPercent / 2,
          scale: scale,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 1.2
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [yPercent, scale, start, end]);

  return ref;
}

/**
 * useSectionParallax — adds a 3D perspective tilt + Y shift to a section as user scrolls.
 * Creates a "depth" effect where sections feel dimensionally layered.
 */
export function useSectionParallax(intensity = 1.0) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (prefersReducedMotion || isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Subtle Y translate as section enters/exits — creates floating layer depth
      gsap.fromTo(
        section,
        { y: 40 * intensity, opacity: 0.85 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            end: 'top 40%',
            scrub: false,
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Scroll-scrubbed gentle parallax movement within the section
      gsap.fromTo(
        section.querySelector('.parallax-inner') || section,
        { yPercent: -5 * intensity },
        {
          yPercent: 5 * intensity,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, [intensity]);

  return sectionRef;
}
