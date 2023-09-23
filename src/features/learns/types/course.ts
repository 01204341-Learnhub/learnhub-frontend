export type CourseChapter = {
  chapterNum: number;
  name: string;
  courseID: string;
  chapterLength: number;
  lessonCount: number;
  description: string;
};

export type Lesson = {
  lessonNum: number;
  name: string;
  courseID: string;
  chapterID: string;
  lessonType: string;
  src: string;
  description: string;
};
