import { LearnhubUser } from "../../../types/user";
import { Tag } from "./tags";

type Session = {
  start: Date;
  end: Date;
};

type CreatingClass = {
  name: string;
  pictureUrl: string;
  teacher: LearnhubUser;
  description: string;
  maxStudent: number;
  price: number;
  objectives: string[];
  requirement: string;
  level: string;
  tag?: Tag;
  schedule: Session[];
  start?: Date;
  registrationEnd?: Date;
  end?: Date;
};

type ClassInfo = {
  classID: string;
  classThumbnailUrl: string;
  className: string;
  percentCompleted: number;
  studentCount: number;
  studentLimit: number;
};

const availableLevels: string[] = ["Beginner", "Intermediate", "Advanced"];

export type { Session, CreatingClass, ClassInfo };
export { availableLevels };
