import { Link } from "react-router";
import { motion } from "framer-motion";
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";
import image4 from "../../assets/4.png";
import TiltCard from "../ui/TiltCard";

const products = [
  {
    id: 1,
    title: "The Ocean Resin Jewelry Box",
    price: "$185.00",
    collection: "COASTAL COLLECTION",
    image: image1,
    className: "md:col-span-6 md:row-span-2 aspect-[4/5] md:aspect-auto h-full",
    large: true
  },
  {
    id: 2,
    title: "Botanical Gold Coaster Set",
    price: "$85.00",
    image: image2,
    className: "md:col-span-3 aspect-square",
    large: false
  },
  {
    id: 3,
    title: "Bespoke Artisan Chessboard",
    price: "$320.00",
    image: image3,
    className: "md:col-span-3 aspect-square",
    large: false
  },
  {
    id: 4,
    title: "Ocean Calligraphy Display Tray",
    price: "$215.00",
    image: image4,
    className: "md:col-span-6 aspect-[2/1]",
    large: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const SeasonalCollections = () => {
  return (
    <section className="w-full py-24 px-6 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-charcoal/60 mb-2 font-semibold">
              The Studio
            </p>
            <h2 className="text-3xl md:text-4xl text-charcoal">
              Signature Collections
            </h2>
          </div>
          <Link 
            to="/collections" 
            className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-rose-gold transition-colors pb-1 border-b border-charcoal/30 hover:border-rose-gold shrink-0"
          >
            VIEW ALL PIECES
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {products.map((product) => (
            <motion.div variants={itemVariants} key={product.id} className={`group cursor-pointer flex flex-col ${product.className}`}>
              <TiltCard className="relative w-full flex-grow overflow-hidden bg-sand/20 mb-4 h-full">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </TiltCard>
              <div className="flex justify-between items-start gap-4 mt-2">
                <div>
                  <h3 className={`text-charcoal ${product.large ? 'text-xl' : 'text-base'}`}>
                    {product.title}
                  </h3>
                  {product.collection && (
                    <p className="text-xs tracking-widest uppercase text-charcoal/50 mt-1">
                      {product.collection}
                    </p>
                  )}
                </div>
                <p className={`text-charcoal ${product.large ? 'text-lg' : 'text-sm'} font-light`}>
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SeasonalCollections;
