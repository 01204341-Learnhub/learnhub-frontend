type ClassProgram = {
  classID: string;
  name: string;
  thumbnailURL: string;
  instructor: {
    id: string;
    name: string;
    avatarURL: string;
  };
  description: string;
  status: string;
  tags: {
    tagID: string;
    name: string;
  }[];
  registerEndedDate: number;
  openDate: number;
  classEndedDate: number;
  price: number;
};

type ClassProgramDetail = {
  classID: string;
  name: string;
  thumbnailURL: string;
  instructor: {
    teacherID: string;
    name: string;
    avatarURL: string;
  };
  description: string;
  tags: {
    tagID: string;
    name: string;
  }[];
  status: string;
  schedules: {
    start: number;
    end: number;
  }[];
  registerEndedDate: number;
  openDate: number;
  classEndedDate: number;
  price: number;
  classObjective: string[];
  classRequirement: string;
  difficultyLevel: string;
  meetingCount: number;
  studentCount: number;
  maxStudent: number;
  assignmentCount: number;
};

export type { ClassProgram, ClassProgramDetail };
