import React from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';

export function Hero() {
  const parallax = useMouseParallax(0.1);

  return (
    <section className="section-container" style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}>
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-title title-glow">Uday Jamariya</h1>
          <p className="hero-subtitle orbitron">Flutter Developer · Cross-Platform · Clean Architecture</p>
        </div>
        
        <div className="hero-visual">
          <div className="available-badge">Available for Work</div>
          
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="mock-card" style={{ background: 'rgba(168, 85, 247, 0.2)', width: '100%' }}></div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="mock-card" style={{ background: 'rgba(59, 130, 246, 0.2)', flex: 1 }}></div>
                <div className="mock-card" style={{ background: 'rgba(34, 197, 94, 0.2)', flex: 1 }}></div>
              </div>
              <div className="mock-card" style={{ background: 'rgba(234, 179, 8, 0.2)', width: '100%', height: '120px' }}></div>
              <div className="mock-card" style={{ background: 'var(--glass-bg)', width: '100%', flex: 1 }}></div>
            </div>
          </div>

          <div className="orbiting-widget" style={{ animation: 'orbit 12s linear infinite' }}>Container()</div>
          <div className="orbiting-widget" style={{ animation: 'orbit 18s linear infinite -4s' }}>Scaffold()</div>
          <div className="orbiting-widget" style={{ animation: 'orbit 15s linear infinite -8s' }}>ListView()</div>
        </div>
      </div>
    </section>
  );
}
