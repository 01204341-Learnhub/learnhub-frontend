import axios from "axios";
import { LearnhubUser } from "../../../types/user";
import {
  Class,
  ClassDetail,
  EnrolledClass,
  SimpleThread,
} from "../types/classes";
import {
  GetClassDetailResponse,
  ListClassAssignmentsResponse,
  ListClassStudentsResponse,
  ListClassThreadsResponse,
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

async function getClass(classID: string): Promise<Class> {
  const classDetail = await getClassDetail(classID);
  const classStudents = await listClassStudents(classID);
  const classTeacher = await getTeacher(classDetail.teacher.teacherID);
  const simpleThreads = await listSimpleThreads(classID);
  const c: Class = {
    classId: classDetail.classID,
    name: classDetail.name,
    thumbnailUrl: classDetail.thumbnailUrl,
    students: classStudents,
    simpleThreads: simpleThreads,
    teacher: classTeacher,
  };
  return c;
}

async function getClassDetail(classID: string): Promise<ClassDetail> {
  const url = `${baseURL}/programs/classes/${classID}`;
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

async function listClassStudents(classID: string): Promise<LearnhubUser[]> {
  const url = `${baseURL}/programs/classes/${classID}/students`;
  const res = await axios.get<ListClassStudentsResponse>(url);
  const students: LearnhubUser[] = [];
  for (let i = 0; i < res.data.students.length; i++) {
    const s = await axios.get<{
      username: string;
      fullname: string;
      email: string;
    }>(`${baseURL}/users/students/${res.data.students[i].student_id}`);
    students.push({
      userType: "student",
      userID: res.data.students[i].student_id,
      username: s.data.username,
      fullname: s.data.fullname,
      profilePicture: res.data.students[i].profile_pic,
      email: s.data.email,
    });
  }
  return students;
}

async function getTeacher(teacherID: string): Promise<LearnhubUser> {
  const url = `${baseURL}/users/teachers/${teacherID}`;
  const res = await axios.get<{
    username: string;
    fullname: string;
    email: string;
    profile_pic: string;
  }>(url);
  return {
    userType: "teacher",
    userID: teacherID,
    username: res.data.username,
    fullname: res.data.fullname,
    email: res.data.email,
    profilePicture: res.data.profile_pic,
  };
}

async function listSimpleThreads(classID: string): Promise<SimpleThread[]> {
  const simpleThreads: SimpleThread[] = [];
  const threads = await listClassThreads(classID);
  const assignments = await listClassAssignments(classID);
  threads.threads.forEach((t) => {
    simpleThreads.push({
      threadId: t.thread_id,
      typ: "announcement",
      name: t.name,
      lastEdit: new Date(t.last_edit * 1000),
    });
  });
  assignments.assignments.forEach((a) => {
    simpleThreads.push({
      threadId: a.assignment_id,
      typ: "homework",
      name: a.name,
      lastEdit: new Date(a.last_edit * 1000),
      homeworkTopicName: a.group_name,
    });
  });
  simpleThreads.sort((a, b) => {
    return b.lastEdit.getTime() - a.lastEdit.getTime();
  });
  return simpleThreads;
}

async function listClassThreads(
  classID: string
): Promise<ListClassThreadsResponse> {
  const url = `${baseURL}/programs/classes/${classID}/threads`;
  const res = await axios.get<ListClassThreadsResponse>(url);
  return res.data;
}

async function listClassAssignments(
  classID: string
): Promise<ListClassAssignmentsResponse> {
  const url = `${baseURL}/programs/classes/${classID}/assignments`;
  const res = await axios.get<ListClassAssignmentsResponse>(url);
  return res.data;
}

export {
  listEnrolledClass,
  getClass,
  getClassDetail,
  listClassStudents,
  getTeacher,
  listSimpleThreads,
  listClassThreads,
  listClassAssignments,
};
