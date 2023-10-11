import axios from "axios";
import { GetCourseAnnouncementResponse, ListCourseAnnouncementResponse } from "../types/response";
import { CourseAnnouncement, CourseAnnouncements  } from "../../stores/types/courseAnnouncements";

const baseURL = "http://localhost:8000";

async function listAnnouncements(courseID : string) {
    const announcements : CourseAnnouncements  = []
    const url = `${baseURL}/programs/courses/${courseID}/announcements`;
    const res = await axios.get<ListCourseAnnouncementResponse>(url);
    console.log(res.status);
    if (res.status === 200) {
        res.data.announcements.map((announcement) => {
            announcements.push({
                announcementID: announcement.announcement_id,
                lastEdit: announcement.last_edit,
                name: announcement.name,
            });
        });
        console.log(JSON.stringify(announcements, null, 2));
        
        return announcements;
    } else {
        alert(res.status);
    }
    
}

async function getAnnouncement(courseID : string, announcementID : string) {
    const url = `${baseURL}/programs/courses/${courseID}/announcements/${announcementID}`;
    const res = await axios.get<GetCourseAnnouncementResponse>(url);
    console.log(res.status);
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


export { getAnnouncement, listAnnouncements };