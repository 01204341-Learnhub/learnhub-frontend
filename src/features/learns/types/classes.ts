import { LearnhubUser } from "../../../types/user";
import { generateMockUser } from "./thread";

type Teacher = {
  id: string;
  name: string;
};

type Tag = {
  id: string;
  name: string;
};

export type EnrolledClass = {
  id: string;
  name: string;
  imageClassUrl: string;
  teacher: Teacher;
  status: string;
  tags: Tag[];
  registrationEndDate: Date;
  price: number;
};

type Class = {
  classId: string;
  name: string;
  thumbnailUrl: string;
  teacher: LearnhubUser;
  students: LearnhubUser[];
  simpleThreads: SimpleThread[];
};

type SimpleThread = {
  threadId: string;
  typ: "announcement" | "homework";
  name: string;
  lastEdit: Date;
};

function generateMockClass(classId: string): Class {
  return {
    classId: classId,
    name: `Class ${classId}`,
    thumbnailUrl: `https://picsum.photos/seed/${classId}/1920/1080`,
    teacher: generateMockUser("teacher", "teacher0"),
    students: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) =>
      generateMockUser("student", `student${i}`)
    ),
    simpleThreads: [
      {
        threadId: "announcement0",
        typ: "announcement",
        name: "Announcement 0",
        lastEdit: new Date(),
      },
      {
        threadId: "homework0",
        typ: "homework",
        name: "Homework 0",
        lastEdit: new Date(new Date().getTime() - 1000 * 60 * 60 * 3),
      },
      {
        threadId: "announcement1",
        typ: "announcement",
        name: "Announcement 1",
        lastEdit: new Date(new Date().getTime() - 1000 * 60 * 60 * 10),
      },
      {
        threadId: "homework1",
        typ: "homework",
        name: "Homework 1",
        lastEdit: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3),
      },
    ],
  };
}

export type { Teacher, Tag, Class, SimpleThread };
export { generateMockClass };
