import { Link } from "react-router";
import logo from "../../assets/Logo.jpeg";

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-cream-dark transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Sugar Artistry Logo" className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" />
          <span className="font-serif text-xl tracking-wide text-charcoal">Sugar Artistry</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-charcoal/70">
          <Link to="/collections" className="hover:text-charcoal transition-colors pb-1">Collections</Link>
          <Link to="/story" className="hover:text-charcoal transition-colors pb-1">Our Story</Link>
          <Link to="/journal" className="hover:text-charcoal transition-colors pb-1">Journal</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 text-charcoal">
          <a href="https://wa.me/201156909903" target="_blank" rel="noopener noreferrer" className="hover:text-rose-gold transition-colors" aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
