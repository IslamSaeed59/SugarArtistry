import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import TiltCard from "../components/ui/TiltCard";
import { getCategories } from "../services/categoriesService";
import { getProducts } from "../services/productsService";

// Using our local assets for the first 4 to match the design
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";

const mockProducts = [
  { id: 1, title: "Handcrafted Resin Chessboard", price: "$380.00", image: image3, signature: true },
  { id: 2, title: "Ocean Resin Tray", price: "$245.00", image: image4 },
  { id: 3, title: "Golden Leaf Coaster Set", price: "$85.00", image: image2 },
  { id: 4, title: "Beach Theme Jewelry Box", price: "$195.00", image: image1 },
  { id: 5, title: "Nebula Wall Panel", price: "$520.00", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop" },
  { id: 6, title: "Amethyst Geode Bookends", price: "$165.00", image: "https://images.unsplash.com/photo-1581404111394-b258525b6a78?q=80&w=600&auto=format&fit=crop" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Collections = () => {
  const [activeCategory, setActiveCategory] = useState("all-pieces");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Compute filtered products locally
  const filteredProducts = products.filter(p => {
    // Search Filter
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Price Filter
    const price = Number(p.price);
    if (minPrice && price < Number(minPrice)) return false;
    if (maxPrice && price > Number(maxPrice)) return false;
    
    // Tags Filter
    if (selectedTags.length > 0) {
      // One of a kind
      if (selectedTags.includes("One of a Kind") && !p.isLimitedEdition) return false;
      // Bespoke
      if (selectedTags.includes("Bespoke") && !p.customCalligraphy) return false;
      // Eco-Resin
      if (selectedTags.includes("Eco-Resin") && p.materialsUsed && !p.materialsUsed.some(m => m.toLowerCase().includes("resin"))) return false;
    }

    return true;
  });

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories([{ id: "all", name: "All Pieces", slug: "all-pieces" }, ...data.filter(c => c.slug !== "all-pieces")]);
      setLoadingCategories(false);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoadingProducts(true);
      const data = await getProducts(activeCategory);
      setProducts(data);
      setLoadingProducts(false);
    };
    fetchProductsData();
  }, [activeCategory]);

  return (
    <div className="w-full bg-cream min-h-screen pb-24">
      {/* Header */}
      <div className="pt-16 pb-12 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl text-charcoal mb-4"
        >
          Our Collections
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-charcoal-light/70 italic font-light text-sm md:text-base max-w-xl mx-auto"
        >
          Hand-crafted resin art that bridges the gap between raw elements and contemporary luxury.
        </motion.p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex items-center mb-6 border-b border-charcoal/10 pb-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)} 
            className="flex items-center gap-2 text-charcoal text-xs font-medium uppercase tracking-widest"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Sidebar Filter */}
          <motion.aside 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`md:col-span-3 space-y-10 ${isFilterOpen ? "block" : "hidden"} md:block mb-10 md:mb-0`}
          >
          {/* Search */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-charcoal/50 mb-3 font-semibold">Search</h4>
            <div className="flex items-center justify-between border-b border-charcoal/20 pb-2">
              <input 
                type="text" 
                placeholder="Ocean trays..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal/30 pr-2"
              />
              <svg width="16" height="16" className="text-charcoal/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-charcoal/50 mb-4 font-semibold">Categories</h4>
            {loadingCategories ? (
              <p className="text-xs text-charcoal/40">Loading categories...</p>
            ) : (
              <ul className="space-y-3 text-sm font-light text-charcoal/80">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`transition-colors hover:text-rose-gold flex items-center ${activeCategory === cat.slug ? "text-rose-gold font-medium" : ""}`}
                    >
                      {cat.name} {activeCategory === cat.slug && <span className="ml-2 text-rose-gold text-[10px]">♦</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-charcoal/50 mb-4 font-semibold">Price Range</h4>
            <div className="flex items-center gap-4">
              <div className="bg-white/50 border border-charcoal/10 px-3 py-2 flex items-center flex-1">
                <span className="text-charcoal/40 mr-1">$</span>
                <input type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full bg-transparent outline-none text-sm min-w-0" />
              </div>
              <span className="text-charcoal/30">—</span>
              <div className="bg-white/50 border border-charcoal/10 px-3 py-2 flex items-center flex-1">
                <span className="text-charcoal/40 mr-1">$</span>
                <input type="number" placeholder="500" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full bg-transparent outline-none text-sm min-w-0" />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {["One of a Kind", "Eco-Resin", "Bespoke"].map(tag => (
              <span 
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-full cursor-pointer transition-colors ${
                  selectedTags.includes(tag) 
                    ? "bg-rose-gold text-cream" 
                    : "bg-sand text-charcoal/60 hover:bg-charcoal hover:text-cream"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.aside>

        {/* Main Product Grid */}
        <div className="md:col-span-9 flex flex-col">
          
          {/* Top Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center mb-8 text-xs text-charcoal/60 border-b border-charcoal/10 pb-4"
          >
            <span className="italic font-serif">Showing {filteredProducts.length} masterpiece{filteredProducts.length !== 1 && 's'}</span>
          </motion.div>

          {/* Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12"
          >
            {loadingProducts ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20 text-charcoal/50">
              Loading beautiful pieces...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20 text-charcoal/50">
              No products found matching your criteria.
            </div>
          ) : (
            filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-sand/20 mb-4">
                  <img 
                    src={product.mainImage} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.isLimitedEdition && (
                    <div className="absolute top-4 right-4 bg-rose-gold text-cream text-[10px] uppercase tracking-widest px-3 py-1">
                      Limited Edition
                    </div>
                  )}
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-cream text-xs uppercase tracking-[0.2em] border-b border-cream pb-1">View Details</span>
                  </div>
                </Link>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-charcoal font-serif text-lg mb-1">{product.name}</h3>
                    <p className="text-charcoal/50 text-xs tracking-widest uppercase">{product.categoryId.replace("-", " ")}</p>
                  </div>
                  <span className="text-rose-gold font-medium">${product.price}</span>
                </div>
              </motion.div>
            ))
          )}
          </motion.div>

          {/* Pagination */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 flex justify-center items-center gap-2 text-xs"
          >
            <button className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal/50 hover:border-charcoal hover:text-charcoal transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-rose-gold/90 text-white flex items-center justify-center font-medium shadow-sm">1</button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal/60 hover:bg-sand transition-colors">2</button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal/60 hover:bg-sand transition-colors">3</button>
            <span className="px-2 text-charcoal/40">...</span>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-charcoal/60 hover:bg-sand transition-colors">5</button>
            <button className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal/50 hover:border-charcoal hover:text-charcoal transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </motion.div>

        </div>
      </div>
      </div>
    </div>
  );
};

export default Collections;
