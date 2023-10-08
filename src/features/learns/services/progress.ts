import axios from "axios";
import { StudentCourseProgress } from "../types/progress";
import { GetStudentCourseProgressResponse } from "../types/response";

const baseURL = "http://localhost:8000";

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
        lessonsCompleted: lesson.lessons_completed,
      };
    }),
  };
  return progress;
}

export { getStudentCourseProgress };
