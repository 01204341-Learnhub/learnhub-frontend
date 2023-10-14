import axios from "axios";
import { ClassInfo } from "../types/class.ts";
import { ListTeacherClassesResponse } from "../types/responses.ts";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
async function listTeacherClasses(teacherID: string): Promise<ClassInfo[]> {
  const url = `${baseURL}/users/teachers/${teacherID}/classes`;
  const res = await axios.get<ListTeacherClassesResponse>(url);
  const classes: ClassInfo[] = res.data.classes.map((c) => {
    return {
      classID: c.class_id,
      className: c.name,
      classThumbnailUrl: c.class_pic,
      percentCompleted: 999,
      studentCount: c.student_count,
      studentLimit: c.max_student,
    };
  });
  return classes;
}

export { listTeacherClasses };
