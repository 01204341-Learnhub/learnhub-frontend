import { useEffect, useState } from "react";
import { listClassAssignments } from "../services/classes";
import { ClassAssignment } from "../types/classWork";

function useClassAssignments(classID: string) {
  const [assignments, setAssignments] = useState<ClassAssignment[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    async function fetchClassAssignments(classID: string) {
      const fetchedAssignments = await listClassAssignments(classID);
      setAssignments(fetchedAssignments);
    }
    fetchClassAssignments(classID).then(() => setIsFetching(false));
  }, [classID]);
  return { assignments, isFetching };
}

export { useClassAssignments };
