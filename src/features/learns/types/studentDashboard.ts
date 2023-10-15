type StudentDashboard = {
    classes: 
        {
          classInfo: {
            className: string,
            classID: string,
            classPic: string,
          },
          teacher: {
            teacherID: string,
            teacherName: string,
            profilePic: string
          },
          schedules: 
            {
              start: number,
              end: number
            }[]
        }[],
      assignments: 
        {
          assignmentName: string,
          assignmentID: string,
          classInfo: {
            className: string,
            classId: string
          },
          dueDate: number,
          status: "open" | "closed",
          submission: {
            submissionStatus: "check" | "uncheck" | "unsubmit",
            submissionDate: number
          }
        }[]
      ,
      announcements: 
        {
          announcementID: string,
          courseInfo: {
            courseID: string,
            courseName: string
          },
          teacher: {
            teacherId: string,
            teacherName: string,
            profilePic: string
          },
          name: string,
          lastEdit: number,
          text: string
        }[]
      
}


export type{
    StudentDashboard
}