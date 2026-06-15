import { useState, useEffect } from 'react';

export function useMouseParallax(multiplier = 0.05) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 100 * multiplier;
      const y = (e.clientY / window.innerHeight - 0.5) * 100 * multiplier;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [multiplier]);

  return offset;
}
