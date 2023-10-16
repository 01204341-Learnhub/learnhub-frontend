import { LearnhubUser } from "../../../types/user";

type Thread = {
  classId: string;
  threadId: string;
  name: string; // Title
  teacher: LearnhubUser;
  text: string;
  attachments: Attachment[];
  lastEdit: Date; // Last edit date by teacher
  replies: Reply[];
};

type Attachment = {
  typ: string;
  src: string;
};

type Reply = {
  user: LearnhubUser;
  dateTime: Date;
  text: string;
};

export type { Thread, Attachment, Reply };
