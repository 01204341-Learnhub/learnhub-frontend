export type UserCoursePrgress = {
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
