import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { getCategories, addCategory } from "../services/categoriesService";
import { addProduct } from "../services/productsService";
import { uploadImage } from "../services/storageService";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  // Basic Info
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [isLimitedEdition, setIsLimitedEdition] = useState(false);
  const [customCalligraphy, setCustomCalligraphy] = useState(false);

  // Tags
  const [sizeOptions, setSizeOptions] = useState([]);
  const [goldAccents, setGoldAccents] = useState([]);
  const [materialsUsed, setMaterialsUsed] = useState([]);

  // Tag Inputs
  const [sizeInput, setSizeInput] = useState("");
  const [goldInput, setGoldInput] = useState("");
  const [materialInput, setMaterialInput] = useState("");

  // Categories Dropdown
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Media
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // UI States
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const fetchCategories = async (selectSlug = null) => {
    const data = await getCategories();
    
    // Ensure "All Pieces" is always first if it exists
    const sortedData = data.sort((a, b) => {
      if (a.name.toLowerCase() === "all pieces") return -1;
      if (b.name.toLowerCase() === "all pieces") return 1;
      return 0;
    });

    setCategories(sortedData);
    if (selectSlug) {
      setCategoryId(selectSlug);
    } else if (sortedData.length > 0 && !categoryId) {
      setCategoryId(sortedData[0].slug);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim()) return;
    setIsAddingCategory(true);
    try {
      const slug = newCategoryName.trim().toLowerCase().replace(/\s+/g, '-');
      await addCategory({ name: newCategoryName.trim(), slug });
      await fetchCategories(slug);
      setShowNewCategory(false);
      setNewCategoryName("");
    } catch (err) {
      console.error("Failed to add category:", err);
      alert("Failed to add category. Try again.");
    } finally {
      setIsAddingCategory(false);
    }
  };

  // Handlers for Tags
  const handleAddTag = (e, input, setInput, list, setList) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      if (!list.includes(input.trim())) {
        setList([...list, input.trim()]);
      }
      setInput("");
    }
  };

  const handleRemoveTag = (tagToRemove, list, setList) => {
    setList(list.filter((tag) => tag !== tagToRemove));
  };

  // Handlers for Images
  const handleMainImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImagesSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const remainingSlots = 3 - galleryFiles.length;

    if (remainingSlots <= 0) {
      alert("You can only upload a maximum of 3 gallery images.");
      return;
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);
    if (selectedFiles.length > remainingSlots) {
      alert(`You can only add up to 3 gallery images. Only ${filesToAdd.length} image(s) were added.`);
    }

    setGalleryFiles([...galleryFiles, ...filesToAdd]);
    const previews = filesToAdd.map(f => URL.createObjectURL(f));
    setGalleryPreviews([...galleryPreviews, ...previews]);
  };

  const removeGalleryImage = (idx) => {
    const newFiles = [...galleryFiles];
    newFiles.splice(idx, 1);
    setGalleryFiles(newFiles);

    const newPreviews = [...galleryPreviews];
    newPreviews.splice(idx, 1);
    setGalleryPreviews(newPreviews);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name || !price || !description || !categoryId || !mainImageFile) {
      setError("Please fill all required fields and select a main image.");
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload Main Image
      const mainImageUrl = await uploadImage(mainImageFile, "products/main");

      // 2. Upload Gallery Images
      const galleryUrls = [];
      for (const file of galleryFiles) {
        const url = await uploadImage(file, "products/gallery");
        galleryUrls.push(url);
      }

      // 3. Save to Firestore
      const newProduct = {
        name,
        price: Number(price),
        description,
        categoryId,
        leadTime,
        isLimitedEdition,
        customCalligraphy,
        sizeOptions,
        goldAccents,
        materialsUsed,
        mainImage: mainImageUrl,
        galleryImages: galleryUrls
      };

      await addProduct(newProduct);

      // Reset form
      setSuccess(true);
      setName("");
      setPrice("");
      setDescription("");
      setLeadTime("");
      setIsLimitedEdition(false);
      setCustomCalligraphy(false);
      setSizeOptions([]);
      setGoldAccents([]);
      setMaterialsUsed([]);
      setMainImageFile(null);
      setMainImagePreview(null);
      setGalleryFiles([]);
      setGalleryPreviews([]);
      
    } catch (err) {
      console.error(err);
      setError("Failed to upload product. Please check your storage rules and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val === "SugarArtistry") {
      setIsAuthenticated(true);
    } else if (val.length >= 13) {
      setAuthError(true);
    } else {
      setAuthError(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" className="text-charcoal">
            <path d="M12 2C8.69 2 6 4.69 6 8c0 1.54.59 2.94 1.56 4C6.59 13.06 6 14.46 6 16c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.54-.59-2.94-1.56-4C17.41 10.94 18 9.54 18 8c0-3.31-2.69-6-6-6zm0 18c-2.21 0-4-1.79-4-4 0-1.1.45-2.1 1.17-2.83L12 10.34l2.83 2.83C15.55 13.9 16 14.9 16 16c0 2.21-1.79 4-4 4zm0-16c2.21 0 4 1.79 4 4 0 1.1-.45 2.1-1.17 2.83L12 13.66 9.17 10.83C8.45 10.1 8 9.1 8 8c0-2.21 1.79-4 4-4z"/>
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-md w-full max-w-sm p-10 shadow-2xl relative z-10 border border-charcoal/10"
        >
          <button 
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-gold font-medium mb-3 block">Restricted Area</span>
            <h3 className="text-2xl text-charcoal font-serif">Admin Authentication</h3>
          </div>

          <div className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={handlePasswordChange}
              autoFocus
              placeholder="Enter Password" 
              className={`w-full bg-transparent border-b ${authError ? 'border-red-500 text-red-600' : 'border-charcoal/30 text-charcoal'} py-3 text-center outline-none focus:border-rose-gold transition-colors tracking-[0.2em]`}
            />
            <div className="h-4 text-center mt-2">
              <AnimatePresence>
                {authError && (
                  <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    className="text-[10px] uppercase tracking-widest text-red-500"
                  >
                    Incorrect Access Key
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-rose-gold font-medium mb-4 block">Dashboard</span>
          <h1 className="text-4xl text-charcoal font-serif">Add New Product</h1>
        </motion.div>

        {success && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 text-center text-sm">
            Masterpiece added successfully to the gallery!
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* SECTION 1: Basic Info */}
          <section className="bg-white/50 p-8 shadow-sm">
            <h2 className="text-xs tracking-widest uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-charcoal/70 mb-2">Product Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal focus:outline-none focus:border-rose-gold transition-colors"
                  placeholder="e.g. Bespoke Ocean Tray"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-charcoal/70 mb-2">Price (EGP) *</label>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal focus:outline-none focus:border-rose-gold transition-colors"
                  placeholder="e.g. 450"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] uppercase tracking-widest text-charcoal/70">Category *</label>
                  <button 
                    type="button" 
                    onClick={() => setShowNewCategory(!showNewCategory)}
                    className="text-[10px] uppercase tracking-widest text-rose-gold hover:text-charcoal transition-colors"
                  >
                    {showNewCategory ? "- Cancel" : "+ Add New Category"}
                  </button>
                </div>
                
                {showNewCategory ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newCategoryName} 
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 border-b border-charcoal/20 bg-transparent py-2 text-charcoal focus:outline-none focus:border-rose-gold transition-colors text-sm"
                      placeholder="e.g. Wall Art"
                    />
                    <button 
                      type="button" 
                      onClick={handleAddNewCategory}
                      disabled={isAddingCategory}
                      className="bg-sand text-charcoal text-[10px] uppercase tracking-widest px-4 hover:bg-rose-gold hover:text-cream transition-colors disabled:opacity-50"
                    >
                      {isAddingCategory ? "Saving..." : "Save"}
                    </button>
                  </div>
                ) : (
                  <select 
                    value={categoryId} 
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal focus:outline-none focus:border-rose-gold transition-colors appearance-none"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-charcoal/70 mb-2">Description *</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="w-full border border-charcoal/20 bg-transparent p-3 text-sm text-charcoal focus:outline-none focus:border-rose-gold transition-colors"
                  placeholder="Describe the piece..."
                  required
                ></textarea>
              </div>
            </div>
          </section>

          {/* SECTION 2: Media Upload */}
          <section className="bg-white/50 p-8 shadow-sm">
            <h2 className="text-xs tracking-widest uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-2">Media Gallery</h2>
            
            <div className="space-y-8">
              {/* Main Image */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-charcoal/70 mb-3">Main Cover Image *</label>
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-charcoal/20 bg-sand/10 hover:bg-sand/20 transition-colors cursor-pointer flex flex-col items-center justify-center py-12 relative overflow-hidden"
                >
                  {mainImagePreview ? (
                    <img src={mainImagePreview} alt="Main Preview" className="absolute inset-0 w-full h-full object-contain" />
                  ) : (
                    <>
                      <svg width="24" height="24" className="text-charcoal/40 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      <span className="text-xs text-charcoal/60 uppercase tracking-widest">Click to Upload Main Image</span>
                    </>
                  )}
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleMainImageSelect} className="hidden" />
              </div>

              {/* Gallery Images */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-[10px] uppercase tracking-widest text-charcoal/70">Gallery Images (Optional, Max 3)</label>
                  <span className="text-[10px] text-charcoal/50">{galleryPreviews.length}/3 Added</span>
                </div>
                
                {galleryPreviews.length < 3 && (
                  <div 
                    onClick={() => galleryInputRef.current.click()}
                    className="border border-dashed border-charcoal/20 bg-sand/10 hover:bg-sand/20 transition-colors cursor-pointer flex flex-col items-center justify-center py-6"
                  >
                    <span className="text-[10px] text-charcoal/60 uppercase tracking-widest">+ Add More Images</span>
                  </div>
                )}
                <input type="file" accept="image/*" multiple ref={galleryInputRef} onChange={handleGalleryImagesSelect} className="hidden" />
                
                {/* Previews */}
                {galleryPreviews.length > 0 && (
                  <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                    {galleryPreviews.map((preview, idx) => (
                      <div key={idx} className="relative w-20 h-24 flex-shrink-0 border border-charcoal/10">
                        <img src={preview} alt="Gallery Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute -top-2 -right-2 bg-charcoal text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 3: Details & Tags */}
          <section className="bg-white/50 p-8 shadow-sm">
            <h2 className="text-xs tracking-widest uppercase text-charcoal mb-6 border-b border-charcoal/10 pb-2">Resin Craft Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-charcoal/70 mb-2">Lead Time</label>
                <input 
                  type="text" 
                  value={leadTime} 
                  onChange={(e) => setLeadTime(e.target.value)}
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal focus:outline-none focus:border-rose-gold transition-colors"
                  placeholder="e.g. 2-3 weeks to cure"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between p-4 border border-charcoal/10 bg-white">
                <span className="text-xs uppercase tracking-widest text-charcoal/80">Limited Edition</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isLimitedEdition} onChange={(e) => setIsLimitedEdition(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-charcoal"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-charcoal/10 bg-white">
                <span className="text-xs uppercase tracking-widest text-charcoal/80">Custom Calligraphy</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={customCalligraphy} onChange={(e) => setCustomCalligraphy(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-charcoal"></div>
                </label>
              </div>

              {/* Tags Generators */}
              {/* Materials */}
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-charcoal/70 mb-2">Materials Used (Press Enter to add)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {materialsUsed.map((mat) => (
                    <span key={mat} className="bg-sand text-charcoal text-[10px] uppercase tracking-wider px-3 py-1 flex items-center gap-2">
                      {mat} <button type="button" onClick={() => handleRemoveTag(mat, materialsUsed, setMaterialsUsed)}>×</button>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" 
                  value={materialInput} 
                  onChange={(e) => setMaterialInput(e.target.value)}
                  onKeyDown={(e) => handleAddTag(e, materialInput, setMaterialInput, materialsUsed, setMaterialsUsed)}
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal focus:outline-none focus:border-rose-gold text-sm"
                  placeholder="e.g. UV-Resistant Resin"
                />
              </div>

              {/* Sizes */}
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-charcoal/70 mb-2">Size Options (Press Enter to add)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sizeOptions.map((size) => (
                    <span key={size} className="border border-charcoal/20 text-charcoal text-[10px] uppercase tracking-wider px-3 py-1 flex items-center gap-2">
                      {size} <button type="button" onClick={() => handleRemoveTag(size, sizeOptions, setSizeOptions)}>×</button>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" 
                  value={sizeInput} 
                  onChange={(e) => setSizeInput(e.target.value)}
                  onKeyDown={(e) => handleAddTag(e, sizeInput, setSizeInput, sizeOptions, setSizeOptions)}
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal focus:outline-none focus:border-rose-gold text-sm"
                  placeholder="e.g. Large (+50 EGP)"
                />
              </div>

              {/* Gold Accents */}
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-charcoal/70 mb-2">Gold Leaf Accents (Press Enter to add)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {goldAccents.map((gold) => (
                    <span key={gold} className="bg-rose-gold/10 text-rose-gold border border-rose-gold/20 text-[10px] uppercase tracking-wider px-3 py-1 flex items-center gap-2">
                      {gold} <button type="button" onClick={() => handleRemoveTag(gold, goldAccents, setGoldAccents)}>×</button>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" 
                  value={goldInput} 
                  onChange={(e) => setGoldInput(e.target.value)}
                  onKeyDown={(e) => handleAddTag(e, goldInput, setGoldInput, goldAccents, setGoldAccents)}
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal focus:outline-none focus:border-rose-gold text-sm"
                  placeholder="e.g. 24k Gold Flakes"
                />
              </div>

            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              disabled={isUploading}
              className={`bg-charcoal text-cream text-xs uppercase tracking-[0.2em] px-12 py-4 transition-colors ${isUploading ? "opacity-70 cursor-not-allowed" : "hover:bg-rose-gold"}`}
            >
              {isUploading ? "Uploading Masterpiece..." : "Publish Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
