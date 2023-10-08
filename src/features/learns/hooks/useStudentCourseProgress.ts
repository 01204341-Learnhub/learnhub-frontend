import { useEffect, useState } from "react";
import { getStudentCourseProgress } from "../services/progress";
import { StudentCourseProgress } from "../types/progress";

function useStudentCourseProgress(studentID: string, courseID: string) {
  const [progress, setProgress] = useState<StudentCourseProgress>();
  const [isFetching, setIsFetching] = useState(false);
  async function fetchStudentCourseProgress(
    studentID: string,
    courseID: string
  ) {
    const fetchedProgress = await getStudentCourseProgress(studentID, courseID);
    setProgress(fetchedProgress);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchStudentCourseProgress(studentID, courseID).then(() => {
      setIsFetching(false);
    });
  }, [studentID, courseID]);
  return { progress, isFetching };
}

export { useStudentCourseProgress };
