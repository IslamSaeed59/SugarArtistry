import { db } from "../../config/db";
import { collection, getDocs, addDoc, query, orderBy, Timestamp } from "firebase/firestore";

const COLLECTION_NAME = "collections";

// Fetch all collections (categories) from Firestore
export const getCollections = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
};

// Add a new collection (category) to Firestore
export const addCollection = async (collectionData) => {
  try {
    // collectionData should have { name: string, slug: string }
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...collectionData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding collection:", error);
    throw error;
  }
};
