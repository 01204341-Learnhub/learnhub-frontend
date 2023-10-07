import { generateMockThread } from "../types/thread";

async function getThread(
  userId: string,
  classId: string,
  threadId: string,
  typ: "announcement" | "homework"
) {
  console.log(
    `Fetching ${typ} thread ${threadId} in class ${classId} by user ${userId}`
  );
  // Call different API endpoints depending on typ
  // then populate and return a Thread object accordingly.
  console.log("Thread fetched");
  return generateMockThread(classId, threadId, typ);
}

async function postReply(
  userId: string,
  classId: string,
  threadId: string,
  dateTime: Date,
  text: string
) {
  console.log(
    `Adding reply to thread ${threadId} in class ${classId} by user ${userId} with text ${text} at time ${dateTime.toLocaleString()}`
  );
  console.log("Reply added");
}

async function postHomeworkFile(
  userId: string,
  classId: string,
  threadId: string,
  dateTime: Date,
  name: string,
  src: string
) {
  console.log(
    `Adding homework file to homework thread ${threadId} in class ${classId} by user ${userId} with name ${name} and src ${src} at time ${dateTime.toLocaleString()}`
  );
  const homeworkFileId = `homework-file${Math.floor(Math.random() * 100)}`;
  console.log("Homework file added");
  return homeworkFileId;
}

async function deleteHomeworkFile(
  userId: string,
  classId: string,
  threadId: string,
  homeworkFileId: string
) {
  console.log(
    `Deleting homework file ${homeworkFileId} from homework thread ${threadId} in class ${classId} by user ${userId}`
  );
  console.log("Homework file deleted");
}

export { getThread, postReply, postHomeworkFile, deleteHomeworkFile };
