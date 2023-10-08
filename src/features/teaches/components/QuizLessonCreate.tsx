import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Lesson } from "../types/course";
import { CourseQuiz, CourseQuizProblem } from "../types/courseQuiz";

type CourseQuizProblemWithoutNumber = Omit<CourseQuizProblem, "problemNumber">

interface _ProblemCreateProps {
    onSubmit: (problem: CourseQuizProblemWithoutNumber) => void;
}

function _ProblemCreate({ onSubmit }: _ProblemCreateProps) {
    const [question, setQuestion] = useState<string>("")
    const [numChoice, setNumChoice] = useState<number>(1)
    const [choices, setChoices] = useState<CourseQuizProblem["choices"]>({
        choiceA: "",
        choiceB: "",
        choiceC: "",
        choiceD: "",
        choiceE: "",
        choiceF: "",
    })
    const [correctAnswer, setCorrectAnswer] = useState<CourseQuizProblem["correctAnswers"]>({
        choiceA: false,
        choiceB: false,
        choiceC: false,
        choiceD: false,
        choiceE: false,
        choiceF: false,
    })
    const [explaination, setExplaination] = useState<string>("")
    const handleSubmit = () => {
        for (let i = 0; i < numChoice; i++) {
            if (choices[Object.keys(choices)[i]] === "") {
                alert("ต้องกรอกตัวเลือกทั้งหมด")
                return
            }
        }
        const problem: CourseQuizProblemWithoutNumber = {
            question: question,
            choices: choices,
            multipleCorrectAnswers: true,
            correctAnswers: correctAnswer,
            explaination: explaination,
        }
        onSubmit(problem)
    }
    return (
        <div className="bg-white">
            <input type="text" placeholder="คำถาม" value={question}
                onChange={(e) => { setQuestion(e.target.value) }} />
            <input type="text" placeholder="คำอธิบาย" value={explaination}
                onChange={(e) => { setExplaination(e.target.value) }} />
            {Object.entries(choices).map(([key, value], index) => {
                if (index >= numChoice) {
                    return <></>
                }
                return (
                    <div key={`${key}-${index}`}>
                        <input type="checkbox" checked={correctAnswer[key]}
                            onChange={() => {
                                setCorrectAnswer((p) => {
                                    return { ...p, [key]: !p[key] }
                                })
                            }} />
                        <input type="text" placeholder={`ตัวเลือกที่ ${index + 1}`} value={value}
                            onChange={(e) => {
                                setChoices((p) => {
                                    return { ...p, [key]: e.target.value }
                                })
                            }} />
                    </div>
                )
            })}
            {numChoice <= 5 ?
                <button className="btn"
                    onClick={() => {
                        setNumChoice((p) => p + 1)
                    }}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <h1>เพิ่มตัวเลือก</h1>
                </button> : <></>
            }
            <button className="btn"
                onClick={handleSubmit}>
                <h1>ตกลง</h1>
            </button>
        </div>
    )
}

interface QuizLessonCreateProps {
    chapterNumber: number;
    chapterName: string;
    lessonNumber: number;
    onSubmit: (lesson: Lesson) => void;
    onCancel: () => void;
}

function QuizLessonCreate({ chapterName, chapterNumber, lessonNumber, onCancel, onSubmit }: QuizLessonCreateProps) {
    const [quiz, setQuiz] = useState<CourseQuiz>({
        // TODO: remove hardcode
        name: "",
        timeLimit: 0,
        pictureURL: "",
        description: "",
        problems: [],

    })
    const [isAdding, setIsAdding] = useState<boolean>(false)
    function handleLessonNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuiz({ ...quiz, name: e.target.value })
    }
    function handleLessonDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuiz({ ...quiz, description: e.target.value })
    }
    const onProblemSubmit = (problem: CourseQuizProblemWithoutNumber) => {
        const newProblem: CourseQuizProblem = { problemNumber: quiz.problems.length + 1, ...problem }
        setQuiz({ ...quiz, problems: [...quiz.problems, newProblem] })
        setIsAdding(false)
    }
    const handleSubmit = () => {
        if (quiz.name === "" || quiz.description === "") {
            alert("ต้องกรอกชื่อและคำอธิบาย")
            return
        }
        const lesson: Lesson = {
            lessonId: "1234567890",
            name: quiz.name,
            number: lessonNumber,
            type: "quiz",
            quiz: JSON.stringify(quiz),
        }
        onSubmit(lesson)
    }
    return (
        <div>
            <h1>บทที่ {chapterNumber}: {chapterName}/สร้างแบบทดสอบ</h1>
            <div className="bg-white">
                <div>
                    <h1>หัวข้อ</h1>
                    <input type="text" value={quiz.name} onChange={handleLessonNameChange} />
                </div>
                <div>
                    <h1>คำอธิบาย</h1>
                    <input type="text" value={quiz.description} onChange={handleLessonDescriptionChange} />
                </div>
                <div>
                    <h1>เวลาที่ใช้ (วินาที)</h1>
                    <input type="text" />
                </div>
            </div>
            {quiz.problems.map((problem, index) => {
                return (
                    <div className="bg-white my-8" key={index}>
                        <h1>คำถามที่ {problem.problemNumber} {problem.question}</h1>
                        {Object.entries(problem.choices).map(([key, value]) => {
                            if (value === "") {
                                return <></>
                            }
                            else {
                                return (
                                    <div className="flex">
                                        <div className={`rounded-full w-3 h-3 border-2 ${problem.correctAnswers[key] ? "bg-green-300" : "bg-slate-200"}`}></div>
                                        <h1>{value}</h1>
                                    </div>
                                )
                            }
                        })}
                    </div>
                )
            })}
            <div>
                <button className="btn"
                    onClick={() => setIsAdding(true)}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <h1>เพิ่มคำถาม</h1>
                </button>
                <button className="btn"
                    onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <h1>เสร็จสิ้น</h1>
                </button>
            </div>
            {isAdding ? <_ProblemCreate onSubmit={onProblemSubmit} /> : <></>}
        </div>
    )
}

export default QuizLessonCreate