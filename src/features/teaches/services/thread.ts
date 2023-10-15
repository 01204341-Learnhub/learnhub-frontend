import axios from "axios";
import { Thread } from "../types/thread";
import { GetClassThreadResponse } from "../types/responses";
import { LearnhubUser } from "../../../types/user";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function fetchThread(classId: string, threadId: string): Promise<Thread> {
  const classThread = await getClassThread(classId, threadId);
  const teacher = await getTeacher(classThread.teacher.teacher_id);
  return {
    classId: classId,
    threadId: threadId,
    name: classThread.name,
    teacher: teacher,
    text: classThread.text,
    attachments: classThread.attachments.map((attachment) => {
      return {
        typ: attachment.attachment_type,
        src: attachment.src,
      };
    }),
    lastEdit: new Date(classThread.last_edit * 1000),
    replies: classThread.replies
      .map((reply) => ({
        user: {
          userType: reply.user.type,
          userID: reply.user.user_id,
          username: reply.user.name,
          fullname: reply.user.name,
          email: "",
          profilePicture: reply.user.profile_pic,
        },
        dateTime: new Date(reply.reply_date * 1000),
        text: reply.text,
      }))
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime()),
  };
}

async function addThreadReply(
  userId: string,
  classId: string,
  threadId: string,
  text: string
): Promise<void> {
  const url = `${baseURL}/programs/classes/${classId}/threads/${threadId}/reply`;
  await axios.post(url, {
    user_id: userId,
    user_type: "teacher",
    text: text,
  });
}

async function getClassThread(
  classId: string,
  threadId: string
): Promise<GetClassThreadResponse> {
  const url = `${baseURL}/programs/classes/${classId}/threads/${threadId}`;
  const res = await axios.get<GetClassThreadResponse>(url);
  return res.data;
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

export { fetchThread, addThreadReply, getClassThread, getTeacher };
