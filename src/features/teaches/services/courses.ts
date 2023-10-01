import axios from "axios";
import { Chapter, Course, CourseInfo, Lesson } from "../types/course";

const baseURL = "http://localhost:8000";
async function listTeacherCourse(teacherID: string) {
  const mock: CourseInfo[] = [
    {
      courseID: "1",
      courseName: "Course 1",
      courseRating: 4,
      courseThumbnailUrl: "https://picsum.photos/200",
      studentCount: 100,
    },
    {
      courseID: "2",
      courseName: "Course 2",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/300",
      studentCount: 200,
    },
    {
      courseID: "3",
      courseName: "Course 3",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/100",
      studentCount: 200,
    },
    {
      courseID: "4",
      courseName: "Course 4",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/600",
      studentCount: 200,
    },
    {
      courseID: "5",
      courseName: "Course 5",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/500",
      studentCount: 200,
    },
    {
      courseID: "6",
      courseName: "Course 6",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/700",
      studentCount: 200,
    },
  ];
  return mock;
}

async function createLesson(
  courseID: string,
  chapterID: string,
  lesson: Lesson
) {
  const url = `${baseURL}/programs/courses/${courseID}/chapters/${chapterID}/lessons`;
  const body = {
    name: lesson.name,
    src: lesson.videoUrl,
    lesson_length: 378,
  };
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
