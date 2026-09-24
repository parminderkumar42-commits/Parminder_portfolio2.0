import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);       // The main pointer icon
  const followerRef = useRef(null);     // Outer ring follower
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // QuickTo for ultra-low-latency cursor movement
    const setCursorX = gsap.quickTo(cursor, 'x', { duration: 0.05, ease: 'none' });
    const setCursorY = gsap.quickTo(cursor, 'y', { duration: 0.05, ease: 'none' });
    const setFollowerX = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power2.out' });
    const setFollowerY = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (!isVisible) setIsVisible(true);
      setCursorX(clientX);
      setCursorY(clientY);
      setFollowerX(clientX);
      setFollowerY(clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [data-cursor], [data-cursor-text]');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor-text') || target.getAttribute('data-cursor') || '';
        setCursorText(text);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [data-cursor], [data-cursor-text]');
      if (target) {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div className={`custom-cursor-container ${isVisible ? 'visible' : ''}`}>
      {/* Real mouse pointer icon cursor */}
      <div
        ref={cursorRef}
        className={`cursor-pointer-icon ${isHovered ? 'cursor-hovered' : ''} ${cursorText ? 'cursor-has-text' : ''}`}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-svg-arrow">
          <path
            d="M4 2L4 18.5L8 14.5L11 21.5L13.5 20.5L10.5 13.5L16 13.5L4 2Z"
            fill="white"
            stroke="#080808"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Follower ring with contextual text */}
      <div
        ref={followerRef}
        className={`cursor-follower ${isHovered ? 'hovered' : ''} ${cursorText ? 'has-text' : ''}`}
      >
        <span ref={textRef} className="cursor-text">
          {cursorText}
        </span>
      </div>
    </div>
  );
}
