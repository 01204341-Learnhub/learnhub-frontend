import { getAuth, updatePassword } from "firebase/auth";
import { app } from "../../firebase/firebase";

async function changePassword(newPassword: string) {
  const auth = getAuth(app);
  await updatePassword(auth.currentUser!, newPassword);
}

export { changePassword };
