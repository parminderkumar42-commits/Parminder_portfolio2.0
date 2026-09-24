import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.02,
  cursorText = '',
  style = {},
  ...props
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch) return;

    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      gsap.to(card, {
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1000,
        transformOrigin: 'center center',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale]);

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      data-cursor-text={cursorText}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
