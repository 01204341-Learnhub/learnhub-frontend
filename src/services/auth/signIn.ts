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
      username: "Anonymous",
      email: "anonymous@anym.ano",
      profilePicture:
        "https://images.theconversation.com/files/102848/original/image-20151123-18264-j336wc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
    };
    return learnhubUser;
  } catch (error) {
    console.log(`error kub`, error);
  }
}

export { signIn };
