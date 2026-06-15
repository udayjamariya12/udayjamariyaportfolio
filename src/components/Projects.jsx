import React from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';

export function Projects() {
  const parallax = useMouseParallax(0.06);

  return (
    <section className="section-container" style={{ transform: `translate(${parallax.x * -1.2}px, ${parallax.y}px)` }}>
      <h2 className="section-title orbitron">Featured Deployment</h2>
      
      <div className="projects-container">
        <div className="project-phone">
            <div className="phone-notch" style={{ width: '100px', height: '20px' }}></div>
            <div className="phone-screen" style={{ background: '#0b0b15', padding: '30px 15px 15px' }}>
              {/* Mock App Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(127, 119, 221, 0.3)' }}></div>
                <div style={{ width: '100px', height: '20px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', alignSelf: 'center' }}></div>
              </div>
              
              {/* Mock Dashboard Chart Area */}
              <div style={{ height: '150px', background: 'linear-gradient(to top, rgba(127, 119, 221, 0.2), transparent)', borderRadius: '15px', marginBottom: '20px', position: 'relative' }}>
                <svg viewBox="0 0 100 50" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}>
                  <path d="M0,50 L0,30 Q15,10 30,25 T60,15 T100,5 L100,50 Z" fill="rgba(127, 119, 221, 0.4)" />
                  <path d="M0,30 Q15,10 30,25 T60,15 T100,5" fill="none" stroke="#7F77DD" strokeWidth="2" />
                </svg>
              </div>

              {/* Mock List Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                    <div style={{ width: '30px', height: '30px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '8px' }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ width: '80%', height: '10px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '5px', marginBottom: '5px' }}></div>
                      <div style={{ width: '40%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '5px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>

        <div className="project-info glass-panel" style={{ padding: '2rem', maxWidth: '500px' }}>
          <h3 className="orbitron title-glow" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Invoice Flow App</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            A comprehensive enterprise billing solution designed for Somnath Auto. Features include an interactive dashboard, real-time invoice tracking, and seamless payment management.
          </p>
          <div className="skill-pills">
            <span className="skill-pill glass-panel pill-blue" style={{ padding: '5px 15px', fontSize: '0.8rem', animation: 'none' }}>Flutter</span>
            <span className="skill-pill glass-panel pill-green" style={{ padding: '5px 15px', fontSize: '0.8rem', animation: 'none' }}>Bloc</span>
            <span className="skill-pill glass-panel pill-white" style={{ padding: '5px 15px', fontSize: '0.8rem', animation: 'none' }}>REST API</span>
          </div>
        </div>
      </div>
    </section>
  );
}
