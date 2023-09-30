
type Tag = {
    tagId: string
    tagName: string
}

type ResponseData = {
    course_id: string
    name: string
    course_pic: string
    teacher: {
        teacher_id: string
        teacher_name: string
    }
    tags: {
        tag_id: string
        tag_name : string
    }[]
    rating: number
    review_count: number
    price: number
}


export type ResponseGetCourseId = {
    course_id : string
    name : string
    course_pic : string
    tags : {
        tag_id : string
        tag_name : string
    }[]
    description : string
    course_objective : string
    course_requirement : string
    difficulty_level : string
    rating : number
    review_count : number
    student_count : number
    teacher : {
        teacher_id : string
        teacher_name : string
    },
    price: number
    total_video_length : number
    chapter_count : number
    quiz_count : number
    file_count : number
    video_count : number
}

export type ResponseGetCourses = {
    courses : ResponseData[]
}