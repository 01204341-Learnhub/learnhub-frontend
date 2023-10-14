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
    const [explaination, setExplaination] = useState<string>("")
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
    const handleSubmit = () => {
        if (question === "" || explaination === "") {
            alert("ต้องกรอกคำถามและคำอธิบาย")
            return
        }
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
        <div className="flex flex-col ml-[70px] mr-[100px] mt-[30px] bg-white drop-shadow-xl">
            <div className="flex pt-2 pb-4 font-semibold">
                <h1 className="my-auto mx-[40px] text-[18px]">คำถาม</h1>
                <input className="mr-[50px] min-w-0 grow input input-bordered"
                    type="text" placeholder="คำถาม" value={question}
                    onChange={(e) => { setQuestion(e.target.value) }} />
            </div>
            <div className="flex pt-2 pb-4 font-semibold text-[18px]">
                <h1 className="mx-[40px] ">คำอธิบายเพิ่มเติม</h1>
                <textarea className="mr-[50px] min-w-0 min-h-[45px] h-[160px] max-h-[280px] py-2 px-4 grow input input-bordered mb-4"
                    placeholder="คำอธิบายเพิ่มเติมที่่ผู้เรียนจะเห็นหลังทำแบบฝึกหัดเสร็จ" value={explaination}
                    onChange={(e) => { setExplaination(e.target.value) }} />
            </div>
            <h1 className="my-auto mx-[40px] font-semibold text-[15px] text-[#808080]">ติ๊กถูกด้านหน้าเพื่อกำหนดตัวเลือกที่ตอบแล้วได้คะแนน</h1>
            {Object.entries(choices).map(([key, value], index) => {
                if (index >= numChoice) {
                    return <></>
                }
                return (
                    <div className="mx-[55px]"
                        key={`${key}-${index}`}>
                        <input className="mx-3"
                            type="checkbox" checked={correctAnswer[key]}
                            onChange={() => {
                                setCorrectAnswer((p) => {
                                    return { ...p, [key]: !p[key] }
                                })
                            }} />
                        <input className="mr-[50px] my-[10px] h-[25px] min-w-0 grow input input-bordered "
                            type="text" placeholder={`ตัวเลือกที่ ${index + 1}`} value={value}
                            onChange={(e) => {
                                setChoices((p) => {
                                    return { ...p, [key]: e.target.value }
                                })
                            }} />
                    </div>
                )
            })}
            {numChoice <= 5 ?
                <button className="mx-14 mb-4 px-2 py-1 flex flex-row items-center"
                    onClick={() => {
                        setNumChoice((p) => p + 1)
                    }}>
                    <FontAwesomeIcon icon={faPlusCircle} size='lg' />
                    <h1 className="ml-5">เพิ่มตัวเลือก</h1>
                </button> : <></>
            }
            <button className="btn bg-[#d9d9d9]"
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
    function handleLessonDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
        <div className="w-full">
            <div className="ml-[70px] mt-[20px] flex items-center">
                <h1 className="text-black text-[24px] font-bold">
                    บทที่ {chapterNumber} :
                </h1>
                <h2 className=" text-[#808080] text-[18px] font-semibold ml-4">
                    {chapterName} / สร้างแบบฝึกหัด
                </h2>
            </div>
            
            

            <div className="ml-[70px] mr-[100px] mt-[30px] bg-white drop-shadow-xl">
                <div className="  flex grow items-center pt-2 pb-4">
                    <h1 className="my-auto mx-[40px] font-semibold text-[18px]">หัวข้อ</h1>
                    <input
                        type="text"
                        className="mr-[50px] min-w-0 grow input input-bordered"
                        value={quiz.name}
                        onChange={handleLessonNameChange}
                    />
                </div>
                <div className="  flex grow pt-2 pb-4">
                    <h1 className=" mx-[40px] font-semibold text-[18px]">คำอธิบาย</h1>
                    <textarea
                        className="mr-[50px] min-w-0 min-h-[45px] h-[160px] max-h-[280px] py-2 px-4 grow input input-bordered mb-4"
                        value={quiz.description} 
                        onChange={handleLessonDescriptionChange} 
                    />
                </div>
                <div className="  flex grow items-center pt-2 pb-4">
                    <h1 className="my-auto mx-[40px] font-semibold text-[18px]">เวลาที่ใช้ (วินาที)</h1>
                    <input 
                        type="text"
                        className="mr-[50px] min-w-0  grow input input-bordered"
                    />
                </div>
            </div>
            {quiz.problems.map((problem, index) => {
                return (
                    <div className="ml-[70px] mr-[100px] mt-[30px]  bg-white drop-shadow-xl" key={index}>
                        <div className="py-2 bg-[#d0d0d0]">
                            <h1 className="my-auto mx-[40px] font-semibold text-[18px]">คำถามที่ {problem.problemNumber} {problem.question}</h1>
                        </div>
                        {Object.entries(problem.choices).map(([key, value]) => {
                            if (value === "") {
                                return <></>
                            }
                            else {
                                return (
                                    <div className="mx-[55px] my-2 flex items-center">
                                        <div className={`mr-5 rounded-full w-4 h-4 border-2 border-[#646464] ${problem.correctAnswers[key] ? "bg-green-400" : "bg-slate-200"}`}></div>
                                        <h1 className=" font-semibold text-[16px] text-[#3a3a3a]">{value}</h1>
                                    </div>
                                )
                            }
                        })}
                        <hr />
                        <h1 className=" mx-[40px] py-[10px] font-semibold text-[18px] text-[#3a3a3a]">คำอธิบาย : 
                            <span className=" font-medium">{" "}{problem.explaination}</span>
                        </h1>
                    </div>
                )
            })}
            
            {isAdding ? <_ProblemCreate onSubmit={onProblemSubmit} /> : <></>}
            <div>
                <button className="btn ml-[70px] my-5 bg-[#d9d9d9]"
                    onClick={() => setIsAdding(true)}>
                    <FontAwesomeIcon icon={faPlusCircle} size='xl' />
                    <h1>เพิ่มคำถาม</h1>
                </button>
            </div>
            <div className="flex mt-[40px] justify-end mr-[100px] w-full">
                <button className="btn bg-black text-white" onClick={handleSubmit}>
                บันทึก
                </button>
                <button className="btn ml-7 mr-[100px]" onClick={onCancel}>
                ยกเลิก
                </button>
            </div>
        </div>
    )
}

export default QuizLessonCreate