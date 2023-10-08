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
  homeworkLastSubmissionDateTime?: Date; // for homework threads
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

function generateMockHomeworkSubmissionFile(
  homeworkSubmissionFileId: string,
  typ: string
) {
  const urls = {
    zip: "https://file-examples.com/wp-content/storage/2017/02/zip_2MB.zip",
    txt: "https://filesamples.com/samples/document/txt/sample3.txt",
    pdf: "https://file-examples.com/wp-content/storage/2017/10/file-example_PDF_500_kB.pdf",
    docx: "https://file-examples.com/wp-content/storage/2017/02/file-sample_500kB.docx",
    ppt: "https://file-examples.com/wp-content/storage/2017/08/file_example_PPT_500kB.ppt",
    xlsx: "https://file-examples.com/wp-content/storage/2017/02/file_example_XLSX_100.xlsx",
    jpg: "https://file-examples.com/wp-content/storage/2017/10/file_example_JPG_1MB.jpg",
    png: "https://file-examples.com/wp-content/storage/2017/10/file_example_PNG_1MB.png",
    gif: "https://file-examples.com/wp-content/storage/2017/10/file_example_GIF_1MB.gif",
    tiff: "https://file-examples.com/wp-content/storage/2017/10/file_example_TIFF_1MB.tiff",
    ico: "https://file-examples.com/wp-content/storage/2017/10/file_example_favicon.ico",
    svg: "https://file-examples.com/wp-content/storage/2020/03/file_example_SVG_30kB.svg",
    webp: "https://file-examples.com/wp-content/storage/2020/03/file_example_WEBP_500kB.webp",
    avi: "https://file-examples.com/wp-content/storage/2018/04/file_example_AVI_1920_2_3MG.avi",
    mov: "https://file-examples.com/wp-content/storage/2018/04/file_example_MOV_1920_2_2MB.mov",
    mp4: "https://file-examples.com/wp-content/storage/2017/04/file_example_MP4_1280_10MG.mp4",
    wmv: "https://file-examples.com/wp-content/storage/2018/04/file_example_WMV_1920_9_3MB.wmv",
    webm: "https://file-examples.com/wp-content/storage/2020/03/file_example_WEBM_1920_3_7MB.webm",
    mp3: "https://file-examples.com/wp-content/storage/2017/11/file_example_MP3_5MG.mp3",
    wav: "https://file-examples.com/wp-content/storage/2017/11/file_example_WAV_10MG.wav",
  };
  return {
    homeworkSubmissionFileId: homeworkSubmissionFileId,
    name: `File ${homeworkSubmissionFileId}`,
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
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium eros nisi, vitae ultrices augue malesuada vel. Mauris quis pellentesque tortor. In tempus cursus augue, in tincidunt leo.",
    attachments: [],
    lastEdit: new Date(),
    replies: [
      {
        user: generateMockUser("student", "student1"),
        dateTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium eros nisi, vitae ultrices augue malesuada vel.",
      },
      {
        user: generateMockUser("student", "student2"),
        dateTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium eros nisi, vitae ultrices augue malesuada vel.",
      },
      {
        user: teacher,
        dateTime: new Date(),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium eros nisi, vitae ultrices augue malesuada vel.",
      },
    ],
    homeworkTopicName: `Topic ${threadId.length % 5}`,
    homeworkDueDateTime:
      typ === "homework"
        ? new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
        : undefined,
    homeworkFullPoints: typ === "homework" ? 100 : undefined,
    homeworkSubmitted: typ === "homework" ? false : undefined,
    homeworkLastSubmissionDateTime: typ === "homework" ? undefined : undefined,
    homeworkSubmissionFiles:
      typ === "homework"
        ? ["zip", "txt", "pdf", "docx", "ppt", "xlsx", "jpg", "mp4", "mp3"].map(
            (typ, i) => generateMockHomeworkSubmissionFile(`file${i}`, typ)
          )
        : undefined,
    homeworkSubmissionPoints: typ === "homework" ? undefined : undefined,
  };
}

export type { Thread, Class, Attachment, Reply, HomeworkSubmissionFile };

export { generateMockUser, generateMockThread };
