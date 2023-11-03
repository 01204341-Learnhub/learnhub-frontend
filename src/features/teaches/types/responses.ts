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

type ListClassThreadsResponse = {
  threads: {
    thread_id: string;
    name: string;
    teacher: {
      teacher_id: string;
      teacher_name: string;
      profile_pic: string;
    };
    last_edit: number;
  }[];
};

type GetClassThreadResponse = {
  name: string;
  teacher: {
    teacher_id: string;
    teacher_name: string;
    profile_pic: string;
  };
  last_edit: number;
  text: string;
  attachments: {
    attachment_type: string;
    src: string;
  }[];
  replies: {
    user: {
      user_id: string;
      type: "student" | "teacher";
      name: string;
      profile_pic: string;
    };
    reply_date: number;
    text: string;
  }[];
};

type GetClassInfoResponse = {
  name: string;
  class_pic: string;
  max_student: number;
  price: number;
  description: string;
  class_objective: string[];
  tags: {
    tag_id: string;
    tag_name: string;
  }[];
  class_requirement: string;
  difficulty_level: string;
  schedules: {
    start: number;
    end: number;
  }[];
  open_date: number;
  registration_ended_date: number;
  class_ended_date: number;
};

export type {
  GetClassAssignmentResponse,
  GetClassInfoResponse,
  GetClassThreadResponse,
  ListClassAssignmentsResponse,
  ListClassStudentsResponse,
  ListClassThreadsResponse,
  ListTagsResponse,
  ListTeacherClassesResponse,
  ListTeacherCourseResponse,
  ListTeacherIncomesResponse,
};
