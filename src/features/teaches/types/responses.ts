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
    type: string
    program_id: string
    program_pic: string
    name: string
    buyer: {
      student_id: string
      student_name: string
    }
    price: number
  }[]
}

export type { ListTagsResponse, ListTeacherCourseResponse, ListTeacherIncomesResponse };
