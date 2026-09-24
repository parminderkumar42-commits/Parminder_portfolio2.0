import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.35,
  textStrength = 0.2,
  cursorText = '',
  ...props
}) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch) return;

    const button = buttonRef.current;
    const text = textRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      });

      if (text) {
        gsap.to(text, {
          x: x * textStrength,
          y: y * textStrength,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)'
      });

      if (text) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.1, 0.4)'
        });
      }
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, textStrength]);

  const commonProps = {
    ref: buttonRef,
    className: `magnetic-btn-wrap ${className}`,
    onClick,
    'data-cursor-text': cursorText,
    ...props
  };

  const content = <span ref={textRef} className="magnetic-btn-text" style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}>{children}</span>;

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...commonProps}>
      {content}
    </button>
  );
}
