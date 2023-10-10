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

function generateMockHomeworkSubmissionFile(typ: string) {
  if (!["image", "video", "doc", "file"].includes(typ)) {
    console.error(new Error(`Invalid homework submission file type ${typ}`));
  }
  const urls = {
    image:
      "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    doc: "https://raw.githubusercontent.com/mxstbr/markdown-test-file/master/TEST.md",
    file: "https://file-examples.com/wp-content/storage/2017/10/file-example_PDF_500_kB.pdf",
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
    attachments: [
      {
        typ: "image",
        src: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      },
      {
        typ: "video",
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        typ: "image",
        src: "https://images6.alphacoders.com/133/1330235.png",
      },
    ],
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
