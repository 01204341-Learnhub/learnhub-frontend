import axios from "axios";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import { LearnhubUser, LearnhubUserCredential } from "../../types/user";

const noImagePlaceholder =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const auth = getAuth(app);

async function checkIfAlreadyRegisterOnce(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    await auth.signOut();
    return true;
  } catch (error) {
    if (error.code === "auth/invalid-login-credentials") {
      return false;
    }
    throw error;
  }
}

async function createLearnhubStudent(
  uid: string,
  username: string,
  fullname: string,
  email: string
) {
  const url: string = "http://localhost:8000/users/students";
  const body = {
    uid: uid,
    username: username,
    fullname: fullname,
    email: email,
    profile_pic: noImagePlaceholder,
  };
  const res = await axios.post<{ student_id: string }>(url, body);
  const studentID = res.data.student_id;
  return studentID;
}

async function createLearnhubTeacher(
  uid: string,
  username: string,
  fullname: string,
  email: string
) {
  const url: string = "http://localhost:8000/users/teachers";
  const body = {
    uid: uid,
    username: username,
    fullname: fullname,
    email: email,
    profile_pic: noImagePlaceholder,
  };
  const res = await axios.post<{ teacher_id: string }>(url, body);
  const teacherID = res.data.teacher_id;
  return teacherID;
}

async function createStudentWithEmail(
  email: string,
  password: string,
  username: string,
  fullName: string
) {
  try {
    let userCredential: UserCredential;
    const isAlreadyRegisterOnce = await checkIfAlreadyRegisterOnce(
      email,
      password
    );
    if (isAlreadyRegisterOnce) {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
      const learnhubUserCredential: LearnhubUserCredential = JSON.parse(
        userCredential.user.displayName
      );
      if (learnhubUserCredential.studentID) {
        throw new Error(
          `this email is aleady register with studentID: ${learnhubUserCredential.studentID}`
        );
      }
      const studentID = await createLearnhubStudent(
        userCredential.user.uid,
        username,
        fullName,
        email
      );
      learnhubUserCredential.studentID = studentID;
      await updateProfile(userCredential.user, {
        displayName: JSON.stringify(learnhubUserCredential),
      });
      const learnhubUser: LearnhubUser = {
        userType: "student",
        userID: studentID,
        username: username,
        email: email,
        profilePicture: noImagePlaceholder,
      };
      return learnhubUser;
    } else {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const studentID = await createLearnhubStudent(
        userCredential.user.uid,
        username,
        fullName,
        email
      );
      const learnhubUserCredential: LearnhubUserCredential = {
        studentID: studentID,
      };
      await updateProfile(userCredential.user, {
        displayName: JSON.stringify(learnhubUserCredential),
      });
      const learnhubUser: LearnhubUser = {
        userType: "student",
        userID: studentID,
        username: username,
        email: email,
        profilePicture: noImagePlaceholder,
      };
      return learnhubUser;
    }
  } catch (error) {
    console.log(`error when create student with email`, error);
    throw error;
  }
}

async function createTeacherWithEmail(
  email: string,
  password: string,
  username: string,
  fullName: string
) {
  try {
    let userCredential: UserCredential;
    const isAlreadyRegisterOnce = await checkIfAlreadyRegisterOnce(
      email,
      password
    );
    if (isAlreadyRegisterOnce) {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
      const learnhubUserCredential: LearnhubUserCredential = JSON.parse(
        userCredential.user.displayName
      );
      if (learnhubUserCredential.teacherID) {
        throw new Error(
          `this email is aleady register with studentID: ${learnhubUserCredential.teacherID}`
        );
      }
      const teacherID = await createLearnhubTeacher(
        userCredential.user.uid,
        username,
        fullName,
        email
      );
      learnhubUserCredential.teacherID = teacherID;
      await updateProfile(userCredential.user, {
        displayName: JSON.stringify(learnhubUserCredential),
      });
      const learnhubUser: LearnhubUser = {
        userType: "teacher",
        userID: teacherID,
        username: username,
        email: email,
        profilePicture: noImagePlaceholder,
      };
      return learnhubUser;
    } else {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const teacherID = await createLearnhubTeacher(
        userCredential.user.uid,
        username,
        fullName,
        email
      );
      const learnhubUserCredential: LearnhubUserCredential = {
        teacherID: teacherID,
      };
      await updateProfile(userCredential.user, {
        displayName: JSON.stringify(learnhubUserCredential),
      });
      const learnhubUser: LearnhubUser = {
        userType: "teacher",
        userID: teacherID,
        username: username,
        email: email,
        profilePicture: noImagePlaceholder,
      };
      return learnhubUser;
    }
  } catch (error) {
    console.log(`error when create student with email`, error);
    throw error;
  }
}

export {
  createLearnhubStudent,
  createLearnhubTeacher,
  createStudentWithEmail,
  createTeacherWithEmail,
};
