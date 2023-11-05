import axios from "axios";
import { HomeworkDetail } from "../types/homework";
import {
  GetClassAssignmentResponse,
  GetClassInfoResponse,
} from "../types/responses";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function getClsName(classId: string): Promise<string> {
  const url = `${baseURL}/programs/classes/${classId}`;
  const res = await axios.get<GetClassInfoResponse>(url);
  return res.data.name;
}

async function getClassAssignment(
  classId: string,
  assignmentId: string
): Promise<GetClassAssignmentResponse> {
  const url = `${baseURL}/programs/classes/${classId}/assignments/${assignmentId}`;
  const res = await axios.get<GetClassAssignmentResponse>(url);
  return res.data;
}

async function getHomeworkDetail(
  classId: string,
  homeworkId: string
): Promise<HomeworkDetail> {
  const res = await getClassAssignment(classId, homeworkId);
  const clsName = await getClsName(classId);
  return {
    classId: classId,
    clsName: clsName,
    homeworkId: homeworkId,
    name: res.name,
    fullScore: res.max_score,
    duDateTime: new Date(res.due_date * 1000),
    text: res.text,
    attachments: res.attachments.map((a) => ({
      typ: a.attachment_type,
      src: a.src,
    })),
    replies: res.replies.map((r) => ({
      user: {
        userType: r.user.type,
        userID: r.user.user_id,
        username: r.user.name,
        fullname: r.user.name,
        email: "",
        profilePicture: r.user.profile_pic,
      },
      dateTime: new Date(r.reply_date * 1000),
      text: r.text,
    })),
  };
}

async function addClassHomeworkReply(
  userId: string,
  classId: string,
  homeworkId: string,
  text: string
): Promise<void> {
  const url = `${baseURL}/programs/classes/${classId}/assignments/${homeworkId}/reply`;
  await axios.post(url, {
    user_id: userId,
    user_type: "teacher",
    text: text,
  });
}

export {
  getClsName,
  getClassAssignment,
  getHomeworkDetail,
  addClassHomeworkReply,
};
