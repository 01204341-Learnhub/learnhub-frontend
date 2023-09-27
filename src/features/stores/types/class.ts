import { Instructor } from "./instructor";

type Tag = {
    tagId: string
    tagName: string
}

export type ClassProgram = {
    id: string;
    name: string;
    description: string;
    price: number;
    cover: string;
    intructor: Instructor;
    registerEndedDate: string;
    tags: Tag[];
    
}