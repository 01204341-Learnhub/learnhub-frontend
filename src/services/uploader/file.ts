import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebase/firebase";

const storage = getStorage(app);

/*
    Upload file to Firebase Storage

    @param file: File

    @return Promise<string> - File URL
*/
async function uploadFile(file: File, fileName?: string): Promise<string> {
  const randomID = Math.random().toString(36).substring(2);
  const identifier = fileName ? `${randomID}.${fileName}` : `${randomID}`;
  const fileRef = ref(storage, `file/${identifier}}`);
  try {
    await uploadBytes(fileRef, file);
  } catch (error) {
    console.error(`Error uploading file: ${JSON.stringify(error, null, 2)}`);
    throw new Error(error);
  }
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
}

export { uploadFile };
