type CourseAnnouncements = {
    announcementID: string;
    lastEdit: number;
    name: string;
}[]

type CourseAnnouncement = {
    announcementID: string;
    teacher: {
        teacherID: string;
        teacherName: string;
        profilePic: string;
    },
    name: string;
    lastEdit: number;
    text: string;
    attachments:
    {
        attachmentType: string
        src: string
    }[]

}

type ListCourseAnnouncement = {
    announcements: {
        announcementID: string;
        teacher: {
            teacherID: string;
            teacherName: string;
            profilePic: string;
        },
        name: string;
        lastEdit: number;
        text: string;
        attachments:
        {
            attachmentType: string
            src: string
        }[]
    }[]
}

export type { CourseAnnouncements, CourseAnnouncement, ListCourseAnnouncement }