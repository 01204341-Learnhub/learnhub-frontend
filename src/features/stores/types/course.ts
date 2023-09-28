import { Instructor } from "./instructor";

export type Tag = {
  tagId: string
  tagName: string
}

export type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  cover: string;
  intructor: Instructor;
  reviewerCount: number;
  rating: number;
  tag: Tag[]
};
