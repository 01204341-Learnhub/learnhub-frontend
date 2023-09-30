import { faPaperclip, faUpload } from "@fortawesome/free-solid-svg-icons"
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
            <div className="">
                <h1 className=" mx-[40px] mt-[20px] font-semibold text-[18px]">Preview</h1>
                <div className="ml-[50px] mt-[10px] p-5 my-auto bg-[#e0e0e0]">ยังไม่ได้เลือกไฟล์</div>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1 className=" mx-[40px] mt-[20px] font-semibold text-[18px]">Preview</h1>
                <video width="400" className="mx-[40px] mt-[20px]" controls>
                    <source src={src} />
                </video>
            </div>
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
        <div className=" h-screen">
            
            <div className="ml-[70px] mt-[20px] flex items-center">
                <h1 className="text-black text-[24px] font-bold">บทที่ {chapterNumber} : </h1>
                <h2 className=" text-[#808080] text-[18px] font-semibold ml-4">{chapterName} / วิดีโอที่ {lessonNumber}</h2>
            </div>
            <div className="ml-[70px] mr-[100px] mt-[30px] flex grow items-center bg-white drop-shadow-xl pt-2 pb-4">
                <h1 className="my-auto mx-[40px] font-semibold text-[18px]">ชื่อวิดีโอ</h1>
                <input type="text" className="mr-[50px] min-w-0 grow input input-bordered" value={lessonName} onChange={onLessonNameChange} />
            </div>
            <div className=" ml-[70px] mr-[100px] flex flex-col grow bg-white drop-shadow-xl pt-2 pb-4 mt-5">
                <h1 className="my-auto mx-[40px] mt-[20px] font-semibold text-[18px]">วิดีโอ</h1>
                <div className="flex">
                    <button className="mx-[40px] mt-[20px]" onClick={() => { setSourceFromLink("https://www.youtube.com/watch?v=30Dy3GERCqQ") }}>
                        <FontAwesomeIcon icon={faPaperclip} color="#606060" size="xl" className=" border-[#e0e0e0] border-2 p-2 rounded-full" />
                        <h1 className=" mt-[5px] font-semibold text-[16px] text-[#808080]">ลิ้งค์</h1>
                    </button>
                    <h1 className=" self-center font-semibold text-[16px] text-[#505050]">หรือ</h1>
                    <div className="mx-[10px] mt-[20px] flex flex-col">
                        <input type="file" id="lessonFileSelector" style={{display:"none"}} onChange={(e) => { setSourceFromFile(e.target.files![0]) }}/>
                        <button className="" onClick={() => document.getElementById('lessonFileSelector').click()}>
                            <FontAwesomeIcon icon={faUpload} color="#606060" size="xl" className=" border-[#e0e0e0] border-2 p-2 rounded-full" />
                        </button>
                        <h1 className=" mt-[5px] font-semibold text-[16px] text-[#808080]">อัพโหลดไฟล์</h1>
                    </div>
                </div>
            </div>
            <div className="ml-[70px] mr-[100px] flex grow  bg-white drop-shadow-xl pt-2 pb-4 mt-5">
                <_Preview src={src} />
                <h1 className="my-auto mr-4 ml-4">{lessonName}</h1>
            </div>
            <div className="flex mt-[40px] justify-end mr-[100px] w-full">
                <button className="btn bg-black text-white" onClick={handleSubmit}>บันทึก</button>
                <button className="btn ml-7 mr-[100px]" onClick={onCancel}>ยกเลิก</button>
            </div>
        </div>
    )
}

export default VideoLessonCreate