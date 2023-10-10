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
  categoryId: string;
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
const availableCategories: Category[] = [
  {
    categoryId: "1",
    name: "Web Development",
  },
  {
    categoryId: "2",
    name: "Mobile Development",
  },
  {
    categoryId: "3",
    name: "Data Science",
  },
  {
    categoryId: "4",
    name: "Machine Learning",
  },
  {
    categoryId: "5",
    name: "Artificial Intelligence",
  },
  {
    categoryId: "6",
    name: "Cyber Security",
  },
  {
    categoryId: "7",
    name: "Cloud Computing",
  },
  {
    categoryId: "8",
    name: "DevOps",
  },
  {
    categoryId: "9",
    name: "Game Development",
  },
  {
    categoryId: "10",
    name: "Programming Languages",
  },
];

const availableLevels: string[] = ["Beginner", "Intermediate", "Advanced"];

export { availableCategories, availableLevels };
export type { Category, Chapter, Course, CourseInfo, Lesson };
