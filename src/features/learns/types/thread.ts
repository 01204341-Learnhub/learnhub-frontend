import { LearnhubUser } from "../../../types/user";

type Thread = {
  cls: Class;
  threadId: string;
  name: string; // title
  typ: "announcement" | "homework";
  text: string;
  attachments: Attachment[];
  lastEdit: Date; // last edit date by teacher
  replies: Reply[];
  homeworkTopicName?: string; // for homework threads
  homeworkDueDateTime?: Date; // for homework threads
  homeworkFullPoints?: number; // for homework threads
  homeworkSubmitted?: boolean; // for homework threads
  homeworkSubmissionDateTime?: Date; // for homework threads
  homeworkSubmissionFiles?: HomeworkSubmissionFile[]; // for homework threads
  homeworkSubmissionPoints?: number; // for homework threads
};

type Class = {
  classId: string;
  name: string;
  teacher: LearnhubUser;
};

type Attachment = {
  typ: string;
  src: string;
};

type Reply = {
  user: LearnhubUser;
  dateTime: Date;
  text: string;
};

type HomeworkSubmissionFile = {
  homeworkSubmissionFileId: string;
  name: string;
  src: string;
};

function generateMockUser(
  typ: "student" | "teacher" | "admin",
  userId: string
): LearnhubUser {
  return {
    userType: typ,
    userID: userId,
    username: userId,
    email: `${userId}@gmail.com`,
    profilePicture: `https://robohash.org/${userId}`,
  };
}

function generateMockClass(classId: string): Class {
  return {
    classId: classId,
    name: `Class ${classId}`,
    teacher: generateMockUser("teacher", `${classId}-teacher`),
  };
}

function generateMockThread(
  classId: string,
  threadId: string,
  typ: "announcement" | "homework"
): Thread {
  return {
    cls: generateMockClass(classId),
    threadId: threadId,
    name: `${
      typ == "announcement" ? "Announcement" : "Homework"
    } thread ${threadId}`,
    typ: typ,
    text: `${
      typ == "announcement" ? "Announcement" : "Homework"
    } thread ${threadId} text`,
    attachments: [],
    lastEdit: new Date(),
    replies: [],
    homeworkTopicName: `Topic ${threadId.length % 5}`,
    homeworkDueDateTime:
      typ === "homework"
        ? new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
        : undefined,
    homeworkFullPoints: typ === "homework" ? 100 : undefined,
    homeworkSubmitted: typ === "homework" ? false : undefined,
    homeworkSubmissionDateTime: typ === "homework" ? undefined : undefined,
    homeworkSubmissionFiles: [],
    homeworkSubmissionPoints: typ === "homework" ? undefined : undefined,
  };
}

export type { Thread, Class, Attachment, Reply, HomeworkSubmissionFile };

export { generateMockUser, generateMockClass, generateMockThread };
