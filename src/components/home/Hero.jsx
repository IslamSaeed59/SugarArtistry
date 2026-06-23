import { Link } from "react-router";
import { motion } from "framer-motion";
import heroImage from "../../assets/4.png";
import FloatingFlakes from "../ui/FloatingFlakes";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 30, transformOrigin: "bottom" },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 1, ease: [0.215, 0.61, 0.355, 1] }
  },
};

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center bg-cream overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Background Image Overlay with infinite slow zoom effect */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Bespoke Resin Art"
          className="w-full h-full object-cover object-center opacity-90"
        />
        {/* Soft gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/50 to-transparent"></div>
      </motion.div>

      {/* Particle Effect Overlay */}
      <FloatingFlakes />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-10">
        <motion.div 
          className="max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-xs tracking-[0.2em] uppercase text-charcoal/80 mb-6 font-semibold">
            Established 1994
          </motion.p>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl mb-6 leading-tight text-charcoal">
            The Delicate Art of <br />
            <span className="text-rose-gold italic font-light">Resin Mastery</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-charcoal-light/90 text-sm md:text-base font-light mb-10 max-w-md leading-relaxed">
            Handcrafted luxury pieces. Bespoke resin art that transforms living spaces into galleries of visionary elegance.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/gallery" 
              className="bg-charcoal text-cream px-8 py-3 text-xs tracking-widest font-semibold hover:bg-rose-gold transition-colors text-center"
            >
              VIEW GALLERY
            </Link>
            <Link 
              to="/custom-orders" 
              className="bg-transparent text-charcoal border border-charcoal px-8 py-3 text-xs tracking-widest font-semibold hover:bg-charcoal hover:text-cream transition-colors text-center"
            >
              CUSTOM COMMISSION
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
