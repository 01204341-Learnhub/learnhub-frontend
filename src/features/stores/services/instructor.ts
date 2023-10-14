import axios from "axios";
import { ResponseTeacherInfo } from "../types/response";
import { InstructorProfile } from "../types/instructor";
import { listTeachCourse } from "../../teaches/services/courses";
import { listTeacherClasses } from "../../teaches/services/classes";

const baseUrl = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000/users/teachers/";

async function getInstructor(teacherID: string) {
  const url = `${baseUrl}${teacherID}`;
  const res = await axios.get<ResponseTeacherInfo>(url);
  const fetchedCourses = await listTeachCourse(teacherID);
  const fetchedClasses = await listTeacherClasses(teacherID);
  const instructor: InstructorProfile = {
    uID: res.data.uid,
    teacherID: res.data.teacher_id,
    userName: res.data.username,
    fullName: res.data.fullname,
    email: res.data.email,
    profilePic: res.data.profile_pic,
    courses: fetchedCourses,
    classes: fetchedClasses
  };
  return instructor;
}
export { getInstructor };
