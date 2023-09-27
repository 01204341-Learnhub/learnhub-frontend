export type Lesson = {
  id: string;
  courseId: string;
  chapterId: string;
  lessonNum: number;
  name: string;
  description: string;
  lessonType: string; // video | doc | quiz | files?
  lessonLength: number; // expected lesson length in seconds (video length included)
};
