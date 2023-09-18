import { Instructor } from "./instructor";

export type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  cover: string;
  intructor: Instructor;
  reviewerCount: number;
  rating: number;
};
