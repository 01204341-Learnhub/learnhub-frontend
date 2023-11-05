type ClassAssignment = {
  assignmentID: string;
  name: string;
  description: string;
  attachments: { src: string; attachmentType: string }[];
  dueDate?: Date;
  lastEdit: Date;
  score: number;
  topic: string;
  send: number;
  nosend: number;
};

type ClassAssignmentSubmission = {
  status: string;
  score: number;
  submissionDate: Date;
  student: {
    studentID: string;
    name: string;
    profilePicture: string;
  };
  attachments: { src: string; attachmentType: string }[];
};

type ListClassAssignmentSubmissionsResponse = {
  submissions: {
    status: string;
    score: number;
    submission_date: number;
    student: {
      student_id: string;
      student_name: string;
      profile_pic: string;
    };
  }[];
};

export type {
  ClassAssignment,
  ClassAssignmentSubmission,
  ListClassAssignmentSubmissionsResponse,
};
