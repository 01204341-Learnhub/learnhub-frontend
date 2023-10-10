import { useEffect, useState } from "react";
import { getStudentCourseQuizReport } from "../services/courseQuiz";
import { CourseQuizReport } from "../types/quiz";

function useStudentCourseQuizReport(quizID: string, studentID: string) {
  const [report, setReport] = useState<CourseQuizReport>(null);
  const [isFetching, setIsFetching] = useState(true);
  async function fetchReport(quizID: string, studentID: string) {
    const fetchedReport = await getStudentCourseQuizReport(quizID, studentID);
    console.log(fetchedReport);
    setReport(fetchedReport);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchReport(quizID, studentID).then(() => {
      setIsFetching(false);
    });
  }, [quizID, studentID]);
  return { report, isFetching };
}

export { useStudentCourseQuizReport };
