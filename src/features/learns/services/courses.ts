import axios from "axios";
import { BASE_URL } from "../../../config";
import { EnrolledCourse } from "../types/course";
import { ListEnrolledCoursesResponse } from "../types/response";

async function listEnrolledCourses(
  studentID: string
): Promise<EnrolledCourse[]> {
  const url = `${BASE_URL}/users/students/${studentID}/courses/`;
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
