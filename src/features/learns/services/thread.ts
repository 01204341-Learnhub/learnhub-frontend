import { generateMockThread } from "../types/thread";

async function getThread(
  userId: string,
  classId: string,
  threadId: string,
  typ: "announcement" | "homework"
) {
  console.log(
    `Getting ${typ} thread ${threadId} in class ${classId} by user ${userId}`
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
    `Posting reply to thread ${threadId} in class ${classId} by user ${userId} with text ${text} at time ${dateTime.toLocaleString()}`
  );
  console.log("Reply posted");
}

async function postHomeworkSubmissionFile(
  userId: string,
  classId: string,
  threadId: string,
  dateTime: Date,
  name: string,
  src: string
) {
  console.log(
    `Posting homework submission file to homework thread ${threadId} in class ${classId} by user ${userId} with name ${name} and src ${src} at time ${dateTime.toLocaleString()}`
  );
  const homeworkSubmissionFileId = `homework-submission-file${Math.floor(
    Math.random() * 100
  )}`;
  console.log("Homework submission file posted");
  return homeworkSubmissionFileId;
}

async function deleteHomeworkSubmissionFile(
  userId: string,
  classId: string,
  threadId: string,
  homeworkSubmissionFileId: string
) {
  console.log(
    `Deleting homework file ${homeworkSubmissionFileId} from homework thread ${threadId} in class ${classId} by user ${userId}`
  );
  console.log("Homework file deleted");
}

export {
  getThread,
  postReply,
  postHomeworkSubmissionFile,
  deleteHomeworkSubmissionFile,
};
