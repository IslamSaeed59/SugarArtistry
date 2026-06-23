import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { getProductById, getProducts } from "../services/productsService";
import TiltCard from "../components/ui/TiltCard";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [complements, setComplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [openAccordion, setOpenAccordion] = useState("materials");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductById(id);
      if (data) {
        setProduct(data);
        setActiveImage(data.mainImage);
        
        // Fetch complements (other products in the same category)
        const relatedData = await getProducts(data.categoryId);
        // Filter out the current product and take up to 4
        setComplements(relatedData.filter(p => p.id !== data.id).slice(0, 4));
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center text-charcoal/50">Loading masterpiece...</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-cream flex items-center justify-center text-charcoal/50">Piece not found.</div>;
  }

  const allImages = [product.mainImage, ...(product.galleryImages || [])].filter(Boolean);
  const galleryImages = allImages;

  return (
    <div className="w-full min-h-screen bg-cream">
      
      {/* 1. TOP SECTION: Product Showcase */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col-reverse md:flex-row gap-6 h-full max-h-[700px]"
        >
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
            {galleryImages.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-20 h-24 md:w-24 md:h-28 overflow-hidden transition-all duration-300 ${activeImage === img ? "ring-2 ring-rose-gold ring-offset-2 ring-offset-cream opacity-100" : "opacity-60 hover:opacity-100"}`}
                style={{ width: "6rem", height: "7rem" }}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-grow h-full bg-sand/20 overflow-hidden min-h-[400px]">
            <div className="absolute top-6 left-6 z-10 text-rose-gold/80 text-xs tracking-widest uppercase font-medium">
              Limited Edition
            </div>
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={activeImage} 
              alt="Main Product" 
              className="w-full h-full object-cover" 
            />
          </div>
        </motion.div>

        {/* Right: Details & Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-8 border-b border-charcoal/10 pb-8">
            <span className="text-[10px] uppercase tracking-widest text-charcoal/50 mb-3 block">
              {product.categoryId.replace("-", " ")}
            </span>
            <h1 className="text-3xl md:text-5xl text-charcoal font-serif mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-rose-gold font-light">{product.price} EGP</p>
          </div>

          <div className="mb-10 text-charcoal/70 font-light leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Options */}
          <div className="space-y-6 mb-12">
            {/* Size Options */}
            {product.sizeOptions && product.sizeOptions.length > 0 && (
              <div>
                <label className="text-[10px] uppercase tracking-widest text-charcoal mb-3 block">Select Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizeOptions.map((size, idx) => (
                    <button key={idx} className={`px-6 py-3 border text-xs uppercase tracking-wider transition-colors ${idx === 0 ? "border-charcoal text-charcoal" : "border-charcoal/20 text-charcoal/60 hover:border-charcoal/50"}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Gold Accents */}
            {product.goldAccents && product.goldAccents.length > 0 && (
              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest text-charcoal mb-3 block">Gold Leaf Accents</label>
                <div className="relative border-b border-charcoal/20 pb-2">
                  <select className="w-full bg-transparent text-sm text-charcoal/80 outline-none appearance-none cursor-pointer">
                    {product.goldAccents.map((accent, idx) => (
                      <option key={idx}>{accent}</option>
                    ))}
                  </select>
                  <svg width="16" height="16" className="absolute right-0 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <button className="flex-grow bg-charcoal text-cream text-xs uppercase tracking-[0.2em] py-4 transition-colors hover:bg-rose-gold">
              Add to Inquiry
            </button>
            <button className="w-14 border border-charcoal/20 flex items-center justify-center text-charcoal hover:border-charcoal transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>

          {/* Accordion Details */}
          <div className="border-t border-charcoal/10">
            {product.materialsUsed && product.materialsUsed.length > 0 && (
              <div className="border-b border-charcoal/10">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === "materials" ? "" : "materials")}
                  className="w-full flex justify-between items-center py-4 text-xs uppercase tracking-widest text-charcoal hover:text-rose-gold transition-colors"
                >
                  Materials Used
                  <span className="text-lg font-light">{openAccordion === "materials" ? "-" : "+"}</span>
                </button>
                <motion.div 
                  initial={false} 
                  animate={{ height: openAccordion === "materials" ? "auto" : 0, opacity: openAccordion === "materials" ? 1 : 0 }} 
                  className="overflow-hidden"
                >
                  <ul className="pb-6 pl-4 list-disc text-sm font-light text-charcoal/70 space-y-2">
                    {product.materialsUsed.map((mat, idx) => (
                      <li key={idx}>{mat}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            )}

            <div className="border-b border-charcoal/10">
              <button 
                onClick={() => setOpenAccordion(openAccordion === "details" ? "" : "details")}
                className="w-full flex justify-between items-center py-4 text-xs uppercase tracking-widest text-charcoal hover:text-rose-gold transition-colors"
              >
                Craftsmanship & Lead Time
                <span className="text-lg font-light">{openAccordion === "details" ? "-" : "+"}</span>
              </button>
              <motion.div 
                initial={false} 
                animate={{ height: openAccordion === "details" ? "auto" : 0, opacity: openAccordion === "details" ? 1 : 0 }} 
                className="overflow-hidden"
              >
                <div className="pb-6 text-sm font-light text-charcoal/70 space-y-3">
                  <p><strong className="font-medium text-charcoal">Lead Time:</strong> {product.leadTime}</p>
                  <p><strong className="font-medium text-charcoal">Custom Calligraphy:</strong> {product.customCalligraphy ? "Available upon request" : "Not available for this piece"}</p>
                  <p className="pt-2 italic text-charcoal/50">Each piece is poured by hand over the course of several days to achieve our signature depth and 3D effect.</p>
                </div>
              </motion.div>
            </div>

            <div className="border-b border-charcoal/10">
              <button 
                onClick={() => setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")}
                className="w-full flex justify-between items-center py-4 text-xs uppercase tracking-widest text-charcoal hover:text-rose-gold transition-colors"
              >
                Shipping & Handling
                <span className="text-lg font-light">{openAccordion === "shipping" ? "-" : "+"}</span>
              </button>
              <motion.div 
                initial={false} 
                animate={{ height: openAccordion === "shipping" ? "auto" : 0, opacity: openAccordion === "shipping" ? 1 : 0 }} 
                className="overflow-hidden"
              >
                <div className="pb-6 text-sm font-light text-charcoal/70">
                  <p>Secure global shipping. Each tray is securely crated to ensure the delicate resin and shell arrangements arrive in pristine condition.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Complements Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-charcoal/5">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 border-b border-charcoal/10 pb-6">
          <div>
            <h2 className="text-3xl text-charcoal mb-2">Complements</h2>
            <p className="text-sm font-light text-charcoal/60">Curated pairings for your home</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {complements.length === 0 ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 py-10 text-charcoal/50 text-sm">
              More pieces coming soon to this collection.
            </div>
          ) : (
            complements.map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col h-full"
              >
                <Link to={`/product/${p.id}`} className="flex flex-col h-full">
                  <TiltCard className="relative w-full aspect-square overflow-hidden bg-sand/20 mb-4">
                    <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </TiltCard>
                  <div>
                    <h3 className="text-charcoal text-base mb-1 truncate">{p.name}</h3>
                    <p className="text-charcoal/60 text-xs font-light tracking-wide">{p.price} EGP</p>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

    </div>
  );
};

export default ProductDetails;
