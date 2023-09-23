import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

type BasicCourseInfo = {
    courseName: string,
    courseCategory: string,
    courseLevel: string,
}

interface CourseCreateStepperProps {
    onSubmit: (info: BasicCourseInfo) => void
}

function _StepperNav({ onPrev, onNext, nextWord }: { onPrev?: () => void, onNext?: () => void, nextWord?: string }) {
    return (
        <div className="flex bg-white justify-between">
            <button onClick={onPrev} className={`${onPrev !== undefined ? "bg-black" : "bg-gray-300"} rounded-md m-5 px-2`} >
                <div className="flex">
                    <FontAwesomeIcon icon={faChevronLeft} color="white" />
                    <p className="text-white ml-1">ก่อนหน้า</p>
                </div>
            </button>
            <button onClick={onNext} className={`${onNext !== undefined ? "bg-black" : "bg-gray-300"} rounded-md m-5 px-2`}>
                <div className="flex">
                    <p className="text-white mr-1">{nextWord ?? "ถัดไป"}</p>
                    <FontAwesomeIcon icon={faChevronRight} color="white" />
                </div>
            </button>
        </div>
    )
}


function CourseCreateStepper({ onSubmit }: CourseCreateStepperProps) {
    const [step, setStep] = useState(1)
    const [courseName, setCourseName] = useState("")
    const [courseCategory, setCourseCategory] = useState("Data science")
    const [courseLevel, setCourseLevel] = useState("BEGINNER")
    const onNext = () => {
        setStep(step + 1)
    }
    const onPrev = () => {
        setStep(step - 1)
    }
    const onSubmitCourse = () => {
        onSubmit({
            courseName,
            courseCategory,
            courseLevel
        })
    }
    if (step == 1) {
        return (
            <div className="max-w-4xl p-0.5 bg-black">
                <div className="flex flex-col justify-center items-center bg-gray-300">
                    <h1 className="font-bold">ชื่อ course เรียนของคุณ</h1>
                    <p>ไม่เป็นไรหากไม่สามารถคิดชื่อที่เหมาะสมได้ในตอนนี้ คุณสามารถเปลี่ยนได้ในภายหลัง</p>
                    <input type="text" value={courseName} placeholder="เช่น : เรียนรู้วิธีใช้ microsoft word เริ่มจาก 0" onChange={(v) =>
                        setCourseName(v.target.value)
                    } />
                </div>
                <_StepperNav onNext={onNext} />
            </div>
        )
    }
    else if (step == 2) {
        return (
            <div className="max-w-4xl p-0.5 bg-black">
                <div className="flex flex-col justify-center items-center bg-gray-300">
                    <h1 className="font-bold">หมวดหมู่ course เรียนของคุณ</h1>
                    <p>หากคุณไม่แน่ใจว่าหมวดหมู่ถูกต้องหรือไม่ คุณสามารถเปลี่ยนได้ในภายหลัง</p>
                </div>
                <_StepperNav onPrev={onPrev} onNext={onNext} />
            </div>
        )
    }
    else if (step == 3) {
        return (
            <div className="max-w-4xl p-0.5 bg-black">
                <div className="flex flex-col justify-center items-center bg-gray-300">
                    <h1 className="font-bold">ระดับ course เรียนของคุณ</h1>
                    <p>หากคุณไม่แน่ใจว่าระดับถูกต้องหรือไม่ คุณสามารถเปลี่ยนได้ในภายหลัง</p>
                </div>
                <_StepperNav onPrev={onPrev} onNext={onSubmitCourse} nextWord="สร้าง" />
            </div>
        )
    }
}

export default CourseCreateStepper