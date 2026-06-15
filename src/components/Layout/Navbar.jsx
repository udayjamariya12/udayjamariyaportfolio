export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/10 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_10px_30px_rgba(127,119,221,0.2)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <div className="font-display-lg text-headline-md tracking-tighter text-primary">UJ</div>
        <div className="hidden md:flex gap-8 items-center">
          <a className="text-primary font-bold border-b-2 border-primary pb-1" href="#hero">Hero</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300" href="#skills">Skills</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300" href="#experience">Experience</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300" href="#projects">Projects</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300" href="#education">Education</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300" href="#contact">Contact</a>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform">Resume</button>
        </div>
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}
