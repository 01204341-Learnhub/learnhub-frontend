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

export type { ListTagsResponse, ListTeacherCourseResponse };
