import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Create GSAP quick setters for performance
    const xTo = gsap.quickTo(cursor, "left", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "top", { duration: 0.2, ease: "power3" });

    const onMouseMove = (e) => {
      // Follow cursor
      xTo(e.clientX);
      yTo(e.clientY);

      // Parallax logic for parallax-targets
      const dx = (e.clientX - window.innerWidth / 2) / 50;
      const dy = (e.clientY - window.innerHeight / 2) / 50;

      document.querySelectorAll('.parallax-target').forEach((el) => {
        el.style.setProperty('--mx', `${dx}px`);
        el.style.setProperty('--my', `${dy}px`);
        el.style.transform = `translate(var(--mx), var(--my))`;
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      className="w-3 h-3 bg-primary rounded-full fixed pointer-events-none z-[9999] shadow-[0_0_15px_var(--color-primary)] -translate-x-1/2 -translate-y-1/2"
    ></div>
  );
}
