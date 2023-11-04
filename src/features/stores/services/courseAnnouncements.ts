import axios from "axios";
import { BASE_URL } from "../../../config";
import {
  GetCourseAnnouncementResponse,
  ListCourseAnnouncementResponse,
} from "../../learns/types/response";
import { CourseAnnouncement } from "../types/courseAnnouncements";

async function addAnnouncement(
  courseID: string,
  name: string,
  text: string,
  attachmentList: { attachmentType: string; src: string }[]
): Promise<string> {
  const url = `${BASE_URL}/programs/courses/${courseID}/announcements`;
  const body = {
    name,
    text,
    attachments: attachmentList.map((attachment) => ({
      attachment_type: attachment.attachmentType,
      src: attachment.src,
    })),
  };
  try {
    const res = await axios.post<{ announcement_id: string }>(url, body);
    return res.data.announcement_id;
  } catch (error) {
    console.error("Error adding announcement:", error);
    return "";
  }
}

export async function listAnnouncements(courseID: string) {
  const announcements: CourseAnnouncement[] = [];
  const url = `${BASE_URL}/programs/courses/${courseID}/announcements`;
  const res = await axios.get<ListCourseAnnouncementResponse>(url);
  if (res.status === 200) {
    for (let i = 0; i < res.data.announcements.length; i++) {
      const announcemenID = res.data.announcements[i].announcement_id;
      const announcement = await getAnnouncement(courseID, announcemenID);
      announcements.push(announcement);
    }
    return announcements;
  } else {
    alert(res.status);
  }
}

async function getAnnouncement(courseID: string, announcementID: string) {
  const url = `${BASE_URL}/programs/courses/${courseID}/announcements/${announcementID}`;
  const res = await axios.get<GetCourseAnnouncementResponse>(url);
  const responseData = res.data;
  if (res.status == 200) {
    return {
      announcementID: responseData.announcement_id,
      teacher: {
        teacherID: responseData.teacher.teacher_id,
        teacherName: responseData.teacher.teacher_name,
        profilePic: responseData.teacher.profile_pic,
      },
      name: responseData.name,
      lastEdit: responseData.last_edit,
      text: responseData.text,
      attachments: responseData.attachments.map((attachment) => ({
        attachmentType: attachment.attachment_type,
        src: attachment.src,
      })),
    } as CourseAnnouncement;
  } else {
    alert(res.status);
  }
}

export { addAnnouncement, getAnnouncement };
