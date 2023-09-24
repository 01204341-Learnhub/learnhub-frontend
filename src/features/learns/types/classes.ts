export type Teacher = {
    id: string
    name: string
}

type Tag = {
    id: string
    name: string
}


export type EnrolledClass = {
    id: string,
    name: string,
    imageClassUrl: string
    teacher: Teacher
    status: string
    tags: Tag[]
    registrationEndDate: number
    price: number 
}