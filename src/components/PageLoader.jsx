import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './PageLoader.css';

export default function PageLoader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const topCurtainRef = useRef(null);
  const bottomCurtainRef = useRef(null);

  useEffect(() => {
    // Cinematic percentage sequence: 00 -> 24 -> 48 -> 72 -> 100
    const numbers = [0, 24, 48, 72, 100];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < numbers.length) {
        setPercent(numbers[currentIndex]);
      } else {
        clearInterval(interval);
        runExitAnimation();
      }
    }, 280);

    const runExitAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // Reveal branding
      tl.to(counterRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
      })
      .to([nameRef.current, subtitleRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out'
      })
      .to([nameRef.current, subtitleRef.current], {
        opacity: 0,
        scale: 1.05,
        duration: 0.4,
        delay: 0.4,
        ease: 'power2.in'
      })
      // Split curtains slide out
      .to(topCurtainRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut'
      }, '-=0.1')
      .to(bottomCurtainRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: 'power4.inOut'
      }, '<')
      .to(containerRef.current, {
        display: 'none',
        duration: 0.1
      });
    };

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="page-loader-wrapper" ref={containerRef}>
      <div className="loader-curtain curtain-top" ref={topCurtainRef} />
      <div className="loader-curtain curtain-bottom" ref={bottomCurtainRef} />

      <div className="loader-content">
        <div className="loader-counter" ref={counterRef}>
          <span className="loader-num">{percent < 10 ? `0${percent}` : percent}</span>
          <span className="loader-percent-symbol">%</span>
        </div>

        <div className="loader-brand">
          <h1 className="loader-name" ref={nameRef}>PARMINDER<span className="accent-dot">®</span></h1>
          <p className="loader-subtitle" ref={subtitleRef}>CREATIVE DEVELOPER • FULL STACK MERN</p>
        </div>

        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}
