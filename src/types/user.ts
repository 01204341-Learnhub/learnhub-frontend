type LearnhubUser = {
  userType: "student" | "teacher" | "admin";
  userID: string;
  username: string;
  fullname: string;
  email: string;
  profilePicture: string;
};

type LearnhubUserCredential = {
  studentID?: string;
  teacherID?: string;
};

type LearnhubStudentResponse = {
  uid: string;
  student_id: string;
  username: string;
  fullname: string;
  email: string;
  profile_pic: string;
};

type LearnhubTeacherResponse = {
  uid: string;
  teacher_id: string;
  username: string;
  fullname: string;
  email: string;
  profile_pic: string;
};

export type {
  LearnhubStudentResponse,
  LearnhubTeacherResponse,
  LearnhubUser,
  LearnhubUserCredential,
};
