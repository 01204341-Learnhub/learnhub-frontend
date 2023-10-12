import axios from "axios";
import { uploadImageFile } from "../../../services/uploader/image";

const baseURL = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";

async function updateProfilePicture(
  userType: string,
  userID: string,
  newProfilePic: string
) {
  const url = `${baseURL}/users/${userType}${"s"}/${userID}/`;
  const body = {
    profile_pic: newProfilePic,
  };
  await axios.patch(url, body);
}

async function updateProfileFromFile(
  userType: string,
  userID: string,
  file: File
) {
  const url = `${baseURL}/users/${userType}${"s"}/${userID}/`;
  const uploadedUrl = await uploadImageFile(file);
  const body = {
    profile_pic: uploadedUrl,
  };
  await axios.patch(url, body);
  return uploadedUrl;
}

export { updateProfileFromFile, updateProfilePicture };
