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
    onUpdateProgress?: (progress: StudentCourseLessonProgress) => void
}

export default function ChapterOutline({ chapter, lessonsProgress, onSelectLesson, onUpdateProgress }: ChapterOutlineProp) {
    const [show, setShow] = useState(false)
    const [_, forceUpdate] = useReducer((x) => x + 1, 0)
    const { lessons } = useCourseLessons(chapter.courseID, chapter.chapterID)

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
    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex bg-[#ECF3F9] w-full justify-between" onClick={() => handleShow()}>

                    <div className="flex flex-col items-start flex-1 pl-6 py-4">
                        <h1 className="text-xl font-semibold">บทที่ : {chapter.name}</h1>
                        <div className="py-1">
                            <span className='text-base text-[#606060] pr-4'>{1}/{chapter.lessonCount}</span>
                            <FontAwesomeIcon icon={faClock} color="#606060" className="pr-4" />
                            <span className='text-base text-[#606060]'>
                                {chapter.chapterLength / 3600 >= 1 ? chapter.chapterLength / 3600 + "ชั่วโมง" + ((chapter.chapterLength % 3600 > 0) ? chapter.chapterLength % 3600 + "นาที" : "") : chapter.chapterLength / 60 + "นาที"}
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
                <hr className="w-full text-[#b0b0b0] border-t-4 py-0.5" />
                {show && lessons.map((lesson) => (
                    <div key={lesson.lessonID} className="w-full">
                        <LessonSlot lesson={lesson} finished={checkIfFinished(lesson.lessonID)} onSelectLesson={onSelectLesson}
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
    finished: boolean
    onSelectLesson?: (lesson: CourseLesson) => void,
    onFinishedChange: (finished: boolean) => void
}



function LessonSlot({ lesson, finished, onSelectLesson, onFinishedChange }: LessonSlotProp) {
    const handleClick = () => {
        if (onSelectLesson) onSelectLesson(lesson)
    }
    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFinishedChange(e.target.checked)
    }
    return (
        <div className='flex justify-between' onClick={handleClick}>
            <div className="flex justify-center items-center pb-1.5">
                <div className="flex h-24 w-24 bg-[#D9D9D9] justify-center items-center">
                    {
                        lesson.lessonType == "video" ? <FontAwesomeIcon icon={faCirclePlay} size='2xl' color="black" className="drop-shadow-lg" />
                            : lesson.lessonType == "doc" ? <FontAwesomeIcon icon={faFile} color="#000" size='2xl' className="drop-shadow-lg" />
                                : lesson.lessonType == "quiz" ? <FontAwesomeIcon icon={faClipboardList} color="#000" size="2xl" className="drop-shadow-lg" /> : <></>
                    }
                </div>
                <div className='mx-5'>
                    <h1 className="font-semibold">{lesson.name}</h1>
                </div>
            </div>
            <input type="checkbox" className='mx-5' checked={finished} onChange={onCheckboxChange}></input>
        </div>
    )
}

