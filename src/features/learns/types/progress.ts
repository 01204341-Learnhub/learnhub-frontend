type UserCourseProgress = {
  studentID: string;
  courseID: string;
  finished: boolean;
  lessons: {
    lessonID: string;
    chapterID: string;
    finished: boolean;
    lessonCompleted: number;
  }[];
};

type UserCourseChapterProgress = {
  finished: boolean;
  lessonsCompleted: number;
  lessons: {
    lessonID: string;
    finished: boolean;
  }[];
};

export type { UserCourseChapterProgress, UserCourseProgress };
