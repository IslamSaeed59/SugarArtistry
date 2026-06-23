import { storage } from "../../config/db";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Upload a single file to Firebase Storage
export const uploadImage = (file, folderName = "products") => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    // Create a unique filename
    const uniqueName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folderName}/${uniqueName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can use this to track progress if needed
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
