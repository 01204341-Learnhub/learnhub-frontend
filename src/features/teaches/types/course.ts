type CourseChapter = {
  chapterName: string;
  chapterDescription: string;
  lessons: {
    lessonNumber: number;
    lessonName: string;
    lessonType: string;
  }[];
};

type CourseLesson = {
  lessonID: string;
  lessonNumber: number;
  lessonName: string;
  lessonType: string;
  src: string;
};

type CourseInfo = {
  courseID: string;
  courseThumbnailUrl: string;
  courseName: string;
  courseRating: number;
  studentCount: number;
};

type CourseBasicInfo = {
  courseName: string;
  courseCategory: string;
  courseLevel: string;
};

type CourseGoalsInfo = {
  objectives: string[];
  requirement: string;
};

type CoursePublishingInfo = {
  courseDescription: string;
  courseThumbnailUrl: string;
  coursePrice: number;
};

export type {
  CourseChapter,
  CourseLesson,
  CourseInfo,
  CourseBasicInfo,
  CourseGoalsInfo,
  CoursePublishingInfo,
};
