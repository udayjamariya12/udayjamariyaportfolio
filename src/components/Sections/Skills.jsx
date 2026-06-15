export default function Skills() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="skills">
      <h2 className="font-headline-md text-headline-md text-primary orbitron-glow mb-12 reveal">Skills.dart</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* Large Central Card */}
        <div className="md:col-span-2 lg:row-span-2 glass-card p-8 rounded-3xl reveal flex flex-col justify-center parallax-target">
          <span className="material-symbols-outlined text-primary text-5xl mb-6">layers</span>
          <h3 className="font-headline-md text-headline-md mb-4">State Management</h3>
          <p className="text-on-surface-variant mb-6">Architecture is the soul of a Flutter app. I prioritize scalable and testable logic.</p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary font-bold">Bloc / Cubit</span>
            <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary font-bold">Provider</span>
            <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary font-bold">GetX</span>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-3xl reveal parallax-target">
          <span className="material-symbols-outlined text-tertiary mb-4">code</span>
          <h4 className="font-bold text-lg mb-2">Languages</h4>
          <ul className="text-on-surface-variant space-y-1">
            <li>Dart</li>
            <li>C++ (Basics)</li>
            <li>JavaScript</li>
          </ul>
        </div>
        
        <div className="glass-card p-6 rounded-3xl reveal parallax-target">
          <span className="material-symbols-outlined text-primary mb-4">terminal</span>
          <h4 className="font-bold text-lg mb-2">Frameworks</h4>
          <ul className="text-on-surface-variant space-y-1">
            <li>Flutter SDK</li>
            <li>React (Basic)</li>
            <li>Node.js</li>
          </ul>
        </div>
        
        <div className="glass-card p-6 rounded-3xl reveal parallax-target">
          <span className="material-symbols-outlined text-secondary mb-4">database</span>
          <h4 className="font-bold text-lg mb-2">Databases</h4>
          <ul className="text-on-surface-variant space-y-1">
            <li>Firebase</li>
            <li>Hive</li>
            <li>SQFlite</li>
          </ul>
        </div>
        
        <div className="glass-card p-6 rounded-3xl reveal parallax-target">
          <span className="material-symbols-outlined text-on-surface-variant mb-4">category</span>
          <h4 className="font-bold text-lg mb-2">Other</h4>
          <ul className="text-on-surface-variant space-y-1">
            <li>REST API</li>
            <li>Git / GitHub</li>
            <li>Figma</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
