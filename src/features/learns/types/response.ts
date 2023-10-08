export type ResponseChapterId = {
  chapter_id: string;
  course_id: string;
  chapter_num: string;
  name: string;
  description: string;
};

type CourseChapter = {
  chapter_id: string;
  chapter_num: number;
  name: string;
  lesson_count: number;
  chapter_length: number;
};

export type ResponseCourseChapters = {
  chapters: CourseChapter[];
};

export type ResponseLessons = {
  lessons: LessonData[];
};

export type ResponseLessonId = {
  lesson_id: string;
  lesson_num: number;
  name: string;
  lesson_type: string;
  lesson_length: number;
  src: string;
};

type ListEnrolledCoursesResponse = {
  courses: {
    course_id: string;
    course_pic: string;
    name: string;
    status: string;
    teacher: {
      teacher_id: string;
      name: string;
      profile_pic: string;
    };
    progress: number;
    rating: number;
  }[];
};

type GetQuizResponse = {
  name: string;
  description: string;
  time_limit: number;
  quiz_pic: string;
  problems: {
    problem_num: number;
    question: string;
    multiple_correct_answers: boolean;
    choice: {
      choice_a: string;
      choice_b: string;
      choice_c: string;
      choice_d: string;
      choice_e: string;
      choice_f: string;
    };
  }[];
};

type GetCourseLessonResponse = {
  lesson_id: string;
  lesson_num: number;
  name: string;
  lesson_type: string;
  lesson_length: number;
  src: string;
};

type ListCourseLessonsResponse = {
  lessons: Omit<GetCourseLessonResponse, "src">[];
};

export type {
  GetCourseLessonResponse,
  GetQuizResponse,
  ListCourseLessonsResponse,
  ListEnrolledCoursesResponse,
};
