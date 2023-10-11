import axios from "axios";
import { GetCourseAnnouncementResponse, ListCourseAnnouncementResponse } from "../../learns/types/response";
import { CourseAnnouncement } from "../types/courseAnnouncements";


const baseURL = "http://localhost:8000";

async function addAnnouncement(courseID: string, name: string, text: string, attachmentList: {attachmentType: string ,src: string}[]) : Promise<string | boolean> {
    const url = `${baseURL}/programs/courses/${courseID}/announcements`;
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
        console.log("Announcement added");
        return res.data.announcement_id;
    } catch (error) {
        console.error("Error adding announcement:", error);
        return false;
    }
}




export async function listAnnouncements(courseID : string) {
    const announcements : CourseAnnouncement[]  = []
    const url = `${baseURL}/programs/courses/${courseID}/announcements`;
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

async function getAnnouncement(courseID : string, announcementID : string) {
    const url = `${baseURL}/programs/courses/${courseID}/announcements/${announcementID}`;
    const res = await axios.get<GetCourseAnnouncementResponse>(url);
    if (res.status == 200) {
        return {
            announcementID: res.data.announcement_id,
            teacher: {
                teacherID: res.data.teacher.teacher_id,
                teacherName: res.data.teacher.teacher_name,
                profilePic: res.data.teacher.profile_pic,
                },
            name: res.data.name,
            lastEdit: res.data.last_edit,
            text: res.data.text,
            attachments: res.data.attachments.map((attachment) => ({
                attachmentType: attachment.attachment_type,
                src: attachment.src,
            })),
        } as CourseAnnouncement;
    } else {
        
        alert(res.status);
    }
}







export { addAnnouncement, getAnnouncement };