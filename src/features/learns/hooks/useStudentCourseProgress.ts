import { useEffect, useState } from "react";
import {
  getStudentCourseProgress,
  updateStudentCourseLessonProgress,
} from "../services/progress";
import {
  StudentCourseLessonProgress,
  StudentCourseProgress,
} from "../types/progress";

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
  async function updateLessonProgress(progress: StudentCourseLessonProgress) {
    await updateStudentCourseLessonProgress(studentID, courseID, progress);
    setProgress((prev) => {
      const idx = prev?.lessons.findIndex(
        (lesson) => lesson.lessonID === progress.lessonID
      );
      if (idx === undefined || idx === -1) return prev;
      prev.lessons[idx] = progress;
      return prev;
    });
  }
  useEffect(() => {
    setIsFetching(true);
    fetchStudentCourseProgress(studentID, courseID).then(() => {
      setIsFetching(false);
    });
  }, [studentID, courseID]);
  return { progress, isFetching, updateLessonProgress };
}

export { useStudentCourseProgress };
