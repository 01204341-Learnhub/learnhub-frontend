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

type GetCourseChapterResponse = {
  chapter_id: string;
  course_id: string;
  chapter_num: number;
  name: string;
  description: string;
};

type ListCourseChaptersResponse = {
  chapters: {
    chapter_id: string;
    chapter_num: number;
    name: string;
    lesson_count: number;
    chapter_length: number;
  }[];
};

type GetStudentCourseProgressResponse = {
  progress: number;
  lessons: {
    lesson_id: string;
    chapter_id: string;
    finished: boolean;
    lesson_completed: number;
  }[];
};

type GetStudentCourseQuizReportResponse = {
  status: string;
  score: number;
  problems: {
    problem_num: number;
    answer: {
      answer_a: boolean;
      answer_b: boolean;
      answer_c: boolean;
      answer_d: boolean;
      answer_e: boolean;
      answer_f: boolean;
    };
    correct_answer: {
      answer_a: boolean;
      answer_b: boolean;
      answer_c: boolean;
      answer_d: boolean;
      answer_e: boolean;
      answer_f: boolean;
    };
    explanation: string;
  }[];
};

export type {
  GetCourseChapterResponse,
  GetCourseLessonResponse,
  GetQuizResponse,
  GetStudentCourseProgressResponse,
  GetStudentCourseQuizReportResponse,
  ListCourseChaptersResponse,
  ListCourseLessonsResponse,
  ListEnrolledCoursesResponse,
};
