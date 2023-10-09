import { useUser } from "../../../hooks/useUser"
import { useCourseQuiz } from "../hooks/useCourseQuiz"
import { useStudentCourseQuizReport } from "../hooks/useStudentCourseQuizReport"

interface CourseMultipleChoiceQuizReportProps {
    quizID: string,
}

function CourseMultipleChoiceQuizReport({ quizID }: CourseMultipleChoiceQuizReportProps) {
    const { user } = useUser()
    const { quiz, isFetching: isFetchingQuiz } = useCourseQuiz(quizID)
    const { report, isFetching: isFetchingReport } = useStudentCourseQuizReport(quizID, user.userID)
    function checkIfProblemCorrect(problemIndex: number) {
        Object.entries(report.problems[problemIndex].answer).map(([key, value]) => {
            if (report.problems[problemIndex].correctAnswer[key] != value) {
                return false
            }
        })
        return true
    }
    function checkIfChoiceCorrect(problemIndex: number, key: string) {
        if (report.problems[problemIndex].correctAnswer[key] == report.problems[problemIndex].answer[key]) {
            return true
        }
        else return false
    }
    if (isFetchingQuiz || isFetchingReport) {
        return (
            <div>Loading...</div>
        )
    }
    else return (
        <div>
            <div className="flex">
                <h1>แบบทดสอบที่ 1(hardcode)</h1>
            </div>
            <div className="flex">
                <div className="bg-black">
                    <h1 className="text-white">คะแนน</h1>
                </div>
                <div className="bg-white">
                    <h1>{report.score}</h1>
                </div>
            </div>
            {quiz.problems.map((problem, problemIndex) => {
                return (
                    <div key={problemIndex}>
                        <div className="bg-white">
                            <div className="flex">
                                <div>คำถามที่: {problemIndex + 1}</div>
                                <div className="mx-5">
                                    {checkIfProblemCorrect(problemIndex) ? <p>ถูก</p> : <p>ผิด</p>}
                                </div>
                            </div>
                            <p>{problem.question}</p>
                            {Object.entries(problem.choices).map(([key, value], index) => {
                                if (value == "") {
                                    return (
                                        <></>
                                    )
                                }
                                return (
                                    <div className="flex" key={index}>
                                        <input type="checkbox" checked={report.problems[problemIndex].answer[key]} />
                                        <p>{value}</p>
                                        <div className="ml-5">
                                            {checkIfChoiceCorrect(problemIndex, key) ? <p>ถูก</p> : <p>ผิด</p>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="bg-white my-3 drop-shadow-lg">
                            <p>{report.problems[problemIndex].explaination}</p>
                        </div>
                    </div>
                )
            })}
            <button className="btn bg-black text-white">
                บทเรียนต่อไป
            </button>
        </div>
    )
}

export default CourseMultipleChoiceQuizReport