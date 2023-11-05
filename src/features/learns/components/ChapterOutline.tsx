import {
    faAngleDown,
    faAngleUp,
    faCirclePlay,
    faClipboardList,
    faClock,
    faFile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReducer, useState } from 'react';
import { useCourseLessons } from "../hooks/useCourseLessons";
import { CourseChapter } from "../types/courseChapters";
import { CourseLesson } from "../types/lessons";
import { StudentCourseLessonProgress } from "../types/progress";


interface ChapterOutlineProp {
    chapter: CourseChapter
    lessonsProgress: StudentCourseLessonProgress[]
    onSelectLesson?: (lesson: CourseLesson) => void
    onUpdateProgress?: (progress: StudentCourseLessonProgress) => void,
    currentLesson: CourseLesson | undefined
}

export default function ChapterOutline({ chapter, lessonsProgress, onSelectLesson, onUpdateProgress, currentLesson }: ChapterOutlineProp) {
    const [show, setShow] = useState(false)
    const [_, forceUpdate] = useReducer((x) => x + 1, 0)
    const { lessons } = useCourseLessons(chapter.courseID, chapter.chapterID)

    const finishedLesson = () => {
        let finished = 0
        for (let i = 0; i < lessonsProgress.length; i++) {
            if (lessonsProgress[i].finished) {
                finished++
            }
        }
        return finished
    }
    const handleShow = async () => {
        setShow((prev) => !prev)
    }
    const checkIfFinished = (lessonID: string) => {
        for (let i = 0; i < lessonsProgress.length; i++) {
            if (lessonsProgress[i].lessonID == lessonID) {
                return lessonsProgress[i].finished
            }
        }
        console.warn("Lesson not found in progress");
        return false
    }

    function formatSeconds(seconds: number): string {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        if (hours < 1) {
            return `${minutes} นาที`
        }
        return `${hours} ชั่วโมง ${minutes} นาที`
    }
    return (
        <>
            <div className="w-4/5">
                <div className="flex bg-[#ECF3F9] border-t-[2px] w-full justify-between" onClick={() => handleShow()}>

                    <div className="flex flex-col items-start flex-1 pl-6 py-2">
                        <h1 className="text-base font-semibold">บทที่ {chapter.chapterNumber} : {chapter.name}</h1>
                        <div className="py-1">
                            <span className='text- text-[#202020] font-medium text-sm pr-4'>{finishedLesson()}/{chapter.lessonCount}</span>
                            <FontAwesomeIcon icon={faClock} color="#606060" className="pr-4" />
                            <span className='text-sm text-[#404040]'>
                                {formatSeconds(chapter.chapterLength)}
                            </span>
                        </div>
                    </div>

                    <div className="flex p-6">
                        <button className=''>
                            {show ?
                                <FontAwesomeIcon icon={faAngleUp} size='xl' className=""></FontAwesomeIcon>
                                : <FontAwesomeIcon icon={faAngleDown} size='xl' className=""></FontAwesomeIcon>
                            }
                        </button>
                    </div>

                </div>
                <hr className="w-full text-[#b0b0b0] border-t-2 py-0.5" />
                {show && lessons.map((lesson) => (
                    <div key={lesson.lessonID} className="w-full sm:text-sm">
                        <LessonSlot lesson={lesson} finished={checkIfFinished(lesson.lessonID)} onSelectLesson={onSelectLesson}
                            isFocused={currentLesson?.lessonID == lesson.lessonID}
                            onFinishedChange={(f) => {
                                const lessonProgress = lessonsProgress.find((lp) => lp.lessonID == lesson.lessonID)
                                lessonProgress.finished = f
                                onUpdateProgress(lessonProgress)
                                forceUpdate()
                            }} />
                    </div>
                ))
                }
            </div>
        </>
    )
}


interface LessonSlotProp {
    lesson: CourseLesson
    isFocused: boolean
    finished: boolean
    onSelectLesson?: (lesson: CourseLesson) => void,
    onFinishedChange: (finished: boolean) => void
}



function LessonSlot({ lesson, finished, onSelectLesson, onFinishedChange, isFocused }: LessonSlotProp) {
    const handleClick = () => {
        if (onSelectLesson) onSelectLesson(lesson)
        if (lesson.lessonType == "file") onFinishedChange(true)
        
    }
    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFinishedChange(e.target.checked)
    }
    return (
        <div className={`flex ${isFocused ? "bg-[#E3F6F5] drop-shadow-lg" : ""} w-full hover:bg-slate-200`}>
            <div className="flex justify-between items-center pb-1.5 w-11/12"
                onClick={handleClick}>
                <div className="flex">
                    <div className="flex h-24 w-24 bg-[#D9D9D9] justify-center items-center">
                        {
                            lesson.lessonType == "video" ? <FontAwesomeIcon icon={faCirclePlay} size='2xl' color="black" className="drop-shadow-lg" />
                                : lesson.lessonType == "file" ? <FontAwesomeIcon icon={faFile} color="#000" size='2xl' className="drop-shadow-lg" />
                                    : lesson.lessonType == "quiz" ? <FontAwesomeIcon icon={faClipboardList} color="#000" size="2xl" className="drop-shadow-lg" /> : <></>
                        }
                    </div>
                    <div className='mx-5 my-auto'>
                        <h1 className="font-semibold">{lesson.name}</h1>
                    </div>
                </div>
                <div></div>
            </div>
            <input type="checkbox" className='mx-5' checked={finished} onChange={onCheckboxChange}></input>
        </div>
    )
}

