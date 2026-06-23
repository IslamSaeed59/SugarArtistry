import { motion } from "framer-motion";

const RotatingStamp = () => {
  return (
    <div className="absolute bottom-12 right-12 md:bottom-24 md:right-24 z-20 w-32 h-32 md:w-40 md:h-40 hidden sm:flex items-center justify-center">
      {/* Inner Icon/Logo */}
      <div className="absolute text-rose-gold text-2xl font-serif italic">
        S
      </div>

      {/* Rotating Text SVG */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="w-full h-full text-charcoal/80"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path
            id="textPath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="transparent"
          />
          <text className="text-[11.5px] uppercase tracking-[0.25em] font-semibold" fill="currentColor">
            <textPath href="#textPath" startOffset="0%">
              HANDCRAFTED EXCELLENCE • LUXURY RESIN ART •
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
};

export default RotatingStamp;
