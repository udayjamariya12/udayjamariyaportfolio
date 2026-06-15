export default function Experience() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="experience">
      <h2 className="font-headline-md text-headline-md text-primary orbitron-glow mb-12 reveal">Experience.log</h2>

      <div className="glass-card p-8 md:p-12 rounded-3xl reveal parallax-target">
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-on-surface">Excel PTP Intern</h3>
            <p className="text-primary">Flutter Developer Trainee</p>
          </div>
          <div className="text-on-surface-variant text-left md:text-right">
            <p>Dec 2025 - May 2026</p>
            <p className="text-xs uppercase tracking-widest">6 Months Journey</p>
          </div>
        </div>

        <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
          Intensive internship focusing on high-quality Flutter application development, mastering state management, and backend integration.
        </p>

        <ul className="space-y-4 mb-10">
          <li className="flex gap-4">
            <span className="text-primary font-bold">▸</span>
            <p className="text-on-surface-variant">Engineered responsive UIs from complex Figma designs for Invoice Management systems.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-bold">▸</span>
            <p className="text-on-surface-variant">Implemented Bloc pattern for robust state management across 15+ complex screens.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-bold">▸</span>
            <p className="text-on-surface-variant">Integrated Firebase for real-time data sync and user authentication flows.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-bold">▸</span>
            <p className="text-on-surface-variant">Optimized application performance through efficient ListView rendering and image caching.</p>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-bold">▸</span>
            <p className="text-on-surface-variant">Collaborated in agile sprints, ensuring timely delivery of modular code components.</p>
          </li>
        </ul>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-on-surface-variant">Flutter</span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-on-surface-variant">Dart</span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-on-surface-variant">Bloc</span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-on-surface-variant">Firebase</span>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-on-surface-variant">REST APIs</span>
        </div>
      </div>
    </section>
  );
}
