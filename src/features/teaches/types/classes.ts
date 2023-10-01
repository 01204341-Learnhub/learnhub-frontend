type Category = {
  categoryId: string;
  name: string;
};

type Thread = {
  threadId: string;
  name: string;
  lastEditedDate: Date;
  text: string;
  attachments: Attachment[];
};

type Attachment = {
  type: string;
  url: string;
};

type Class = {
  classId: string;
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
  studentLimit: number;
  startDate: Date;
  endDate: Date;
  lastDateToRegister: Date;
  threads: Thread[];
};

type ClassInfo = {
  classID: string;
  classThumbnailUrl: string;
  className: string;
  percentCompleted: number;
  participantCount: number;
  participantLimit: number;
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

export type { Category, Thread, Attachment, Class, ClassInfo };
export { availableCategories, availableLevels };
