import { useEffect, useState } from "react";
import { getCourseQuiz } from "../services/courseQuiz";
import { CourseQuiz } from "../types/quiz";

function useCourseQuiz(quizID: string) {
  const [quiz, setQuiz] = useState<CourseQuiz>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  async function fetchCourseQuiz(quizID: string) {
    const fetchedQuiz = await getCourseQuiz(quizID);
    setQuiz(fetchedQuiz);
  }
  useEffect(() => {
    setIsFetching(true);
    fetchCourseQuiz(quizID).then(() => {
      setIsFetching(false);
    });
  }, [quizID]);

  return { quiz, isFetching };
}

export { useCourseQuiz };
