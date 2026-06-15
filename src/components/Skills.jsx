import React from 'react';
import { useMouseParallax } from '../hooks/useMouseParallax';

export function Skills() {
  const parallax = useMouseParallax(0.05);

  const skillCategories = [
    { name: "🟣 Languages", colorClass: "pill-purple", skills: ["Dart", "HTML", "CSS"], animDelay: "0s" },
    { name: "🔵 Frameworks", colorClass: "pill-blue", skills: ["Flutter SDK", "Material Design", "Cupertino Widgets"], animDelay: "0.5s" },
    { name: "🟢 State Management", colorClass: "pill-green", skills: ["Bloc", "Provider", "GetX"], animDelay: "1s" },
    { name: "🟡 Databases", colorClass: "pill-yellow", skills: ["SQLite", "Firebase", "MySQL"], animDelay: "1.5s" },
    { name: "⚪ Tools", colorClass: "pill-white", skills: ["Git", "Bitbucket", "REST API", "App Store Deployment"], animDelay: "2s" }
  ];

  return (
    <section className="section-container" style={{ transform: `translate(${parallax.x * -1}px, ${parallax.y * -1}px)` }}>
      <div className="skills-container">
        <h2 className="section-title orbitron">Technical Payload</h2>
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category">
              <span className="skill-category-title orbitron">{category.name}</span>
              <div className="skill-pills">
                {category.skills.map((skill, sIdx) => {
                  const animType = ['float-slow', 'float-medium', 'float-fast'][Math.floor(Math.random() * 3)];
                  const randomDelay = Math.random() * 2 + "s";
                  return (
                    <div 
                      key={sIdx} 
                      className={`skill-pill glass-panel ${category.colorClass}`}
                      style={{ animation: `${animType} 5s ease-in-out infinite ${randomDelay}` }}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
