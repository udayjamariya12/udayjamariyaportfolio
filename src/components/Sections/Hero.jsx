export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-margin-mobile md:px-margin-desktop gap-16 max-w-container-max mx-auto" id="hero">
      <div className="flex-1 reveal">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary/10 border border-tertiary/20 rounded-full mb-6">
          <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
          <span className="text-tertiary text-label-caps uppercase tracking-widest">Available for Work</span>
        </div>
        <code className="block font-mono text-primary text-body-lg mb-4 cursor-blink">&lt; Flutter Developer /&gt;</code>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface orbitron-glow mb-8 leading-tight">
          Uday Jamariya
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-xl mb-10">
          Crafting high-performance, pixel-perfect mobile experiences with Flutter. Specializing in clean architecture and smooth micro-interactions.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="text-primary font-bold">1</span>
            <span className="text-on-surface-variant text-label-caps">App Shipped</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="text-primary font-bold">6+</span>
            <span className="text-on-surface-variant text-label-caps">Months Exp.</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="text-primary font-bold">3+</span>
            <span className="text-on-surface-variant text-label-caps">State Managers</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center items-center relative reveal">
        <div className="phone-mockup animate-float relative z-20">
          <div className="notch"></div>
          <div className="p-4 pt-10 h-full flex flex-col bg-surface">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-on-surface">Invoice Flow</h3>
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-secondary-container/30 p-3 rounded-xl border border-secondary/10">
                <div className="text-[10px] text-on-surface-variant uppercase mb-1">Invoices</div>
                <div className="text-lg font-bold text-primary">124</div>
              </div>
              <div className="bg-tertiary/10 p-3 rounded-xl border border-tertiary/10">
                <div className="text-[10px] text-on-surface-variant uppercase mb-1">Revenue</div>
                <div className="text-lg font-bold text-tertiary">$12k</div>
              </div>
            </div>
            
            <div className="space-y-3 flex-1 overflow-hidden">
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JD</div>
                <div className="flex-1">
                  <div className="text-xs font-medium">John Doe</div>
                  <div className="text-[10px] text-on-surface-variant">INV-001</div>
                </div>
                <div className="px-2 py-0.5 bg-tertiary/20 text-tertiary text-[8px] rounded-full">Paid</div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">AS</div>
                <div className="flex-1">
                  <div className="text-xs font-medium">Alice Smith</div>
                  <div className="text-[10px] text-on-surface-variant">INV-002</div>
                </div>
                <div className="px-2 py-0.5 bg-error/20 text-error text-[8px] rounded-full">Due</div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 flex justify-around border-t border-white/5">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
              <span className="material-symbols-outlined text-on-surface-variant">receipt</span>
              <span className="material-symbols-outlined text-on-surface-variant">group</span>
              <span className="material-symbols-outlined text-on-surface-variant">settings</span>
            </div>
          </div>
        </div>
        
        {/* Floating labels */}
        <div className="absolute -top-10 -right-4 glass-card px-3 py-1 rounded-lg text-[10px] font-mono text-primary-fixed-dim animate-float-delayed z-30">Bloc()</div>
        <div className="absolute top-1/4 -left-12 glass-card px-3 py-1 rounded-lg text-[10px] font-mono text-tertiary animate-float z-30">Firebase</div>
        <div className="absolute bottom-1/4 -right-12 glass-card px-3 py-1 rounded-lg text-[10px] font-mono text-on-secondary-container animate-float-delayed z-30">GetX()</div>
        <div className="absolute -bottom-4 left-0 glass-card px-3 py-1 rounded-lg text-[10px] font-mono text-primary animate-float z-30">Scaffold()</div>
      </div>
    </section>
  );
}
