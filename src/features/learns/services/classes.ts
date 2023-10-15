import axios from "axios";
import { ClassDetail, EnrolledClass } from "../types/classes";
import {
  GetClassDetailResponse,
  ListEnrolledClassesResponse,
} from "../types/response";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function listEnrolledClass(studentID: string): Promise<EnrolledClass[]> {
  studentID;
  const url = `${baseURL}/users/students/${studentID}/classes`;
  const res = await axios.get<ListEnrolledClassesResponse>(url);
  const enrolled: EnrolledClass[] = [];
  for (let i = 0; i < res.data.classes.length; i++) {
    const c = res.data.classes[i];
    const detail = await getClassDetail(c.class_id);
    enrolled.push({
      id: c.class_id,
      imageClassUrl: c.class_pic,
      name: c.name,
      price: 0,
      tags: [{ id: detail.tags[0].tagID, name: detail.tags[0].name }],
      status: detail.status,
      teacher: {
        id: c.teacher.teacher_id,
        name: c.teacher.teacher_name,
      },
      registrationEndDate: detail.registrationEndDate,
      endDate: detail.EndDate,
    });
  }
  return enrolled;
}

async function getClassDetail(classID: string) {
  const url = `${baseURL}/prgrams/classes/${classID}`;
  const res = await axios.get<GetClassDetailResponse>(url);
  const classDetail: ClassDetail = {
    classID: res.data.class_id,
    name: res.data.name,
    thumbnailUrl: res.data.class_pic,
    teacher: {
      teacherID: res.data.teacher.teacher_id,
      name: res.data.teacher.teacher_name,
      avatarUrl: res.data.teacher.profile_pic,
    },
    description: res.data.description,
    tags: res.data.tags.map((t) => {
      return {
        tagID: t.tag_id,
        name: t.tag_name,
      };
    }),
    status: res.data.status,
    schedules: res.data.schedules.map((s) => {
      return {
        start: new Date(s.start),
        end: new Date(s.end),
      };
    }),
    registrationEndDate: new Date(res.data.registration_ended_date),
    openDate: new Date(res.data.open_date),
    EndDate: new Date(res.data.class_ended_date),
    objectives: res.data.class_objective,
    price: res.data.price,
    difficultyLevel: res.data.difficulty_level,
    requirements: res.data.class_requirement,
    studentCount: res.data.student_count,
    studentLimit: res.data.max_student,
  };
  return classDetail;
}

export { getClassDetail, listEnrolledClass };
