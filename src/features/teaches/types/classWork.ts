type ClassAssignment = {
  assignmentID: string;
  name: string;
  description: string;
  attachments: { src: string; attachmentType: string }[];
  dueDate?: Date;
  score: number;
  topic: string;
  send: number;
  nosend: number;
};

export type { ClassAssignment };
