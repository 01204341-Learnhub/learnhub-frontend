import axios from "axios";
import { EnrolledCourse } from "../types/course";
import { ListEnrolledCoursesResponse } from "../types/response";

const baseURL = "http://localhost:8000";

async function listEnrolledCourses(
  studentID: string
): Promise<EnrolledCourse[]> {
  const url = `${baseURL}/users/students/${studentID}/courses/`;
  const res = await axios.get<ListEnrolledCoursesResponse>(url);
  const enrolledCourses: EnrolledCourse[] = [];
  res.data.courses.map((course) => {
    enrolledCourses.push({
      courseID: course.course_id,
      name: course.name,
      status: course.status,
      teacher: {
        teacherID: course.teacher.teacher_id,
        name: course.teacher.name,
        avatarUrl: course.teacher.profile_pic,
      },
      progress: course.progress,
      rating: course.rating,
      thumbnailUrl: course.course_pic,
    });
  });
  return enrolledCourses;
}

export { listEnrolledCourses };
