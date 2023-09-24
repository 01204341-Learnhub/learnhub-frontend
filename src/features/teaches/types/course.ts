type CourseChapter = {
  chapterName: string;
  chapterDescription: string;
  lessons: {
    lessonNumber: number;
    lessonName: string;
    lessonType: string;
  }[];
};

export type { CourseChapter };
