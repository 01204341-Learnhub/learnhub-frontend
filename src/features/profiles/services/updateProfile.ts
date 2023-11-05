import axios from "axios";
import { BASE_URL } from "../../../config";
import { uploadImageFile } from "../../../services/uploader/image";

async function updateProfilePicture(
  userType: string,
  userID: string,
  newProfilePic: string
) {
  const url = `${BASE_URL}/users/${userType}${"s"}/${userID}/`;
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
  const url = `${BASE_URL}/users/${userType}${"s"}/${userID}/`;
  const uploadedUrl = await uploadImageFile(file);
  const body = {
    profile_pic: uploadedUrl,
  };
  await axios.patch(url, body);
  return uploadedUrl;
}

async function updateFullname(
  userType: string,
  userID: string,
  fullname: string
) {
  const url = `${BASE_URL}/users/${userType}${"s"}/${userID}/`;
  const body = {
    fullname: fullname,
  };
  await axios.patch(url, body);
}

export { updateFullname, updateProfileFromFile, updateProfilePicture };
