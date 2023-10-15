import { useEffect, useState } from "react";
import {
  createClassAssignment,
  listClassAssignments,
} from "../services/classes";
import { ClassAssignment } from "../types/classWork";

function useClassAssignments(classID: string) {
  const [assignments, setAssignments] = useState<ClassAssignment[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const addAssignment = async (assignment: ClassAssignment) => {
    setIsFetching(true);
    const newID = await createClassAssignment(classID, assignment);
    assignment.assignmentID = newID;
    setAssignments((assignments) => [...assignments, assignment]);
    setIsFetching(false);
  };
  useEffect(() => {
    async function fetchClassAssignments(classID: string) {
      const fetchedAssignments = await listClassAssignments(classID);
      setAssignments(fetchedAssignments);
    }
    fetchClassAssignments(classID).then(() => setIsFetching(false));
  }, [classID]);
  return { assignments, isFetching, addAssignment };
}

export { useClassAssignments };
