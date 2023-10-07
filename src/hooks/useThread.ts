import { useEffect, useState } from "react";
import { Thread } from "../features/learns/types/thread";
import { LearnhubUser } from "../types/user";
import {
  deleteHomeworkSubmissionFile,
  getThread,
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
  return {
    thread,
    addReply,
    addHomeworkSubmissionFile,
    removeHomeworkSubmissionFile,
  };
}

export default useThread;
