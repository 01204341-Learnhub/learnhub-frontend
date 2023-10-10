import axios from "axios";
import { Chapter, Course, CourseInfo, Lesson } from "../types/course";
import { CourseQuiz } from "../types/courseQuiz";
import { ListTeacherCourseResponse } from "../types/responses";
import { createCourseQuiz } from "./courseQuiz";

const baseURL = "http://localhost:8000";
async function listTeacherCourse(teacherID: string): Promise<CourseInfo[]> {
  const url = `${baseURL}/users/teachers/${teacherID}/courses`;
  const res = await axios.get<ListTeacherCourseResponse>(url);
  const courses: CourseInfo[] = res.data.courses.map((course) => {
    return {
      courseID: course.course_id,
      thumbnailUrl: course.course_pic,
      name: course.name,
      rating: course.rating,
      studentCount: course.student_count,
    };
  });
  return courses;
}

async function createLesson(
  courseID: string,
  chapterID: string,
  lesson: Lesson
) {
  const url = `${baseURL}/programs/courses/${courseID}/chapters/${chapterID}/lessons`;
  let body: {
    name: string;
    src: string;
    lesson_type: string;
    lesson_length: number;
  };
  if (lesson.type === "video") {
    body = {
      name: lesson.name,
      src: lesson.videoUrl as string,
      lesson_type: "video",
      lesson_length: 999,
    };
  } else if (lesson.type === "quiz") {
    const quiz = JSON.parse(lesson.quiz as string) as CourseQuiz;
    const quizID = await createCourseQuiz(quiz);
    body = {
      name: lesson.name,
      src: quizID,
      lesson_type: "quiz",
      lesson_length: 999,
    };
  }
  const lessonID = (await axios.post<{ lesson_id: string }>(url, body)).data
    .lesson_id;
  return lessonID;
}

async function createChapter(courseID: string, chapter: Chapter) {
  const url = `${baseURL}/programs/courses/${courseID}/chapters`;
  const body = {
    name: chapter.name,
    description: chapter.description,
  };
  const chapterID = (await axios.post<{ chapter_id: string }>(url, body)).data
    .chapter_id;
  return chapterID;
}

async function createCourse(course: Course, teacherID: string) {
  // create course instance
  const url = `${baseURL}/programs/courses`;
  const body = {
    name: course.name,
    teacher_id: teacherID,
    course_pic: course.thumbnailUrl,
    description: course.description,
    course_objective: course.objectives,
    tag_ids: [course.categoryId],
    course_requirement: course.requirement,
    difficulty_level: course.level,
    price: course.price,
  };
  console.log(JSON.stringify(body, null, 2));
  const courseID = (await axios.post<{ course_id: string }>(url, body)).data
    .course_id;
  course.courseId = courseID;
  course.chapters.forEach(async (chapter) => {
    const chapterID = await createChapter(courseID, chapter);
    chapter.chapterId = chapterID;
    chapter.lessons.forEach(async (lesson) => {
      const lessonID = await createLesson(courseID, chapterID, lesson);
      lesson.lessonId = lessonID;
    });
  });
}

export { createCourse, listTeacherCourse as listTeachCourse };
