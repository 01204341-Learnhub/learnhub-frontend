import { useEffect, useState } from "react";
import { listClassThreads } from "../services/classes";
import { Thread } from "../types/thread";

function useClassThreads(classId: string) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // IMPORTANT: Empty dependency array in useEffect is needed to prevent infinite loop.
  return { threads, isFetching };
}

export default useClassThreads;
