import { useReducer, useState } from "react"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import ReviewSubmission from "../../features/teaches/components/ReviewSubmission.js"
import { useAssignmentSubmissions } from "../../features/teaches/hooks/useAssignmentSubmissions.js"
import { useClassInfo } from "../../features/teaches/hooks/useClassInfo.js"
import { markAssignmentSubmission } from "../../features/teaches/services/assignments.js"
import { ClassAssignmentSubmission } from "../../features/teaches/types/classWork.js"

function _ShowList({ submission, onClick }: { submission: ClassAssignmentSubmission, onClick: (studentID: string) => void }) {
    return (
        <button onClick={() => {
            onClick(submission.student.studentID)
        }} className="w-full flex bg-white  items-center border-2 hover:bg-slate-300">
            <div className=" justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-16 h-16 m-2 rounded-full" >
                <img src={submission.student.profilePicture} className="w-16 h-16 object-cover rounded-full"/>
            </div>
            <div className="flex w-96 justify-between">
                <h1 className="text-gray-600 font-bold ml-5">{submission.student.name}</h1>
                <h1 className="text-gray-600 font-bold ml-5 justify-end">{submission.score}/100</h1>
            </div>
        </button>
    )
}

type SubmissionStatus = "unsubmit" | "uncheck" | "check"
function ReviewWork() {
    const { classID, assignmentID } = useParams<{ classID: string, assignmentID: string },>()
    const { classInfo, isFetching: isFetchingInfo } = useClassInfo(classID)
    const { submissions, isFetching, reloadSubmissions } = useAssignmentSubmissions(classID, assignmentID)
    const [targetStudentID, setTargetStudentID] = useState("")
    const [_, forceUpdate] = useReducer(x => x + 1, 0)
    const getSubmissionByStatus = (status: SubmissionStatus) => {
        return submissions.filter(submission => submission.status === status)
    }
    const getStudentSubmission = () => {
        return submissions.find(submission => submission.student.studentID === targetStudentID)!
    }
    const handleSelectTargetStudent = (studentID: string) => {
        return setTargetStudentID(studentID)
    }
    const handleMark = (studentID: string, score: number) => {
        markAssignmentSubmission(assignmentID, classID, studentID, score).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'คุณได้ให้คะแนนแล้ว',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                reloadSubmissions()
                forceUpdate()
            })
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: err.message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    if (isFetching || isFetchingInfo) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (

        <div className="w-full h-full bg-slate-100">
            <div className="w-full border-2 px-4 py-4 flex">
                <h1 className="text-3xl">งานในชั้นเรียน</h1>
                <h1 className="text-3xl px-10">{classInfo.className}</h1>
            </div>
            <div className="flex">
                <div className="w-4/12 px-5 py-5">
                    <div className="bg-[#F31559] w-1/4  text-center my-10 ">
                        <p className="text-white font-bold py-2">ยังไม่ได้ตรวจ</p>
                    </div>
                    {getSubmissionByStatus("uncheck").map((submission, index) => {
                        return (
                            <div key={index}>
                                <_ShowList submission={submission} onClick={handleSelectTargetStudent} />
                            </div>
                        )
                    })}


                    <div className="bg-[#F8DE22] w-1/4  text-center my-10">
                        <p className="text-black font-bold py-2">ยังไม่ได้ส่ง</p>
                    </div>
                    {getSubmissionByStatus("unsubmit").map((submission, index) => {
                        return (
                            <div key={index}>
                                <_ShowList submission={submission} onClick={handleSelectTargetStudent} />
                            </div>
                        )
                    })}
                    <div className="bg-[#ADE792] w-1/4  text-center my-10">
                        <p className="text-black font-bold py-2">ตรวจแล้ว</p>
                    </div>
                    {getSubmissionByStatus("check").map((submission, index) => {
                        return (
                            <div key={index}>
                                <_ShowList submission={submission} onClick={handleSelectTargetStudent} />
                            </div>
                        )
                    })}
                </div>
                {targetStudentID != "" && (
                    <>
                        <ReviewSubmission submission={getStudentSubmission()} onMark={handleMark} />
                    </>
                )}
            </div>

        </div>
    )


}


export default ReviewWork