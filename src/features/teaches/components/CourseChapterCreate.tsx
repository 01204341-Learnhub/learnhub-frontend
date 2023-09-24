import { faClipboardList, faFile, faFileLines, faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { CourseChapter } from "../types/course"

interface CourseChapterCreateProps {
    chapterNumber: number,
    onSubmit: (chapter: CourseChapter) => void
    onCancel: () => void
}

function CourseChapterCreate({ chapterNumber: courseNumber, onSubmit, onCancel }: CourseChapterCreateProps) {
    const [chapterName, setChapterName] = useState<string>("")
    const [chapterDescription, setChapterDescription] = useState<string>("")
    const handleSubmit = () => {
        const chapter: CourseChapter = {
            chapterName: chapterName,
            chapterDescription: chapterDescription,
            lessons: [{ lessonName: "Y", lessonNumber: 1, lessonType: "video" },
            { lessonName: "X", lessonNumber: 2, lessonType: "doc" }]
        }
        onSubmit(chapter)
    }
    const onChapterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterName(e.target.value)
    }
    const onChapterDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterDescription(e.target.value)
    }
    return (
        <div>
            <h1 className="font-bold m-5">บทที่ {courseNumber}</h1>
            <div className="bg-white py-2 px-4 drop-shadow-lg">
                <h1 className="font-bold">ชื่อบทเรียน</h1>
                <input type="text" placeholder="ชื่อบทเรียน" className="input input-bordered w-full my-4" value={chapterName} onChange={onChapterNameChange} />
                <h1 className="font-bold">คำอธิบาย</h1>
                <input type="text" placeholder="  ผู้เรียนสามารถทำอะไรได้บ้างหลังจากจบส่วนนี้" className="input input-bordered w-full my-4" value={chapterDescription}
                    onChange={onChapterDescriptionChange} />
            </div>
            <div className="w-full flex justify-end mt-5">
                <div className="mr-4">
                    <button className="btn mx-2 bg-neutral text-white" onClick={handleSubmit}>บันทึก</button>
                    <button className="btn mx-2" onClick={onCancel}>ยกเลิก</button>
                </div>
            </div>
            <button className="btn bg-info text-white my-4">+ เพิ่มเนื้อหา</button>
            <div className="bg-white">
                <div className="flex my-2">
                    <FontAwesomeIcon icon={faPlayCircle} color="black" size="xl" />
                    <h1 className="ml-5">วิดีโอ</h1>
                </div>
                <div className="flex my-2">
                    <FontAwesomeIcon icon={faFileLines} color="black" size="xl" />
                    <h1 className="ml-5">เอกสาร</h1>
                </div>
                <div className="flex my-2">
                    <FontAwesomeIcon icon={faClipboardList} color="black" size="xl" />
                    <h1 className="ml-5">แบบฝึกหัด</h1>
                </div>
                <div className="flex my-2">
                    <FontAwesomeIcon icon={faFile} color="black" size="xl" />
                    <h1 className="ml-5">ไฟล์ (ผู้เรียนสามารถดาวโหลดได้)</h1>
                </div>
            </div>
        </div>
    )
}

export default CourseChapterCreate