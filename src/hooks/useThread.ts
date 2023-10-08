import { useEffect, useState } from "react";
import { Thread } from "../features/learns/types/thread";
import { LearnhubUser } from "../types/user";
import {
  deleteHomeworkSubmissionFile,
  getThread,
  patchSubmitHomework,
  patchUnsubmitHomework,
  postHomeworkSubmissionFile,
  postReply,
} from "../features/learns/services/thread";

function useThread(
  learnhubUser: LearnhubUser,
  classId: string,
  threadId: string,
  typ: "announcement" | "homework"
) {
  const [user] = useState<LearnhubUser>(learnhubUser);
  const [thread, setThread] = useState<Thread | undefined>(undefined);
  useEffect(() => {
    getThread(user.userID, classId, threadId, typ)
      .then((thread) => {
        setThread(thread);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch thread");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // IMPORTANT: Empty dependency array in useEffect is needed to prevent infinite loop.
  const addReply = (text: string) => {
    const dateTime = new Date();
    postReply(user.userID, thread.cls.classId, thread.threadId, dateTime, text)
      .then(() => {
        setThread({
          ...thread,
          replies: [
            ...thread.replies,
            {
              user,
              dateTime: dateTime,
              text,
            },
          ],
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add reply");
      });
  };
  const addHomeworkSubmissionFile = (name: string, src: string) => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot add homework file to non-homework thread")
      );
    }
    if (thread.homeworkSubmitted) {
      console.error(
        new Error("Cannot add homework file to submitted homework thread")
      );
    }
    const dateTime = new Date();
    postHomeworkSubmissionFile(
      user.userID,
      thread.cls.classId,
      thread.threadId,
      dateTime,
      name,
      src
    )
      .then((homeworkSubmissionFileId) => {
        setThread({
          ...thread,
          homeworkSubmissionFiles: [
            ...thread.homeworkSubmissionFiles,
            {
              homeworkSubmissionFileId: homeworkSubmissionFileId,
              name,
              src,
            },
          ],
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add homework file");
      });
  };
  const removeHomeworkSubmissionFile = (homeworkSubmissionFileId: string) => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot remove homework file from non-homework thread")
      );
    }
    if (thread.homeworkSubmitted) {
      console.error(
        new Error("Cannot remove homework file from submitted homework thread")
      );
    }
    deleteHomeworkSubmissionFile(
      user.userID,
      thread.cls.classId,
      thread.threadId,
      homeworkSubmissionFileId
    )
      .then(() => {
        setThread({
          ...thread,
          homeworkSubmissionFiles: thread.homeworkSubmissionFiles.filter(
            (homeworkFile) =>
              homeworkFile.homeworkSubmissionFileId !== homeworkSubmissionFileId
          ),
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to remove homework file");
      });
  };
  const submitHomework = () => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot submit homework from non-homework thread")
      );
    }
    if (thread.homeworkSubmitted) {
      console.error(new Error("Already submitted"));
    }
    const dateTime = new Date();
    patchSubmitHomework(
      user.userID,
      thread.cls.classId,
      thread.threadId,
      dateTime
    )
      .then(() => {
        setThread({
          ...thread,
          homeworkSubmitted: true,
          homeworkLastSubmissionDateTime: dateTime,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit homework");
      });
  };
  const unsubmitHomework = () => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot unsubmit homework from non-homework thread")
      );
    }
    if (!thread.homeworkSubmitted) {
      console.error(new Error("Not yet submitted"));
    }
    patchUnsubmitHomework(user.userID, thread.cls.classId, thread.threadId)
      .then(() => {
        setThread({
          ...thread,
          homeworkSubmitted: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to unsubmit homework");
      });
  };
  return {
    thread,
    addReply,
    addHomeworkSubmissionFile,
    removeHomeworkSubmissionFile,
    submitHomework,
    unsubmitHomework,
  };
}

export default useThread;
