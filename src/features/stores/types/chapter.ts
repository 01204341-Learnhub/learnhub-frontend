export type Chapter = {
  id: string;
  courseId: string;
  name: string;
  description: string;
  chapterNum: number;
  lessonCount: number; // total lesson count
  chapterLength: number; // expected chapter length in seconds (video length included)
};
