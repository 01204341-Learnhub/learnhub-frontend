type Work = {
  workName: string;
  workDescription: string;
  workAttachments: { src: string; name: string }[];
  workDueDate?: Date;
  workScore: number;
  workTopic: string;
};

export type { Work };
