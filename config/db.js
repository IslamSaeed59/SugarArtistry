// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa-Pcpc4yGPQ1U32__7TtuG_wXWTOzV-M",
  authDomain: "yasmin-48e73.firebaseapp.com",
  projectId: "yasmin-48e73",
  storageBucket: "yasmin-48e73.firebasestorage.app",
  messagingSenderId: "855491452237",
  appId: "1:855491452237:web:6cc49d2440a01a470e2b04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 
