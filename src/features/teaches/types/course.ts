import { Tag } from "./tags";

type Category = {
  categoryId: string;
  name: string;
};

type Chapter = {
  chapterId: string;
  name: string;
  number: number;
  description: string;
  lessons: Lesson[];
};

type Lesson = {
  lessonId: string;
  name: string;
  number: number;
  type: string;
  videoUrl?: string;
  doc?: string;
  quiz?: string;
  fileUrl?: string;
};

type Course = {
  courseId: string;
  name: string;
  thumbnailUrl: string;
  tag: Tag;
  level: string;
  instructorName: string;
  description: string;
  objectives: string[];
  requirement: string;
  price: number;
  rating: number;
  studentCount: number;
  chapters: Chapter[];
};

type CourseInfo = {
  courseID: string;
  thumbnailUrl: string;
  name: string;
  rating: number;
  studentCount: number;
};

const availableLevels: string[] = ["Beginner", "Intermediate", "Advanced"];

export { availableLevels };
export type { Category, Chapter, Course, CourseInfo, Lesson };
