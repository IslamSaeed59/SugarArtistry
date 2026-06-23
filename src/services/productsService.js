import { db } from "../../config/db";
import { collection, getDocs, doc, getDoc, addDoc, query, where, Timestamp } from "firebase/firestore";

const COLLECTION_NAME = "products";

// Fetch all products, optionally filtered by categorySlug
export const getProducts = async (categorySlug = null) => {
  try {
    let q;
    if (categorySlug && categorySlug !== "all-pieces") {
      q = query(collection(db, COLLECTION_NAME), where("categoryId", "==", categorySlug));
    } else {
      q = collection(db, COLLECTION_NAME);
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch a single product by its ID
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such product!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

// Add a new product to Firestore
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...productData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
