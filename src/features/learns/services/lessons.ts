import axios from "axios";
import { BASE_URL } from "../../../config";
import { CourseLesson } from "../types/lessons";
import {
  GetCourseLessonResponse,
  ListCourseLessonsResponse,
} from "../types/response";

async function getCourseLesson(
  courseID: string,
  chapterID: string,
  lessonID: string
) {
  const url = `${BASE_URL}/programs/courses/${courseID}/chapters/${chapterID}/lessons/${lessonID}`;
  const res = await axios.get<GetCourseLessonResponse>(url);
  const courseLessonData = res.data;
  const courseLesson: CourseLesson = {
    lessonID: courseLessonData.lesson_id,
    chapterID: chapterID,
    courseID: courseID,
    lessonNumber: courseLessonData.lesson_num,
    name: courseLessonData.name,
    lessonType: courseLessonData.lesson_type,
    lessonLength: courseLessonData.lesson_length,
    src: courseLessonData.src,
  };
  return courseLesson;
}

async function listCourseLessons(courseID: string, chapterID: string) {
  const url = `${BASE_URL}/programs/courses/${courseID}/chapters/${chapterID}/lessons`;
  const res = await axios.get<ListCourseLessonsResponse>(url);
  const courseLessons: CourseLesson[] = [];
  for (let i = 0; i < res.data.lessons.length; i++) {
    const lesson = await getCourseLesson(
      courseID,
      chapterID,
      res.data.lessons[i].lesson_id
    );
    courseLessons.push(lesson);
  }
  return courseLessons;
}

export { getCourseLesson, listCourseLessons };
