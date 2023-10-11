import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebase";
import store from "../../store";
import {
  LearnhubStudentResponse,
  LearnhubTeacherResponse,
  LearnhubUser,
  LearnhubUserCredential,
} from "../../types/user";

const auth = getAuth(app);
const baseURL = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";

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
    const url: string = `${baseURL}/users/${userType}s/${learnhubUID}`;
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
        fullname: data.fullname,
        email: data.email,
        profilePicture: data.profile_pic,
      };
    } else {
      learnhubUser = {
        userType: "teacher",
        userID: (data as LearnhubTeacherResponse).teacher_id,
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        profilePicture: data.profile_pic,
      };
    }
    store.dispatch({ type: "user/setLearnhubUser", payload: learnhubUser });
    localStorage.setItem("learnhubUser", JSON.stringify(learnhubUser));
    return learnhubUser;
  } catch (error) {
    console.log(`error when sign in with email`, error);
    throw error;
  }
}

export { signInWithEmail };
