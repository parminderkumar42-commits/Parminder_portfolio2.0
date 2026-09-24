import React, { useEffect, useRef } from 'react';

export default function MouseTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Touch or reduced motion check
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 18;
    const codeSymbols = ['</>', '{}', '01', '✦', '=>'];
    let symbolCounter = 0;

    let mouse = { x: -100, y: -100, lastX: -100, lastY: -100 };

    const handleMouseMove = (e) => {
      const dx = e.clientX - mouse.lastX;
      const dy = e.clientY - mouse.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Spawn subtle particle only on sufficient pointer movement
      if (dist > 16 && particles.length < maxParticles) {
        symbolCounter++;
        const isSymbol = symbolCounter % 6 === 0;

        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: isSymbol ? 12 : Math.random() * 3 + 2,
          color: Math.random() > 0.4 ? 'rgba(199, 255, 61, ' : 'rgba(255, 255, 255, ',
          alpha: 0.65,
          decay: 0.025,
          text: isSymbol ? codeSymbols[Math.floor(Math.random() * codeSymbols.length)] : null,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4
        });

        mouse.lastX = e.clientX;
        mouse.lastY = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.alpha -= p.decay;
        p.x += p.vx;
        p.y += p.vy;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.text) {
          ctx.font = '500 11px "JetBrains Mono", monospace';
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowColor = 'rgba(199, 255, 61, 0.4)';
          ctx.shadowBlur = 6;
          ctx.fillText(p.text, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowColor = 'rgba(199, 255, 61, 0.5)';
          ctx.shadowBlur = 8;
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="mouse-trail-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999990
      }}
    />
  );
}
