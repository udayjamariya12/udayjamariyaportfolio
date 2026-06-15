import React from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export function Contact() {
  const parallax = useMouseParallax(0.07);

  return (
    <section className="section-container" style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}>
      <h2 className="section-title orbitron">Establish Connection</h2>
      
      <div className="contact-pods">
        <a href="tel:9574896847" className="contact-pod glass-panel" style={{ animation: 'float-slow 6s ease-in-out infinite 0.5s' }}>
          <Phone className="pod-icon" />
          <span className="orbitron" style={{ fontWeight: '500' }}>Comms</span>
          <div className="pod-info">9574896847</div>
        </a>
        
        <a href="mailto:udayjamariya12@gmail.com" className="contact-pod glass-panel" style={{ animation: 'float-medium 5s ease-in-out infinite 1s' }}>
          <Mail className="pod-icon" />
          <span className="orbitron" style={{ fontWeight: '500' }}>Transmission</span>
          <div className="pod-info">udayjamariya12@gmail.com</div>
        </a>
        
        <a href="https://linkedin.com/in/uday-jamariya" target="_blank" rel="noopener noreferrer" className="contact-pod glass-panel" style={{ animation: 'float-fast 7s ease-in-out infinite 0s' }}>
          <svg className="pod-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          <span className="orbitron" style={{ fontWeight: '500' }}>Network</span>
          <div className="pod-info">linkedin.com/in/uday-jamariya</div>
        </a>
      </div>
      
      <button className="cta-button orbitron" onClick={() => window.location.href='mailto:udayjamariya12@gmail.com'}>
        Initiate Contact <ArrowRight style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '8px' }} />
      </button>
    </section>
  );
}
