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
  PostDataCourse,
  ResponseChapters,
  ResponseGetCourses,
  ResponseLessons,
} from "../types/response";

const baseUrl = "http://localhost:8000";

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
  } catch (err) {
    console.log(err);
  } finally {
    console.log(lessons);
    return lessons;
  }
}

async function postCourse(num: number) {
  for (let i = 0; i < num; i++) {
    const courseGenarate: PostDataCourse = {
      name: `How to train the busan ${i + 1}`,
      teacher_id: `${i + 1}`,
      course_pic:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/React_Native_Tutorial.jpg",
      description:
        "ปูซาน หรือ พูซัน (เกาหลี: 부산시) หรือทางการเรียกว่า มหานครปูซาน (เกาหลี: 부산광역시) เป็นเมืองท่าที่ใหญ่ที่สุดในประเทศเกาหลีใต้ มีประชากรประมาณ 3.65 ล้านคน และปูซานยังคงเป็นเมืองที่ใหญ่อันดับ 2 ของประเทศรองจาก โซล บริเวณที่แออัดของปูซานตั้งอยู่บริเวณหุบเขาแคบระหว่างแม่น้ำ นักดง และ แม่น้ำซูย็อง ",
      course_objective: [
        `busan ${i + 1}`,
        `busan ${i + 2}`,
        `busan ${i + 3}`,
        `busan ${i + 4}`,
      ],
      tag_ids: [`${i + 1}`, `${i + 2}`, `${i + 3}`, `${i + 4}`],
      course_requirement: "require pencil",
      difficulty_level: "ิbasic",
      price: 2000 + i,
    };

    console.log(courseGenarate.course_objective);
    try {
      const response = await axios.post(
        `${baseUrl}/programs/courses/`,
        courseGenarate
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}

async function getAllCourses(): Promise<Course[]> {
  const programCourse: Course[] = [];

  try {
    const response = await axios.get<ResponseGetCourses>(
      `${baseUrl}/programs/courses/`
    );
    const courseData = response.data.courses;

    courseData.map(async (program) => {
      programCourse.push({
        courseID: program.course_id,
        name: program.name,
        description: "hello",
        price: program.price,
        cover: program.course_pic,
        intructor: {
          id: program.teacher.teacher_id,
          name: program.teacher.teacher_name,
          avatarUrl: program.teacher.profile_pic,
          jobTitle: "Scotte lungnuk",
        },
        reviewerCount: program.review_count,
        rating: program.rating,
        tags: program.tags.map((tag) => ({
          tagId: tag.tag_id,
          tagName: tag.tag_name,
        })),
      });
    });
  } catch (err) {}
  return programCourse;
}

type ChapterPreview = Omit<Chapter, "description">;

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

    console.log(chapterCourse);
  } catch (err) {
    console.log(err);
  } finally {
    return chapterCourse;
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
  getAllCourses,
  getChapterInCourse,
  getCourseAnnouncement,
  getCourseDetail,
  getPopularCourse,
  listCourse,
  listCourseAnnouncements,
  postCourse,
};
