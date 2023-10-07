import { LearnhubUser } from "../../../types/user";

type Thread = {
  cls: Class;
  threadId: string;
  name: string; // title
  typ: "announcement" | "homework";
  text: string;
  attachments: Attachment[];
  lastEdited: Date; // last edit date by teacher
  replies: Reply[];
  homeworkDueDateTime?: Date; // for homework threads
  homeworkFullPoints?: number; // for homework threads
  homeworkTopicName?: string; // for homework threads
  homeworkFiles?: HomeworkFile[]; // for homework threads
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

type HomeworkFile = {
  homeworkFileId: string;
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
    lastEdited: new Date(),
    replies: [],
    homeworkDueDateTime:
      typ === "homework"
        ? new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
        : undefined,
    homeworkFullPoints: typ === "homework" ? 100 : undefined,
    homeworkTopicName: `Topic ${threadId.length % 5}`,
    homeworkFiles: [],
  };
}

export type { Thread, Class, Attachment, Reply, HomeworkFile };

export { generateMockUser, generateMockClass, generateMockThread };
