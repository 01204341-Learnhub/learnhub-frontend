type EnrolledCourse = {
  courseID: string;
  thumbnailUrl: string;
  name: string;
  status: string;
  teacher: {
    teacherID: string;
    name: string;
    avatarUrl: string;
  };
  progress: number;
  rating: number;
};

export type CourseChapter = {
  chapterID: string;
  chapterNum: number;
  name: string;
  courseID: string;
  chapterLength: number;
  lessonCount: number;
  description: string;
};

// export type CourseLesson = {
//   lessonID: string;
//   lessonNum: number;
//   name: string;
//   courseID: string;
//   chapterID: string;
//   lessonType: string;
//   src: string;
//   description: string;
// };

export type CourseLesson = {
  lessonID: string;
  lessonNum: number;
  name: string;
  courseID: string;
  chapterID: string;
  lessonType: string;
  lessonLength: number;
  src: string;
};

export type CourseLessons = {
  lessonID: string;
  lessonNum: number;
  name: string;
  lessonType: string;
  lessonLength: string;
};

export type { EnrolledCourse };
