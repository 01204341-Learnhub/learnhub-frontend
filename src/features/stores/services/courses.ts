import axios from "axios";
import { CourseDetailData, Course } from "../types/course";
import { Tag } from "../types/course";
import { ResponseGetCourses, ResponseGetCourseId } from "../types/response";


async function listCourse() {
  return [];
}



async function getCourse(id: string): Promise<CourseDetailData> {

  try {
    const response = await axios.get<ResponseGetCourseId>(`http://localhost:8000/programs/courses/${id}`)
    const courseIdData = response.data
    
    return {
      courseId : courseIdData.course_id,
      name: courseIdData.name,
      coursePic: courseIdData.course_pic,
      tags : courseIdData.tags.map(tag => ({
        tagId: tag.tag_id,
        tagName: tag.tag_name
  
      })),
      description: courseIdData.description,
      objective: courseIdData.course_objective,
      level: courseIdData.difficulty_level,
      rating: courseIdData.rating,
      reviewCount: courseIdData.review_count,
      studentCount : courseIdData.chapter_count,
      instructor : {
        id: courseIdData.teacher.teacher_id,
        name: courseIdData.teacher.teacher_name,
        avatarUrl: "https://thethaiger.com/th/wp-content/uploads/2023/07/F0LUzN6aQAEFxD8-1480x833.jpg",
        jobTitle: "Scotte Langnuk"
      },
      price: courseIdData.price,
      videoLength: courseIdData.total_video_length,
      videoCount : courseIdData.video_count,
      chapterCount : courseIdData.chapter_count,
      quizCount: courseIdData.quiz_count,
      fileCount : courseIdData.file_count,
      requirement: courseIdData.course_requirement
    
    }
  } catch (err) {

  }

  

}

async function getAllCourses(): Promise<Course[]> {
  const programCourse: Course[] = [];
  

  try {
      const response = await axios.get<ResponseGetCourses>(`http://localhost:8000/programs/courses/`);
      const courseData = response.data.courses
      
    
      courseData.map(async (program) => {
      console.log(program.course_id)
      programCourse.push({
        courseId: program.course_id,
        name: program.name,
        description: "hello",
        price: program.price,
        cover: program.course_pic,
        intructor: {
          id : program.teacher.teacher_id,
          name: program.teacher.teacher_name,
          avatarUrl: "",
          jobTitle: "Scotte lungnuk",
        },
        reviewerCount: program.review_count,
        rating: program.rating,
        tags: program.tags.map(tag => ({
          tagId: tag.tag_id,
          tagName: tag.tag_name
        }))
      });
    })

  } catch (err) {
      
  }
  return programCourse
}


async function getPopularCourse(num: number) : Promise<Course[]> {
  const popularCourses = [];

  for (let i = 0; i < num; i++) {
    popularCourses.push({
      id: `C${i+1}`,
      name: "How to train to Busan",
      description: "what is zombies in Busan doing",
      price: 2099,
      cover: `https://picsum.photos/${i}/${300}`,
      intructor: {
        id: "1",
        name: "Baramika laokrub",
        avatarUrl: "",
        jobTitle: "Scotte lungnuk",
      },
      reviewerCount: 10000,
      rating: 4.4,
      tags: [
        {
          tagId: `T${i+1}`,
          tagName: "ยอดนิยม"
        }
      ]
      
    });
  }
  


  return popularCourses
}

export { getCourse, getAllCourses, listCourse, getPopularCourse };
