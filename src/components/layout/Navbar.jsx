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

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
