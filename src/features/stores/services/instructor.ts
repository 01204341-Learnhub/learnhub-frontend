import axios from "axios";
import { BASE_URL } from "../../../config";
import { listTeacherClasses } from "../../teaches/services/classes";
import { listTeachCourse } from "../../teaches/services/courses";
import { InstructorProfile } from "../types/instructor";
import { ResponseTeacherInfo } from "../types/response";

async function getInstructor(teacherID: string) {
  const url = `${BASE_URL}${teacherID}`;
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
    classes: fetchedClasses,
  };
  return instructor;
}
export { getInstructor };
