import { motion } from "framer-motion";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center relative overflow-hidden px-6">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-gold/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-sand/40 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
          className="text-8xl md:text-[12rem] text-charcoal font-serif mb-2 leading-none"
        >
          404
        </motion.h1>
        
        <span className="text-xs uppercase tracking-[0.4em] text-rose-gold font-medium mb-6 block">
          Masterpiece Not Found
        </span>

        <p className="text-charcoal/60 font-light text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed">
          It seems the piece you are looking for has been claimed, or this path doesn't exist in our gallery. Let's guide you back to our curated collections.
        </p>

        <Link 
          to="/" 
          className="inline-block bg-charcoal text-cream text-xs uppercase tracking-[0.2em] px-10 py-4 hover:bg-rose-gold transition-colors duration-300"
        >
          Return to Gallery
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
