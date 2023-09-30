import { faClipboardList, faFile, faFileLines, faFolderBlank, faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { CourseChapter, CourseLesson } from "../types/course"
import FileLessonCreate from "./FileLessonCreate"
import VideoLessonCreate from "./VideoLessonCreate"

interface CourseChapterCreateProps {
    chapterNumber: number,
    onSubmit: (chapter: CourseChapter) => void
    onCancel: () => void
}

function _LessonTypeSelector({ onSelect }: { onSelect: (lessonType: string) => void }) {
    return (
        <div className="mx-[70px]">
            {/* The button to open modal */}
            < label htmlFor="my_modal_7" className="btn bg-black text-white my-4" >+ เพิ่มเนื้อหา</label >

            {/* Put this part before </body> tag */}
            < input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="bg-white">
                        <button className="flex my-2 p-2 hover:bg-gray-200 w-full"
                            onClick={() => { onSelect("video") }}>
                            <FontAwesomeIcon icon={faPlayCircle} color="#505050" size="xl" />
                            <h1 className="ml-5">วิดีโอ</h1>
                        </button>
                        <button className="flex my-2 p-2 hover:bg-gray-200 w-full"
                            onSelect={() => { onSelect("doc") }}>
                            <FontAwesomeIcon icon={faFileLines} color="#505050" size="xl" />
                            <h1 className="ml-5">เอกสาร</h1>
                        </button>
                        <button className="flex my-2 p-2 hover:bg-gray-200 w-full">
                            <FontAwesomeIcon icon={faClipboardList} color="#505050" size="xl" />
                            <h1 className="ml-5">แบบฝึกหัด</h1>
                        </button>
                        <button className="flex my-2 p-2 hover:bg-gray-200 w-full"
                            onClick={() => { onSelect("files") }}>
                            <FontAwesomeIcon icon={faFile} color="#505050" size="xl" />
                            <h1 className="ml-5">ไฟล์ (ผู้เรียนสามารถดาวโหลดได้)</h1>
                        </button>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </div>
    )
}

function _LessonPreview({ lessonName, lessonType }: { lessonName: string, lessonType: string }) {
    let icon = faFolderBlank
    switch (lessonType) {
        case "video":
            icon = faPlayCircle
            break;
        default:
            break;
    }
    return (
        <div className=" my-[10px] w-full bg-white flex p-4">
            <FontAwesomeIcon icon={icon} color="#505050" size="xl" className="ml-[20px]" />
            <h1 className="font-bold text-black mx-6">{lessonType}</h1>
            <h1 className="font-semibold text-[#808080]">{lessonName}</h1>
        </div>
    )
}
function CourseChapterCreate({ chapterNumber: courseNumber, onSubmit, onCancel }: CourseChapterCreateProps) {
    const [chapterName, setChapterName] = useState<string>("")
    const [chapterDescription, setChapterDescription] = useState<string>("")
    const [lessons, setLessons] = useState<Omit<CourseLesson, "lessonID">[]>([])
    const [mode, setMode] = useState("main")
    const handleSubmit = () => {
        const chapter: CourseChapter = {
            chapterName: chapterName,
            chapterDescription: chapterDescription,
            lessons: lessons.map((lesson) => {
                return {
                    lessonName: lesson.lessonName,
                    lessonNumber: lesson.lessonNumber,
                    lessonType: lesson.lessonType,
                }
            })
        }
        onSubmit(chapter)
    }
    const onChapterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterName(e.target.value)
    }
    const onChapterDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterDescription(e.target.value)
    }
    const handleAddingLesson = (lessonType: string) => {
        setMode(`add-${lessonType}`)
    }
    const handleAddLesson = (lesson: Omit<CourseLesson, "lessonID">) => {
        setLessons([...lessons, lesson])
        setMode("main")
    }
    if (mode == "add-video") {
        return (
            <VideoLessonCreate chapterNumber={courseNumber} chapterName={chapterName}
                lessonNumber={lessons.length + 1} onSubmit={handleAddLesson}
                onCancel={() => { setMode("main") }} />
        )
    }
    if (mode == "add-files") {
        return (
            <FileLessonCreate chapterNumber={courseNumber} chapterName={chapterName}
                lessonNumber={lessons.length + 1} onSubmit={handleAddLesson}
                onCancel={() => { setMode("main") }} />
        )
    }
    return (
        <div className="bg-[#eeeeee] h-screen">
            <h1 className="ml-[70px] mt-[20px] flex items-center text-black text-[24px] font-bold">บทที่ {courseNumber}</h1>
            <div className="ml-[70px] mr-[100px] mt-[30px] bg-white drop-shadow-xl">
                <div className=" flex grow items-center pt-2 pb-4">
                    <h1 className="my-[20px] mx-[40px] font-semibold text-[18px]">ชื่อบทเรียน</h1>
                    <input type="text" placeholder="ชื่อบทเรียน" className="mr-[50px] min-w-0 grow input input-bordered" value={chapterName} onChange={onChapterNameChange} />
                </div>
                <div className="  flex grow items-center pt-2 pb-4">
                    <h1 className="my-[20px] mx-[40px] font-semibold text-[18px]">คำอธิบาย</h1>
                    <input type="text" placeholder="  ผู้เรียนสามารถทำอะไรได้บ้างหลังจากจบส่วนนี้" className="mr-[50px] min-w-0 grow input input-bordered my-4" value={chapterDescription}
                        onChange={onChapterDescriptionChange} />
                </div>
            </div> 
            <ol className="ml-[70px] mr-[100px] mt-[30px] drop-shadow-xl">
                {lessons.map((lesson, index) => {
                    return (
                        <li key={index}>
                            <_LessonPreview lessonName={lesson.lessonName} lessonType={lesson.lessonType} />
                        </li>
                    )
                })}
            </ol>
            <_LessonTypeSelector onSelect={handleAddingLesson}  />
            <div className="flex mt-[40px] justify-end mr-[100px] w-full">
                <button className="btn bg-black text-white" onClick={handleSubmit}>บันทึก</button>
                <button className="btn ml-7 mr-[100px]" onClick={onCancel}>ยกเลิก</button>
            </div>
        </div>
    )
}

export default CourseChapterCreate