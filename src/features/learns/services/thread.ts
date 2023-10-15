import {
  HomeworkSubmissionFile,
  Thread,
  generateMockThread,
} from "../types/thread";

async function fetchThread(
  userId: string,
  classId: string,
  threadId: string,
  typ: "announcement" | "homework"
): Promise<Thread> {
  console.log(
    `Fetching ${typ} thread ${threadId} of class ${classId} with user ${userId}`
  );
  // Call different API endpoints depending on typ
  // then populate and return a Thread object accordingly.
  // TODO: Implement this
  console.log("Thread fetched");
  // TODO: Switch to real data
  return generateMockThread(classId, threadId, typ);
}

async function addThreadReply(
  userId: string,
  classId: string,
  threadId: string,
  typ: "announcement" | "homework",
  text: string
): Promise<void> {
  // TODO: Implement this
  console.log(
    `Adding reply to ${typ} thread ${threadId} of class ${classId} with text ${text} from user ${userId} `
  );
  console.log("Reply added");
}

async function submitThreadHomework(
  userId: string,
  classId: string,
  threadId: string,
  homeworkSubmissionFiles: HomeworkSubmissionFile[]
): Promise<void> {
  // TODO: Implement this
  console.log(
    `Submitting homework to homework thread ${threadId} of class ${classId} with ${homeworkSubmissionFiles.length} files from user ${userId} `
  );
  console.log("Homework submitted");
}

async function unsubmitThreadHomework(
  userId: string,
  classId: string,
  threadId: string
): Promise<void> {
  // TODO: Implement this
  console.log(
    `Unsubmitting homework from homework thread ${threadId} of class ${classId} from user ${userId}`
  );
  console.log("Homework unsubmitted");
}

export {
  fetchThread,
  addThreadReply,
  submitThreadHomework,
  unsubmitThreadHomework,
};
