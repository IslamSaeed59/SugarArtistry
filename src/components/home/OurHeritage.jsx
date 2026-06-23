import { Link } from "react-router";
import { motion } from "framer-motion";
import heritageImage from "../../assets/1.png";
import TiltCard from "../ui/TiltCard";

const OurHeritage = () => {
  return (
    <section className="w-full py-24 px-6 bg-cream overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Image Side with 3D Tilt */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <TiltCard className="relative group w-full">
            <div className="relative z-10 p-4 bg-white/50 backdrop-blur-sm shadow-xl">
              <img 
                src={heritageImage} 
                alt="Artisanal Resin Jewelry Box" 
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            {/* Decorative background block */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-sand/40 z-0 group-hover:-bottom-8 group-hover:-right-8 transition-all duration-500"></div>
          </TiltCard>
        </motion.div>

        {/* Text Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-charcoal/60 mb-4 font-semibold">
            Our Heritage
          </p>
          <h2 className="text-4xl md:text-5xl mb-8 leading-tight text-charcoal">
            Where Modern Craft Meets <br className="hidden lg:block"/>
            <span className="italic">Timeless</span> Vision
          </h2>
          
          <div className="space-y-6 text-charcoal-light/80 text-sm font-light leading-relaxed mb-10">
            <p>
              Sugar Artistry was founded on the belief that home decor is more than just functional — it is a reflection of your story, enshrouded in luxury, and a masterpiece of artisanal design. Each creation is born from hours of meticulous pouring, sculpting, and curating the highest grade of architectural resin and ethically sourced minerals.
            </p>
            <p>
              Our master artisan blends heritage craft techniques with a contemporary aesthetic, ensuring that every piece is as durable as it is visually stunning. We don't just manufacture; we curate interior superior craft to resonate with discerning collectors.
            </p>
          </div>

          <Link 
            to="/our-story" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-rose-gold hover:text-charcoal transition-colors pb-1 border-b border-transparent hover:border-charcoal"
          >
            Learn About Our Artistry
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default OurHeritage;
