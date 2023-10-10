import { LearnhubUser } from "../../../types/user";

type Thread = {
  cls: Class;
  threadId: string;
  name: string; // Title
  typ: "announcement" | "homework";
  text: string;
  attachments: Attachment[];
  lastEdit: Date; // Last edit date by teacher
  replies: Reply[];
  homeworkTopicName?: string; // For homework threads
  homeworkDueDateTime?: Date; // For homework threads
  homeworkStatus?: "open" | "closed"; // For homework threads
  homeworkFullScore?: number; // For homework threads
  homeworkSubmissionStatus?:
    | "not-submitted"
    | "submitted"
    | "submitted-and-graded"; // For homework threads
  homeworkLastSubmissionDateTime?: Date; // For homework threads
  homeworkSubmissionFiles?: HomeworkSubmissionFile[]; // For homework threads
  homeworkGotScore?: number; // For homework threads
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
  typ: string;
  src: string;
};

function generateMockUser(
  typ: "student" | "teacher" | "admin",
  userId: string
): LearnhubUser {
  return {
    userType: typ,
    userID: userId,
    username: `User ${userId}`,
    email: `${userId}@gmail.com`,
    profilePicture: `https://robohash.org/${userId}`,
  };
}

function generateMockAttachment(typ: string) {
  if (!["image", "video", "doc", "file"].includes(typ)) {
    console.error(new Error(`Invalid attachment type ${typ}`));
  }
  const urls = {
    image:
      "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2F7uwufn4ugyh%00test-image.png%00?alt=media&token=3a0191b2-27f1-4385-9dd6-0c7b155a9f22",
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Fjprsf09d5qs%00test-video.mp4%00?alt=media&token=b88584d7-b8a9-4c8e-9eb5-444f30d29123",
    doc: "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Fjvhkj7tuzl%00test-doc.md%00?alt=media&amp;token=f1e96b77-3979-4178-94ad-1b46585d3167",
    file: "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2F5f9d61u601h%00test-file.pdf%00?alt=media&token=4ef7acb1-83de-4c8d-8aab-9d95de27a385",
  };
  return {
    typ: typ,
    src: urls[typ],
  };
}

function generateMockHomeworkSubmissionFile(typ: string) {
  if (!["image", "video", "doc", "file"].includes(typ)) {
    console.error(new Error(`Invalid homework submission file type ${typ}`));
  }
  const urls = {
    image:
      "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2F7uwufn4ugyh%00test-image.png%00?alt=media&token=3a0191b2-27f1-4385-9dd6-0c7b155a9f22",
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Fjprsf09d5qs%00test-video.mp4%00?alt=media&token=b88584d7-b8a9-4c8e-9eb5-444f30d29123",
    doc: "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Fjvhkj7tuzl%00test-doc.md%00?alt=media&amp;token=f1e96b77-3979-4178-94ad-1b46585d3167",
    file: "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2F5f9d61u601h%00test-file.pdf%00?alt=media&token=4ef7acb1-83de-4c8d-8aab-9d95de27a385",
  };
  return {
    typ: typ,
    src: urls[typ],
  };
}

function generateMockThread(
  classId: string,
  threadId: string,
  typ: "announcement" | "homework"
): Thread {
  const teacher = generateMockUser("teacher", "teacher0");
  return {
    cls: {
      classId: classId,
      name: `Class ${classId}`,
      teacher: teacher,
    },
    threadId: threadId,
    name: `${
      typ == "announcement" ? "Announcement" : "Homework"
    } thread ${threadId}`,
    typ: typ,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium eros nisi, vitae ultrices augue malesuada vel.",
    attachments: ["image", "video", "doc", "file"].map(generateMockAttachment),
    lastEdit: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3),
    replies: [
      {
        user: generateMockUser("student", "student1"),
        dateTime: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 7 - 1000 * 60 * 60 * 4
        ),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium eros nisi, vitae ultrices augue malesuada vel.",
      },
      {
        user: generateMockUser("student", "student2"),
        dateTime: new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 1 - 1000 * 60 * 60 * 1
        ),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium eros nisi, vitae ultrices augue malesuada vel.",
      },
      {
        user: teacher,
        dateTime: new Date(new Date().getTime() - 1000 * 60 * 30),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium eros nisi, vitae ultrices augue malesuada vel.",
      },
    ],
    homeworkTopicName: `Topic ${threadId.length % 5}`,
    homeworkDueDateTime:
      typ === "homework"
        ? new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 7 + 1000 * 60 * 60 * 4
          )
        : undefined,
    homeworkStatus: typ === "homework" ? "open" : undefined,
    homeworkFullScore: typ === "homework" ? 100 : undefined,
    homeworkSubmissionStatus: typ === "homework" ? "not-submitted" : undefined,
    homeworkLastSubmissionDateTime: typ === "homework" ? undefined : undefined,
    homeworkSubmissionFiles:
      typ === "homework"
        ? ["image", "video", "doc", "file"].map(
            generateMockHomeworkSubmissionFile
          )
        : undefined,
    homeworkGotScore: typ === "homework" ? undefined : undefined,
  };
}

export type { Thread, Class, Attachment, Reply, HomeworkSubmissionFile };

export { generateMockUser, generateMockThread };
