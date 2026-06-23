import { db } from "../../config/db";
import { collection, getDocs, addDoc, query, orderBy, Timestamp } from "firebase/firestore";

const COLLECTION_NAME = "categories";

// Fetch all categories from Firestore
export const getCategories = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Add a new category to Firestore
export const addCategory = async (categoryData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...categoryData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};
