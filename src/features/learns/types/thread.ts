import { LearnhubUser } from "../../../types/user";

type Thread = {
  classId: string;
  clsName: string;
  teacher: LearnhubUser;
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
  if (!["image", "video", "file"].includes(typ)) {
    console.error(new Error(`Invalid attachment type ${typ}`));
  }
  const urls = {
    image:
      "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Favcirn6x434%00test-image.png?alt=media&token=80167929-e90a-4ff0-a623-d898fe50abc6",
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Ffsjqm90y2vk%00test-video.mp4?alt=media&token=a25fb4ef-ec66-4ac2-aaba-8a9f99975284",
    file: "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Fe623mdlccss%00test-file.pdf?alt=media&token=7fe9e0dc-93b9-4805-b537-df563fbfc2de",
  };
  return {
    typ: typ,
    src: urls[typ],
  };
}

function generateMockHomeworkSubmissionFile(typ: string) {
  if (!["image", "video", "file"].includes(typ)) {
    console.error(new Error(`Invalid homework submission file type ${typ}`));
  }
  const urls = {
    image:
      "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Favcirn6x434%00test-image.png?alt=media&token=80167929-e90a-4ff0-a623-d898fe50abc6",
    video:
      "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Ffsjqm90y2vk%00test-video.mp4?alt=media&token=a25fb4ef-ec66-4ac2-aaba-8a9f99975284",
    file: "https://firebasestorage.googleapis.com/v0/b/learn-hub-fbf2c.appspot.com/o/file%2Fe623mdlccss%00test-file.pdf?alt=media&token=7fe9e0dc-93b9-4805-b537-df563fbfc2de",
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
    classId: classId,
    clsName: `Class ${classId}`,
    teacher: teacher,
    threadId: threadId,
    name: `${
      typ == "announcement" ? "Announcement" : "Homework"
    } thread ${threadId}`,
    typ: typ,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium eros nisi, vitae ultrices augue malesuada vel.",
    attachments: ["image", "video", "file"].map(generateMockAttachment),
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
        ? ["image", "video", "file"].map(generateMockHomeworkSubmissionFile)
        : undefined,
    homeworkGotScore: typ === "homework" ? undefined : undefined,
  };
}

export type { Thread, Attachment, Reply, HomeworkSubmissionFile };

export { generateMockUser, generateMockThread };
