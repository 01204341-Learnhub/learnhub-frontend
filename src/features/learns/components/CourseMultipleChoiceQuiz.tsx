import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { CourseQuiz, CourseQuizProblem, CourseQuizSubmission } from "../types/quiz"

interface _QuestionProps {
    problem: CourseQuizProblem,
    submission: CourseQuizSubmission,
    onNext?: (submission: CourseQuizSubmission) => void,
    onPrev?: (submission: CourseQuizSubmission) => void,
    isLast: boolean
}

function _Question({ problem, submission, onNext, onPrev, isLast }: _QuestionProps) {
    const [answer, setAnswer] = useState(submission.answers[problem.problemNumber - 1].answer)
    const handleSelect = (key: string) => {
        setAnswer(p => {
            return {
                ...p,
                [key]: !p[key]
            }
        })
    }
    const isSelect = (key: string) => {
        return answer[key]
    }

    const handleNext = () => {
        submission.answers[problem.problemNumber - 1].answer = answer
        if (onNext) {
            onNext(submission)
        }
    }

    const handlePrev = () => {
        submission.answers[problem.problemNumber - 1].answer = answer
        if (onPrev) {
            onPrev(submission)
        }
    }
    return (
        <div className="bg-white">
            <h1 className="text-2xl font-bold mx-[3%] my-5">คำถามที่ {problem.problemNumber}: </h1>
            <p className="text-xl  mx-[5%] my-5">{problem.question}</p>
            {Object.entries(problem.choices).map(([k, v], index) => {
                if (v == "") return (<></>)
                else return (
                    <div key={index} className="flex items-center text-lg font-bold mx-[5%] my-10">
                        <div className="flex rounded-full justify-center items-center w-5 h-5 bg-gray-400">
                            <div className="flex rounded-full justify-center items-center w-5 h-5">
                                <button className={`rounded-full w-4 h-4 ${isSelect(k) ? 'bg-black' : 'bg-white'} border-2 border-black}`}
                                    onClick={() => { handleSelect(k) }}></button>
                            </div>
                        </div>
                        <p className="mx-2">{v}</p>
                    </div>
                )
            })}
            <div className="flex justify-end mx-[3%]">
                <button className={`flex justify-center items-center px-4 h-11 m-2 rounded-md ${onPrev ? "bg-black" : "bg-gray-300"} text-white`
                } onClick={handlePrev}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <p>ข้อก่อนหน้า</p>
                </button>
                <button className={`flex justify-center items-center px-4 h-11 m-2 rounded-md  ${onNext ? "bg-black" : "bg-gray-300"} text-white`}
                    onClick={handleNext}>
                    <p>{isLast ? "ส่งคำตอบ" : "ข้อถัดไป"}</p>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    )
}

function _genSubmission(numberOfProblems: number) {
    const submission: CourseQuizSubmission = {
        status: "i don't know",
        answers: []
    }
    for (let i = 0; i < numberOfProblems; i++) {
        submission.answers.push({
            problemNumber: i + 1,
            answer: {
                choiceA: false,
                choiceB: false,
                choiceC: false,
                choiceD: false,
                choiceE: false,
                choiceF: false
            }
        })
    }
    return submission
}

interface MultipleChoiceQuizProps {
    quiz: CourseQuiz
}
function CourseMultipleChoiceQuiz({ quiz }: MultipleChoiceQuizProps) {
    const [started, setStarted] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [submission, setSubmission] = useState<CourseQuizSubmission>(_genSubmission(quiz.problems.length))
    const handleStart = () => {
        setStarted(true)
    }
    const handleNext = (submission: CourseQuizSubmission) => {
        setSubmission(submission)
        if (currentQuestion < quiz.problems.length - 1) {
            setCurrentQuestion(p => p + 1)
        }
    }
    const handlePrev = (submission: CourseQuizSubmission) => {
        setSubmission(submission)
        if (currentQuestion > 0) {
            setCurrentQuestion(p => p - 1)
        }
    }
    if (!started) {
        return (
            <div className="bg-white border-2 border-black">
                <h1 className="text-3xl font-bold mx-[5%] my-10 ">{quiz.name}</h1>
                <p className="text-xl mx-[5%] my-10">{quiz.description}</p>
                <div className="flex mx-[5%] my-10">
                    <button className="mr-5 my-10 bg-black text-white text-xl py-4 px-5 rounded-xl font-bold" onClick={handleStart}>เริ่มต้นทำแบบฝึกหัด</button>
                    <button className="mx-5 my-10 text-xl py-4 px-5 rounded-xl font-bold">ข้ามแบบทดสอบ</button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="bg-white border-2 border-black">
                {quiz.problems.map((problem, index) => {
                    if (index == currentQuestion) {
                        return (
                            <_Question key={index} problem={problem} submission={submission} onNext={handleNext} onPrev={handlePrev} isLast={index == quiz.problems.length - 1} />
                        )
                    }
                })}
            </div>
        )
    }
}

export default CourseMultipleChoiceQuiz