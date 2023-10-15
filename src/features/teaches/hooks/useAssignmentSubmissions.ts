import { useEffect, useState } from "react";
import { listAssignmentSubmissions } from "../services/assignments";
import { ClassAssignmentSubmission } from "../types/classWork";

function useAssignmentSubmissions(classID: string, assignmentID: string) {
  const [submissions, setSubmissions] = useState<ClassAssignmentSubmission[]>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [reload, setReload] = useState<number>(0);
  const reloadSubmissions = () =>
    setReload((reload) => {
      setIsFetching(true);
      return reload + 1;
    });
  useEffect(() => {
    async function fetchAssignmentSubmissions() {
      const fetchedAssignmentSubmissions = await listAssignmentSubmissions(
        assignmentID,
        classID
      );
      setSubmissions(fetchedAssignmentSubmissions);
    }
    fetchAssignmentSubmissions().then(() => setIsFetching(false));
  }, [classID, assignmentID, reload]);
  return { submissions, isFetching, reloadSubmissions };
}

export { useAssignmentSubmissions };
