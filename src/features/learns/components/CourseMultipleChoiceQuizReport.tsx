import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpash } from "../../../components/LoadingSpash";
import { useUser } from "../../../hooks/useUser";
import { useCourseQuiz } from "../hooks/useCourseQuiz";
import { useStudentCourseQuizReport } from "../hooks/useStudentCourseQuizReport";

interface CourseMultipleChoiceQuizReportProps {
    quizID: string,
}

function CourseMultipleChoiceQuizReport({ quizID }: CourseMultipleChoiceQuizReportProps) {
    const { user } = useUser()
    const { quiz, isFetching: isFetchingQuiz } = useCourseQuiz(quizID)
    const { report, isFetching: isFetchingReport } = useStudentCourseQuizReport(quizID, user.userID)
    function checkIfProblemCorrect(problemIndex: number) {
        for (const [key, value] of Object.entries(report.problems[problemIndex].answer)) {
            if (value != report.problems[problemIndex].correctAnswer[key]) {
                return false
            }
        }
        return true
    }
    function checkIfChoiceCorrect(problemIndex: number, key: string) {
        if (report.problems[problemIndex].correctAnswer[key] == report.problems[problemIndex].answer[key]) {
            return true
        }
        else return false
    }
    const explanationRender = (problemIndex) => {
        if (!checkIfProblemCorrect(problemIndex)){
            const problem = quiz.problems[problemIndex]
            const result = report.problems[problemIndex]
            return (
                <div className="w-full h-full py-5">
                    <p className=" font-bold text-[20px] text-[#3a3a3a] px-5">คำตอบที่ถูกต้อง</p>
                    {Object.entries(problem.choices).map(([key, value], index) => {
                        if (value == "" || !result.correctAnswer[key]) {
                            return (
                                <></>
                            )
                        }
                        return (
                            <div className="mx-[40px] my-2 flex items-center" key={index}>
                                <input className="mr-5 rounded-full w-4 h-4 border-2 border-[#646464]" type="checkbox" checked={true} />
                                <p className=" font-semibold text-[16px] text-[#3a3a3a]">{value}</p>
                                <div className="ml-5">
                                    {
                                    report.problems[problemIndex].answer[key]?(
                                    checkIfChoiceCorrect(problemIndex, key) ? 
                                    <FontAwesomeIcon icon={faCheck} size='xl' color="#ADE792" /> 
                                    : <FontAwesomeIcon icon={faXmark} size='xl' color="#FF2171" />):<></>
                                    }
                                </div>
                            </div>
                        )
                    })}
                    <p className=" ml-[23px] my-3 pt-2 pb-2 text-[#909090] font-medium text-[16px]">คำอธิบาย : {report.problems[problemIndex].explaination}</p>
                </div>
            )
        } else {
            return (
                <>
                    <p className=" ml-[40px] my-3 pt-2 pb-2 text-[#909090] font-medium text-[16px]">คำอธิบาย : {report.problems[problemIndex].explaination}</p>
                </>
            )
        }
    }
    if (isFetchingQuiz || isFetchingReport) {
        return (
            <LoadingSpash></LoadingSpash>
        )
    }
    else return (
        <div >
            <div className="flex items-center">
                <h1 className="ml-[70px] grow font-bold text-[30px]">แบบทดสอบ : {quiz.name}</h1>
                <div className="flex mr-[150px] text-[30px]">
                    <div className="bg-black">
                        <h1 className="text-white text-[30px] m-2">คะแนน</h1>
                    </div>
                    <div className="bg-white ">
                        <h1 className="m-2">{report.score}</h1>
                    </div>
                </div>
            </div>
            <div className="overflow-scroll h-96">
                {quiz.problems.map((problem, problemIndex) => {
                    return (
                        <div key={problemIndex}>
                            <div className="flex flex-col ml-[100px] mr-[150px] mt-[40px] rounded-xl bg-white drop-shadow-xl">
                                <div className="flex pt-2 pb-4 mt-[20px]">
                                    <div className="my-auto mx-[40px] grow font-semibold text-[18px]">คำถามที่ {problemIndex + 1} : {problem.question}</div>
                                    <div className="mx-5 font-bold text-[22px]">
                                        {checkIfProblemCorrect(problemIndex) ? <FontAwesomeIcon icon={faCheck} size='xl' color="#ADE792" /> : <FontAwesomeIcon icon={faXmark} size='xl' color="#FF2171" />}
                                    </div>
                                </div>
                                {Object.entries(problem.choices).map(([key, value], index) => {
                                    if (value == "") {
                                        return (
                                            <></>
                                        )
                                    }
                                    return (
                                        <div className="mx-[55px] my-2 flex items-center" key={index}>
                                            <input className="mr-5 rounded-full w-4 h-4 border-2 border-[#646464]" type="checkbox" checked={report.problems[problemIndex].answer[key]} />
                                            <p className=" font-semibold text-[16px] text-[#3a3a3a]">{value}</p>
                                            <div className="ml-5">
                                                {
                                                report.problems[problemIndex].answer[key]?(
                                                checkIfChoiceCorrect(problemIndex, key) ? 
                                                <FontAwesomeIcon icon={faCheck} size='xl' color="#ADE792" /> 
                                                : <FontAwesomeIcon icon={faXmark} size='xl' color="#FF2171" />):<></>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                                <hr />
                                {explanationRender(problemIndex)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CourseMultipleChoiceQuizReport