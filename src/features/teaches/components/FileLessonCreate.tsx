import { faX } from "@fortawesome/free-solid-svg-icons"
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


function FileLessonCreate({ chapterName, chapterNumber, lessonNumber, onCancel, onSubmit }: VideoLessonCreateProps) {
    const [lessonName, setLessonName] = useState<string>("")
    const [lessonDescription, setLessonDescription] = useState<string>("")
    const [files, setFiles] = useState<File[]>([])
    const onRemoveFile = (index: number) => {
        setFiles(p => p.filter((_, i) => i != index))
    }
    const onLessonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLessonName(e.target.value)
    }
    const onLessonDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLessonDescription(e.target.value)
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files
        for (let i = 0; i < fileList.length; i++) {
            setFiles(p => [...p, fileList.item(i)])
        }
    }
    const handleSubmit = () => {
        const lesson: Omit<CourseLesson, "lessonID"> = {
            lessonName: lessonName,
            lessonNumber: lessonNumber,
            lessonType: "files",
            src: files[0].name
        }
        onSubmit(lesson)
    }

    return (
        <div>
            <h1>สร้างคอร์สเรียน</h1>
            <h1>บทที่ {chapterNumber}: </h1>
            <h2>{chapterName} / ไฟล์</h2>
            <div className="bg-white">
                <div className="flex">
                    <h1>หัวข้อ</h1>
                    <input type="text" className="input" value={lessonName} onChange={onLessonNameChange} />
                </div>
                <div>
                    <h1>คำอธิบาย</h1>
                    <input type="text" className="input" value={lessonDescription} onChange={onLessonDescriptionChange} />
                </div>
            </div>
            <div>
                <ol>
                    {files.map((file, index) => (
                        <li key={index}>
                            <div className="flex">
                                <h1>{file.name}</h1>
                                <FontAwesomeIcon icon={faX} onClick={() => onRemoveFile(index)} />
                            </div>
                        </li>
                    ))}
                </ol>
                <input type="file" id="lessonFileSelector" style={{ display: "none" }} onChange={handleFileChange} />
                <button className="btn" onClick={() => { document.getElementById("lessonFileSelector").click() }}>เพิ่มไฟล์</button>
            </div>
            <div className="flex justify-end w-full">
                <button className="btn bg-black text-white" onClick={handleSubmit}>บันทึก</button>
                <button className="btn ml-7" onClick={onCancel}>ยกเลิก</button>
            </div>
        </div>
    )
}

export default FileLessonCreate