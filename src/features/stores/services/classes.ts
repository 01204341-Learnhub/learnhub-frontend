import axios from "axios";
import { ClassProgram, ClassProgramDetail } from "../types/class";
import { GetClassResponse, ListClassesResponse } from "../types/response";

async function listClass() {
  return [];
}
const baseURL = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";

async function getNewClasses(num: number) {
  const newClasses = [];
  for (let i = 0; i < num; i++) {
    newClasses.push({
      id: `${i + 1}`,
      description: "",
      name: "How to be a Good boy like Boom",
      price: 999,
      cover: `https://picsum.photos/${i}/${300}`,
      intructor: {
        id: "1",
        name: "Barammey Kung",
        avatarUrl: "",
        jobTitle: "Good Guy",
      },
      tags: [
        {
          tagId: `${i + 1}`,
          tagName: "Hot",
        },
      ],
      registerEndedDate: "120945",
    });
  }
  return newClasses;
}

async function listAllClasses(): Promise<ClassProgram[]> {
  const url = `${baseURL}/programs/classes`;
  const res = await axios.get<ListClassesResponse>(url);
  const classes = res.data.classes.map<ClassProgram>((c) => {
    return {
      classID: c.class_id,
      name: c.name,
      thumbnailURL: c.class_pic,
      instructor: {
        name: c.teacher.teacher_name,
        id: c.teacher.teacher_id,
        avatarURL: c.teacher.profile_pic,
      },
      description: c.description,
      status: c.status,
      tags: c.tags.map((t) => {
        return {
          tagID: t.tag_id,
          name: t.tag_name,
        };
      }),
      registerEndedDate: c.registration_ended_date,
      openDate: c.open_date,
      classEndedDate: c.class_ended_date,
      price: c.price,
      difficultyLevel: c.difficulty_level,
    };
  });
  return classes;
}

async function getClasses(classID: string) {
  const url = `${baseURL}/programs/classes/${classID}`;
  const res = await axios.get<GetClassResponse>(url);
  const classProgram: ClassProgramDetail = {
    classID: classID,
    name: res.data.name,
    thumbnailURL: res.data.class_pic,
    instructor: {
      name: res.data.teacher.teacher_name,
      teacherID: res.data.teacher.teacher_id,
      avatarURL: res.data.teacher.profile_pic,
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
        start: s.start,
        end: s.end,
      };
    }),
    registerEndedDate: res.data.registration_ended_date,
    openDate: res.data.open_date,
    classEndedDate: res.data.class_ended_date,
    price: res.data.price,
    classObjective: res.data.class_objective,
    classRequirement: res.data.class_requirement,
    difficultyLevel: res.data.difficulty_level,
    meetingCount: res.data.schedules.length,
    studentCount: res.data.student_count,
    maxStudent: res.data.max_student,
    assignmentCount: res.data.assignment_count,
  };
  return classProgram;
}

export { getClasses, getNewClasses, listAllClasses, listClass };
