import axios from "axios";
import { BASE_URL } from "../../../config.ts";
import { ClassInfo, CreatingClass } from "../types/class.ts";
import { ClassAssignment } from "../types/classWork.ts";
import {
  GetClassInfoResponse,
  ListClassAssignmentsResponse,
  ListClassStudentsResponse,
  ListClassThreadsResponse,
  ListTeacherClassesResponse,
} from "../types/responses.ts";
import { ClassStudent } from "../types/student.ts";
import { Thread } from "../types/thread.ts";

async function listTeacherClasses(teacherID: string): Promise<ClassInfo[]> {
  const url = `${BASE_URL}/users/teachers/${teacherID}/classes`;
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

async function listClassStudents(classID: string) {
  const url = `${BASE_URL}/programs/classes/${classID}/students`;
  const res = await axios.get<ListClassStudentsResponse>(url);
  const students: ClassStudent[] = res.data.students.map((s) => ({
    studentID: s.student_id,
    name: s.name,
    avatarURL: s.profile_pic,
  }));
  return students;
}

async function publishClass(cls: CreatingClass): Promise<string> {
  const url = `${BASE_URL}/programs/classes`;
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

async function getClassTagAndObjectives(classID: string) {
  const url = `${BASE_URL}/programs/classes/${classID}`;
  const res = await axios.get<GetClassInfoResponse>(url);
  return {
    tagID: res.data.tags[0].tag_id,
    objectives: res.data.class_objective,
  };
}

async function updateClass(cls: CreatingClass, classID: string) {
  const url = `${BASE_URL}/programs/classes/${classID}`;
  // clear objectives
  const old = await getClassTagAndObjectives(classID);
  const clearObjective = old.objectives.map((o) => ({
    op: "remove",
    value: o,
  }));
  await axios.patch(url, { class_objective: clearObjective });

  // clear tags
  const clearTag = {
    tag_id: old.tagID,
    op: "remove",
  };
  await axios.patch(url, { tag: clearTag });

  const body = {
    name: cls.name,
    class_pic: cls.pictureUrl,
    class_objective: cls.objectives.map((o) => ({
      op: "add",
      value: o,
    })),
    tag: {
      tag_id: cls.tag.tagID,
      op: "add",
    },
    description: cls.description,
    class_requirement: cls.requirement,
  };
  await axios.patch(url, body);
}

async function listClassAssignments(classID: string) {
  const url = `${BASE_URL}/programs/classes/${classID}/assignments`;
  const res = await axios.get<ListClassAssignmentsResponse>(url);
  const assignments: ClassAssignment[] = [];
  for (let i = 0; i < res.data.assignments.length; i++) {
    const getAssignmentUrl = `${BASE_URL}/programs/classes/${classID}/assignments/${res.data.assignments[i].assignment_id}`;
    const assignmentRes = await axios.get<{
      attachments: { attachment_type: string; src: string }[];
    }>(getAssignmentUrl);
    const a: ClassAssignment = {
      assignmentID: res.data.assignments[i].assignment_id,
      name: res.data.assignments[i].name,
      description: res.data.assignments[i].text,
      attachments: assignmentRes.data.attachments.map((a) => ({
        src: a.src,
        attachmentType: a.attachment_type,
      })),
      lastEdit: new Date(res.data.assignments[i].last_edit * 1000),
      score: res.data.assignments[i].max_score,
      topic: res.data.assignments[i].group_name,
      send: res.data.assignments[i].submission_count.submit_count,
      nosend: res.data.assignments[i].submission_count.unsubmit_count,
    };
    assignments.push(a);
  }
  return assignments;
}

async function getClass(classID: string): Promise<CreatingClass> {
  const url = `${BASE_URL}/programs/classes/${classID}`;
  const res = await axios.get<GetClassInfoResponse>(url);
  const data = res.data;
  const cls: CreatingClass = {
    name: data.name,
    pictureUrl: data.class_pic,
    teacher: undefined,
    description: data.description,
    maxStudent: data.max_student,
    price: data.price,
    objectives: data.class_objective,
    requirement: data.class_requirement,
    level: data.difficulty_level,
    tag: {
      tagID: data.tags[0].tag_id,
      name: data.tags[0].tag_name,
    },
    schedule: data.schedules.map((s) => ({
      start: new Date(s.start * 1000),
      end: new Date(s.end * 1000),
    })),
    start: new Date(data.open_date * 1000),
    registrationEnd: new Date(data.registration_ended_date * 1000),
    end: new Date(data.class_ended_date * 1000),
  };
  return cls;
}

async function createClassAssignment(
  classID: string,
  assignment: ClassAssignment
) {
  const url = `${BASE_URL}/programs/classes/${classID}/assignments`;
  const body = {
    name: assignment.name,
    group_name: assignment.topic,
    due_date: Math.floor(assignment.dueDate.getTime() / 1000),
    text: assignment.description,
    max_score: assignment.score,
    attachments: assignment.attachments.map((a) => ({
      attachment_type: a.attachmentType,
      src: a.src,
    })),
  };
  const res = await axios.post<{ assignment_id: string }>(url, body);
  return res.data.assignment_id;
}

async function listClassThreads(classID: string): Promise<Thread[]> {
  const url = `${BASE_URL}/programs/classes/${classID}/threads`;
  const res = await axios.get<ListClassThreadsResponse>(url);
  return res.data.threads
    .map((thread) => ({
      classId: classID,
      threadId: thread.thread_id,
      name: thread.name,
      teacher: {
        userID: thread.teacher.teacher_id,
        userType: "teacher",
        username: thread.teacher.teacher_name,
        fullname: thread.teacher.teacher_name,
        email: "",
        profilePicture: thread.teacher.profile_pic,
      },
      text: "",
      attachments: [],
      lastEdit: new Date(thread.last_edit * 1000),
      replies: [],
    }))
    .sort((a, b) => b.lastEdit.getTime() - a.lastEdit.getTime()) as Thread[];
}

export {
  createClassAssignment,
  getClass,
  listClassAssignments,
  listClassStudents,
  listClassThreads,
  listTeacherClasses,
  publishClass,
  updateClass,
};
