import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // normalized from -1 to 1 for 3D tilts and parallax
      const normalizedX = (clientX / width) * 2 - 1;
      const normalizedY = (clientY / height) * 2 - 1;

      setMousePosition({
        x: clientX,
        y: clientY,
        normalizedX,
        normalizedY
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
}
