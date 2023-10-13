type Tag = {
  tagID: string;
  name: string;
};

type Course = {
  courseID: string;
  name: string;
  thumbnailUrl: string;
  instructor: {
    instructorID: string;
    name: string;
    avatarUrl: string;
  };
  tags: Tag[];
  rating: number;
  difficultyLevel: string;
  reviewerCount: number;
  price: number;
};

type CourseDetail = {
  courseID: string;
  name: string;
  thumnailUrl: string;
  tags: Tag[];
  description: string;
  objective: string[];
  requirement: string;
  level: string;
  rating: number;
  reviewerCount: number;
  studentCount: number;
  instructor: {
    instructorID: string;
    name: string;
    avatarUrl: string;
    jobTitle: string;
  };
  price: number;
  videoLength: number;
  chapterCount: number;
  quizCount: number;
  fileCount: number;
  videoCount: number;
};

type CourseAnnouncement = {
  announcementID: string;
  name: string;
  lastEdit: number;
  text: string;
  attachments: {
    attachmentType: string;
    src: string;
  }[];
};

type CourseChapterOutline = {
  chapterID: string;
  chapterNumber: number;
  name: string;
  lessonCount: number;
  length: number;
};

export type {
  Course,
  CourseAnnouncement,
  CourseChapterOutline,
  CourseDetail,
  Tag,
};
