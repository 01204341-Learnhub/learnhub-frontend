type CourseChapter = {
  chapterName: string;
  chapterDescription: string;
  lessons: {
    lessonNumber: number;
    lessonName: string;
    lessonType: string;
  }[];
};

type CourseInfo = {
  courseID: string;
  courseThumbnailUrl: string;
  courseName: string;
  courseRating: number;
  studentCount: number;
};

export type { CourseChapter, CourseInfo };
