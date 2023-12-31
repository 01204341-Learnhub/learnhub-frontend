import { useEffect, useState } from "react";
import { Thread } from "../types/thread";
import { LearnhubUser } from "../../../types/user";
import {
  fetchThread,
  addThreadReply,
  submitThreadHomework,
  unsubmitThreadHomework,
} from "../services/thread";
import { getCustomFileTypeFromFile } from "../../../utils/functions";
import { uploadFile } from "../../../services/uploader/file";

function useThread(
  learnhubUser: LearnhubUser,
  classId: string,
  threadId: string,
  typ: "announcement" | "homework"
) {
  const [user] = useState<LearnhubUser>(learnhubUser);
  const [thread, setThread] = useState<Thread | undefined>(undefined);

  useEffect(
    () => {
      updateThread();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  ); // IMPORTANT: Empty dependency array in useEffect is needed to prevent infinite loop.

  const updateThread = () => {
    fetchThread(user.userID, classId, threadId, typ)
      .then((thread) => {
        setThread(thread);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update thread");
      });
  };

  const addReply = (text: string) => {
    addThreadReply(user.userID, classId, threadId, typ, text)
      .then(() => {
        updateThread();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add reply");
      });
    // FOR MOCKUP, COMMENT OUT ABOVE AND UNCOMMENT BELOW
    // setThread({
    //   ...thread,
    //   replies: [
    //     ...thread.replies,
    //     {
    //       user: user,
    //       dateTime: new Date(),
    //       text: text,
    //     },
    //   ],
    // });
  };

  const addHomeworkSubmissionFile = (file: File) => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot add homework file to non-homework thread")
      );
      return;
    }
    if (thread.homeworkStatus === "closed") {
      console.error(new Error("Cannot add homework file to closed homework"));
      return;
    }
    if (
      thread.homeworkSubmissionStatus === "submitted" ||
      thread.homeworkSubmissionStatus === "submitted-and-graded"
    ) {
      console.error(
        new Error(
          "Cannot add homework file to submitted homework thread. Unsubmit first"
        )
      );
      return;
    }
    uploadFile(file)
      .then((src) => {
        setThread({
          ...thread,
          homeworkSubmissionFiles: [
            ...thread.homeworkSubmissionFiles,
            {
              typ: getCustomFileTypeFromFile(file),
              src,
            },
          ],
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to upload file");
      });
  };

  const removeHomeworkSubmissionFile = (src: string) => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot remove homework file from non-homework thread")
      );
      return;
    }
    if (thread.homeworkStatus === "closed") {
      console.error(
        new Error("Cannot remove homework file from closed homework")
      );
      return;
    }
    if (
      thread.homeworkSubmissionStatus === "submitted" ||
      thread.homeworkSubmissionStatus === "submitted-and-graded"
    ) {
      console.error(
        new Error(
          "Cannot remove homework file from submitted homework thread. Unsubmit first"
        )
      );
      return;
    }
    if (!thread.homeworkSubmissionFiles.map((file) => file.src).includes(src)) {
      console.error(new Error("File not found"));
      alert("File not found");
      return;
    }
    setThread({
      ...thread,
      homeworkSubmissionFiles: thread.homeworkSubmissionFiles.filter(
        (file) => file.src !== src
      ),
    });
  };

  const submitHomework = () => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot submit homework from non-homework thread")
      );
      return;
    }
    if (thread.homeworkStatus === "closed") {
      console.error(new Error("Cannot submit homework to closed homework"));
      return;
    }
    if (
      thread.homeworkSubmissionStatus === "submitted" ||
      thread.homeworkSubmissionStatus === "submitted-and-graded"
    ) {
      console.error(new Error("Already submitted"));
      return;
    }
    submitThreadHomework(
      user.userID,
      thread.classId,
      thread.threadId,
      thread.homeworkSubmissionFiles
    )
      .then(() => {
        updateThread();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to submit homework");
      });
    // FOR MOCKUP, COMMENT OUT ABOVE AND UNCOMMENT BELOW
    // setThread({
    //   ...thread,
    //   homeworkSubmissionStatus: "submitted",
    //   homeworkLastSubmissionDateTime: new Date(),
    // });
  };

  const unsubmitHomework = () => {
    if (typ !== "homework") {
      console.error(
        new Error("Cannot unsubmit homework from non-homework thread")
      );
      return;
    }
    if (thread.homeworkStatus === "closed") {
      console.error(new Error("Cannot unsubmit homework from closed homework"));
      return;
    }
    if (thread.homeworkSubmissionStatus === "not-submitted") {
      console.error(new Error("Not submitted"));
      return;
    }
    unsubmitThreadHomework(user.userID, thread.classId, thread.threadId)
      .then(() => {
        updateThread();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to unsubmit homework");
      });
    // FOR MOCKUP, COMMENT OUT ABOVE AND UNCOMMENT BELOW
    // setThread({
    //   ...thread,
    //   homeworkSubmissionStatus: "not-submitted",
    //   homeworkGotScore: undefined,
    // });
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
