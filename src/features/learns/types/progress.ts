type StudentCourseProgress = {
  progress: number;
  lessons: StudentCourseLessonProgress[];
};

type StudentCourseLessonProgress = {
  lessonID: string;
  chapterID: string;
  finished: boolean;
  lessonCompleted: number;
};

export type { StudentCourseLessonProgress, StudentCourseProgress };
