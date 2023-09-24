import { Instructor } from "./instructor";


export type ClassProgram = {
    id: string;
    name: string;
    description: string;
    price: number;
    cover: string;
    intructor: Instructor;
}