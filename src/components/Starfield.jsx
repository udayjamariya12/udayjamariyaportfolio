import React, { useState, useEffect } from 'react';

export function Starfield() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars once on mount
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: `${Math.random() * 3}px`,
      duration: `${Math.random() * 20 + 10}s`,
      delay: `${Math.random() * 10}s`,
      opacity: Math.random() * 0.8 + 0.2
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="starfield">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: star.duration,
            animationDelay: star.delay
          }}
        />
      ))}
    </div>
  );
}
