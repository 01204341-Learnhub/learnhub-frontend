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

export type { CourseChapter, CourseInfo, CourseLesson };
