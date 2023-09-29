import { getAuth } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { removeUser } from "../../slices/userSlice";
import store from "../../store";

const auth = getAuth(app);
async function signOut() {
  await auth.signOut();

  // remove user from redux user slice
  store.dispatch(removeUser());
}

export { signOut };
