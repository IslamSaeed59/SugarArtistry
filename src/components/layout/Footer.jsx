import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  const handleSecretAccess = () => {
    navigate("/admin/add");
  };
  return (
    <>
      <footer className="w-full">
      {/* Top Dark Section */}
      <div className="bg-charcoal text-cream py-20 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl mb-4">Indulge in the Extraordinary</h2>
          <p className="text-cream/70 text-sm md:text-base font-light mb-8 max-w-xl mx-auto leading-relaxed">
            Join our inner circle to receive exclusive previews of upcoming collections, process insights, and stories from the studio.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border-b border-cream/30 focus-within:border-cream transition-colors">
            <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              className="bg-transparent flex-1 py-3 px-2 text-sm outline-none placeholder:text-cream/40"
              required
            />
            <button 
              type="submit" 
              className="bg-cream text-charcoal px-8 py-3 text-xs tracking-widest font-semibold hover:bg-rose-gold hover:text-cream transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
        
        {/* Decorative Flower/Resin Icon background element */}
        <div className="absolute right-[-10%] bottom-[-20%] opacity-5 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.69 2 6 4.69 6 8c0 1.54.59 2.94 1.56 4C6.59 13.06 6 14.46 6 16c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.54-.59-2.94-1.56-4C17.41 10.94 18 9.54 18 8c0-3.31-2.69-6-6-6zm0 18c-2.21 0-4-1.79-4-4 0-1.1.45-2.1 1.17-2.83L12 10.34l2.83 2.83C15.55 13.9 16 14.9 16 16c0 2.21-1.79 4-4 4zm0-16c2.21 0 4 1.79 4 4 0 1.1-.45 2.1-1.17 2.83L12 13.66 9.17 10.83C8.45 10.1 8 9.1 8 8c0-2.21 1.79-4 4-4z"/>
          </svg>
        </div>
      </div>

      {/* Bottom Light Section */}
      <div className="bg-sand/30 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-rose-gold text-cream flex items-center justify-center font-serif italic text-lg shadow-sm">
                S
              </div>
              <span className="font-serif text-xl tracking-wide text-charcoal">Sugar Artistry</span>
            </Link>
            <p className="text-charcoal-light/80 text-sm font-light leading-relaxed max-w-sm mb-6">
              Crafting heirloom resin art since 1994. Our mission is to elevate the ordinary through meticulous craftsmanship and pure materials.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=100069204040173" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-charcoal/60 hover:text-rose-gold transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/yasmin_shousha/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-charcoal/60 hover:text-rose-gold transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-light text-charcoal-light/80">
              <li><Link to="#" className="hover:text-rose-gold transition-colors">Collections</Link></li>
              <li><Link to="#" className="hover:text-rose-gold transition-colors">Custom Commissions</Link></li>
              <li><Link to="#" className="hover:text-rose-gold transition-colors">Our Story</Link></li>
              <li><Link to="#" className="hover:text-rose-gold transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-light text-charcoal-light/80">
              <li><Link to="#" className="hover:text-rose-gold transition-colors">Shipping & Policies</Link></li>
              <li><Link to="#" className="hover:text-rose-gold transition-colors">Care Guide</Link></li>
              <li><Link to="#" className="hover:text-rose-gold transition-colors">Interior Partners</Link></li>
              <li><Link to="#" className="hover:text-rose-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-charcoal/60">
          <p>© 2026 Sugar Artistry. Handcrafted Excellence.</p>
          <p 
            className="tracking-widest uppercase cursor-pointer transition-colors hover:text-charcoal/80"
            onClick={handleSecretAccess}
            title="Ssssh..."
          >
            Designed for Discerning Tastes
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
