import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import { LearnhubUser, LearnhubUserResponse } from "../../types/user";

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

async function createStudentWithEmail(
  email: string,
  password: string,
  username: string,
  fullName: string
) {
  try {
    const userCredentail = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredentail.user.uid;
    const url: string = "http://localhost:8000/users/students";
    const body = {
      uid: uid,
      username: username,
      fullname: fullName,
      email: email,
    };
    const res = await axios.post<{ student_id: string }>(url, body);
    const studentID = res.data.student_id;

    // change fullname of firebase
    const user = userCredentail.user;
    await updateProfile(user, { displayName: studentID });
    const learnhubUser: LearnhubUser = {
      userType: "student",
      userID: uid,
      username: username,
      email: email,
      profilePicture:
        "https://images.theconversation.com/files/102848/original/image-20151123-18264-j336wc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
    };
    return learnhubUser;
  } catch (error) {
    console.log(`error when create student with email`, error);
  }
}

async function signInWithEmail(
  email: string,
  password: string,
  userType: "student" | "teacher"
) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const learnhubUID = userCredential.user.displayName;
    const url: string = `http://localhost:8000/users/${userType}s/${learnhubUID}`;
    const data = (await axios.get<LearnhubUserResponse>(url)).data;
    const learnhubUser: LearnhubUser = {
      userType: userType,
      userID: uid,
      username: data.username,
      email: data.email,
      profilePicture: data.profile_pic,
    };
    return learnhubUser;
  } catch (error) {
    console.log(`error when sign in with email`, error);
  }
}

export { createStudentWithEmail, signIn, signInWithEmail };
