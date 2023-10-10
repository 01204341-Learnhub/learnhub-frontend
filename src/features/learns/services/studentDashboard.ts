import axios from "axios";
import { GetStudentDashboardResponse } from "../types/response";
import { StudentDashboard } from "../types/studentDashboard";

const baseUrl = "http://localhost:8000"

async function getStudentDashboard(studentID:string){
    const url = `${baseUrl}/users/students/${studentID}/dashboard`
    const res = await axios.get<GetStudentDashboardResponse>(url)
    const dashboard :StudentDashboard = {
        classes:res.data.classes.map(c =>{
            return{
                classInfo:{
                    classID:c.class_info.class_id,
                    className:c.class_info.class_name
                },
                teacher:{
                    teacherID:c.teacher.teacher_id,
                    teacherName:c.teacher.teacher_name,
                    profilePic:c.teacher.profile_pic
                },
                schedules:c.schedules.map(s=>{
                    return{
                        start:s.start,
                        end:s.end
                    }
                })
            }
        }),
        assignments:res.data.assignments.map((asm)=>{
            return{
                assignmentID:asm.assignment_id,
                assignmentName:asm.assignment_name,
                classInfo:{
                    classId:asm.class_info.class_id,
                    className:asm.class_info.class_name
                },
                dueDate:asm.due_date,
                status:asm.status,
                submission:{
                    submissionDate:asm.submission.submission_date,
                    submissionStatus:asm.submission.submission_status
                }
            }
        }),
        announcements:res.data.announcements.map(anm=>{
            return{
                announcementID:anm.announcement_id,
                courseInfo:{
                    courseID:anm.course_info.course_id,
                    courseName:anm.course_info.course_name
                },
                teacher:{
                    teacherId:anm.teacher.teacher_id,
                    teacherName:anm.teacher.teacher_name,
                    profilePic: anm.teacher.profile_pic
                },
                name:anm.name,
                lastEdit:anm.last_edit,
                text:anm.text
                
            }
        })

    }
    return dashboard

}
export {getStudentDashboard}