import axios from "axios";
import { BASE_URL } from "../../../config";
import { LearnhubUser } from "../../../types/user";
import { GetClassThreadResponse } from "../types/responses";
import { Thread } from "../types/thread";

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
  const url = `${BASE_URL}/programs/classes/${classId}/threads/${threadId}/reply`;
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
  const url = `${BASE_URL}/programs/classes/${classId}/threads/${threadId}`;
  const res = await axios.get<GetClassThreadResponse>(url);
  return res.data;
}

async function getTeacher(teacherID: string): Promise<LearnhubUser> {
  const url = `${BASE_URL}/users/teachers/${teacherID}`;
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

async function createThread(
  classID: string,
  text: string,
  attachments: { attachmentType: string; src: string }[]
) {
  const url = `${BASE_URL}/programs/classes/${classID}/threads/`;
  const body = {
    name: "",
    text: text,
    attachments: attachments.map((attachment) => ({
      attachment_type: attachment.attachmentType,
      src: attachment.src,
    })),
  };
  const res = await axios.post<{ thread_id: string }>(url, body);
  const thread = await fetchThread(classID, res.data.thread_id);
  return thread;
}

export {
  addThreadReply,
  createThread,
  fetchThread,
  getClassThread,
  getTeacher,
};
