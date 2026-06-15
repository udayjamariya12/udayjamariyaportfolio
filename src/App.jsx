import React, { useState, useEffect, useRef } from 'react';

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@700;900&display=swap');

  :root {
    --bg: #050510;
    --accent: #7F77DD;
    --accent-glow: rgba(127,119,221,0.5);
    --text-primary: #F0EEFF;
    --text-muted: #8A85B8;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; cursor: none !important; }
  body { background: var(--bg); color: var(--text-primary); font-family: 'Inter', sans-serif; overflow-x: hidden; transition: background 0.5s; }
  h1, h2, h3, h4, .orbitron { font-family: 'Orbitron', sans-serif; }

  /* Utilities */
  .glass { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(12px); border-radius: 20px; }
  .section-title { font-size: clamp(28px, 4vw, 48px); text-align: center; text-shadow: 0 0 30px var(--accent-glow); margin-bottom: 3rem; }
  .eyebrow { color: var(--text-muted); font-family: monospace; text-align: center; margin-bottom: 0.5rem; font-size: 14px; }
  
  /* Nebulas */
  .nebula { position: fixed; filter: blur(120px); border-radius: 50%; opacity: 0.12; pointer-events: none; z-index: -2; animation: nebPulse 8s infinite alternate; }
  .neb-1 { width: 600px; height: 400px; background: #3D1F8A; top: -10%; left: -10%; }
  .neb-2 { width: 600px; height: 400px; background: #1A1060; bottom: -10%; right: -10%; }
  .neb-3 { width: 500px; height: 500px; background: #0D2B2B; top: 30%; left: 30%; }
  @keyframes nebPulse { 0% { opacity: 0.08; } 100% { opacity: 0.18; } }

  /* Cursor */
  #cursor-ring { position: fixed; width: 24px; height: 24px; border: 1.5px solid var(--accent); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s, background 0.2s; }
  #cursor-dot { position: fixed; width: 6px; height: 6px; background: var(--accent); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); }
  #cursor-ring.hover { width: 40px; height: 40px; background: rgba(127,119,221,0.1); }
  
  .particle { position: fixed; width: 4px; height: 4px; background: var(--accent); border-radius: 50%; pointer-events: none; z-index: 9998; animation: burst 0.4s forwards; }
  @keyframes burst { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }

  /* Scroll Progress */
  #progress-bar { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--accent), #39FF85); box-shadow: 0 0 10px var(--accent); z-index: 1001; transition: width 0.1s; }
  
  /* Scroll Spy Dots */
  .spy-dots { position: fixed; right: 24px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 1000; }
  .spy-dot { width: 6px; height: 6px; border: 1px solid var(--text-muted); border-radius: 50%; transition: all 0.3s; position: relative; }
  .spy-dot.active { width: 10px; height: 10px; background: var(--accent); border-color: var(--accent); box-shadow: 0 0 10px var(--accent); }
  .spy-tooltip { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: var(--bg); padding: 4px 8px; font-size: 10px; border-radius: 4px; border: 1px solid var(--accent); opacity: 0; pointer-events: none; transition: 0.3s; white-space: nowrap; }
  .spy-dot:hover .spy-tooltip { opacity: 1; }

  /* Back to Top Rocket */
  .rocket-btn { position: fixed; bottom: 80px; right: 24px; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 1000; font-size: 20px; opacity: 0; pointer-events: none; transition: 0.3s; }
  .rocket-btn.visible { opacity: 1; pointer-events: auto; }
  .rocket-btn.shake { animation: shake 0.5s; }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-3px) rotate(-5deg); } 75% { transform: translateX(3px) rotate(5deg); } }

  /* Theme Switcher */
  .theme-btn { position: fixed; bottom: 24px; right: 24px; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 1000; font-size: 24px; transition: 0.3s; }
  .theme-btn:hover { transform: scale(1.1); box-shadow: 0 0 20px var(--accent-glow); }
  .theme-tooltip { position: absolute; right: 60px; top: 50%; transform: translateY(-50%); background: var(--bg); padding: 4px 8px; font-size: 12px; border-radius: 4px; border: 1px solid var(--accent); opacity: 0; pointer-events: none; transition: 0.3s; white-space: nowrap; }
  .theme-btn:hover .theme-tooltip { opacity: 1; }

  /* Container & Reveal */
  .container { max-width: 1200px; margin: 0 auto; padding: 100px 20px; min-height: 100vh; position: relative; }
  .reveal { opacity: 0; transform: translateY(40px); transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* Hero Section */
  .hero { display: flex; align-items: center; justify-content: space-between; min-height: 100vh; }
  .hero-left { width: 45%; }
  .hero-right { width: 55%; display: flex; justify-content: center; perspective: 1000px; position: relative; }
  .glitch { animation: glitchAnim 1.5s ease-out; }
  @keyframes glitchAnim {
    0%, 100% { text-shadow: 0 0 40px var(--accent-glow); }
    10% { text-shadow: 2px 0 red, -2px 0 blue; }
    20% { text-shadow: -2px 0 red, 2px 0 blue; }
    30% { text-shadow: 2px 0 red, -2px 0 blue; }
  }
  .hero-title { font-size: clamp(48px, 7vw, 96px); line-height: 1.1; margin: 10px 0; color: #fff; }
  .hero-subtitle { font-size: 18px; color: var(--text-muted); margin-bottom: 30px; }
  
  .stats-row { display: flex; gap: 20px; margin-bottom: 30px; }
  .stat-item { text-align: center; }
  .stat-num { font-size: 32px; color: var(--accent); text-shadow: 0 0 15px var(--accent-glow); }
  .stat-lbl { font-size: 12px; color: var(--text-muted); }

  .hero-ctas { display: flex; gap: 15px; }
  .btn-sweep { position: relative; overflow: hidden; background: var(--accent); color: #fff; padding: 12px 28px; border-radius: 50px; font-weight: 600; text-decoration: none; border: none; display: inline-block; cursor: pointer; }
  .btn-sweep::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animation: sweep 3s infinite; }
  @keyframes sweep { 0% { left: -100%; } 20%, 100% { left: 200%; } }
  .btn-outline { background: transparent; color: var(--accent); border: 2px solid var(--accent); padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; }

  /* Phone Mockup 3D */
  .phone-3d-wrapper { transition: transform 0.1s linear; transform-style: preserve-3d; }
  .phone-mockup { width: 280px; height: 560px; border-radius: 44px; border: 2px solid rgba(159,140,255,0.4); background: #0D0D1F; box-shadow: inset 0 0 40px rgba(0,0,0,0.8), 0 30px 60px var(--accent-glow); position: relative; overflow: hidden; }
  .phone-notch { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 90px; height: 28px; background: #000; border-radius: 14px; z-index: 10; }
  .phone-screen { position: absolute; top:0; left:0; width:100%; height:100%; background: #0A0A1E; padding: 45px 15px 15px; transition: opacity 0.5s; display: flex; flex-direction: column; gap: 15px; }
  
  .orbit-satellite { position: absolute; background: #0D0D1F; border: 1px solid var(--accent); color: var(--text-primary); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-family: monospace; animation: ellipticalOrbit linear infinite; transform-style: preserve-3d; }
  @keyframes ellipticalOrbit {
    0% { transform: rotate(0deg) translateX(180px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
  }

  /* Solar System Skills */
  .solar-system { position: relative; width: 600px; height: 600px; margin: 0 auto; display: flex; align-items: center; justify-content: center; }
  .sun { width: 120px; height: 120px; background: radial-gradient(circle, var(--accent), #3D1F8A); border-radius: 50%; box-shadow: 0 0 40px var(--accent), 0 0 80px var(--accent-glow); display: flex; align-items: center; justify-content: center; font-family: 'Orbitron'; font-weight: bold; color: white; animation: sunPulse 3s infinite alternate; z-index: 10; }
  @keyframes sunPulse { 0% { box-shadow: 0 0 40px var(--accent), 0 0 80px var(--accent-glow); } 100% { box-shadow: 0 0 60px var(--accent), 0 0 120px var(--accent-glow); } }
  
  .orbit-ring { position: absolute; border: 1px dashed rgba(127,119,221,0.2); border-radius: 50%; transform-style: preserve-3d; }
  .ring-inner { width: 300px; height: 300px; animation: spin var(--dur) linear infinite; }
  .ring-outer { width: 500px; height: 500px; animation: spin var(--dur) linear infinite; }
  .planet-container { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(calc(var(--angle) * 1deg)) translateX(var(--radius)); }
  .planet { width: 50px; height: 50px; background: var(--bg); border: 1px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; text-align: center; color: var(--text-primary); animation: spinReverse var(--dur) linear infinite; transition: 0.3s; position: relative; cursor: pointer; }
  .planet:hover { transform: scale(1.3); z-index: 20; background: var(--accent); box-shadow: 0 0 20px var(--accent); }
  .p-tooltip { position: absolute; top: 120%; width: 150px; background: var(--bg); border: 1px solid var(--accent); padding: 8px; border-radius: 8px; font-size: 10px; opacity: 0; pointer-events: none; transition: 0.3s; z-index: 30; }
  .planet:hover .p-tooltip { opacity: 1; }

  @keyframes spin { 100% { transform: rotate(360deg); } }
  @keyframes spinReverse { 100% { transform: rotate(-360deg); } }

  .asteroid { position: absolute; background: rgba(127,119,221,0.1); border: 1px solid rgba(127,119,221,0.3); padding: 4px 10px; border-radius: 20px; font-size: 11px; animation: float 4s ease-in-out infinite alternate; animation-delay: var(--del); }
  @keyframes float { 0% { transform: translateY(-10px); } 100% { transform: translateY(10px); } }

  /* Experience Section */
  .exp-wrapper { display: flex; position: relative; }
  .timeline { width: 2px; background: var(--accent); position: absolute; left: 0; top: 0; height: 0; transition: height 1s ease-out; transition-delay: 0.5s; }
  .exp-wrapper.visible .timeline { height: 100%; }
  .timeline-dot { width: 12px; height: 12px; background: var(--bg); border: 2px solid var(--accent); border-radius: 50%; position: absolute; left: -5px; top: 0; box-shadow: 0 0 10px var(--accent); }
  
  .mission-card { margin-left: 30px; padding: 40px; position: relative; overflow: hidden; transform: translateX(-100px); opacity: 0; transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .exp-wrapper.visible .mission-card { transform: translateX(0); opacity: 1; }
  .scanline { position: absolute; top:0; left:0; width:100%; height:100%; background: repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px); pointer-events: none; z-index: -1; }
  
  .tech-pill-wrapper { perspective: 600px; width: 100px; height: 30px; }
  .tech-pill-inner { width: 100%; height: 100%; position: relative; transition: transform 0.6s; transform-style: preserve-3d; }
  .tech-pill-wrapper:hover .tech-pill-inner { transform: rotateY(180deg); }
  .tech-front, .tech-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; border-radius: 50px; font-size: 11px; }
  .tech-front { background: rgba(127,119,221,0.1); border: 1px solid var(--accent); }
  .tech-back { background: var(--accent); color: #fff; transform: rotateY(180deg); }

  /* Projects */
  .holo-card { position: relative; overflow: hidden; }
  .holo-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(var(--grad-angle, 45deg), rgba(127,119,221,0.15), rgba(57,255,133,0.1), rgba(127,119,221,0.15)); mix-blend-mode: color-dodge; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
  .holo-card:hover .holo-overlay { opacity: 1; }
  
  .feat-tag { display: inline-block; transition: 0.3s; }
  .feat-tag:hover { transform: translateY(-4px); box-shadow: 0 0 15px #39FF85; }
  .live-btn { display: inline-flex; align-items: center; gap: 8px; border: 1px solid #39FF85; color: #39FF85; padding: 6px 16px; border-radius: 20px; font-size: 12px; cursor: pointer; background: rgba(57,255,133,0.05); }
  .live-dot { width: 8px; height: 8px; background: #39FF85; border-radius: 50%; animation: pulseGreen 1.5s infinite; }
  @keyframes pulseGreen { 0% { box-shadow: 0 0 0 0 rgba(57,255,133,0.7); } 70% { box-shadow: 0 0 0 10px rgba(57,255,133,0); } 100% { box-shadow: 0 0 0 0 rgba(57,255,133,0); } }

  .screenshot-strip { display: flex; gap: 15px; overflow-x: auto; padding: 20px 0; scrollbar-width: none; }
  .screenshot-strip::-webkit-scrollbar { display: none; }
  .ss-item { min-width: 100px; height: 200px; border-radius: 12px; border: 2px solid rgba(255,255,255,0.1); background: #0A0A1E; padding: 10px; }
  
  /* Education */
  .shimmer-card { position: relative; overflow: hidden; }
  .shimmer-card::before { content: ''; position: absolute; top:0; left:-150%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); transform: skewX(-20deg); transition: 0.5s; }
  .shimmer-card:hover::before { left: 150%; transition: 0.8s ease-in-out; }
  .constellation-path { stroke-dasharray: 200; stroke-dashoffset: 200; transition: stroke-dashoffset 2s ease-out; transition-delay: 0.5s; }
  .visible .constellation-path { stroke-dashoffset: 0; }
  
  .cgpa-dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--accent); transition: background 0.3s; }
  .cgpa-dot.filled { background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: pop 0.3s forwards; }
  @keyframes pop { 50% { transform: scale(1.3); } }

  /* Contact */
  .pod-wrapper { perspective: 1000px; width: 120px; height: 120px; }
  .pod-inner { width: 100%; height: 100%; position: relative; transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1); transform-style: preserve-3d; }
  .pod-wrapper:hover .pod-inner { transform: rotateY(180deg); }
  .pod-front, .pod-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .pod-front { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); }
  .pod-back { background: var(--accent); color: #fff; transform: rotateY(180deg); font-size: 11px; padding: 10px; text-align: center; }
  
  .transporter-btn { position: relative; }
  .beam { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); width: 2px; background: linear-gradient(to top, var(--accent), transparent); height: 0; opacity: 0; transition: 0.3s; }
  .transporter-btn:hover .beam { height: 80px; opacity: 1; animation: beamAnim 1s infinite; }
  @keyframes beamAnim { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; height: 100px; top: -100px; } }

  .contact-form { max-height: 0; overflow: hidden; transition: max-height 0.5s ease; margin-top: 20px; }
  .contact-form.open { max-height: 400px; }
  .form-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px; color: #fff; border-radius: 8px; margin-bottom: 15px; outline: none; transition: 0.3s; font-family: 'Inter'; }
  .form-input:focus { border-color: var(--accent); }

  .toast { position: fixed; bottom: -50px; left: 50%; transform: translateX(-50%); background: #39FF85; color: #000; padding: 10px 20px; border-radius: 20px; font-weight: bold; transition: bottom 0.3s; z-index: 2000; }
  .toast.show { bottom: 30px; }

  @media (max-width: 1024px) {
    .container { padding: 80px 20px; }
    .solar-system { transform: scale(0.8); }
    .hero-title { font-size: clamp(40px, 6vw, 70px); }
  }

  @media (max-width: 768px) {
    #cursor-ring, #cursor-dot { display: none !important; }
    * { cursor: auto !important; }
    .solar-system { display: none !important; }
    .mobile-skills { display: flex !important; flex-direction: column; gap: 15px; }
    .hero { flex-direction: column; text-align: center; gap: 40px; padding-top: 100px; }
    .hero-left, .hero-right { width: 100%; }
    .stats-row, .hero-ctas { justify-content: center; }
    .phone-mockup { width: 220px; height: 440px; margin: 0 auto; }
    .orbit-satellite { display: none; }
    .mission-card { margin-left: 15px; padding: 20px; }
    .holo-card { flex-direction: column; padding: 20px !important; gap: 20px !important; }
    .proj-left, .proj-right { width: 100%; text-align: center; }
    .mini-phone { margin: 0 auto; transform: none; width: 220px; filter: none !important; }
    .diploma-card { padding: 30px 15px; }
    .spy-dots { display: none; }
    .theme-btn, .rocket-btn { transform: scale(0.8); right: 10px; }
    .contact-row { gap: 20px !important; }
  }

  @media (max-width: 425px) {
    .container { padding: 60px 15px; }
    .hero-title { font-size: clamp(32px, 8vw, 40px); }
    .hero-subtitle { font-size: 14px; }
    .stats-row { flex-wrap: wrap; gap: 10px; }
    .stat-item { width: 45%; }
    .hero-ctas { flex-direction: column; }
    .btn-sweep, .btn-outline { width: 100%; padding: 12px; font-size: 14px; }
    .phone-mockup { width: 200px; height: 400px; }
    .tech-pill-wrapper { width: 80px; height: 26px; }
    .tech-front, .tech-back { font-size: 9px; }
    .mini-phone { width: 180px; height: 360px; }
    .cgpa-val { font-size: 36px !important; }
    .pod-wrapper { width: 100px; height: 100px; }
    .open-banner { padding: 20px !important; }
  }
  .mobile-skills { display: none; }
`;

const THEMES = {
  deepSpace: { bg: '#050510', accent: '#7F77DD', accentGlow: 'rgba(127,119,221,0.5)' },
  nebula: { bg: '#0D0520', accent: '#C77DFF', accentGlow: 'rgba(199,125,255,0.5)' },
  aurora: { bg: '#020D0D', accent: '#00F5D4', accentGlow: 'rgba(0,245,212,0.5)' }
};

function useMouse() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    const over = e => setHover(!!e.target.closest('a, button, .planet, .pod-wrapper, .tech-pill-wrapper'));
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); }
  }, []);
  return { pos, hover };
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(e => {
      e.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function CustomCursor({ pos, hover }) {
  const outer = useRef(null);
  const trail = useRef({ x: -100, y: -100 });
  useEffect(() => {
    let frame;
    const render = () => {
      trail.current.x += (pos.x - trail.current.x) * 0.08;
      trail.current.y += (pos.y - trail.current.y) * 0.08;
      if (outer.current) {
        outer.current.style.left = `${trail.current.x}px`;
        outer.current.style.top = `${trail.current.y}px`;
      }
      frame = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frame);
  }, [pos]);

  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const click = e => {
      const newP = Array.from({length: 8}).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return { id: Date.now() + i, x: e.clientX, y: e.clientY, tx: Math.cos(angle)*40, ty: Math.sin(angle)*40 };
      });
      setParticles(p => [...p, ...newP]);
      setTimeout(() => setParticles(p => p.filter(pt => !newP.includes(pt))), 400);
    };
    window.addEventListener('click', click);
    return () => window.removeEventListener('click', click);
  }, []);

  return (
    <>
      <div id="cursor-ring" ref={outer} className={hover ? 'hover' : ''}></div>
      <div id="cursor-dot" style={{ left: pos.x, top: pos.y, opacity: hover ? 0 : 1 }}></div>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{ left: p.x, top: p.y, '--tx': `${p.tx}px`, '--ty': `${p.ty}px` }}></div>
      ))}
    </>
  );
}

function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let frame;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();

    const stars = [
      ...Array.from({length: 300}).map(() => ({ x: Math.random()*c.width, y: Math.random()*c.height, r: 0.5, s: 0.02, o: 0.4 })),
      ...Array.from({length: 150}).map(() => ({ x: Math.random()*c.width, y: Math.random()*c.height, r: 1, s: 0.06, o: 0.7 })),
      ...Array.from({length: 50}).map(() => ({ x: Math.random()*c.width, y: Math.random()*c.height, r: 1.5, s: 0.12, o: 1 }))
    ];
    let shootingStars = [];

    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      stars.forEach(st => {
        if (Math.random() < 0.001) st.twinkle = 60;
        let op = st.o;
        if (st.twinkle) { op = 1; st.twinkle--; }
        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI*2); ctx.fill();
        st.y += st.s;
        if (st.y > c.height) { st.y = 0; st.x = Math.random()*c.width; }
      });

      if (Math.random() < 0.005) {
        shootingStars.push({ x: Math.random()*c.width, y: 0, life: 60, max: 60 });
      }
      shootingStars = shootingStars.filter(ss => ss.life > 0);
      shootingStars.forEach(ss => {
        ctx.strokeStyle = `rgba(255,255,255,${Math.sin((ss.life/ss.max)*Math.PI)})`;
        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(ss.x - 80, ss.y + 80); ctx.stroke();
        ss.x -= 8; ss.y += 8; ss.life--;
      });

      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(frame); }
  }, []);
  return <canvas ref={canvasRef} id="starfield" style={{position:'fixed', top:0, left:0, zIndex:-3, pointerEvents:'none'}}></canvas>;
}

function useTypewriter(words) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (isDeleting) {
      if (text.length > 0) timeout = setTimeout(() => setText(current.substring(0, text.length - 1)), 40);
      else { setIsDeleting(false); setWordIdx((i) => (i + 1) % words.length); }
    } else {
      if (text.length < current.length) timeout = setTimeout(() => setText(current.substring(0, text.length + 1)), 80);
      else timeout = setTimeout(() => setIsDeleting(true), 2000);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words]);
  return text;
}

function Counter({ target, duration }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ob = new IntersectionObserver(e => {
      if(e[0].isIntersecting) setStarted(true);
    });
    if(ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start;
    let frame;
    const update = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(target * ease);
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, started]);
  
  const display = target % 1 === 0 ? Math.floor(count) : count.toFixed(2);
  return <span ref={ref}>{display}</span>;
}

export default function App() {
  const [theme, setTheme] = useState('deepSpace');
  const { pos, hover } = useMouse();
  useScrollReveal();

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = globalCSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved && THEMES[saved]) setTheme(saved);
  }, []);

  useEffect(() => {
    const t = THEMES[theme];
    document.documentElement.style.setProperty('--bg', t.bg);
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty('--accent-glow', t.accentGlow);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [scrollP, setScrollP] = useState(0);
  const [activeSec, setActiveSec] = useState('hero');
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollP((winScroll / height) * 100);
      
      const sections = ['hero', 'skills', 'experience', 'projects', 'education', 'contact'];
      for(let s of sections) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 300) setActiveSec(s);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const typeTextHero = useTypewriter(["Flutter Developer", "Mobile Engineer", "Clean Arch Advocate", "Dart Specialist"]);
  const typeTextExp = useTypewriter(["Mission: Invoice Flow Enterprise Billing"]);
  
  const [screenIdx, setScreenIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setScreenIdx(p => (p+1)%3), 3000);
    return () => clearInterval(i);
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("udayjamariya12@gmail.com");
    setToast(true); setTimeout(() => setToast(false), 2000);
  };

  const phoneRef = useRef(null);
  const [phoneRot, setPhoneRot] = useState({x:0, y:0});
  useEffect(() => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (pos.x - cx) / (window.innerWidth/2);
    const dy = (pos.y - cy) / (window.innerHeight/2);
    setPhoneRot({ x: -dy * 4, y: dx * 8 });
  }, [pos]);

  return (
    <>
      <CustomCursor pos={pos} hover={hover} />
      <Starfield />
      <div className="nebula neb-1"></div><div className="nebula neb-2"></div><div className="nebula neb-3"></div>
      
      <div id="progress-bar" style={{ width: `${scrollP}%` }}></div>
      
      <div className="spy-dots">
        {['hero', 'skills', 'experience', 'projects', 'education', 'contact'].map(s => (
          <div key={s} className={`spy-dot ${activeSec === s ? 'active' : ''}`} onClick={() => document.getElementById(s).scrollIntoView({behavior:'smooth'})}>
            <div className="spy-tooltip">{s.charAt(0).toUpperCase() + s.slice(1)}</div>
          </div>
        ))}
      </div>

      <button className={`rocket-btn glass ${scrollP > 10 ? 'visible' : ''}`} onClick={(e) => { e.currentTarget.classList.add('shake'); setTimeout(() => e.currentTarget.classList.remove('shake'), 500); window.scrollTo({top:0, behavior:'smooth'}); }}>🚀</button>

      <button className="theme-btn glass" onClick={() => {
        const keys = Object.keys(THEMES);
        setTheme(keys[(keys.indexOf(theme) + 1) % keys.length]);
      }}>
        🎨<div className="theme-tooltip">Switch Theme</div>
      </button>

      {/* HERO */}
      <section id="hero" className="container reveal">
        <div className="hero">
          <div className="hero-left">
            <div className="eyebrow" style={{textAlign:'left'}}>&lt; {typeTextHero} <span style={{animation:'blink 1s step-end infinite'}}>|</span> /&gt;</div>
            <h1 className="hero-title glitch">Uday<br/>Jamariya</h1>
            <p className="hero-subtitle">Cross-Platform · Clean Architecture</p>
            
            <div className="stats-row">
              <div className="stat-item"><div className="stat-num"><Counter target={1} duration={1000}/></div><div className="stat-lbl">App Shipped</div></div>
              <div className="stat-item"><div className="stat-num"><Counter target={6} duration={1500}/></div><div className="stat-lbl">Months Exp</div></div>
              <div className="stat-item"><div className="stat-num"><Counter target={5} duration={1200}/>+</div><div className="stat-lbl">Technologies</div></div>
            </div>

            <div className="hero-ctas">
              <a href="#projects" className="btn-sweep">View My Work →</a>
              <a href="#contact" className="btn-outline">Contact Me</a>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="phone-3d-wrapper" style={{ transform: `rotateX(${phoneRot.x}deg) rotateY(${phoneRot.y}deg)` }}>
              <div className="phone-mockup" ref={phoneRef}>
                <div className="phone-notch"></div>
                
                {/* Screens */}
                <div className="phone-screen" style={{opacity: screenIdx===0?1:0, zIndex: screenIdx===0?2:1}}>
                  <div style={{display:'flex', justifyContent:'space-between', color:'#fff', fontWeight:600}}>Invoice Flow <span>🔔</span></div>
                  <div style={{display:'flex', gap:5}}>
                    <div style={{flex:1, background:'var(--accent)', padding:10, borderRadius:8, textAlign:'center'}}><div style={{fontWeight:'bold'}}>24</div><div style={{fontSize:9}}>Invs</div></div>
                    <div style={{flex:1, background:'#1A7A6E', padding:10, borderRadius:8, textAlign:'center'}}><div style={{fontWeight:'bold', color:'#fff'}}>18</div><div style={{fontSize:9, color:'#fff'}}>Clients</div></div>
                    <div style={{flex:1, background:'#3D1F8A', padding:10, borderRadius:8, textAlign:'center'}}><div style={{fontWeight:'bold', color:'#fff'}}>₹1.2L</div><div style={{fontSize:9, color:'#fff'}}>Rev</div></div>
                  </div>
                  <div style={{fontSize:12, color:'#fff', display:'flex', justifyContent:'space-between'}}>Recent <span style={{color:'#39FF85'}}>View All</span></div>
                  {[['Ramesh', 'Paid', '#39FF85'],['Patel', 'Pending', '#eab308'],['Shah', 'Due', '#ef4444']].map(r => (
                    <div key={r[0]} style={{display:'flex', justifyContent:'space-between', padding:8, background:'rgba(255,255,255,0.05)', borderRadius:8}}>
                      <div style={{fontSize:11, color:'#fff'}}>{r[0]}</div><div style={{fontSize:9, padding:'2px 6px', borderRadius:10, border:`1px solid ${r[2]}`, color:r[2]}}>{r[1]}</div>
                    </div>
                  ))}
                  <div style={{position:'absolute', bottom:10, left:10, right:10, height:50, background:'rgba(255,255,255,0.1)', borderRadius:25, display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                    <div style={{width:20,height:20, borderRadius:'50%', background:'var(--accent)'}}></div>
                    <div style={{width:20,height:20, borderRadius:'50%', background:'rgba(255,255,255,0.3)'}}></div>
                    <div style={{width:20,height:20, borderRadius:'50%', background:'rgba(255,255,255,0.3)'}}></div>
                  </div>
                </div>

                <div className="phone-screen" style={{opacity: screenIdx===1?1:0, background:'#0F0F20', zIndex: screenIdx===1?2:1}}>
                   <div style={{color:'#fff', fontWeight:600}}>All Invoices</div>
                   {[1,2,3,4,5].map(i => <div key={i} style={{height:40, background:i%2===0?'rgba(255,255,255,0.03)':'transparent', borderRadius:4}}></div>)}
                </div>

                <div className="phone-screen" style={{opacity: screenIdx===2?1:0, zIndex: screenIdx===2?2:1}}>
                  <div style={{color:'#fff', fontWeight:600}}>Analytics</div>
                  <div style={{height:150, display:'flex', alignItems:'flex-end', gap:10, borderBottom:'1px solid rgba(255,255,255,0.2)'}}>
                    <div style={{flex:1, height:'40%', background:'var(--accent)'}}></div>
                    <div style={{flex:1, height:'70%', background:'#1A7A6E'}}></div>
                    <div style={{flex:1, height:'50%', background:'#3D1F8A'}}></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Satellites */}
            {[{t:'Container()', dur:'8s', y:200, d:0}, {t:'Scaffold()', dur:'12s', y:100, d:-2}, {t:'Bloc()', dur:'10s', y:-50, d:-4}, {t:'Firebase', dur:'15s', y:-150, d:-1}, {t:'GetX()', dur:'9s', y:50, d:-3}].map((s,i) => (
              <div key={i} className="orbit-satellite" style={{animationDuration: s.dur, animationDelay: `${s.d}s`, top: '50%', marginTop: `${s.y}px` }}>{s.t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="container reveal">
        <h2 className="section-title">Skills.dart</h2>
        <div className="solar-system">
          <div className="sun">Flutter</div>
          <div className="orbit-ring ring-inner" style={{'--dur':'20s'}}>
            <div className="planet-container" style={{'--angle': 0, '--radius': '150px'}}><div className="planet" style={{'--dur':'20s'}}>Dart<div className="p-tooltip">Core Language</div></div></div>
            <div className="planet-container" style={{'--angle': 120, '--radius': '150px'}}><div className="planet" style={{'--dur':'20s'}}>Bloc<div className="p-tooltip">State Mgmt</div></div></div>
            <div className="planet-container" style={{'--angle': 240, '--radius': '150px'}}><div className="planet" style={{'--dur':'20s'}}>Firebase<div className="p-tooltip">Backend</div></div></div>
          </div>
          <div className="orbit-ring ring-outer" style={{'--dur':'35s'}}>
            {[ {t:'GetX',a:0}, {t:'Provider',a:72}, {t:'REST',a:144}, {t:'SQLite',a:216}, {t:'Material',a:288} ].map(p => (
              <div key={p.t} className="planet-container" style={{'--angle': p.a, '--radius': '250px'}}><div className="planet" style={{'--dur':'35s'}}>{p.t}</div></div>
            ))}
          </div>
          <div className="asteroid" style={{top:'10%', left:'20%', '--del':'0s'}}>HTML / CSS</div>
          <div className="asteroid" style={{top:'80%', left:'80%', '--del':'1s'}}>Git</div>
          <div className="asteroid" style={{top:'20%', right:'10%', '--del':'2s'}}>App Store</div>
        </div>
        <div className="mobile-skills glass" style={{padding:20}}>
          <div style={{color:'var(--accent)', fontWeight:'bold', marginBottom:10}}>Core Expertise:</div>
          <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>{['Flutter', 'Dart', 'Bloc', 'Firebase', 'GetX', 'REST API'].map(s => <div key={s} style={{padding:'6px 12px', border:'1px solid var(--accent)', borderRadius:20, fontSize:12}}>{s}</div>)}</div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="container reveal">
        <h2 className="section-title">Experience.log</h2>
        <div className="exp-wrapper reveal">
          <div className="timeline" id="exp-timeline"><div className="timeline-dot"></div></div>
          <div className="mission-card glass" id="exp-card">
            <div className="scanline"></div>
            <div style={{color:'var(--text-muted)', fontSize:12, marginBottom:10}}>DEC 2025 – MAY 2026</div>
            <h3 style={{color:'#fff', fontSize:20, marginBottom:5}}>Excel PTP – Unit of Amar Infotech</h3>
            <div style={{color:'var(--accent)', fontSize:16, marginBottom:20, fontFamily:'monospace'}}>&gt; {typeTextExp}</div>
            <p style={{color:'var(--text-muted)', fontSize:14, lineHeight:1.6, marginBottom:20}}>Engineered a real-world enterprise billing and expense tracking application for an automobile service business using Flutter and Firebase...</p>
            <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
              {[{f:'Flutter', b:'UI Framework'}, {f:'Firebase', b:'Backend'}, {f:'Bloc', b:'State Mgmt'}].map(t => (
                <div key={t.f} className="tech-pill-wrapper"><div className="tech-pill-inner"><div className="tech-front">{t.f}</div><div className="tech-back">{t.b}</div></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="container reveal">
        <h2 className="section-title">Projects.apk</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div className="holo-card glass" style={{padding:40, display:'flex', gap:40}} 
            onMouseMove={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left; const y = e.clientY - rect.top;
              const angle = Math.atan2(y - rect.height/2, x - rect.width/2) * 180 / Math.PI;
              e.currentTarget.style.setProperty('--grad-angle', `${angle}deg`);
            }}>
            <div className="holo-overlay"></div>
            <div className="proj-left" style={{zIndex:2}}>
              <h3 className="orbitron" style={{fontSize:32, color:'#fff', marginBottom:10}}>Invoice Flow</h3>
              <div className="live-btn"><div className="live-dot"></div> Live Preview</div>
              <p style={{color:'var(--text-muted)', margin:'20px 0', lineHeight:1.6}}>A full-featured enterprise billing system for automobile service businesses — real-time invoice generation, PDF invoice sharing via WhatsApp, and business analytics.</p>
              <div style={{display:'flex', gap:10, flexWrap:'wrap', marginBottom:20}}>
                {['Invoice Gen', 'PDF Sharing', 'WhatsApp', 'Analytics'].map(f => <div key={f} className="feat-tag glass" style={{padding:'6px 12px', fontSize:12, color:'#39FF85', border:'1px solid #39FF85'}}>{f}</div>)}
              </div>
              
              {/* Screenshots strip */}
              <div className="screenshot-strip">
                <div className="ss-item" style={{display:'flex', flexDirection:'column', gap:5, background:'#0F0F20'}}>
                  <div style={{height:20, background:'rgba(255,255,255,0.1)', borderRadius:4}}></div>
                  <div style={{flex:1, display:'flex', alignItems:'flex-end', gap:4}}>
                    <div style={{flex:1, height:'40%', background:'var(--accent)', borderRadius:'2px 2px 0 0'}}></div>
                    <div style={{flex:1, height:'70%', background:'#1A7A6E', borderRadius:'2px 2px 0 0'}}></div>
                    <div style={{flex:1, height:'50%', background:'#3D1F8A', borderRadius:'2px 2px 0 0'}}></div>
                  </div>
                </div>
                <div className="ss-item" style={{display:'flex', flexDirection:'column', gap:5, background:'#0F0F20'}}>
                  <div style={{height:10, width:'50%', background:'var(--text-muted)', borderRadius:2}}></div>
                  {[1,2,3,4].map(i => <div key={i} style={{height:15, background:'rgba(255,255,255,0.05)', borderRadius:4}}></div>)}
                </div>
                <div className="ss-item" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#0F0F20'}}>
                  <div style={{width:40, height:50, background:'#fff', borderRadius:2, position:'relative'}}>
                    <div style={{position:'absolute', top:5, left:5, width:15, height:15, background:'#ef4444', borderRadius:2}}></div>
                    <div style={{position:'absolute', top:25, left:5, right:5, height:2, background:'#ccc'}}></div>
                    <div style={{position:'absolute', top:30, left:5, right:15, height:2, background:'#ccc'}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="proj-right" style={{perspective:1000, zIndex:2}}>
               <div className="phone-mockup mini-phone" style={{width: 200, height:400, transform: `rotateY(${phoneRot.x}deg) rotateX(${phoneRot.y}deg)`, filter:'drop-shadow(0 30px 60px var(--accent-glow))'}}>
                 <div className="phone-notch" style={{width:60, height:20}}></div>
                 <div className="phone-screen" style={{padding: '30px 10px 10px', background: '#0A0A1E', display: 'block'}}>
                   <div style={{color:'#fff', fontWeight:600, fontSize:14}}>Invoice Flow</div>
                   <div style={{display:'flex', gap:5, marginTop:10}}>
                     <div style={{flex:1, background:'var(--accent)', padding:5, borderRadius:4, textAlign:'center'}}><div style={{fontWeight:'bold', fontSize:12, color:'#fff'}}>24</div><div style={{fontSize:8, color:'#fff'}}>Invs</div></div>
                     <div style={{flex:1, background:'#1A7A6E', padding:5, borderRadius:4, textAlign:'center'}}><div style={{fontWeight:'bold', color:'#fff', fontSize:12}}>18</div><div style={{fontSize:8, color:'#fff'}}>Clients</div></div>
                   </div>
                   <div style={{fontSize:10, color:'#fff', marginTop:15, marginBottom:5}}>Recent Activity</div>
                   {[['Ramesh', '#39FF85'],['Patel', '#eab308'],['Shah', '#ef4444']].map((r, idx) => (
                     <div key={idx} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:6, background:'rgba(255,255,255,0.05)', borderRadius:4, marginTop:4}}>
                       <div style={{fontSize:9, color:'#fff'}}>{r[0]}</div>
                       <div style={{width:6, height:6, borderRadius:'50%', background:r[1]}}></div>
                     </div>
                   ))}
                   <div style={{position:'absolute', bottom:10, left:10, right:10, height:40, background:'rgba(255,255,255,0.1)', borderRadius:20, display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                     <div style={{width:16,height:16, borderRadius:'50%', background:'var(--accent)'}}></div>
                     <div style={{width:16,height:16, borderRadius:'50%', background:'rgba(255,255,255,0.3)'}}></div>
                     <div style={{width:16,height:16, borderRadius:'50%', background:'rgba(255,255,255,0.3)'}}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="holo-card glass" style={{padding:40, display:'flex', gap:40}} 
            onMouseMove={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left; const y = e.clientY - rect.top;
              const angle = Math.atan2(y - rect.height/2, x - rect.width/2) * 180 / Math.PI;
              e.currentTarget.style.setProperty('--grad-angle', `${angle}deg`);
            }}>
            <div className="holo-overlay"></div>
            <div className="proj-left" style={{zIndex:2}}>
              <h3 className="orbitron" style={{fontSize:32, color:'#fff', marginBottom:10}}>ServeEas</h3>
              <div className="live-btn"><div className="live-dot"></div> Live Preview</div>
              <p style={{color:'var(--text-muted)', margin:'20px 0', lineHeight:1.6}}>A comprehensive service booking platform enabling seamless user interactions, service provider management, and easy scheduling.</p>
              <div style={{display:'flex', gap:10, flexWrap:'wrap', marginBottom:20}}>
                {['Service Booking', 'Provider Mgmt', 'Scheduling', 'Payments'].map(f => <div key={f} className="feat-tag glass" style={{padding:'6px 12px', fontSize:12, color:'#39FF85', border:'1px solid #39FF85'}}>{f}</div>)}
              </div>
              
              {/* Screenshots strip */}
              <div className="screenshot-strip">
                <div className="ss-item" style={{display:'flex', flexDirection:'column', gap:5, background:'#0F0F20'}}>
                  <div style={{height:20, background:'rgba(255,255,255,0.1)', borderRadius:4, marginBottom:10}}></div>
                  <div style={{display:'flex', flexWrap:'wrap', gap:4}}>
                    {[1,2,3,4].map(i => <div key={i} style={{width:'45%', height:30, background:'rgba(127,119,221,0.2)', borderRadius:4}}></div>)}
                  </div>
                </div>
                <div className="ss-item" style={{display:'flex', flexDirection:'column', gap:8, background:'#0F0F20'}}>
                  <div style={{display:'flex', alignItems:'center', gap:5}}>
                    <div style={{width:20, height:20, borderRadius:'50%', background:'#39FF85'}}></div>
                    <div style={{flex:1, height:10, background:'rgba(255,255,255,0.1)', borderRadius:2}}></div>
                  </div>
                  <div style={{height:30, background:'rgba(255,255,255,0.05)', borderRadius:4}}></div>
                  <div style={{height:30, background:'rgba(255,255,255,0.05)', borderRadius:4}}></div>
                </div>
                <div className="ss-item" style={{display:'flex', flexDirection:'column', gap:5, background:'#0F0F20'}}>
                  <div style={{flex:1, background:'#0D2B2B', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div style={{width:20, height:20, border:'2px solid #39FF85', borderRadius:'50%', borderTopColor:'transparent', animation:'spin 1s linear infinite'}}></div>
                  </div>
                  <div style={{height:15, background:'var(--accent)', borderRadius:4}}></div>
                </div>
              </div>
            </div>
            <div className="proj-right" style={{perspective:1000, zIndex:2}}>
               <div className="phone-mockup mini-phone" style={{width: 200, height:400, transform: `rotateY(${phoneRot.x}deg) rotateX(${phoneRot.y}deg)`, filter:'drop-shadow(0 30px 60px var(--accent-glow))'}}>
                 <div className="phone-notch" style={{width:60, height:20}}></div>
                 <div className="phone-screen" style={{padding: '30px 10px 10px', background: '#0A0A1E', display: 'block'}}>
                   <div style={{color:'#fff', fontWeight:600, fontSize:14}}>ServeEas</div>
                   <div style={{background:'rgba(255,255,255,0.05)', padding:8, borderRadius:6, marginTop:10}}>
                     <div style={{fontSize:9, color:'var(--text-muted)'}}>Upcoming Booking</div>
                     <div style={{fontSize:11, color:'#fff', fontWeight:'bold', marginTop:2}}>AC Service & Repair</div>
                     <div style={{fontSize:9, color:'#39FF85', marginTop:2}}>Today, 2:00 PM</div>
                   </div>
                   <div style={{display:'flex', gap:5, marginTop:10}}>
                     {['Cleaning', 'Plumbing', 'Electrical'].map((s, idx) => (
                       <div key={idx} style={{flex:1, background:'rgba(127,119,221,0.1)', border:'1px solid var(--accent)', padding:4, borderRadius:4, textAlign:'center', fontSize:7, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>{s}</div>
                     ))}
                   </div>
                   <div style={{marginTop:10, flex: 1, minHeight:60, background:'rgba(57,255,133,0.05)', border:'1px dashed rgba(57,255,133,0.3)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#39FF85'}}>
                     📍 Map View
                   </div>
                   <div style={{position:'absolute', bottom:10, left:10, right:10, height:40, background:'rgba(255,255,255,0.1)', borderRadius:20, display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                     <div style={{width:16,height:16, borderRadius:'50%', background:'var(--accent)'}}></div>
                     <div style={{width:16,height:16, borderRadius:'50%', background:'rgba(255,255,255,0.3)'}}></div>
                     <div style={{width:16,height:16, borderRadius:'50%', background:'rgba(255,255,255,0.3)'}}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="container reveal">
        <h2 className="section-title">Education.json</h2>
        <div className="shimmer-card glass diploma-card" style={{maxWidth:600, margin:'0 auto', padding:40, textAlign:'center'}}>
          <svg width="100" height="60" viewBox="0 0 100 60" style={{margin:'0 auto 20px'}}>
            <path className="constellation-path" d="M10,30 L30,10 L60,20 L80,50 L90,20" fill="none" stroke="var(--accent)" strokeWidth="1"/>
            {[ {x:10,y:30}, {x:30,y:10}, {x:60,y:20}, {x:80,y:50}, {x:90,y:20} ].map((p,i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="#fff"/>)}
          </svg>
          <h3 className="orbitron deg-title" style={{fontSize:24, color:'#fff'}}>Bachelor of Computer Applications</h3>
          <div style={{color:'var(--text-muted)', margin:'10px 0'}}>📍 Shri V.J. Modha College of I.T., Gujarat</div>
          
          <div className="orbitron cgpa-val" style={{fontSize:48, color:'var(--accent)', marginTop:20}}><Counter target={7.56} duration={2000}/> <span style={{fontSize:20, color:'var(--text-muted)'}}>/10</span></div>
          <div style={{fontSize:12, letterSpacing:2, color:'var(--text-muted)'}}>CGPA</div>
          
          <div className="cgpa-dots" style={{display:'flex', justifyContent:'center', gap:8, marginTop:20}}>
            {[...Array(10)].map((_, i) => <div key={i} className={`cgpa-dot ${i<8 ? 'filled' : ''}`} style={{animationDelay: `${i*150}ms`}}></div>)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container reveal">
        <h2 className="section-title">Contact.init()</h2>
        <div className="contact-row" style={{display:'flex', justifyContent:'center', gap:40, marginBottom:40, flexWrap:'wrap'}}>
          {[ {i:'📞', l:'Call Me', b:'+91 9574896847', h:'tel:9574896847'}, {i:'✉', l:'Email', b:'Click to email', h:'mailto:udayjamariya12@gmail.com'}, {i:'in', l:'Connect', b:'uday-jamariya', h:'https://linkedin.com/in/uday-jamariya'} ].map(p => (
            <a key={p.l} href={p.h} target="_blank" className="pod-wrapper" style={{textDecoration:'none'}}>
              <div className="pod-inner">
                <div className="pod-front"><div style={{fontSize:32}}>{p.i}</div><div style={{fontSize:12, marginTop:5, color:'var(--text-primary)'}}>{p.l}</div></div>
                <div className="pod-back">{p.b}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="glass open-banner" style={{maxWidth:800, margin:'0 auto', padding:40, textAlign:'center'}}>
          <p className="ob-text" style={{fontSize:16, color:'#fff', marginBottom:30}}>"Currently open to Flutter Developer roles — freelance, internship, or full-time."</p>
          <button className="btn-sweep transporter-btn" onClick={() => setFormOpen(!formOpen)}>
            Initiate Contact →
            <div className="beam"></div>
          </button>
          
          <div className={`contact-form ${formOpen ? 'open' : ''}`}>
            <input className="form-input" placeholder="Name" />
            <input className="form-input" placeholder="Email" />
            <textarea className="form-input" rows="4" placeholder="Message"></textarea>
            <button className="btn-sweep" style={{width:'100%'}}>Send Transmission</button>
          </div>

          <div style={{marginTop:30, fontSize:14, color:'var(--text-muted)'}}>
            Or reach me directly at <span style={{color:'var(--accent)', cursor:'pointer'}} onClick={copyEmail}>udayjamariya12@gmail.com</span>
          </div>
        </div>
      </section>
      
      <div className={`toast ${toast ? 'show' : ''}`}>Copied! ✓</div>

      <div style={{textAlign:'center', padding:30, color:'var(--text-muted)', fontSize:12, borderTop:'1px solid rgba(255,255,255,0.05)', marginTop: 50}}>
        Built with React · Designed in Zero Gravity · Uday Jamariya © 2026
      </div>
    </>
  );
}
