type Work = {
  name: string;
  description: string;
  attachments: { src: string; name: string }[];
  dueDate?: Date;
  score: number;
  topic: string;
};

export type { Work };