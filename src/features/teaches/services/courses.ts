import axios from "axios";
import { BASE_URL } from "../../../config";
import { Chapter, Course, CourseInfo, Lesson } from "../types/course";
import { CourseQuiz } from "../types/courseQuiz";
import { ListTeacherCourseResponse } from "../types/responses";
import { createCourseQuiz } from "./courseQuiz";

const DELAY = 120;
async function listTeacherCourse(teacherID: string): Promise<CourseInfo[]> {
  const url = `${BASE_URL}/users/teachers/${teacherID}/courses`;
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
  const url = `${BASE_URL}/programs/courses/${courseID}/chapters/${chapterID}/lessons`;
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
      lesson_length: Math.floor(lesson.length),
    };
  } else if (lesson.type === "quiz") {
    const quiz = JSON.parse(lesson.quiz as string) as CourseQuiz;
    const quizID = await createCourseQuiz(quiz);
    body = {
      name: lesson.name,
      src: quizID,
      lesson_type: "quiz",
      lesson_length: Math.floor(lesson.length),
    };
  } else if (lesson.type == "files") {
    body = {
      name: lesson.name,
      src: lesson.fileUrl,
      lesson_length: 60 * 5, // HARDCODE
      lesson_type: "file",
    };
  }
  const lessonID = (await axios.post<{ lesson_id: string }>(url, body)).data
    .lesson_id;
  return lessonID;
}

async function createChapter(courseID: string, chapter: Chapter) {
  const url = `${BASE_URL}/programs/courses/${courseID}/chapters`;
  const body = {
    name: chapter.name,
    description: chapter.description,
  };
  const chapterID = (await axios.post<{ chapter_id: string }>(url, body)).data
    .chapter_id;
  return chapterID;
}

async function createCourse(course: Course, teacherID: string) {
  // sort chapters by chapter number
  course.chapters.sort((a, b) => a.number - b.number);
  // sort lessons by lesson number
  course.chapters.forEach((chapter) => {
    chapter.lessons.sort((a, b) => a.number - b.number);
  });

  // create course instance
  const url = `${BASE_URL}/programs/courses`;
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
  for (let i = 0; i < course.chapters.length; i++) {
    const chapter = course.chapters[i];
    const chapterID = await createChapter(courseID, chapter);
    // delay to avoid rate limit
    await new Promise((resolve) => setTimeout(resolve, DELAY));
    chapter.chapterId = chapterID;
    for (let j = 0; j < chapter.lessons.length; j++) {
      const lesson = chapter.lessons[j];
      console.log(
        `create lesson ${lesson.number} of chapter ${chapter.number}`
      );
      const lessonID = await createLesson(courseID, chapterID, lesson);
      // delay to avoid rate limit
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      lesson.lessonId = lessonID;
    }
  }
}

async function listCourseChapterLessons(
  courseID: string,
  chapterID: string
): Promise<Lesson[]> {
  const getAllLessonIDsURL = `${BASE_URL}/programs/courses/${courseID}/chapters/${chapterID}/lessons`;
  const lessonIDs = (
    await axios.get<{ lessons: { lesson_id: string }[] }>(getAllLessonIDsURL)
  ).data.lessons;
  type GetLessonResponse = {
    lesson_id: string;
    lesson_num: number;
    name: string;
    lesson_type: string;
    lesson_length: number;
    src: string;
  };
  const lessons: Lesson[] = [];
  for (let i = 0; i < lessonIDs.length; i++) {
    const getLessonURL = `${BASE_URL}/programs/courses/${courseID}/chapters/${chapterID}/lessons/${lessonIDs[i].lesson_id}`;
    const res = await axios.get<GetLessonResponse>(getLessonURL);
    const lesson: Lesson = {
      lessonId: res.data.lesson_id,
      name: res.data.name,
      number: res.data.lesson_num,
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
  const getAllChapterIDsURL = `${BASE_URL}/programs/courses/${courseID}/chapters`;
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
    const getChapterURL = `${BASE_URL}/programs/courses/${courseID}/chapters/${chapterIDs[i].chapter_id}`;
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
  const url = `${BASE_URL}/programs/courses/${courseID}`;
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
  const updateCourseInfoURL = `${BASE_URL}/programs/courses/${course.courseId}`;
  const currentCourse = await getCourse(course.courseId);
  // update course info

  // clear course objectives
  const clearObjectives = [];
  currentCourse.objectives.forEach((objective) => {
    clearObjectives.push({
      op: "remove",
      value: objective,
    });
  });
  await axios.patch(updateCourseInfoURL, { course_objective: clearObjectives });
  // clear course tag
  await axios.patch(updateCourseInfoURL, {
    tag: { op: "remove", tag_id: currentCourse.tag.tagID },
  });

  console.warn(`hardcode tag, objective`);
  const courseInfoBody = {
    name: course.name,
    course_pic: course.thumbnailUrl,
    price: course.price,
    description: course.description,
    course_objective: course.objectives.map((obj) => {
      return {
        op: "add",
        value: obj,
      };
    }),
    course_requirement: course.requirement,
    difficulty_level: course.level,
    tag: {
      op: "add",
      tag_id: course.tag.tagID,
    },
  };
  // find and remove deleted chapters
  for (let i = 0; i < currentCourse.chapters.length; i++) {
    const chapter = currentCourse.chapters[i];
    if (!course.chapters.find((c) => c.chapterId === chapter.chapterId)) {
      console.log("delete chapter");
      const deleteChapterURL = `${BASE_URL}/programs/courses/${course.courseId}/chapters/${chapter.chapterId}`;
      await axios.delete(deleteChapterURL);
      await new Promise((resolve) => setTimeout(resolve, DELAY));
    }
  }

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
    }
    const chapterInfoBody = {
      name: chapter.name,
      description: chapter.description,
    };
    const updateChapterInfoURL = `${BASE_URL}/programs/courses/${course.courseId}/chapters/${chapter.chapterId}`;
    await axios.patch(updateChapterInfoURL, chapterInfoBody);
    // find and remove deleted lessons
    for (
      let i = 0;
      i < currentCourse.chapters[chapterIndex].lessons.length;
      i++
    ) {
      const lesson = currentCourse.chapters[chapterIndex].lessons[i];
      if (
        !chapter.lessons.find((l) => l.lessonId === lesson.lessonId) &&
        lesson.lessonId
      ) {
        console.log("delete lesson");
        const deleteLessonURL = `${BASE_URL}/programs/courses/${course.courseId}/chapters/${chapter.chapterId}/lessons/${lesson.lessonId}`;
        await axios.delete(deleteLessonURL);
        // delay to avoid rate limit
        await new Promise((resolve) => setTimeout(resolve, DELAY));
      }
    }
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
        lesson_length: Math.floor(lesson.length),
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
      const updateLessonInfoURL = `${BASE_URL}/programs/courses/${course.courseId}/chapters/${chapter.chapterId}/lessons/${lesson.lessonId}`;
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
