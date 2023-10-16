import { useEffect, useState } from "react";
import { listClassStudents } from "../services/classes";
import { ClassStudent } from "../types/student";

function useClassStudents(classID: string) {
  const [students, setStudents] = useState<ClassStudent[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    async function fetchClassStudents(classID: string) {
      const fetchedStudents = await listClassStudents(classID);
      setStudents(fetchedStudents);
    }
    setIsFetching(true);
    fetchClassStudents(classID).then(() => setIsFetching(false));
  }, [classID]);
  return { students, isFetching };
}

export { useClassStudents };
