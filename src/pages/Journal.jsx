import { motion } from "framer-motion";
import { Link } from "react-router";

const articles = [
  {
    id: 1,
    category: "Craftsmanship",
    title: "The Art of UV-Resistant Resin",
    excerpt: "Discover why we strictly use architectural-grade, UV-resistant resin to ensure your pieces never yellow and retain their crystal-clear beauty for generations.",
    date: "Oct 12, 2026",
    image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Behind the Scenes",
    title: "Sourcing Sustainable Shells",
    excerpt: "Take a journey with us to the coastlines where we ethically source the natural elements that give our ocean trays their signature authentic feel.",
    date: "Sep 28, 2026",
    image: "https://images.unsplash.com/photo-1515589654462-840e67614e54?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "Design Trends",
    title: "Incorporating Fluid Art in Modern Minimalist Homes",
    excerpt: "Learn how a single statement piece of functional resin art can completely transform the aesthetic of a muted, minimalist living space.",
    date: "Sep 15, 2026",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    category: "Technique",
    title: "Mastering Gold Calligraphy on Resin",
    excerpt: "A deep dive into the painstaking process of hand-rendering Arabic calligraphy using 24k gold pigment over cured resin surfaces.",
    date: "Aug 30, 2026",
    image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=600&auto=format&fit=crop"
  }
];

const Journal = () => {
  return (
    <div className="w-full bg-cream min-h-screen pb-24">
      
      {/* Header */}
      <div className="pt-32 pb-16 text-center px-6 border-b border-charcoal/10">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block"
        >
          Editorial
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl text-charcoal font-serif mb-6"
        >
          The Journal
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-charcoal-light/70 font-light text-lg max-w-xl mx-auto"
        >
          Insights, behind-the-scenes, and stories from the studio.
        </motion.p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-16">
        
        {/* Featured Article */}
        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24"
        >
          <div className="aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden bg-sand/20">
            <img 
              src="https://images.unsplash.com/photo-1518882176840-0580978ce258?q=80&w=1200&auto=format&fit=crop" 
              alt="Featured Article" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center py-6 lg:py-0 lg:pr-12">
            <span className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-4 block">Studio Life • Nov 01, 2026</span>
            <h2 className="text-3xl md:text-4xl text-charcoal font-serif mb-6 group-hover:text-rose-gold transition-colors">
              The Winter Collection: Capturing Frozen Tides
            </h2>
            <p className="text-charcoal/70 font-light leading-relaxed mb-8">
              As the seasons change, so does our inspiration. Discover the painstaking process behind our upcoming Winter Collection, where we attempt to capture the stark, breathtaking beauty of icy shores and frozen ocean foam.
            </p>
            <Link to="#" className="text-xs uppercase tracking-widest text-charcoal border-b border-charcoal pb-1 self-start hover:text-rose-gold hover:border-rose-gold transition-colors">
              Read the Feature
            </Link>
          </div>
        </motion.article>

        {/* Grid Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {articles.map((article, idx) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden bg-sand/20 mb-6">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="text-[10px] tracking-widest uppercase text-rose-gold font-medium mb-3">{article.category}</span>
              <h3 className="text-xl text-charcoal font-serif mb-3 group-hover:text-rose-gold transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm font-light text-charcoal/60 leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <span className="text-[10px] uppercase text-charcoal/40 mt-auto">{article.date}</span>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-24 text-center">
          <button className="px-10 py-4 border border-charcoal/20 text-xs uppercase tracking-[0.2em] text-charcoal hover:bg-charcoal hover:text-cream transition-colors">
            Load More Stories
          </button>
        </div>

      </div>
    </div>
  );
};

export default Journal;
