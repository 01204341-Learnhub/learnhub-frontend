import { getAuth, signInAnonymously } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { LearnhubUser } from "../../types/user";

const auth = getAuth(app);

async function signIn() {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    console.log(user);
    const learnhubUser: LearnhubUser = {
      userType: "student",
      userID: user.uid,
    };
    return learnhubUser;
  } catch (error) {
    console.log(`error kub`, error);
  }
}

export { signIn };
