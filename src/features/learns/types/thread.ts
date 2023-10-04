import { LearnhubUser } from "../../../types/user";

type Thread = {
  threadId: string;
  name: string; // title
  type: string; // announcement, homework
  teacher: LearnhubUser;
  text: string;
  attachments: Attachment[];
  lastEdited: Date; // last edit date by teacher
  replies: Reply[];
  homeworkDueDate?: Date; // for homework threads
  homeworkFullPoints?: number; // for homework threads
  homeworkTopicName?: string; // for homework threads
  homeworkFiles?: HomeworkFile[]; // for homework threads
};

type Attachment = {
  type: string;
  src: string;
};

type Reply = {
  user: LearnhubUser;
  date: Date;
  text: string;
};

type HomeworkFile = {
  homeworkFileId: string;
  name: string;
  src: string;
};

type Class = {
  classId: string;
  name: string;
};

export type { Thread, Attachment, Reply, Class };
