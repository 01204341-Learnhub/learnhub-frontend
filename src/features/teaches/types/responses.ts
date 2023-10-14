type ListTeacherCourseResponse = {
  courses: {
    course_id: string;
    course_pic: string;
    name: string;
    rating: number;
    student_count: number;
  }[];
};

type ListTagsResponse = {
  tags: {
    tag_id: string;
    tag_name: string;
  }[];
};

type ListTeacherIncomesResponse = {
  incomes: {
    type: string;
    program_id: string;
    program_pic: string;
    name: string;
    buyer: {
      student_id: string;
      student_name: string;
    };
    price: number;
    purchase_time: number;
  }[];
};

type ListTeacherClassesResponse = {
  classes: {
    class_id: string;
    name: string;
    class_pic: string;
    status: string;
    registration_ended_date: number;
    class_end_date: number;
    student_count: number;
    max_student: number;
    schedules: {
      start: number;
      end: number;
    }[];
  }[];
};

export type {
  ListTagsResponse,
  ListTeacherClassesResponse,
  ListTeacherCourseResponse,
  ListTeacherIncomesResponse,
};
