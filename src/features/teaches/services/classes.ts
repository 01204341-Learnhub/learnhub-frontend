import axios from "axios";
import { ClassInfo, CreatingClass } from "../types/class.ts";
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

async function publishClass(cls: CreatingClass): Promise<string> {
  const url = `${baseURL}/programs/classes`;
  const body = {
    name: cls.name,
    class_pic: cls.pictureUrl,
    teacher_id: cls.teacher.userID,
    max_student: cls.maxStudent,
    price: cls.price,
    description: cls.description,
    class_objective: cls.objectives,
    class_requirement: cls.requirement,
    difficulty_level: cls.level,
    tag_ids: [cls.tag.tagID],
    schedules: cls.schedule.map((s) => ({
      start: Math.floor(s.start.getTime() / 1000),
      end: Math.floor(s.end.getTime() / 1000),
    })),
    registration_ended_date: Math.floor(cls.registrationEnd!.getTime() / 1000),
    open_date: Math.floor(cls.start!.getTime() / 1000),
    class_ended_date: Math.floor(cls.end!.getTime() / 1000),
  };
  const res = await axios.post<{ class_id: string }>(url, body);
  return res.data.class_id;
}

export { listTeacherClasses, publishClass };
