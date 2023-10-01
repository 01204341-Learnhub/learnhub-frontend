import axios from "axios";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import {
  LearnhubStudentResponse,
  LearnhubTeacherResponse,
  LearnhubUser,
} from "../../types/user";

const auth = getAuth(app);
const noImagePlaceholder =
  "https://images.theconversation.com/files/102848/original/image-20151123-18264-j336wc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip";

type LearnhubUserCredential = {
  studentID?: string;
  teacherID?: string;
};

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
      profilePicture: noImagePlaceholder,
    };
    return learnhubUser;
  } catch (error) {
    console.log(`error kub`, error);
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
      const teacherID = await createLearnhubStudent(
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
  }
}
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

export {
  checkIfAlreadyRegisterOnce,
  createStudentWithEmail,
  createTeacherWithEmail,
  signIn,
  signInWithEmail,
};