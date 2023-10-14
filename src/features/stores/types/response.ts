type Tag = {
  tagId: string;
  tagName: string;
};

type ListCoursesResponse = {
  courses: {
    course_id: string;
    name: string;
    course_pic: string;
    teacher: {
      teacher_id: string;
      teacher_name: string;
      profile_pic: string;
    };
    tags: {
      tag_id: string;
      tag_name: string;
    }[];
    rating: number;
    review_count: number;
    price: number;
  }[];
};

type ListClassesResponse = {
  classes: {
    class_id: string;
    name: string;
    class_pic: string;
    teacher: {
      teacher_id: string;
      teacher_name: string;
      profile_pic: string;
    };
    description: string;
    status: string;
    tags: {
      tag_id: string;
      tag_name: string;
    }[];
    registration_ended_date: number;
    open_date: number;
    class_ended_date: number;
    price: number;
  }[];
};

type GetClassResponse = {
  class_id: string;
  name: string;
  class_pic: string;
  teacher: {
    teacher_id: string;
    teacher_name: string;
    profile_pic: string;
  };
  description: string;
  tags: {
    tag_id: string;
    tag_name: string;
  }[];
  status: string;
  schedules: {
    start: number;
    end: number;
  }[];
  registration_ended_date: number;
  open_date: number;
  class_ended_date: number;
  price: number;
  class_objective: string[];
  class_requirement: string;
  difficulty_level: string;
  meeting_count: number;
  student_count: number;
  max_student: number;
  assignment_count: number;
};

type GetCourseDetailResponse = {
  course_id: string;
  name: string;
  course_pic: string;
  tags: {
    tag_id: string;
    tag_name: string;
  }[];
  description: string;
  course_objective: string[];
  course_requirement: string;
  difficulty_level: string;
  rating: number;
  review_count: number;
  student_count: number;
  teacher: {
    teacher_id: string;
    teacher_name: string;
    profile_pic: string;
  };
  price: number;
  total_video_length: number;
  chapter_count: number;
  quiz_count: number;
  file_count: number;
  video_count: number;
};

type ListCourseChapterOutlineResponse = {
  chapters: {
    chapter_id: string;
    chapter_num: number;
    name: string;
    lesson_count: number;
    chapter_length: number;
  }[];
};

type PostDataCourse = {
  name: string;
  teacher_id: string;
  course_pic: string;
  description: string;
  course_objective: string[];
  tag_ids: string[];
  course_requirement: string;
  difficulty_level: string;
  price: number;
};

type ResponseChapterDetail = {
  chapter_id: string;
  course_id: string;
  chapter_num: string;
  name: string;
  description: string;
};

type ResponseGetCourseId = {
  course_id: string;
  name: string;
  course_pic: string;
  tags: {
    tag_id: string;
    tag_name: string;
  }[];
  description: string;
  course_objective: string[];
  course_requirement: string;
  difficulty_level: string;
  rating: number;
  review_count: number;
  student_count: number;
  teacher: {
    teacher_id: string;
    teacher_name: string;
    profile_pic: string;
  };
  price: number;
  total_video_length: number;
  chapter_count: number;
  quiz_count: number;
  file_count: number;
  video_count: number;
};

type ResponseChapter = {
  chapter_id: string;
  chapter_num: number;
  name: string;
  lesson_count: number;
  chapter_length: number;
};

type ResponseLesson = {
  lesson_id: string;
  lesson_num: number;
  name: string;
  lesson_type: string;
  lesson_length: number;
};

type ResponseLessons = {
  lessons: ResponseLesson[];
};

type ResponseChapters = {
  chapters: ResponseChapter[];
};

type ResponseGetCourses = {
  courses: ListCoursesResponse[];
};

type BasketData = {
  basket_item_id: string;
  name: string;
  type: string;
  price: number;
  program_id: string;
  rating: number;
  review_count: number;
  total_video_length: number;
  difficulty_level: string;
  program_pic: string;
  teacher: {
    teacher_id: string;
    teacher_name: string;
    profile_pic: string;
  };
};

type ResponseBasket = {
  basket: BasketData[];
};

type ResponseTeacherInfo = {
  uid:string,
  teacher_id:string,
  username:string,
  fullname:string,
  email:string,
  profile_pic:string
}

export type {
  ResponseTeacherInfo,
  GetClassResponse,
  GetCourseDetailResponse,
  ListClassesResponse,
  ListCourseChapterOutlineResponse,
  ListCoursesResponse,
  PostDataCourse,
  ResponseBasket,
  ResponseChapter,
  ResponseChapterDetail,
  ResponseChapters,
  ResponseGetCourseId,
  ResponseGetCourses,
  ResponseLesson,
  ResponseLessons,
  Tag,
};
