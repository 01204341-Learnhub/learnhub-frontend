import { getAuth } from "firebase/auth";
import { app } from "../../firebase/firebase";

const auth = getAuth(app);
async function signOut() {
  localStorage.removeItem("learnhubUser");
  await auth.signOut();
}

export { signOut };
