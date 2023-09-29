type LearnhubUser = {
  userType: "student" | "teacher" | "admin";
  userID: string;
  username: string;
  email: string;
  profilePicture: string;
};

export type { LearnhubUser };
