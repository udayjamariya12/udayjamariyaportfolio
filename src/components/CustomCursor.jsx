import React, { useState, useEffect } from 'react';

export function useCustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e) => {
      const target = e.target;
      const isClickable = target.tagName.toLowerCase() === 'a' || 
                          target.tagName.toLowerCase() === 'button' ||
                          target.closest('.skill-pill') ||
                          target.closest('.contact-pod');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', updateHoverState);

    let animationFrame;
    const animateTrail = () => {
      setTrail((prevTrail) => ({
        x: prevTrail.x + (position.x - prevTrail.x) * 0.2,
        y: prevTrail.y + (position.y - prevTrail.y) * 0.2,
      }));
      animationFrame = requestAnimationFrame(animateTrail);
    };
    animateTrail();

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', updateHoverState);
      cancelAnimationFrame(animationFrame);
    };
  }, [position]);

  return { position, trail, isHovering };
}

export function CustomCursor() {
  const { position, trail, isHovering } = useCustomCursor();
  
  return (
    <>
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`} 
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className="cursor-trail" 
        style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
      />
    </>
  );
}
