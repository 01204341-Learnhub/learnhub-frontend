type Submission = {
  status : string;
  attachments?: { src: string; name: string }[];
  submissionDate?: Date;
  score: number;
  studentName: string;
  studentId : string;
  studentPic? : string;
  
};

export type { Submission };
