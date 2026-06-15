import React from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { GraduationCap } from 'lucide-react';

export function Education() {
  const parallax = useMouseParallax(0.04);

  return (
    <section className="section-container" style={{ transform: `translate(${parallax.x * 1.5}px, ${parallax.y * -1}px)` }}>
      <h2 className="section-title orbitron">Academic Credentials</h2>
      
      <div className="diploma-card glass-panel">
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(127, 119, 221, 0.2)', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GraduationCap size={32} color="#AFA9EC" />
        </div>
        <h3 className="orbitron" style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Bachelor of Computer Applications</h3>
        <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-secondary)', marginBottom: '1.5rem' }}>Shri V.J. Modha College of I.T.</h4>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Graduated: July 2024</p>
        
        <div className="cgpa-stars">
          ★ ★ ★ ★ ★ <span style={{ color: '#fff', fontSize: '1.2rem', marginLeft: '10px', verticalAlign: 'middle' }}>CGPA: 7.56</span>
        </div>
      </div>
    </section>
  );
}
