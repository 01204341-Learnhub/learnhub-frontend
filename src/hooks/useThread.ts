import { useEffect, useState } from "react";
import { Thread } from "../features/learns/types/thread";
import { LearnhubUser } from "../types/user";
import {
  deleteHomeworkFile,
  getThread,
  postHomeworkFile,
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
  }, []);
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
  const addHomeworkFile = (name: string, src: string) => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot add homework file to non-homework thread")
      );
    }
    const dateTime = new Date();
    postHomeworkFile(
      user.userID,
      thread.cls.classId,
      thread.threadId,
      dateTime,
      name,
      src
    )
      .then((homeworkFileId) => {
        setThread({
          ...thread,
          homeworkFiles: [
            ...thread.homeworkFiles,
            {
              homeworkFileId: homeworkFileId,
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
  const removeHomeworkFile = (homeworkFileId: string) => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot remove homework file from non-homework thread")
      );
    }
    deleteHomeworkFile(
      user.userID,
      thread.cls.classId,
      thread.threadId,
      homeworkFileId
    )
      .then(() => {
        setThread({
          ...thread,
          homeworkFiles: thread.homeworkFiles.filter(
            (homeworkFile) => homeworkFile.homeworkFileId !== homeworkFileId
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
    addHomeworkFile,
    removeHomeworkFile,
  };
}

export default useThread;
