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

type ListClassStudentsResponse = {
  students: {
    student_id: string;
    name: string;
    profile_pic: string;
  }[];
};

type ListClassAssignmentsResponse = {
  assignments: {
    assignment_id: string;
    name: string;
    group_name: string;
    last_edit: number;
    due_date: number;
    status: string;
    max_score: number;
    submission_count: {
      submit_count: number;
      unsubmit_count: number;
    };
    text: string;
  }[];
};

type GetClassAssignmentResponse = {
  name: string;
  group_name: string;
  last_edit: number;
  due_date: number;
  status: string;
  max_score: number;
  text: string;
  attachments: {
    src: string;
    name: string;
  }[];
};

export type {
  GetClassAssignmentResponse,
  ListClassAssignmentsResponse,
  ListClassStudentsResponse,
  ListTagsResponse,
  ListTeacherClassesResponse,
  ListTeacherCourseResponse,
  ListTeacherIncomesResponse,
};
