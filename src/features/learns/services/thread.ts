import axios from "axios";
import { BASE_URL } from "../../../config";
import {
  GetClassAssignmentResponse,
  GetClassAssignmentSubmissionResponse,
  GetClassThreadResponse,
} from "../types/response";
import { HomeworkSubmissionFile, Thread } from "../types/thread";
import { getClassDetail, getTeacher } from "./classes";

async function fetchThread(
  userId: string,
  classId: string,
  threadId: string,
  typ: "announcement" | "homework"
): Promise<Thread> {
  const classDetail = await getClassDetail(classId);
  const teacher = await getTeacher(classDetail.teacher.teacherID);
  if (typ === "announcement") {
    const classThread = await getClassThread(classId, threadId);
    return {
      classId: classId,
      clsName: classDetail.name,
      teacher: teacher,
      threadId: threadId,
      name: classThread.name,
      typ: typ,
      text: classThread.text,
      attachments: classThread.attachments.map((a) => ({
        typ: a.attachment_type,
        src: a.src,
      })),
      lastEdit: new Date(classThread.last_edit * 1000),
      replies: classThread.replies
        .map((r) => ({
          user: {
            userType: r.user.type,
            userID: r.user.user_id,
            username: "",
            fullname: r.user.name,
            email: "",
            profilePicture: r.user.profile_pic,
          },
          dateTime: new Date(r.reply_date * 1000),
          text: r.text,
        }))
        .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime()),
    };
  } else if (typ === "homework") {
    const classAssignment = await getClassAssignment(classId, threadId);
    const classAssignmentSubmission = await getClassAssignmentSubmission(
      classId,
      threadId,
      userId
    );
    return {
      classId: classId,
      clsName: classDetail.name,
      teacher: teacher,
      threadId: threadId,
      name: classAssignment.name,
      typ: typ,
      text: classAssignment.text,
      attachments: classAssignment.attachments.map((a) => ({
        typ: a.attachment_type,
        src: a.src,
      })),
      lastEdit: new Date(classAssignment.last_edit * 1000),
      replies: classAssignment.replies
        .map((r) => ({
          user: {
            userType: r.user.type,
            userID: r.user.user_id,
            username: "",
            fullname: r.user.name,
            email: "",
            profilePicture: r.user.profile_pic,
          },
          dateTime: new Date(r.reply_date * 1000),
          text: r.text,
        }))
        .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime()),
      homeworkTopicName: classAssignment.group_name,
      homeworkDueDateTime: new Date(classAssignment.due_date * 1000),
      homeworkStatus: classAssignment.status,
      homeworkFullScore: classAssignment.max_score,
      homeworkSubmissionStatus: (() => {
        if (classAssignmentSubmission.status === "check") {
          return "submitted-and-graded";
        }
        if (classAssignmentSubmission.status === "uncheck") {
          return "submitted";
        }
        if (classAssignmentSubmission.status === "unsubmit") {
          return "not-submitted";
        }
      })(),
      homeworkLastSubmissionDateTime: (() => {
        if (classAssignmentSubmission.status === "unsubmit") {
          return undefined;
        }
        return new Date(classAssignmentSubmission.submission_date * 1000);
      })(),
      homeworkSubmissionFiles: classAssignmentSubmission.attachments.map(
        (a) => ({
          typ: a.attachment_type,
          src: a.src,
        })
      ),
      homeworkGotScore: classAssignmentSubmission.score,
    };
  }
}

async function addThreadReply(
  userId: string,
  classId: string,
  threadId: string,
  typ: "announcement" | "homework",
  text: string
): Promise<void> {
  const url = `${BASE_URL}/programs/classes/${classId}/${
    typ === "announcement" ? "threads" : "assignments"
  }/${threadId}/reply`;
  await axios.post(url, {
    user_id: userId,
    user_type: "student",
    text: text,
  });
}

async function submitThreadHomework(
  userId: string,
  classId: string,
  threadId: string,
  homeworkSubmissionFiles: HomeworkSubmissionFile[]
): Promise<void> {
  const url = `${BASE_URL}/programs/classes/${classId}/assignments/${threadId}/submissions/${userId}/submit`;
  await axios.put(url, {
    attachments: homeworkSubmissionFiles.map((f) => ({
      attachment_type: f.typ,
      src: f.src,
    })),
  });
}

async function unsubmitThreadHomework(
  userId: string,
  classId: string,
  threadId: string
): Promise<void> {
  const url = `${BASE_URL}/programs/classes/${classId}/assignments/${threadId}/submissions/${userId}/unsubmit`;
  await axios.patch(url);
}

async function getClassThread(
  classId: string,
  threadId: string
): Promise<GetClassThreadResponse> {
  const url = `${BASE_URL}/programs/classes/${classId}/threads/${threadId}`;
  const res = await axios.get<GetClassThreadResponse>(url);
  return res.data;
}

async function getClassAssignment(
  classId: string,
  assignmentId: string
): Promise<GetClassAssignmentResponse> {
  const url = `${BASE_URL}/programs/classes/${classId}/assignments/${assignmentId}`;
  const res = await axios.get<GetClassAssignmentResponse>(url);
  return res.data;
}

async function getClassAssignmentSubmission(
  classId: string,
  assignmentId: string,
  studentId: string
): Promise<GetClassAssignmentSubmissionResponse> {
  const url = `${BASE_URL}/programs/classes/${classId}/assignments/${assignmentId}/submissions/${studentId}`;
  const res = await axios.get<GetClassAssignmentSubmissionResponse>(url);
  return res.data;
}

export {
  addThreadReply,
  fetchThread,
  getClassAssignment,
  getClassAssignmentSubmission,
  getClassThread,
  submitThreadHomework,
  unsubmitThreadHomework,
};
