import axios from "axios";
import {
  StudentCourseLessonProgress,
  StudentCourseProgress,
} from "../types/progress";
import { GetStudentCourseProgressResponse } from "../types/response";

const baseURL = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";

async function getStudentCourseProgress(studentID: string, courseID: string) {
  const url = `${baseURL}/users/students/${studentID}/course_progress/${courseID}`;
  const res = await axios.get<GetStudentCourseProgressResponse>(url);
  const progress: StudentCourseProgress = {
    progress: res.data.progress,
    lessons: res.data.lessons.map((lesson) => {
      return {
        lessonID: lesson.lesson_id,
        chapterID: lesson.chapter_id,
        finished: lesson.finished,
        lessonCompleted: lesson.lesson_completed,
      };
    }),
  };
  return progress;
}

async function updateStudentCourseLessonProgress(
  studentID: string,
  courseID: string,
  progress: StudentCourseLessonProgress
) {
  const url = `${baseURL}/users/students/${studentID}/course_progress/${courseID}`;
  const body = {
    lesson_id: progress.lessonID,
    chapter_id: progress.chapterID,
    finished: progress.finished,
    lesson_completed: progress.lessonCompleted,
  };
  await axios.patch(url, body);
}

export { getStudentCourseProgress, updateStudentCourseLessonProgress };
