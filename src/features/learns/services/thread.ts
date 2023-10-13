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
    `Fetching thread ${threadId} of class ${classId} by user ${userId} with type ${typ}`
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
  text: string
): Promise<void> {
  // TODO: Implement this
  console.log(
    `Adding reply to thread ${threadId} in class ${classId} by user ${userId} with text ${text}}`
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
    `Submitting homework for thread ${threadId} in class ${classId} by user ${userId} with ${homeworkSubmissionFiles.length} files`
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
    `Unsubmitting homework for thread ${threadId} in class ${classId} by user ${userId}`
  );
  console.log("Homework unsubmitted");
}

export {
  fetchThread,
  addThreadReply,
  submitThreadHomework,
  unsubmitThreadHomework,
};
