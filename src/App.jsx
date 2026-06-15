import React, { useEffect, useRef, useState } from 'react';

// === CSS Styles ===
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Orbitron:wght@700;900&display=swap');

  :root {
    --bg-dark: #050510;
    --primary-violet: #7F77DD;
    --light-lavender: #AFA9EC;
    --glow-green: #39FF85;
    --card-border: rgba(159,140,255,0.25);
    --text-primary: #F0EEFF;
    --text-muted: #8A85B8;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    cursor: none !important;
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6, .orbitron {
    font-family: 'Orbitron', sans-serif;
  }

  /* Custom Cursor */
  #custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 12px;
    height: 12px;
    background-color: var(--primary-violet);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
  }
  #cursor-trail {
    position: fixed;
    top: 0;
    left: 0;
    width: 4px;
    height: 4px;
    background-color: var(--light-lavender);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: width 0.1s, height 0.1s;
  }

  /* Nebulas */
  .nebula-top-left {
    position: fixed;
    top: -10%;
    left: -10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, #3D1F8A 0%, transparent 70%);
    opacity: 0.2;
    z-index: -2;
    pointer-events: none;
  }
  .nebula-bottom-right {
    position: fixed;
    bottom: -10%;
    right: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, #1A1060 0%, transparent 70%);
    opacity: 0.15;
    z-index: -2;
    pointer-events: none;
  }

  /* Canvas */
  #starfield {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -3;
    pointer-events: none;
  }

  /* Anti-gravity float keyframes */
  @keyframes float {
    0%, 100% { transform: translateY(-12px); }
    50% { transform: translateY(12px); }
  }

  .anti-gravity {
    animation: float var(--float-dur, 5s) ease-in-out infinite;
    animation-delay: var(--float-del, 0s);
  }
  
  .parallax-layer {
    transform: translate(calc(var(--mouse-x, 0) * 1px), calc(var(--mouse-y, 0) * 1px));
    transition: transform 0.1s linear;
  }

  /* Glassmorphism */
  .glass-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(127,119,221,0.15);
  }

  /* Scroll reveal */
  .reveal-section {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: clamp(28px, 4vw, 48px);
    text-shadow: 0 0 30px rgba(127,119,221,0.8);
    text-align: center;
    margin-bottom: 3rem;
  }
  .eyebrow {
    color: var(--text-muted);
    font-family: monospace;
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 14px;
  }

  /* Navbar */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(5,5,16,0.8);
    backdrop-filter: blur(20px);
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    border-bottom: 1px solid rgba(159,140,255,0.1);
  }
  .nav-logo {
    color: var(--primary-violet);
    font-size: 24px;
    font-weight: 900;
    text-shadow: 0 0 10px rgba(127,119,221,0.5);
  }
  .nav-links {
    display: flex;
    gap: 30px;
  }
  .nav-link {
    color: var(--light-lavender);
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    padding: 5px 0;
    transition: color 0.3s;
  }
  .nav-link:hover, .nav-link.active {
    color: var(--primary-violet);
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-violet);
    transition: width 0.3s ease;
  }
  .nav-link:hover::after, .nav-link.active::after {
    width: 100%;
  }

  /* Layout */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Hero Section */
  .hero-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    padding-top: 60px;
  }
  .hero-left {
    width: 45%;
  }
  .hero-right {
    width: 55%;
    display: flex;
    justify-content: center;
    position: relative;
  }
  .hero-eyebrow {
    font-family: monospace;
    color: var(--primary-violet);
    font-size: 14px;
    margin-bottom: 10px;
  }
  .cursor-blink {
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }
  .hero-title {
    font-size: clamp(48px, 7vw, 96px);
    color: #fff;
    text-shadow: 0 0 40px rgba(127,119,221,0.9);
    line-height: 1.1;
    margin-bottom: 15px;
  }
  .hero-subtitle {
    font-size: 18px;
    color: var(--light-lavender);
    margin-bottom: 30px;
  }
  .hero-ctas {
    display: flex;
    gap: 15px;
    margin-bottom: 40px;
  }
  .btn-primary {
    background: var(--primary-violet);
    color: #fff;
    padding: 12px 28px;
    border-radius: 50px;
    border: none;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s;
  }
  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(127,119,221,0.6);
  }
  .btn-outline {
    background: transparent;
    color: var(--primary-violet);
    padding: 12px 28px;
    border-radius: 50px;
    border: 2px solid var(--primary-violet);
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s;
  }
  .btn-outline:hover {
    background: rgba(127,119,221,0.1);
  }
  .stat-pills {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  .stat-pill {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--card-border);
    border-radius: 50px;
    padding: 8px 16px;
    font-size: 13px;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 8px;
    backdrop-filter: blur(10px);
  }
  .stat-dot {
    width: 6px;
    height: 6px;
    background: var(--primary-violet);
    border-radius: 50%;
  }

  /* Phone Mockup */
  .phone-mockup {
    width: 280px;
    height: 560px;
    border-radius: 44px;
    border: 2px solid rgba(159,140,255,0.4);
    background: #0D0D1F;
    box-shadow: inset 0 0 40px rgba(0,0,0,0.8);
    position: relative;
    overflow: hidden;
    animation: phoneFloat 6s ease-in-out infinite;
  }
  @keyframes phoneFloat {
    0%, 100% { transform: translateY(-15px) rotate(-1deg); }
    50% { transform: translateY(15px) rotate(1deg); }
  }
  .phone-notch {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;
    height: 28px;
    background: #000;
    border-radius: 14px;
    z-index: 10;
  }
  .phone-screen {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: #0A0A1E;
    padding: 45px 15px 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .app-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }
  .summary-cards {
    display: flex;
    gap: 8px;
  }
  .summary-card {
    flex: 1;
    border-radius: 12px;
    padding: 10px 8px;
    text-align: center;
  }
  .summary-card.c1 { background: rgba(127,119,221,0.2); border: 1px solid rgba(127,119,221,0.4); }
  .summary-card.c2 { background: rgba(57,255,133,0.1); border: 1px solid rgba(57,255,133,0.3); }
  .summary-card.c3 { background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); }
  .summary-val { font-size: 16px; font-weight: 700; color: #fff; }
  .summary-lbl { font-size: 9px; color: rgba(255,255,255,0.7); margin-top: 4px; }
  .recent-header {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #fff;
    margin-top: 5px;
  }
  .list-item {
    background: rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list-left .name { font-size: 12px; color: #fff; }
  .list-left .inv { font-size: 10px; color: var(--text-muted); }
  .badge {
    font-size: 9px;
    padding: 3px 6px;
    border-radius: 10px;
  }
  .badge.paid { background: rgba(57,255,133,0.2); color: #39FF85; }
  .badge.pending { background: rgba(234,179,8,0.2); color: #eab308; }
  .badge.due { background: rgba(239,68,68,0.2); color: #ef4444; }
  .bottom-nav {
    position: absolute;
    bottom: 10px;
    left: 15px;
    right: 15px;
    background: rgba(255,255,255,0.1);
    border-radius: 20px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .nav-icon {
    width: 20px;
    height: 20px;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
  }
  .nav-icon.active { background: var(--primary-violet); }

  .orbit-label {
    position: absolute;
    background: #0D0D1F;
    border: 1px solid var(--primary-violet);
    color: var(--text-primary);
    font-family: monospace;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 20px;
  }
  .orbit-1 { bottom: 10%; left: -20px; }
  .orbit-2 { top: 40%; left: -40px; }
  .orbit-3 { top: 15%; right: -30px; }
  .orbit-4 { bottom: 25%; right: -20px; }
  .orbit-5 { top: 5%; left: 10px; }
  .orbit-6 { top: 50%; right: -50px; }

  .avail-badge {
    position: absolute;
    top: 50px;
    right: -30px;
    background: rgba(57,255,133,0.1);
    border: 1px solid var(--glow-green);
    color: var(--glow-green);
    font-size: 13px;
    padding: 6px 14px;
    border-radius: 50px;
    animation: availGlow 2s infinite;
    z-index: 20;
  }
  @keyframes availGlow {
    0%, 100% { box-shadow: 0 0 10px var(--glow-green); }
    50% { box-shadow: 0 0 20px var(--glow-green); }
  }

  /* Skills Section */
  .skills-clusters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    position: relative;
    min-height: 400px;
    align-items: center;
  }
  .skill-cluster {
    padding: 20px;
    min-width: 250px;
    transition: transform 0.3s;
  }
  .skill-cluster:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(127,119,221,0.25);
  }
  .cluster-title {
    font-family: 'Orbitron', sans-serif;
    color: var(--light-lavender);
    margin-bottom: 15px;
    font-size: 16px;
  }
  .cluster-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .skill-pill {
    background: rgba(127,119,221,0.12);
    border: 1px solid rgba(127,119,221,0.3);
    border-radius: 50px;
    padding: 6px 16px;
    color: var(--light-lavender);
    font-size: 13px;
    transition: all 0.3s;
  }
  .skill-pill:hover {
    background: rgba(127,119,221,0.3);
    color: #fff;
    transform: scale(1.08);
    box-shadow: 0 0 15px rgba(127,119,221,0.5);
  }
  .c-purple { border-left: 3px solid var(--primary-violet); }
  .c-blue { border-left: 3px solid #3b82f6; }
  .c-green { border-left: 3px solid var(--glow-green); transform: scale(1.05); box-shadow: 0 0 20px rgba(57,255,133,0.1); }
  .c-yellow { border-left: 3px solid #eab308; }
  .c-white { border-left: 3px solid #fff; }
  .primary-skill {
    font-weight: 700;
    color: #fff;
    border-color: var(--primary-violet);
    background: rgba(127,119,221,0.25);
  }
  .flagship-skill {
    font-size: 15px;
    padding: 8px 20px;
    font-weight: 700;
    color: #fff;
    border-color: #3b82f6;
    background: rgba(59,130,246,0.2);
  }
  .core-label {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--glow-green);
    color: #000;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 10px;
  }

  /* Experience Section */
  .mission-card {
    padding: 40px;
    transform: rotate(-0.5deg);
    position: relative;
    overflow: hidden;
  }
  .mission-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #7F77DD, #AFA9EC);
  }
  .mission-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  .mh-left { display: flex; gap: 15px; align-items: center; }
  .mh-logo {
    width: 48px; height: 48px;
    background: rgba(127,119,221,0.2);
    border-radius: 10px;
    display: flex; justify-content: center; align-items: center;
    color: var(--primary-violet); font-weight: 900;
  }
  .mh-title { font-size: 20px; font-weight: 600; color: #fff; }
  .mh-role { color: var(--light-lavender); font-size: 14px; margin-top: 4px; }
  .mh-date {
    border: 1px solid rgba(255,255,255,0.2);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .mission-divider {
    height: 1px;
    background: rgba(159,140,255,0.2);
    margin: 20px 0;
  }
  .mission-sub {
    font-size: 16px;
    color: var(--primary-violet);
    margin-bottom: 5px;
  }
  .mission-client {
    color: var(--text-muted);
    font-size: 14px;
    margin-bottom: 20px;
  }
  .mission-desc {
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 25px;
  }
  .mission-obj-title {
    font-size: 12px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 10px;
    letter-spacing: 1px;
  }
  .mission-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px; }
  .mission-list li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    color: var(--text-primary);
    font-size: 14px;
    line-height: 1.5;
  }
  .mission-list li::before {
    content: '▸';
    color: var(--primary-violet);
  }
  .tech-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  /* Projects Section */
  .project-card {
    display: flex;
    padding: 40px;
    gap: 40px;
    align-items: center;
  }
  .proj-left { width: 55%; }
  .proj-right {
    width: 45%;
    display: flex;
    justify-content: center;
    perspective: 800px;
  }
  .proj-eyebrow {
    color: var(--glow-green);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }
  .proj-title {
    font-size: 32px;
    color: #fff;
    margin-bottom: 5px;
  }
  .proj-sub {
    color: var(--light-lavender);
    font-size: 16px;
    margin-bottom: 20px;
  }
  .proj-desc {
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 25px;
    font-size: 15px;
  }
  .proj-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 25px;
  }
  .feat-pill {
    background: rgba(57,255,133,0.1);
    border: 1px solid var(--glow-green);
    color: var(--glow-green);
    padding: 6px 12px;
    border-radius: 50px;
    font-size: 12px;
  }
  .proj-client {
    font-size: 14px;
    color: var(--text-muted);
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .mini-phone {
    width: 160px;
    height: 320px;
    border-radius: 25px;
    border: 4px solid rgba(159,140,255,0.4);
    background: #0D0D1F;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    position: relative;
    overflow: hidden;
    transform: rotateY(-5deg) rotateX(3deg);
  }
  .mini-notch {
    position: absolute;
    top: 5px; left: 50%; transform: translateX(-50%);
    width: 50px; height: 15px;
    background: #000; border-radius: 8px;
    z-index: 10;
  }
  .mini-screen {
    width: 100%; height: 100%;
    background: #0A0A1E;
    position: absolute;
    top:0; left:0;
    padding: 25px 10px 10px;
    transition: opacity 0.5s ease;
  }

  /* Education Section */
  .diploma-wrapper {
    display: flex;
    justify-content: center;
  }
  .diploma-card {
    width: 60%;
    padding: 50px;
    text-align: center;
    transform: rotate(0.3deg);
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(127,119,221,0.3), 0 0 60px rgba(127,119,221,0.1);
  }
  .shimmer {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(159,140,255,0.08) 50%, transparent 100%);
    animation: shimmerAnim 6s infinite;
    pointer-events: none;
  }
  @keyframes shimmerAnim {
    0% { transform: translateX(-100%); }
    50%, 100% { transform: translateX(200%); }
  }
  .constellation { margin: 0 auto 20px; width: 60px; height: 40px; }
  .deg-title { font-size: 22px; color: #fff; margin-bottom: 8px; }
  .col-name { font-size: 16px; color: var(--light-lavender); margin-bottom: 5px; }
  .edu-date { font-size: 14px; color: var(--text-muted); margin-bottom: 30px; }
  .cgpa-val { font-size: 48px; color: var(--primary-violet); text-shadow: 0 0 20px rgba(127,119,221,0.6); line-height: 1; }
  .cgpa-max { font-size: 20px; color: var(--text-muted); font-family: 'Inter', sans-serif;}
  .cgpa-lbl { font-size: 12px; color: var(--text-muted); margin-top: 5px; letter-spacing: 2px;}
  .cgpa-dots { display: flex; justify-content: center; gap: 6px; margin: 20px 0 30px; }
  .cdot { width: 10px; height: 10px; border-radius: 50%; }
  .cdot.filled { background: var(--primary-violet); box-shadow: 0 0 8px var(--primary-violet); }
  .cdot.empty { border: 1px solid rgba(127,119,221,0.4); }
  .edu-tags { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }

  /* Contact Section */
  .contact-row {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 60px;
  }
  .contact-pod {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: var(--text-primary);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
  }
  .contact-pod:hover {
    transform: scale(1.15) rotate(10deg);
    border-color: var(--primary-violet);
    box-shadow: 0 0 30px rgba(127,119,221,0.4);
  }
  .pod-icon { font-size: 28px; margin-bottom: 8px; color: var(--primary-violet); }
  .pod-lbl { font-size: 14px; font-family: 'Orbitron', sans-serif; }
  .pod-tooltip {
    position: absolute;
    bottom: -30px;
    background: var(--primary-violet);
    color: #fff;
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    white-space: nowrap;
  }
  .contact-pod:hover .pod-tooltip { opacity: 1; }

  .open-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  .ob-text { font-size: 16px; color: #fff; width: 60%; line-height: 1.5; }
  .ob-btn {
    background: var(--primary-violet);
    color: #fff;
    padding: 15px 30px;
    border-radius: 50px;
    font-family: 'Orbitron', sans-serif;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s;
    animation: btnGlow 2s infinite;
  }
  .ob-btn:hover { transform: scale(1.05); }
  .ob-btn:hover .arrow { transform: translateX(5px); }
  .arrow { transition: transform 0.3s; }
  @keyframes btnGlow {
    0%, 100% { box-shadow: 0 0 15px rgba(127,119,221,0.5); }
    50% { box-shadow: 0 0 30px rgba(127,119,221,0.8); }
  }

  .footer {
    border-top: 1px solid rgba(159,140,255,0.1);
    text-align: center;
    padding: 30px 20px;
    margin-top: 60px;
    color: var(--text-muted);
    font-size: 12px;
  }

  .sk-pos-1 { position: absolute; top: 0; left: 0; }
  .sk-pos-2 { position: absolute; top: 0; right: 0; }
  .sk-pos-3 { z-index: 10; }
  .sk-pos-4 { position: absolute; bottom: 0; left: 10%; }
  .sk-pos-5 { position: absolute; bottom: 0; right: 10%; }

  @media (max-width: 768px) {
    #custom-cursor, #cursor-trail { display: none !important; }
    * { cursor: auto !important; }
    
    .sk-pos-1, .sk-pos-2, .sk-pos-3, .sk-pos-4, .sk-pos-5 {
      position: relative !important;
      top: auto !important; left: auto !important; right: auto !important; bottom: auto !important;
      width: 100%;
    }
    .hero-container { flex-direction: column; text-align: center; gap: 40px; }
    .hero-left, .hero-right { width: 100%; }
    .hero-ctas { justify-content: center; }
    .stat-pills { justify-content: center; }
    .phone-mockup { width: 220px; height: 440px; }
    .orbit-label { display: none; }
    .project-card { flex-direction: column; }
    .proj-left, .proj-right { width: 100%; }
    .diploma-card { width: 100%; padding: 30px 20px; }
    .contact-row { flex-direction: column; align-items: center; gap: 20px; }
    .open-banner { flex-direction: column; text-align: center; gap: 20px; }
    .ob-text { width: 100%; }
    .nav-links { display: none; }
    .mission-header { flex-direction: column; gap: 15px; }
    .mh-left { flex-direction: column; text-align: center; }
    .mh-date { align-self: center; }
    .mission-card { padding: 25px; }
    .project-card { padding: 25px; }
    .diploma-card { width: 100%; padding: 30px 20px; }
    .mini-phone { margin: 0 auto; transform: none; width: 220px; }
    .cgpa-dots { flex-wrap: wrap; }
    .cgpa-val { font-size: 36px; }
  }
`;

// === Hooks ===

function useMouseParallax() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    const elements = document.querySelectorAll('.reveal-section');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useScrollSpy(sections) {
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          current = id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  return activeId;
}

// === Components ===

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const cursor = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrame;
    const render = () => {
      // Lerp
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.2;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.2;
      trail.current.x += (mouse.current.x - trail.current.x) * 0.1;
      trail.current.y += (mouse.current.y - trail.current.y) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursor.current.x}px`;
        cursorRef.current.style.top = `${cursor.current.y}px`;
      }
      if (trailRef.current) {
        trailRef.current.style.left = `${trail.current.x}px`;
        trailRef.current.style.top = `${trail.current.y}px`;
      }
      animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" ref={cursorRef}></div>
      <div id="cursor-trail" ref={trailRef}></div>
    </>
  );
};

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 0.7 + 0.8,
      v: Math.random() * 0.15 + 0.05
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.v;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas id="starfield" ref={canvasRef}></canvas>;
};

const Navbar = ({ activeId }) => {
  const links = ['hero', 'skills', 'experience', 'projects', 'education', 'contact'];
  return (
    <nav className="navbar">
      <div className="nav-logo">UJ</div>
      <div className="nav-links">
        {links.map(link => (
          <a 
            key={link} 
            href={`#${link}`} 
            className={`nav-link ${activeId === link ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(link).scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default function App() {
  useMouseParallax();
  useScrollReveal();
  const activeSection = useScrollSpy(['hero', 'skills', 'experience', 'projects', 'education', 'contact']);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const [activeScreen, setActiveScreen] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CustomCursor />
      <Starfield />
      <div className="nebula-top-left"></div>
      <div className="nebula-bottom-right"></div>
      <Navbar activeId={activeSection} />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="container reveal-section">
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-eyebrow">&lt; Flutter Developer /&gt;<span className="cursor-blink">|</span></div>
            <h1 className="hero-title">Uday<br/>Jamariya</h1>
            <p className="hero-subtitle">Flutter Developer · Cross-Platform · Clean Architecture</p>
            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">View My Work →</a>
              <a href="#" className="btn-outline">Download Resume</a>
            </div>
            <div className="stat-pills">
              <div className="stat-pill anti-gravity parallax-layer" style={{'--float-del': '0s'}}><div className="stat-dot"></div>1 App Shipped</div>
              <div className="stat-pill anti-gravity parallax-layer" style={{'--float-del': '1s'}}><div className="stat-dot"></div>6 Months Experience</div>
              <div className="stat-pill anti-gravity parallax-layer" style={{'--float-del': '2s'}}><div className="stat-dot"></div>3 State Managers</div>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="avail-badge">Available for Work</div>
            
            <div className="phone-mockup">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="app-bar">
                  <span>Invoice Flow</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                </div>
                
                <div className="summary-cards">
                  <div className="summary-card c1">
                    <div className="summary-val">24</div>
                    <div className="summary-lbl">Invoices</div>
                  </div>
                  <div className="summary-card c2">
                    <div className="summary-val">18</div>
                    <div className="summary-lbl">Customers</div>
                  </div>
                  <div className="summary-card c3">
                    <div className="summary-val">₹1.2L</div>
                    <div className="summary-lbl">Revenue</div>
                  </div>
                </div>

                <div className="recent-header">
                  <span>Recent Invoices</span>
                  <span style={{color: 'var(--primary-violet)'}}>View All</span>
                </div>

                <div className="list-item">
                  <div className="list-left">
                    <div className="name">Ramesh Auto</div>
                    <div className="inv">INV-001</div>
                  </div>
                  <div className="badge paid">Paid</div>
                </div>
                <div className="list-item">
                  <div className="list-left">
                    <div className="name">Patel Motors</div>
                    <div className="inv">INV-002</div>
                  </div>
                  <div className="badge pending">Pending</div>
                </div>
                <div className="list-item">
                  <div className="list-left">
                    <div className="name">Shah Cars</div>
                    <div className="inv">INV-003</div>
                  </div>
                  <div className="badge due">Due</div>
                </div>

                <div className="bottom-nav">
                  <div className="nav-icon active"></div>
                  <div className="nav-icon"></div>
                  <div className="nav-icon"></div>
                  <div className="nav-icon"></div>
                </div>
              </div>
            </div>

            <div className="orbit-label orbit-1 anti-gravity parallax-layer" style={{'--float-del': '0.5s'}}>Container()</div>
            <div className="orbit-label orbit-2 anti-gravity parallax-layer" style={{'--float-del': '1.2s'}}>Scaffold()</div>
            <div className="orbit-label orbit-3 anti-gravity parallax-layer" style={{'--float-del': '2.1s'}}>ListView()</div>
            <div className="orbit-label orbit-4 anti-gravity parallax-layer" style={{'--float-del': '0.8s'}}>Bloc()</div>
            <div className="orbit-label orbit-5 anti-gravity parallax-layer" style={{'--float-del': '3.2s'}}>Firebase</div>
            <div className="orbit-label orbit-6 anti-gravity parallax-layer" style={{'--float-del': '1.7s'}}>GetX()</div>
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="container reveal-section">
        <div className="eyebrow">// what I work with</div>
        <h2 className="section-title orbitron">Skills.dart</h2>
        
        <div className="skills-clusters">
          {/* Languages */}
          <div className="skill-cluster glass-card anti-gravity parallax-layer c-purple sk-pos-1" style={{'--float-del': '0s'}}>
            <div className="cluster-title">🟣 Languages</div>
            <div className="cluster-pills">
              <div className="skill-pill primary-skill">Dart</div>
              <div className="skill-pill">HTML</div>
              <div className="skill-pill">CSS (Basic)</div>
            </div>
          </div>
          
          {/* Frameworks */}
          <div className="skill-cluster glass-card anti-gravity parallax-layer c-blue sk-pos-2" style={{'--float-del': '1.2s'}}>
            <div className="cluster-title">🔵 Frameworks</div>
            <div className="cluster-pills">
              <div className="skill-pill flagship-skill">Flutter SDK</div>
              <div className="skill-pill">Material Design</div>
              <div className="skill-pill">Cupertino Widgets</div>
            </div>
          </div>

          {/* State Mgmt */}
          <div className="skill-cluster glass-card anti-gravity parallax-layer c-green sk-pos-3" style={{'--float-del': '2.4s'}}>
            <div className="core-label">Core Expertise</div>
            <div className="cluster-title">🟢 State Management</div>
            <div className="cluster-pills">
              <div className="skill-pill">Bloc</div>
              <div className="skill-pill">Provider</div>
              <div className="skill-pill">GetX</div>
            </div>
          </div>

          {/* Databases */}
          <div className="skill-cluster glass-card anti-gravity parallax-layer c-yellow sk-pos-4" style={{'--float-del': '0.6s'}}>
            <div className="cluster-title">🟡 Databases</div>
            <div className="cluster-pills">
              <div className="skill-pill">SQLite</div>
              <div className="skill-pill">Firebase</div>
              <div className="skill-pill">MySQL</div>
            </div>
          </div>

          {/* Tools */}
          <div className="skill-cluster glass-card anti-gravity parallax-layer c-white sk-pos-5" style={{'--float-del': '1.8s'}}>
            <div className="cluster-title">⚪ Other Skills</div>
            <div className="cluster-pills">
              <div className="skill-pill">REST API</div>
              <div className="skill-pill">Responsive UI</div>
              <div className="skill-pill">App Store</div>
              <div className="skill-pill">Optimization</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="container reveal-section">
        <div className="eyebrow">// mission history</div>
        <h2 className="section-title orbitron">Experience.log</h2>

        <div className="mission-card glass-card anti-gravity parallax-layer" style={{'--float-dur': '7s', '--float-del': '1s'}}>
          <div className="mission-bar"></div>
          <div className="mission-header">
            <div className="mh-left">
              <div className="mh-logo">EP</div>
              <div>
                <div className="mh-title">Excel PTP – Unit of Amar Infotech</div>
                <div className="mh-role">Flutter Developer Intern</div>
              </div>
            </div>
            <div className="mh-date">DEC 2025 – MAY 2026</div>
          </div>
          
          <div className="mission-divider"></div>
          
          <div className="mission-sub orbitron">Mission: Invoice Flow Enterprise Billing</div>
          <div className="mission-client">Client: Somnath Auto</div>
          
          <p className="mission-desc">
            "Engineered a real-world enterprise billing and expense tracking application for an automobile service business using Flutter and Firebase — featuring invoice generation, customer & vehicle management, payment tracking, expense monitoring, PDF sharing, WhatsApp reminders, and a business analytics dashboard."
          </p>

          <div className="mission-obj-title">Mission Objectives</div>
          <ul className="mission-list">
            <li>Built high-performance UI screens for product catalogs, user profiles, and secure checkout.</li>
            <li>Developed reusable Flutter widgets for consistent design language and scalable architecture.</li>
            <li>Integrated RESTful APIs and Firebase for real-time product availability, pricing, and order history.</li>
            <li>Optimized app performance and memory usage — smooth scrolling, fast image loading across devices.</li>
            <li>Implemented clean Dart code with state management best practices (Bloc, Provider, GetX).</li>
          </ul>

          <div className="tech-row">
            {['Flutter', 'Firebase', 'Dart', 'Bloc', 'REST API', 'Clean Architecture'].map(t => (
              <span key={t} className="skill-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="container reveal-section">
        <div className="eyebrow">// deployed apps</div>
        <h2 className="section-title orbitron">Projects.apk</h2>

        <div className="project-card glass-card anti-gravity parallax-layer" style={{'--float-dur': '6s'}}>
          <div className="proj-left">
            <div className="proj-eyebrow">Featured Project</div>
            <h3 className="proj-title orbitron">Invoice Flow</h3>
            <div className="proj-sub">Enterprise Billing & Expense Tracker</div>
            <p className="proj-desc">
              "A full-featured enterprise billing system for automobile service businesses — real-time invoice generation, customer/vehicle management, payment tracking, expense monitoring, PDF invoice sharing via WhatsApp, and an interactive business analytics dashboard."
            </p>
            <div className="proj-features">
              {['Invoice Generation', 'PDF Sharing', 'WhatsApp Reminders', 'Analytics Dashboard', 'Payment Tracking', 'Vehicle Management'].map(f => (
                <div key={f} className="feat-pill">{f}</div>
              ))}
            </div>
            <div className="tech-row">
              {['Flutter', 'Firebase', 'Dart', 'Bloc'].map(t => <span key={t} className="skill-pill">{t}</span>)}
            </div>
            <div className="proj-client">🚗 Client: Somnath Auto</div>
          </div>
          
          <div className="proj-right">
            <div className="mini-phone">
              <div className="mini-notch"></div>
              {/* Screen 1: Invoice List */}
              <div className="mini-screen" style={{opacity: activeScreen === 0 ? 1 : 0}}>
                <div style={{color:'#fff', fontSize:12, marginBottom:10}}>Invoices</div>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{background:'rgba(255,255,255,0.05)', padding:8, borderRadius:8, marginBottom:8, display:'flex', justifyContent:'space-between'}}>
                    <div style={{width:'50%', height:8, background:'rgba(255,255,255,0.2)', borderRadius:4}}></div>
                    <div style={{width:'20%', height:8, background: i%2===0?'rgba(57,255,133,0.5)':'rgba(234,179,8,0.5)', borderRadius:4}}></div>
                  </div>
                ))}
              </div>
              {/* Screen 2: Analytics */}
              <div className="mini-screen" style={{opacity: activeScreen === 1 ? 1 : 0}}>
                <div style={{color:'#fff', fontSize:12, marginBottom:10}}>Analytics</div>
                <div style={{height:100, display:'flex', alignItems:'flex-end', gap:5, paddingBottom:10, borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
                  {[40,80,60,100,50].map((h,i) => <div key={i} style={{flex:1, height:`${h}%`, background:'var(--primary-violet)', borderRadius:'4px 4px 0 0'}}></div>)}
                </div>
              </div>
              {/* Screen 3: Customer */}
              <div className="mini-screen" style={{opacity: activeScreen === 2 ? 1 : 0}}>
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:20}}>
                  <div style={{width:30, height:30, borderRadius:'50%', background:'var(--light-lavender)'}}></div>
                  <div style={{width:'60%', height:10, background:'rgba(255,255,255,0.2)', borderRadius:5}}></div>
                </div>
                {[1,2].map(i => <div key={i} style={{height:40, background:'rgba(255,255,255,0.05)', borderRadius:8, marginBottom:8}}></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EDUCATION SECTION --- */}
      <section id="education" className="container reveal-section">
        <div className="eyebrow">// knowledge base</div>
        <h2 className="section-title orbitron">Education.json</h2>

        <div className="diploma-wrapper">
          <div className="diploma-card glass-card anti-gravity parallax-layer" style={{'--float-dur': '5.5s'}}>
            <div className="shimmer"></div>
            <svg className="constellation" viewBox="0 0 100 60" stroke="var(--primary-violet)" strokeWidth="1" fill="none">
              <path d="M10,30 L30,10 L60,20 L80,50 L90,20" />
              <circle cx="10" cy="30" r="3" fill="#fff" />
              <circle cx="30" cy="10" r="3" fill="#fff" />
              <circle cx="60" cy="20" r="3" fill="#fff" />
              <circle cx="80" cy="50" r="3" fill="#fff" />
              <circle cx="90" cy="20" r="3" fill="#fff" />
            </svg>
            <h3 className="deg-title orbitron">Bachelor of Computer Applications</h3>
            <div className="col-name">Shri V.J. Modha College of I.T.</div>
            <div className="edu-date">July 2024</div>
            
            <div className="cgpa-val orbitron">7.56<span className="cgpa-max">/10</span></div>
            <div className="cgpa-lbl">CGPA</div>
            
            <div className="cgpa-dots">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`cdot ${i < 8 ? 'filled' : 'empty'}`}></div>
              ))}
            </div>

            <div className="edu-tags">
              <div className="skill-pill">Computer Science</div>
              <div className="skill-pill">Problem Solving</div>
              <div className="skill-pill">Software Engineering</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="container reveal-section">
        <div className="eyebrow">// open to opportunities</div>
        <h2 className="section-title orbitron">Contact.init()</h2>

        <div className="contact-row">
          <a href="tel:9574896847" className="contact-pod glass-card anti-gravity parallax-layer" style={{'--float-dur': '4s', '--float-del': '0s'}}>
            <div className="pod-icon">📞</div>
            <div className="pod-lbl">Call Me</div>
            <div className="pod-tooltip">9574896847</div>
          </a>
          
          <a href="mailto:udayjamariya12@gmail.com" className="contact-pod glass-card anti-gravity parallax-layer" style={{'--float-dur': '5.5s', '--float-del': '1s'}}>
            <div className="pod-icon">✉</div>
            <div className="pod-lbl">Email Me</div>
            <div className="pod-tooltip">Copy Email</div>
          </a>
          
          <a href="https://linkedin.com/in/uday-jamariya" target="_blank" rel="noopener noreferrer" className="contact-pod glass-card anti-gravity parallax-layer" style={{'--float-dur': '3.8s', '--float-del': '0.5s'}}>
            <div className="pod-icon">in</div>
            <div className="pod-lbl">Connect</div>
            <div className="pod-tooltip">View Profile</div>
          </a>
        </div>

        <div className="open-banner glass-card">
          <div className="ob-text">
            "Currently open to Flutter Developer roles — freelance, internship, or full-time."
          </div>
          <a href="mailto:udayjamariya12@gmail.com" className="ob-btn">
            Initiate Contact <span className="arrow">→</span>
          </a>
        </div>

        <div className="footer">
          Built with React · Designed in Zero Gravity · Uday Jamariya © 2026
        </div>
      </section>
    </>
  );
}
