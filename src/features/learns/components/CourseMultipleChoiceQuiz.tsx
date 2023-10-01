import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { CourseQuiz, MultipleChoiceQuestion, MultipleChoiceQuestionAnswer } from "../types/quiz"

interface MultipleChoiceQuizProps {
    quiz: CourseQuiz
}

interface _QuestionProps {
    question: MultipleChoiceQuestion
    onNext?: (answer: MultipleChoiceQuestionAnswer) => void,
    onPrev?: (answer: MultipleChoiceQuestionAnswer) => void,
    isLast: boolean
}

function _Question({ question, onNext, onPrev, isLast }: _QuestionProps) {
    const [selected, setSelected] = useState<number[]>([])
    const handleSelect = (index: number) => {
        if (selected.includes(index)) {
            setSelected(p => p.filter((i) => i != index))
        }
        else {
            setSelected(p => [...p, index])
        }
    }
    const handleNext = () => {
        if (onNext) {
            onNext({
                questionNumber: question.questionNumber,
                answers: selected
            })
        }
    }

    const handlePrev = () => {
        if (onPrev) {
            onPrev({
                questionNumber: question.questionNumber,
                answers: selected
            })
        }
    }
    return (
        <div className="bg-white">
            <h1 className="text-2xl font-bold mx-[3%] my-5">คำถามที่ {question.questionNumber}: </h1>
            <p className="text-xl  mx-[5%] my-5">{question.question}</p>
            {question.options.map((option, index) => (
            
                <div key={index} className="flex items-center text-lg font-bold mx-[5%] my-10">
                    <div className="flex rounded-full justify-center items-center w-5 h-5 bg-gray-400">
                        <div className="flex rounded-full justify-center items-center w-5 h-5">
                            <button className={`rounded-full w-4 h-4 ${selected.includes(index) ? 'bg-black' : 'bg-white'} border-2 border-black}`}
                                onClick={() => { handleSelect(index) }}></button>
                        </div>
                    </div>
                    <p className="mx-2">{option}</p>
                </div>
                
            ))}
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

function CourseMultipleChoiceQuiz({ quiz }: MultipleChoiceQuizProps) {
    const [started, setStarted] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<MultipleChoiceQuestionAnswer[]>([])
    const handleStart = () => {
        setStarted(true)
    }
    const handleAnswer = (answer: MultipleChoiceQuestionAnswer) => {
        const idx = answers.findIndex((a) => a.questionNumber == currentQuestion)
        if (idx == -1) {
            setAnswers(p => [...p, answer])
        }
        else {
            setAnswers(p => {
                const newAnswers = [...p]
                newAnswers[idx] = answer
                return newAnswers
            })
        }
    }
    const handleNext = (answer: MultipleChoiceQuestionAnswer) => {
        handleAnswer(answer)
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(p => p + 1)
        }
    }
    const handlePrev = (answer: MultipleChoiceQuestionAnswer) => {
        handleAnswer(answer)
        setCurrentQuestion(p => p - 1)
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
                <_Question question={quiz.questions[currentQuestion]} onNext={currentQuestion < quiz.questions.length ? handleNext : undefined}
                    onPrev={currentQuestion > 0 ? handlePrev : undefined} isLast={currentQuestion == quiz.questions.length - 1} />
            </div>
        )
    }
}

export default CourseMultipleChoiceQuiz