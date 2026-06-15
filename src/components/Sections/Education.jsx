export default function Education() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="education">
      <h2 className="font-headline-md text-headline-md text-primary orbitron-glow mb-12 reveal">Education.json</h2>
      
      <div className="glass-card p-8 md:p-12 rounded-3xl reveal shimmer parallax-target">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center p-2 relative">
              <div className="text-4xl font-display-lg text-primary">7.56</div>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle className="text-primary/10" cx="64" cy="64" fill="transparent" r="60" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-primary" cx="64" cy="64" fill="transparent" r="60" stroke="currentColor" strokeDasharray="377" strokeDashoffset="92" strokeWidth="4"></circle>
              </svg>
            </div>
            <div className="text-center mt-2 text-label-caps text-on-surface-variant uppercase">CGPA / 10</div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-2">BCA Graduate</h3>
            <p className="text-primary text-xl mb-4">Shri V.J. Modha College, Porbandar</p>
            <p className="text-on-surface-variant">Focusing on Computer Science fundamentals, Software Engineering, and Database Management Systems.</p>
            
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm text-on-surface-variant">C/C++</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm text-on-surface-variant">Java Basics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm text-on-surface-variant">Web Tech</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
