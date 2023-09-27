import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebase/firebase";

const storage = getStorage(app);

/*
    Upload image file to Firebase Storage

    @param file: File

    @return Promise<string> - Image URL
*/
async function uploadImageFile(file: File): Promise<string> {
  const randomID = Math.random().toString(36).substring(2);
  const fileRef = ref(storage, `images/${randomID}`);
  try {
    await uploadBytes(fileRef, file);
  } catch (error) {
    console.error(`Error uploading file: ${JSON.stringify(error, null, 2)}`);
  }
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
}

export { uploadImageFile };
