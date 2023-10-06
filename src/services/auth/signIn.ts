import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebase";
import {
  LearnhubStudentResponse,
  LearnhubTeacherResponse,
  LearnhubUser,
  LearnhubUserCredential,
} from "../../types/user";

const auth = getAuth(app);
async function checkIfAlreadyRegisterOnce(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await auth.signOut();
    return true;
  } catch (error) {
    if (error.code === "auth/invalid-login-credentials") {
      return false;
    }
    throw error;
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
    console.log(userCredential.user.displayName);
    const learnhubUserCredential: LearnhubUserCredential = JSON.parse(
      userCredential.user.displayName
    );
    let learnhubUID: string;
    if (userType === "student") {
      learnhubUID = learnhubUserCredential.studentID!;
    } else {
      learnhubUID = learnhubUserCredential.teacherID!;
    }
    const url: string = `http://localhost:8000/users/${userType}s/${learnhubUID}`;
    const data = (
      await axios.get<LearnhubStudentResponse | LearnhubTeacherResponse>(url)
    ).data;
    console.log(JSON.stringify(data));
    let learnhubUser: LearnhubUser;
    if (userType === "student") {
      learnhubUser = {
        userType: "student",
        userID: (data as LearnhubStudentResponse).student_id,
        username: data.username,
        email: data.email,
        profilePicture: data.profile_pic,
      };
    } else {
      learnhubUser = {
        userType: "teacher",
        userID: (data as LearnhubTeacherResponse).teacher_id,
        username: data.username,
        email: data.email,
        profilePicture: data.profile_pic,
      };
    }
    return learnhubUser;
  } catch (error) {
    console.log(`error when sign in with email`, error);
    throw error;
  }
}

export { checkIfAlreadyRegisterOnce, signInWithEmail };
