import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

// Layout
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import CustomCursor from './components/Layout/CustomCursor';
import StarfieldCanvas from './components/Canvas/StarfieldCanvas';

// Sections
import Hero from './components/Sections/Hero';
import Skills from './components/Sections/Skills';
import Experience from './components/Sections/Experience';
import Projects from './components/Sections/Projects';
import Education from './components/Sections/Education';
import Contact from './components/Sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize smooth scroll (v5 uses lenis under the hood)
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
      }
    });

    // 2. Setup GSAP ScrollTrigger reveals
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      // Set initial state
      gsap.set(el, { opacity: 0, y: 40 });
      
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        },
        // Optional: reverse animation when scrolling up past it
        // onLeaveBack: () => {
        //   gsap.to(el, { opacity: 0, y: 40, duration: 0.5, overwrite: 'auto' });
        // }
      });
    });

    return () => {
      locomotiveScroll.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      <CustomCursor />
      <StarfieldCanvas />
      
      <div className="nebula-top"></div>
      <div className="nebula-bottom"></div>
      
      <Navbar />
      
      <main className="relative z-10 pt-24">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
