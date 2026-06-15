export default function Footer() {
  return (
    <footer className="mt-24 py-12 bg-surface-container-lowest/50 backdrop-blur-md border-t border-outline-variant/10 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-4 max-w-container-max mx-auto">
        <div className="font-display-lg text-body-lg text-primary">Uday Jamariya</div>
        <p className="text-on-surface-variant text-sm">Built with React • Designed in Zero Gravity • © 2026</p>
        <div className="flex gap-6">
          <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#">GitHub</a>
          <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#">LinkedIn</a>
          <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
