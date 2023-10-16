import axios from "axios";
import { Chapter, Course, CourseInfo, Lesson } from "../types/course";
import { CourseQuiz } from "../types/courseQuiz";
import { ListTeacherCourseResponse } from "../types/responses";
import { createCourseQuiz } from "./courseQuiz";

const baseURL = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";
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
      lesson_length: lesson.length,
    };
  } else if (lesson.type === "quiz") {
    const quiz = JSON.parse(lesson.quiz as string) as CourseQuiz;
    const quizID = await createCourseQuiz(quiz);
    body = {
      name: lesson.name,
      src: quizID,
      lesson_type: "quiz",
      lesson_length: lesson.length,
    };
  } else if (lesson.type == "files") {
    body = {
      name: lesson.name,
      src: lesson.fileUrl,
      lesson_length: 60 * 5,
      lesson_type: "file",
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
    tag_ids: [course.tag.tagID],
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

async function listCourseChapterLessons(
  courseID: string,
  chapterID: string
): Promise<Lesson[]> {
  const getAllLessonIDsURL = `${baseURL}/programs/courses/${courseID}/chapters/${chapterID}/lessons`;
  const lessonIDs = (
    await axios.get<{ lessons: { lesson_id: string }[] }>(getAllLessonIDsURL)
  ).data.lessons;
  type GetLessonResponse = {
    lesson_id: string;
    lesson_number: number;
    name: string;
    lesson_type: string;
    lesson_length: number;
    src: string;
  };
  const lessons: Lesson[] = [];
  for (let i = 0; i < lessonIDs.length; i++) {
    const getLessonURL = `${baseURL}/programs/courses/${courseID}/chapters/${chapterID}/lessons/${lessonIDs[i].lesson_id}`;
    const res = await axios.get<GetLessonResponse>(getLessonURL);
    const lesson: Lesson = {
      lessonId: res.data.lesson_id,
      name: res.data.name,
      number: res.data.lesson_number,
      type: res.data.lesson_type,
      length: res.data.lesson_length,
    };
    if (lesson.type === "video") {
      lesson.videoUrl = res.data.src;
    } else if (lesson.type === "files") {
      lesson.fileUrl = res.data.src;
    } else if (lesson.type === "quiz") {
      lesson.quiz = res.data.src;
    }
    lessons.push(lesson);
  }
  return lessons;
}

async function listCourseChapters(courseID: string): Promise<Chapter[]> {
  const getAllChapterIDsURL = `${baseURL}/programs/courses/${courseID}/chapters`;
  const chapterIDs = (
    await axios.get<{ chapters: { chapter_id: string }[] }>(getAllChapterIDsURL)
  ).data.chapters;
  type GetChapterResponse = {
    chapter_id: string;
    course_id: string;
    chapter_num: number;
    name: string;
    description: string;
  };
  const chapters: Chapter[] = [];
  for (let i = 0; i < chapterIDs.length; i++) {
    const getChapterURL = `${baseURL}/programs/courses/${courseID}/chapters/${chapterIDs[i].chapter_id}`;
    const res = await axios.get<GetChapterResponse>(getChapterURL);
    const chapter: Chapter = {
      chapterId: res.data.chapter_id,
      name: res.data.name,
      number: res.data.chapter_num,
      description: res.data.description,
      lessons: [],
    };
    const lessons = await listCourseChapterLessons(courseID, chapter.chapterId);
    chapter.lessons = lessons;
    chapters.push(chapter);
  }
  return chapters;
}

async function getCourse(courseID: string): Promise<Course> {
  type GetCourseResponse = {
    course_id: string;
    name: string;
    course_pic: string;
    tags: {
      tag_id: string;
      name: string;
    }[];
    difficulty_level: string;
    teacher: {
      teacher_name: string;
    };
    description: string;
    course_objective: string[];
    price: number;
    rating: number;
    student_count: number;
    course_requirement: string;
  };
  const url = `${baseURL}/programs/courses/${courseID}`;
  const res = await axios.get<GetCourseResponse>(url);
  const course: Course = {
    courseId: res.data.course_id,
    name: res.data.name,
    thumbnailUrl: res.data.course_pic,
    tag: {
      tagID: res.data.tags[0].tag_id,
      name: res.data.tags[0].name,
    },
    level: res.data.difficulty_level,
    instructorName: res.data.teacher.teacher_name,
    description: res.data.description,
    objectives: res.data.course_objective,
    requirement: res.data.course_requirement,
    price: res.data.price,
    rating: res.data.rating,
    studentCount: res.data.student_count,
    chapters: [],
  };
  const chapters = await listCourseChapters(courseID);
  course.chapters = chapters;
  return course;
}

async function updateCourse(course: Course) {
  const currentCourse = await getCourse(course.courseId);
  // update course info
  console.warn(`hardcode tag, objective`);
  const courseInfoBody = {
    name: course.name,
    course_pic: course.thumbnailUrl,
    price: course.price,
    description: course.description,
    // course_objective: course.objectives,
    course_requirement: course.requirement,
    difficulty_level: course.level,
    // tag: {
    //   op: course.tag.name,
    //   tag_id: course.tag.tagID,
    // },
  };
  const updateCourseInfoURL = `${baseURL}/programs/courses/${course.courseId}`;
  await axios.patch(updateCourseInfoURL, courseInfoBody);
  course.chapters.forEach(async (chapter, chapterIndex) => {
    if (
      !currentCourse.chapters.find((c) => c.chapterId === chapter.chapterId)
    ) {
      console.log("create chapter");
      const chapterID = await createChapter(course.courseId, chapter);
      course.chapters[chapterIndex].chapterId = chapterID;
      chapter.lessons.forEach(async (lesson) => {
        const lessonID = await createLesson(course.courseId, chapterID, lesson);
        console.log("create lesson in chapter");

        const lessonIndex = course.chapters[chapterIndex].lessons.findIndex(
          (l) => l.lessonId === lesson.lessonId
        );
        course.chapters[chapterIndex].lessons[lessonIndex].lessonId = lessonID;
      });
      return;
    }
    const chapterInfoBody = {
      name: chapter.name,
      description: chapter.description,
    };
    const updateChapterInfoURL = `${baseURL}/programs/courses/${course.courseId}/chapters/${chapter.chapterId}`;
    await axios.patch(updateChapterInfoURL, chapterInfoBody);
    chapter.lessons.forEach(async (lesson, lessonIndex) => {
      if (
        !currentCourse.chapters[chapterIndex].lessons.find(
          (l) => l.lessonId === lesson.lessonId
        )
      ) {
        console.log("create lesson");
        const lessonID = await createLesson(
          course.courseId,
          chapter.chapterId,
          lesson
        );
        course.chapters[chapterIndex].lessons[lessonIndex].lessonId = lessonID;
        return;
      }
      const lessonInfoBody = {
        name: lesson.name,
        lesson_length: lesson.length,
      };
      if (lesson.type == "video") {
        lessonInfoBody["src"] = lesson.videoUrl;
      } else if (lesson.type == "files") {
        lessonInfoBody["src"] = lesson.fileUrl;
      } else if (lesson.type == "quiz") {
        lessonInfoBody["src"] = lesson.quiz;
      } else {
        throw new Error("unknown lesson type");
      }
      const updateLessonInfoURL = `${baseURL}/programs/courses/${course.courseId}/chapters/${chapter.chapterId}/lessons/${lesson.lessonId}`;
      await axios.patch(updateLessonInfoURL, lessonInfoBody);
    });
  });
}

export {
  createCourse,
  getCourse,
  listTeacherCourse as listTeachCourse,
  updateCourse,
};
