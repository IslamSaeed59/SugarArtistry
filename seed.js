import { db } from "./config/db.js";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const seedProducts = async () => {
  const dummyProducts = [
    {
      categoryId: "functional-art",
      name: "Bespoke Ocean Resin Tray",
      price: 450,
      description: "A meticulously crafted tray that captures the essence of a tranquil shoreline. Made with layers of UV-resistant resin, real sea sand, and delicate shells. This piece is perfect for serving or as a centerpiece.",
      isLimitedEdition: true,
      mainImage: "https://images.unsplash.com/photo-1594244093951-e3a1290bb353?q=80&w=800&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1594244093951-e3a1290bb353?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=800&auto=format&fit=crop"
      ],
      sizeOptions: ["Standard (30x40cm)", "Large (40x50cm)", "Premium (50x60cm)"],
      goldAccents: ["Minimal Gold Flecks", "Heavy Gold Flakes (+$20)", "Rose Gold Accents"],
      customCalligraphy: true,
      materialsUsed: ["Natural Sand", "Seashells", "UV-Resistant Resin", "24k Gold Leaf"],
      leadTime: "Requires 2-3 weeks to cure and craft"
    },
    {
      categoryId: "home-decor",
      name: "Emerald Geode Chessboard",
      price: 850,
      description: "A stunning functional chessboard inspired by natural emerald geodes. Features shattered glass crystals and deep green resin layers. Comes with a full set of custom resin chess pieces.",
      isLimitedEdition: false,
      mainImage: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?q=80&w=800&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
      ],
      sizeOptions: ["Standard (40x40cm)"],
      goldAccents: ["Silver Flakes", "Gold Flakes"],
      customCalligraphy: false,
      materialsUsed: ["Crushed Glass", "Epoxy Resin", "Pigment Powders"],
      leadTime: "Requires 3-4 weeks to craft"
    },
    {
      categoryId: "tableware",
      name: "Amethyst Coaster Set (Set of 4)",
      price: 120,
      description: "Handcrafted coasters designed to look like slices of natural amethyst geodes. Featuring hand-painted gold edges and a heat-resistant top coat.",
      isLimitedEdition: false,
      mainImage: "https://images.unsplash.com/photo-1610384104075-e05c8cf200c3?q=80&w=800&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1610384104075-e05c8cf200c3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=800&auto=format&fit=crop"
      ],
      sizeOptions: ["Standard (10cm diameter)"],
      goldAccents: ["Gold Edges", "Silver Edges", "Rose Gold Edges"],
      customCalligraphy: true,
      materialsUsed: ["Heat-Resistant Resin", "Alcohol Inks", "Liquid Gold Leaf"],
      leadTime: "Requires 1-2 weeks to craft"
    },
    {
      categoryId: "bespoke-jewelry",
      name: "Floral Resin Pendant",
      price: 65,
      description: "A delicate teardrop pendant encasing real pressed wildflowers in crystal clear resin. Hung on an 18k gold-plated sterling silver chain.",
      isLimitedEdition: false,
      mainImage: "https://images.unsplash.com/photo-1599643478514-4a888f802cc9?q=80&w=800&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1599643478514-4a888f802cc9?q=80&w=800&auto=format&fit=crop"
      ],
      sizeOptions: ["One Size"],
      goldAccents: ["Gold Chain", "Silver Chain"],
      customCalligraphy: false,
      materialsUsed: ["Pressed Flowers", "Jewelry Grade Resin", "18k Gold Plated Silver"],
      leadTime: "Ready to ship in 2-3 days"
    }
  ];

  console.log("Seeding products...");
  for (const prod of dummyProducts) {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...prod,
        createdAt: Timestamp.now()
      });
      console.log(`Added product: ${prod.name} with ID: ${docRef.id}`);
    } catch (e) {
      console.error(`Error adding ${prod.name}: `, e);
    }
  }
  console.log("Done seeding products!");
  process.exit(0);
};

seedProducts();
