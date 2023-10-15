import { useEffect, useState } from "react";
import { listClassThreads } from "../services/classes";
import { createThread } from "../services/thread";
import { Thread } from "../types/thread";

function useClassThreads(classId: string) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [reload, setReload] = useState<number>(0);
  async function postThread(
    text: string,
    attachments: { attachmentType: string; src: string }[]
  ) {
    await createThread(classId, text, attachments);
    setReload((reload) => reload + 1);
  }
  useEffect(() => {
    setIsFetching(true);
    listClassThreads(classId)
      .then((threads) => {
        setThreads(threads);
        setIsFetching(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch threads");
      });
  }, [classId, reload]);
  return { threads, isFetching, postThread };
}

export default useClassThreads;
