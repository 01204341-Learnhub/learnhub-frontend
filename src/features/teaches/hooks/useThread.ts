import { useEffect, useState } from "react";
import { LearnhubUser } from "../../../types/user";
import { Thread } from "../types/thread";
import { addThreadReply, fetchThread } from "../services/thread";

function useThread(
  learnhubUser: LearnhubUser,
  classId: string,
  threadId: string
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
    fetchThread(classId, threadId)
      .then((thread) => {
        setThread(thread);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update thread");
      });
  };

  const addReply = (text: string) => {
    addThreadReply(user.userID, classId, threadId, text)
      .then(() => {
        updateThread();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add reply");
      });
  };

  return {
    thread,
    addReply,
  };
}

export default useThread;
