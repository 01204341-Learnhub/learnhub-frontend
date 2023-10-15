import axios from "axios";
import { ClassInfo, CreatingClass } from "../types/class.ts";
import { ClassAssignment } from "../types/classWork.ts";
import {
  ListClassAssignmentsResponse,
  ListClassStudentsResponse,
  ListTeacherClassesResponse,
} from "../types/responses.ts";
import { ClassStudent } from "../types/student.ts";

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

async function listClassStudents(classID: string) {
  const url = `${baseURL}/programs/classes/${classID}/students`;
  const res = await axios.get<ListClassStudentsResponse>(url);
  const students: ClassStudent[] = res.data.students.map((s) => ({
    studentID: s.student_id,
    name: s.name,
    avatarURL: s.profile_pic,
  }));
  return students;
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

async function listClassAssignments(classID: string) {
  const url = `${baseURL}/programs/classes/${classID}/assignments`;
  const res = await axios.get<ListClassAssignmentsResponse>(url);
  const assignments: ClassAssignment[] = [];
  for (let i = 0; i < res.data.assignments.length; i++) {
    const getAssignmentUrl = `${baseURL}/programs/classes/${classID}/assignments/${res.data.assignments[i].assignment_id}`;
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
      score: res.data.assignments[i].max_score,
      topic: res.data.assignments[i].group_name,
      send: res.data.assignments[i].submission_count.submit_count,
      nosend: res.data.assignments[i].submission_count.unsubmit_count,
    };
    assignments.push(a);
  }
  return assignments;
}

async function createClassAssignment(
  classID: string,
  assignment: ClassAssignment
) {
  const url = `${baseURL}/programs/classes/${classID}/assignments`;
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

export {
  createClassAssignment,
  listClassAssignments,
  listClassStudents,
  listTeacherClasses,
  publishClass,
};
