import { faCaretDown, faCaretUp, faCirclePlay, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { fetchLessons } from "../services/course";
import { CourseChapter, CourseLesson } from "../types/course";
import { UserCourseProgress } from "../types/progress";


interface ChapterOutlineProp {
    chapter: CourseChapter
    chapterProgress: UserCourseProgress
    onSelectLesson?: (lesson: CourseLesson) => void
}

export default function ChapterOutline({ chapter, chapterProgress, onSelectLesson }: ChapterOutlineProp) {
    const [show, setShow] = useState(false)
    const [lessons, setLessons] = useState<CourseLesson[]>([])

    const handleShow = async () => {
        if (lessons.length == 0) {
            const fetchedLessons = await fetchLessons(chapter.courseID, chapter.chapterID)
            setLessons(fetchedLessons)
        }
        setShow((prev) => !prev)
    }
    const checkIfFinished = (lessonID: string) => {
        const idx = chapterProgress.lessons.findIndex((lesson) => lesson.lessonID == lessonID)
        if (idx == -1) throw new Error("Lesson not found")
        return chapterProgress.lessons[idx].finished
    }

    return (
        <>
            <div className=''>
                <div className="flex bg-[#ECF3F9] justify-between" onClick={() => setShow(!show)}>
                    <div className='text-xl m-5'>
                        <div>{chapter.name}</div>
                        <div className='flex mt-2'>
                            <div className='mx-5 text-sm'>{99999999999999}/{chapter.lessonCount}</div>
                            <div className='mx-5 text-sm'>{chapter.chapterLength / 3600 >= 1 ? chapter.chapterLength / 3600 + "ชั่วโมง" + ((chapter.chapterLength % 3600 > 0) ? chapter.chapterLength % 3600 + "นาที" : "") : chapter.chapterLength / 60 + "นาที"}</div>
                        </div>
                    </div>
                    <button onClick={handleShow} className='mx-5'>
                        {show ?
                            <FontAwesomeIcon icon={faCaretUp} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                            : <FontAwesomeIcon icon={faCaretDown} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                        }
                    </button>
                </div>
                <hr />
                {show && lessons.map((lesson) => (
                    <div key={lesson.lessonID}>
                        <LessonSlot lesson={lesson} finished={checkIfFinished(lesson.lessonID)} onSelectLesson={onSelectLesson} />
                        <hr />
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
    onSelectLesson?: (lesson: CourseLesson) => void
}



function LessonSlot({ lesson, finished, onSelectLesson }: LessonSlotProp) {
    const handleClick = () => {
        if (onSelectLesson) onSelectLesson(lesson)
    }
    return (
        <div className='flex justify-between  h-[75px]' onClick={handleClick}>
            <div className="flex justify-center items-center">
                <div className="flex h-[75px] w-[75px] bg-[#D9D9D9] justify-center items-center">{lesson.lessonType == "video" ? <FontAwesomeIcon icon={faCirclePlay} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                    : lesson.lessonType == "pdf" ? <FontAwesomeIcon icon={faFileLines} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                        : <></>}
                </div>
                <div className='mx-5'>
                    <h1>{lesson.name}</h1>
                </div>
            </div>
            <input type="checkbox" className='mx-5' checked={finished}></input>
        </div>
    )
}

