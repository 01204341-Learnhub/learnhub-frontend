import axios from "axios";
import { Chapter } from "../types/chapter";
import {
  Course,
  CourseAnnouncement,
  CourseChapterOutline,
  CourseDetail,
} from "../types/course";
import { Lesson } from "../types/lesson";
import {
  GetCourseDetailResponse,
  ListCourseChapterOutlineResponse,
  ListCoursesResponse,
  ResponseChapters,
  ResponseLessons,
} from "../types/response";

const baseUrl = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";

async function listCourse(): Promise<Course[]> {
  const url = `${baseUrl}/programs/courses/`;
  try {
    const response = await axios.get<ListCoursesResponse>(url);
    const courses: Course[] = response.data.courses.map((course) => {
      return {
        courseID: course.course_id,
        name: course.name,
        thumbnailUrl: course.course_pic,
        instructor: {
          instructorID: course.teacher.teacher_id,
          name: course.teacher.teacher_name,
          avatarUrl: course.teacher.profile_pic,
        },
        tags: course.tags.map((tag) => ({
          tagID: tag.tag_id,
          name: tag.tag_name,
        })),
        rating: course.rating,
        reviewerCount: course.review_count,
        price: course.price,
      };
    });
    return courses;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getCourseDetail(courseID: string): Promise<CourseDetail> {
  const url = `${baseUrl}/programs/courses/${courseID}`;
  try {
    const response = await axios.get<GetCourseDetailResponse>(url);
    const courseIdData = response.data;
    console.log(response.status);
    
    return {
      courseID: courseIdData.course_id,
      name: courseIdData.name,
      thumnailUrl: courseIdData.course_pic,
      tags: courseIdData.tags.map((tag) => ({
        tagID: tag.tag_id,
        name: tag.tag_name,
      })),
      description: courseIdData.description,
      objective: courseIdData.course_objective,
      level: courseIdData.difficulty_level,
      rating: courseIdData.rating,
      reviewerCount: courseIdData.review_count,
      studentCount: courseIdData.chapter_count,
      instructor: {
        instructorID: courseIdData.teacher.teacher_id,
        name: courseIdData.teacher.teacher_name,
        avatarUrl: courseIdData.teacher.profile_pic,
        jobTitle: "Tell backend to add this field",
      },
      price: courseIdData.price,
      videoLength: courseIdData.total_video_length,
      videoCount: courseIdData.video_count,
      chapterCount: courseIdData.chapter_count,
      quizCount: courseIdData.quiz_count,
      fileCount: courseIdData.file_count,
      requirement: courseIdData.course_requirement,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function ListCourseChaptersOutline(
  courseID: string
): Promise<CourseChapterOutline[]> {
  const url = `${baseUrl}/programs/courses/${courseID}/chapters`;
  try {
    const response = await axios.get<ListCourseChapterOutlineResponse>(url);
    const chaptersOutline: CourseChapterOutline[] = response.data.chapters.map(
      (chapter) => {
        return {
          chapterID: chapter.chapter_id,
          chapterNumber: chapter.chapter_num,
          lessonCount: chapter.lesson_count,
          length: chapter.chapter_length,
          name: chapter.name,
        };
      }
    );
    return chaptersOutline;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function fetchLessons(courseID: string, chapterID: string) {
  const lessons: Lesson[] = [];
  console.log(courseID, chapterID);
  try {
    const response = await axios.get<ResponseLessons>(
      `${baseUrl}/programs/courses/${courseID}/chapters/${chapterID}/lessons`
    );
    const lessonsData = response.data.lessons;
    lessonsData.map((lesson) => {
      lessons.push({
        id: lesson.lesson_id,
        courseId: courseID,
        chapterId: chapterID,
        lessonNum: lesson.lesson_num,
        name: lesson.name,
        description: "",
        lessonLength: lesson.lesson_length,
        lessonType: lesson.lesson_type,
      });
    });
    return lessons;
  } catch (err) {
    console.log(err);
  }
}

async function getChapterInCourse(id: string) {
  const chapterCourse: Chapter[] = [];
  try {
    const response = await axios.get<ResponseChapters>(
      `${baseUrl}/programs/courses/${id}/chapters`
    );
    const chapterData = response.data.chapters;

    chapterData.map((chapter) => {
      chapterCourse.push({
        id: chapter.chapter_id,
        courseId: id,
        name: chapter.name,
        chapterNum: chapter.chapter_num,
        chapterLength: chapter.chapter_length,
        lessonCount: chapter.lesson_count,
        description: "",
      });
    });

    return chapterCourse;
    console.log(chapterCourse);
  } catch (err) {
    console.log(err);
  }
}

async function getPopularCourse(num: number): Promise<Course[]> {
  const popularCourses = [];

  for (let i = 0; i < num; i++) {
    popularCourses.push({
      id: `C${i + 1}`,
      name: "How to train to Busan",
      description: "what is zombies in Busan doing",
      price: 2099,
      cover: `https://picsum.photos/${i}/${300}`,
      intructor: {
        id: "1",
        name: "Baramika laokrub",
        avatarUrl: "",
        jobTitle: "Scotte lungnuk",
      },
      reviewerCount: 10000,
      rating: 4.4,
      tags: [
        {
          tagId: `T${i + 1}`,
          tagName: "ยอดนิยม",
        },
      ],
    });
  }
  return popularCourses;
}

async function listCourseAnnouncements(courseID: string) {
  const mockAnnouncements: CourseAnnouncement[] = [
    {
      announcementID: "1",
      name: "Welcome to the course!",
      lastEdit: 1600000000,
      text: "Welcome to the course!, WOw oWo",
      attachments: [],
    },
    {
      announcementID: "2",
      name: "How to approve",
      lastEdit: 1600000234,
      text: "How to approve, WOw oWo",
      attachments: [],
    },
  ];
  return mockAnnouncements;
}

async function getCourseAnnouncement(courseID: string, announcementID: string) {
  const mockAnnouncements: CourseAnnouncement = {
    announcementID: announcementID,
    name: "Welcome to the course!",
    lastEdit: 1600000000,
    text: "Welcome to the course!, WOw oWo",
    attachments: [],
  };
  return mockAnnouncements;
}

export {
  ListCourseChaptersOutline,
  fetchLessons,
  getChapterInCourse,
  getCourseAnnouncement,
  getCourseDetail,
  getPopularCourse,
  listCourse,
  listCourseAnnouncements,
};
