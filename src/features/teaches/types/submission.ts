type submission = {
    status : "check"| "uncheck" | "unsubmit";
    description: string;
    attachments: { src: string; name: string }[];
    submission_date?: Date;
    score: number;
    student_name: string;
    student_id : number;
    student_pic? : string;
    
  };
  
  export type { submission };
  