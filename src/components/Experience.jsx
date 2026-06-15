import React from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';

export function Experience() {
  const parallax = useMouseParallax(0.08);

  return (
    <section className="section-container" style={{ transform: `translate(${parallax.x}px, ${parallax.y * 1.5}px)` }}>
      <h2 className="section-title orbitron">Mission Logs</h2>
      
      <div className="mission-card glass-panel">
        <h3 className="mission-title orbitron">Mission: Invoice Flow Enterprise Billing</h3>
        <p className="mission-client">Client: Somnath Auto | Dec 2025 – May 2026</p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic' }}>
          Internship at Excel PTP – Unit of Amar Infotech
        </p>
        
        <ul className="mission-objectives">
          <li>Architected and developed a cross-platform invoice management application using Flutter.</li>
          <li>Implemented clean architecture patterns for scalable and maintainable code structure.</li>
          <li>Integrated complex state management and REST API synchronization.</li>
          <li>Designed and implemented responsive dashboard and chart interfaces.</li>
        </ul>
      </div>
    </section>
  );
}
