import { Instructor } from "./instructor";

export type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  cover: string;
  intructor: Instructor;
  reviewerCount: number;
  rating: number;
};

export type CourseAnnouncement = {
  announcementID: string;
  name: string;
  lastEdit: number;
  text: string;
  attachments: {
    attachmentType: string;
    src: string;
  }[];
};
