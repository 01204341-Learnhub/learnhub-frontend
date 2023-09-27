import { faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { CourseLesson } from "../types/course"

interface VideoLessonCreateProps {
    chapterNumber: number,
    chapterName: string,
    lessonNumber: number,
    onSubmit: (lesson: Omit<CourseLesson, "lessonID">) => void,
    onCancel: () => void
}

function _Preview({ src }: { src: string | undefined }) {
    if (src == undefined) {
        return (
            <div className="w-100 h-100 bg-slate-300">
                <h1 className="mx-auto my-auto">ยังไม่ได้เลือกไฟล์</h1>
            </div>
        )
    }
    else {
        return (
            <video width="400" controls>
                <source src={src} />
            </video>
        )
    }
}

function VideoLessonCreate({ chapterName, chapterNumber, lessonNumber, onSubmit, onCancel }: VideoLessonCreateProps) {
    const [lessonName, setLessonName] = useState<string>("")
    const onLessonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLessonName(e.target.value)
    }
    const [src, setSrc] = useState<string | undefined>(undefined)
    const setSourceFromLink = (link: string) => {
        setSrc(link)
    }
    const setSourceFromFile = (file: File) => {
        setSrc(URL.createObjectURL(file))
    }
    const handleSubmit = () => {
        const lesson: Omit<CourseLesson, "lessonID"> = {
            lessonName: lessonName,
            lessonNumber: lessonNumber,
            lessonType: "video",
            src: src
        }
        onSubmit(lesson)
    }
    return (
        <div>
            <div className="flex">
                <h1 className="text-black font-bold">บทที่ {chapterNumber}: </h1>
                <h2 className=" text-gray-400 ml-4">{chapterName} / วิดีโอที่ {lessonNumber}</h2>
            </div>
            <div className="flex bg-white drop-shadow-xl pt-2 pb-4">
                <h1 className="my-auto mr-4">ชื่อวิดีโอ</h1>
                <input type="text" className="input input-bordered w-3/4" value={lessonName} onChange={onLessonNameChange} />
            </div>
            <div className="flex flex-col bg-white drop-shadow-xl pt-2 pb-4 mt-5">
                <h1 className="m-5 ml-7 mt-3 font-bold text-xl ">วิดีโอ</h1>
                <div className="flex">
                    <button className="mx-6" onClick={() => { setSourceFromLink("https://www.youtube.com/watch?v=30Dy3GERCqQ") }}>
                        <FontAwesomeIcon icon={faPaperclip} color="black" size="xl" className="rounded-full" />
                        <h1>ลิ้งค์</h1>
                    </button>
                    <div className="mx-6">
                        <input type="file" onChange={(e) => { setSourceFromFile(e.target.files![0]) }} />
                        <h1>อัพโหลดไฟล์</h1>
                    </div>
                </div>
            </div>
            <div className="flex bg-white drop-shadow-xl pt-2 pb-4 mt-5">
                <_Preview src={src} />
                <h1 className="my-auto mr-4 ml-4">{lessonName}</h1>
            </div>
            <div className="flex justify-end w-full">
                <button className="btn bg-black text-white" onClick={handleSubmit}>บันทึก</button>
                <button className="btn ml-7" onClick={onCancel}>ยกเลิก</button>
            </div>
        </div>
    )
}

export default VideoLessonCreate