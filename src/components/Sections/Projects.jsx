import { useState, useEffect } from 'react';

export default function Projects() {
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="projects">
      <h2 className="font-headline-md text-headline-md text-primary orbitron-glow mb-12 reveal">Projects.apk</h2>
      
      <div className="glass-card rounded-3xl overflow-hidden reveal flex flex-col lg:flex-row parallax-target">
        <div className="p-8 md:p-12 flex-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary">receipt_long</span>
            </div>
            <h3 className="text-3xl font-bold">Invoice Flow</h3>
          </div>
          
          <p className="text-on-surface-variant text-body-lg mb-8 leading-relaxed">
            A comprehensive B2B solution for managing invoices, tracking payments, and visualizing business growth. Built with Flutter for cross-platform performance.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
              <span className="text-sm text-on-surface-variant">Dynamic PDF Export</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
              <span className="text-sm text-on-surface-variant">Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
              <span className="text-sm text-on-surface-variant">Customer CRM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
              <span className="text-sm text-on-surface-variant">Secure Cloud Sync</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">Flutter</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">Bloc</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">Supabase</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">PostgreSQL</span>
          </div>
          
          <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform group">
            View Project <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
        
        <div className="bg-surface-container-low p-8 lg:p-12 flex justify-center items-center">
          <div className="w-[200px] h-[400px] border-4 border-outline-variant/30 rounded-[30px] overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-surface animate-shimmer transition-opacity duration-300">
              
              {currentScreen === 0 && (
                <div className="p-4 pt-6 animate-pulse">
                  <div className="h-4 w-20 bg-primary/20 rounded mb-6"></div>
                  <div className="space-y-4">
                      <div className="h-12 bg-white/5 rounded-xl border border-white/10"></div>
                      <div className="h-12 bg-white/5 rounded-xl border border-white/10"></div>
                      <div className="h-12 bg-white/5 rounded-xl border border-white/10"></div>
                  </div>
                </div>
              )}

              {currentScreen === 1 && (
                <div className="p-4 pt-6">
                  <div className="h-4 w-24 bg-tertiary/20 rounded mb-6"></div>
                  <div className="h-32 bg-white/5 rounded-xl border border-white/10 flex items-end p-2 gap-1">
                      <div className="flex-1 bg-tertiary/40 h-1/2 rounded-t"></div>
                      <div className="flex-1 bg-tertiary/60 h-3/4 rounded-t"></div>
                      <div className="flex-1 bg-tertiary h-full rounded-t"></div>
                      <div className="flex-1 bg-tertiary/50 h-2/3 rounded-t"></div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="h-10 bg-white/5 rounded-lg"></div>
                      <div className="h-10 bg-white/5 rounded-lg"></div>
                  </div>
                </div>
              )}

              {currentScreen === 2 && (
                <div className="p-4 pt-6">
                  <div className="h-4 w-16 bg-secondary/20 rounded mb-6"></div>
                  <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-secondary/30"></div>
                      <div className="space-y-1">
                          <div className="h-3 w-20 bg-white/10 rounded"></div>
                          <div className="h-2 w-12 bg-white/5 rounded"></div>
                      </div>
                  </div>
                  <div className="space-y-3">
                      <div className="h-20 bg-white/5 rounded-xl"></div>
                      <div className="h-10 bg-primary/20 rounded-full"></div>
                  </div>
                </div>
              )}
              
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-outline-variant/30 rounded-b-xl z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
