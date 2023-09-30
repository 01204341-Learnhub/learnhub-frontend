
type Tag = {
    tagId: string
    tagName: string
}

type ResponseDataCourse = {
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

export type PostDataCourse = {
    name : string
    teacher_id: string
    course_pic : string
    description: string
    course_objective: string[]
    tag_ids: string[]
    course_requirement: string
    difficulty_level: string
    price: number
}

export type ResponseChapterDetail = {
    chapter_id: string
    course_id: string
    chapter_num: string
    name: string
    description: string
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
    course_objective : string[]
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


type ResponseChapter = {
    chapter_id: string
    chapter_num: number
    name: string
    lesson_count: number
    chapter_length: number
}



export type ResponseChapters = {
    chapters : ResponseChapter[]
}

export type ResponseGetCourses = {
    courses : ResponseDataCourse[]
}

