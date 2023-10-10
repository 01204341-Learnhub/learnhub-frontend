import axios from "axios";
import { CourseChapter, CourseLesson, EnrolledCourse } from "../types/course";
import {
  ListEnrolledCoursesResponse,
  ResponseLessonId,
  ResponseLessons,
} from "../types/response";

const baseURL = "http://localhost:8000";

async function listEnrolledCourses(
  studentID: string
): Promise<EnrolledCourse[]> {
  const url = `${baseURL}/users/students/${studentID}/courses/`;
  const res = await axios.get<ListEnrolledCoursesResponse>(url);
  const enrolledCourses: EnrolledCourse[] = [];
  res.data.courses.map((course) => {
    enrolledCourses.push({
      courseID: course.course_id,
      name: course.name,
      status: course.status,
      teacher: {
        teacherID: course.teacher.teacher_id,
        name: course.teacher.name,
        avatarUrl: course.teacher.profile_pic,
      },
      progress: course.progress,
      rating: course.rating,
      thumbnailUrl: course.course_pic,
    });
  });
  return enrolledCourses;
}

async function fetchChapters(courseID: string): Promise<CourseChapter[]> {
  const courseChapters: CourseChapter[] = [];

  try {
    const response = await axios.get<ResponseCourseChapters>(
      `http://localhost:8000/programs/courses/${courseID}/chapters/`
    );
    const courseChapterData = response.data.chapters;
    courseChapterData.map((chapter) => {
      courseChapters.push({
        chapterID: chapter.chapter_id,
        chapterNum: chapter.chapter_num,
        name: chapter.name,
        courseID: courseID,
        chapterLength: chapter.chapter_length,
        lessonCount: chapter.lesson_count,
        description: "",
      });
    });
  } catch (err) {
    console.log(err);
  } finally {
    return courseChapters;
  }

  const mockChapters: CourseChapter[] = [
    {
      chapterID: "1",
      courseID: courseID,
      chapterNum: 1,
      name: "Chapter 1",
      chapterLength: 10,
      lessonCount: 10,
      description:
        "This is a chapter 2 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      chapterID: "2",
      courseID: courseID,
      chapterNum: 2,
      name: "Chapter 2",
      chapterLength: 10,
      lessonCount: 10,
      description: "This is a chapter 2",
    },
  ];
  return mockChapters;
}

async function fetchLessons(courseID: string, chapterID: string) {
  const lessons: CourseLesson[] = [];

  try {
    const responseLessons = await axios.get<ResponseLessons>(
      `http://localhost:8000/programs/courses/${courseID}/chapters/${chapterID}/lessons`
    );
    const lessonsData = responseLessons.data.lessons;
    lessonsData.map((lesson) => {
      lessons.push({
        lessonID: lesson.lesson_id,
        chapterID: chapterID,
        courseID: courseID,
        lessonNum: lesson.lesson_num,
        lessonLength: lesson.lesson_length,
        lessonType: lesson.lesson_type,
        name: lesson.name,
        src: "",
      });
    });
  } catch (err) {
    console.log(err);
  } finally {
    console.log(lessons);
    return lessons;
  }
}

async function fetchLesson(
  courseID: string,
  chapterID: string,
  lessonID: string
) {
  try {
    const responseLesson = await axios.get<ResponseLessonId>(
      `http://localhost:8000/programs/courses/${courseID}/chapters/${chapterID}/lessons/${lessonID}`
    );
    const lessonData = responseLesson.data;
    const lesson: CourseLesson = {
      courseID: courseID,
      chapterID: chapterID,
      lessonID: lessonData.lesson_id,
      lessonNum: lessonData.lesson_num,
      lessonType: lessonData.lesson_type,
      src: lessonData.src,
      name: lessonData.name,
      lessonLength: lessonData.lesson_length,
    };
    return lesson;
  } catch (err) {}
}

export { fetchChapters, fetchLesson, fetchLessons, listEnrolledCourses };
