
type Tag = {
    tagID: string
    tagName: string
}

export type ResponseGetCourse = {
    courseID: string
    name: string
    coursePic: string
    teacher: {
        teacherID: string
        teacherName: string
    }
    tags: Tag[]
    rating: number
    reviewCount: number
    price: number
}