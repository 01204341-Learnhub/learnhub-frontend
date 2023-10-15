import { LearnhubUser } from "../../../types/user";

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
  endDate: Date;
  price: number;
  schedules: {
    start: Date
    end: Date
  }[];
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
  homeworkTopicName?: string; // For homework threads
};

type ClassDetail = {
  classID: string;
  name: string;
  thumbnailUrl: string;
  teacher: {
    teacherID: string;
    name: string;
    avatarUrl: string;
  };
  description: string;
  tags: {
    tagID: string;
    name: string;
  }[];
  status: string;
  schedules: {
    start: Date;
    end: Date;
  }[];
  registrationEndDate: Date;
  openDate: Date;
  EndDate: Date;
  price: number;
  objectives: string[];
  requirements: string;
  difficultyLevel: string;
  studentCount: number;
  studentLimit: number;
};

export type { Class, ClassDetail, SimpleThread, Tag, Teacher };
