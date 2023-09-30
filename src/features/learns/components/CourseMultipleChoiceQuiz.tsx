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
            <h1>คำถามที่ {question.questionNumber}: </h1>
            <p>{question.question}</p>
            {question.options.map((option, index) => (
                <div key={index} className="flex">
                    <button className={`round-full w-10 h-10 ${selected.includes(index) ? 'bg-black' : 'bg-white'} border-2 border-black}`}
                        onClick={() => { handleSelect(index) }}></button>
                    <p>{option}</p>
                </div>
            ))}
            <div>
                <button className={`${onPrev ? "btn-info" : "btn"}`
                } onClick={handlePrev}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <p>ข้อก่อนหน้า</p>
                </button>
                <button className={`${onNext ? "btn-info" : "btn"}`}
                    onClick={handleNext}>
                    <FontAwesomeIcon icon={faChevronRight} />
                    <p>{isLast ? "ส่งคำตอบ" : "ข้อถัดไป"}</p>
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
                <h1>{quiz.name}</h1>
                <p>{quiz.description}</p>
                <div className="flex">
                    <button className="btn bg-black" onClick={handleStart}>เริ่มต้นทำแบบฝึกหัด</button>
                    <button className="btn">ข้ามแบบทดสอบ</button>
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