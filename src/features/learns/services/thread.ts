import { LearnhubUser } from "../../../types/user";
import { Class, Thread } from "../types/thread";

class Mock {
  static teachers: LearnhubUser[] = [
    {
      userType: "teacher",
      userID: "teacher1",
      username: "teacher1",
      email: "teacher1@gmail.com",
      profilePicture: `https://robohash.org/teacher1`,
    },
    {
      userType: "teacher",
      userID: "teacher2",
      username: "teacher2",
      email: "teacher2@gmail.com",
      profilePicture: `https://robohash.org/teacher2`,
    },
  ];

  static students: LearnhubUser[] = [
    {
      userType: "student",
      userID: "student1",
      username: "student1",
      email: "student1@gmail.com",
      profilePicture: `https://robohash.org/student1`,
    },
    {
      userType: "student",
      userID: "student2",
      username: "student2",
      email: "student2@gmail.com",
      profilePicture: `https://robohash.org/student2`,
    },
    {
      userType: "student",
      userID: "student3",
      username: "student3",
      email: "student3@gmail.com",
      profilePicture: `https://robohash.org/student3`,
    },
  ];

  static classes: Class[] = [
    {
      classId: "class1",
      name: "Class 1",
    },
    {
      classId: "class2",
      name: "Class 2",
    },
  ];

  static initialThread: Thread = {
    threadId: "thread1",
    name: "Homework 1",
    type: "homework",
    teacher: Mock.teachers[0],
    text: "This is the first homework",
    attachments: [
      {
        type: "image",
        src: "https://picsum.photos/400/400",
      },
      {
        type: "video",
        src: "https://www.youtube.com/watch?v=6n3pFFPSlW4",
      },
    ],
    lastEdited: new Date("2023-09-15 13:00:00"),
    replies: [],
    homeworkDueDate: new Date("2023-10-15"),
    homeworkFullPoints: 100,
    homeworkTopicName: "Topic 1",
    homeworkFiles: [
      {
        homeworkFileId: "file1",
        name: "Homework 1",
        src: "https://picsum.photos/1920/1080",
      },
      {
        homeworkFileId: "file2",
        name: "Homework 2",
        src: "https://picsum.photos/1920/1080",
      },
    ],
  };

  classId: string;
  threadId: string;
  user: LearnhubUser;
  mockThread: Thread;

  constructor(
    classId: string,
    threadId: string,
    user: LearnhubUser,
    withInitialReplies: boolean
  ) {
    this.classId = classId;
    this.threadId = threadId;
    this.user = user;
    this.mockThread = Mock.initialThread;
    if (withInitialReplies) {
      this.mockThread.replies = [
        {
          user: Mock.students[0],
          date: new Date("2023-09-15 13:00:00"),
          text: "This is a reply",
        },
        {
          user: Mock.students[1],
          date: new Date("2023-09-16 13:00:00"),
          text: "This is another reply",
        },
        {
          user: Mock.students[2],
          date: new Date("2023-09-17 13:00:00"),
          text: "This is yet another reply",
        },
      ];
    }
  }

  async fetchClass(): Promise<Class> {
    console.log(`Fetching class ${this.classId}`);
    const response = await new Promise<Class>((resolve, reject) => {
      setTimeout(() => {
        const requestedClass = Mock.classes.find(
          (c) => c.classId === this.classId
        );
        if (requestedClass) {
          resolve(requestedClass);
        } else {
          reject(new Error(`Class ${this.classId} not found`));
        }
      }, 500);
    });
    return response;
  }

  async fetchThread(): Promise<Thread> {
    console.log(`Fetching thread ${this.threadId} of class ${this.classId}`);
    const response = await new Promise<Thread>((resolve) => {
      setTimeout(() => {
        resolve(this.mockThread);
      }, 500);
    });
    return response;
  }

  async addReply(text: string): Promise<string> {
    const now = new Date();
    console.log(
      `Adding reply from user ${this.user.username} to thread ${this.threadId} of class ${this.classId}`
    );
    const response = await new Promise<string>((resolve) => {
      setTimeout(() => {
        const reply = {
          user: this.user,
          date: now,
          text: text,
        };
        this.mockThread.replies.push(reply);
        resolve("Reply added");
      }, 500);
    });
    return response;
  }

  async addHomeworkFile(
    file: File,
    onProgress: (progress: number) => void
  ): Promise<string> {
    console.log(
      `Adding file ${file.name} to thread ${this.threadId} of class ${this.classId}`
    );
    onProgress(0);
    const id = Math.random().toString(36).substring(2);
    const response = new Promise<string>((resolve) => {
      setTimeout(() => {
        onProgress(100);
        this.mockThread.homeworkFiles.push({
          homeworkFileId: id,
          name: file.name,
          src: "https://picsum.photos/400/400",
        });
        console.log(`File ${file.name} added`);
        resolve(id);
      }, 500);
    });
    return response;
  }

  async deleteHomeworkFile(homeworkFileId: string): Promise<string> {
    console.log(
      `Deleting file ${homeworkFileId} from thread ${this.threadId} of class ${this.classId}`
    );
    const response = await new Promise<string>((resolve) => {
      setTimeout(() => {
        const index = this.mockThread.homeworkFiles.findIndex(
          (f) => f.homeworkFileId === homeworkFileId
        );
        if (index !== -1) {
          this.mockThread.homeworkFiles.splice(index, 1);
          console.log(`File ${homeworkFileId} deleted`);
          resolve("File deleted");
        } else {
          console.log(`File ${homeworkFileId} not found`);
          resolve("File not found");
        }
      }, 500);
    });
    return response;
  }
}

export default Mock;
