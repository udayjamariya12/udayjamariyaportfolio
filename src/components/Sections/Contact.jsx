export default function Contact() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center" id="contact">
      <h2 className="font-headline-md text-headline-md text-primary orbitron-glow mb-12 reveal">Contact.init()</h2>
      
      <div className="flex flex-wrap justify-center gap-8 mb-20">
        <a className="glass-card w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center hover:scale-115 transition-transform duration-300 reveal group" href="tel:+91">
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">call</span>
          <span className="text-[10px] uppercase mt-2 font-bold tracking-widest">Phone</span>
        </a>
        <a className="glass-card w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center hover:scale-115 transition-transform duration-300 reveal group" href="mailto:uday@example.com">
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">mail</span>
          <span className="text-[10px] uppercase mt-2 font-bold tracking-widest">Email</span>
        </a>
        <a className="glass-card w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center hover:scale-115 transition-transform duration-300 reveal group" href="#">
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">link</span>
          <span className="text-[10px] uppercase mt-2 font-bold tracking-widest">LinkedIn</span>
        </a>
      </div>
      
      <div className="glass-card p-12 rounded-3xl max-w-3xl mx-auto reveal relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
        <h3 className="text-3xl font-headline-md mb-6 relative z-10">Open to Work</h3>
        <p className="text-on-surface-variant mb-10 relative z-10">I am currently looking for new opportunities in Flutter Development. Let's build something extraordinary together.</p>
        <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(197,192,255,0.4)] transition-all relative z-10">
          Initiate Contact →
        </button>
      </div>
    </section>
  );
}
