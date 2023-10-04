import { Instructor } from "./instructor";

export type Tag = {
  tagId: string
  tagName: string
}

export type Course = {
  courseId: string;
  name: string;
  description: string;
  price: number;
  cover: string;
  intructor: Instructor;
  reviewerCount: number;
  rating: number;
  tags: Tag[]
};

export type CourseDetailData = {
  courseId : string
    name : string
    coursePic : string
    tags : Tag[]
    description : string
    objective : string[]
    requirement : string
    level : string
    rating : number
    reviewCount : number
    studentCount : number
    instructor: Instructor
    price: number
    videoLength : number
    chapterCount : number
    quizCount : number
    fileCount : number
    videoCount : number
}

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
