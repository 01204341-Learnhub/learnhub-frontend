import { LearnhubUser } from "../../../types/user";

type HomeworkDetail = {
  classId: string;
  clsName: string;
  homeworkId: string;
  name: string;
  fullScore: number;
  duDateTime: Date;
  text: string;
  attachments: Attachment[];
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

export type { HomeworkDetail, Attachment };
