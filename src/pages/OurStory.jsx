import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <div className="w-full bg-cream min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=2000&auto=format&fit=crop" 
          alt="Artist Workspace" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-charcoal/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl md:text-6xl text-cream font-serif mb-6 drop-shadow-md"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-cream/90 text-sm md:text-lg max-w-xl font-light tracking-wide uppercase drop-shadow-sm"
          >
            Preserving nature's ephemeral beauty in eternal resin.
          </motion.p>
        </div>
      </section>

      {/* 2. The Vision */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-rose-gold font-medium mb-6 block"
        >
          The Vision
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl text-charcoal leading-tight mb-10"
        >
          We believe that every shell, every wave, and every grain of sand carries a whisper of the ocean.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-charcoal/70 font-light leading-relaxed text-lg"
        >
          Sugar Artistry was born from a profound love for the sea and the desire to bring its calming, majestic presence into the modern home. What started as a small studio experiment has blossomed into a bespoke luxury brand, trusted by interior designers and art collectors alike.
        </motion.p>
      </section>

      {/* 3. The Process */}
      <section className="bg-sand/30 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-charcoal/5 overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop" 
              alt="Resin Pouring Process" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl text-charcoal mb-6">Meticulous Craftsmanship</h3>
            <p className="text-charcoal/70 font-light leading-relaxed mb-6">
              Our process is a slow, deliberate dance with chemistry and gravity. Each piece requires multiple layers of high-grade, UV-resistant resin, poured over several days to achieve the signature depth and 3D effect of our oceanscapes.
            </p>
            <p className="text-charcoal/70 font-light leading-relaxed mb-8">
              We source our natural elements sustainably, ensuring that our art honors the environment it mimics. The addition of 24k gold leaf and hand-painted calligraphy elevates each piece from mere decor to a treasured family heirloom.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-charcoal/10">
              <div>
                <span className="block text-3xl font-serif text-rose-gold mb-2">120+</span>
                <span className="text-xs uppercase tracking-widest text-charcoal/60">Hours Per Piece</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-rose-gold mb-2">100%</span>
                <span className="text-xs uppercase tracking-widest text-charcoal/60">Hand-Crafted</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Meet the Artist */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden mb-8 ring-4 ring-offset-4 ring-offset-cream ring-rose-gold/20"
        >
          <img 
            src="https://images.unsplash.com/photo-1506795660198-e95c77602129?q=80&w=400&auto=format&fit=crop" 
            alt="Lead Artist" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <h3 className="text-2xl text-charcoal font-serif mb-2">Sarah Al-Fayed</h3>
        <p className="text-xs uppercase tracking-widest text-charcoal/50 mb-8">Founder & Lead Artist</p>
        <p className="text-charcoal/70 font-light leading-relaxed italic max-w-2xl mx-auto">
          "I don't just pour resin; I pour emotion, memories, and the relentless beauty of the tides into every piece I create. My goal is that when you look at my art, you feel the breeze and hear the waves."
        </p>
      </section>

    </div>
  );
};

export default OurStory;
