import { useEffect, useReducer, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { LoadingSpash } from "../../components/LoadingSpash"
import ChapterOutline from "../../features/learns/components/ChapterOutline"
import CourseAnnouncementDropdown from "../../features/learns/components/CourseAnnouncementDropdown"
import CourseMultipleChoiceQuiz from "../../features/learns/components/CourseMultipleChoiceQuiz"
import CourseMultipleChoiceQuizReport from "../../features/learns/components/CourseMultipleChoiceQuizReport"
import VideoLessonPlayer from "../../features/learns/components/VideoLessonPlayer"
import { useCourseChapters } from "../../features/learns/hooks/useCourseChapters"
import { useStudentCourseProgress } from "../../features/learns/hooks/useStudentCourseProgress"
import { updateStudentCourseLessonProgress } from "../../features/learns/services/progress"
import { CourseChapter } from "../../features/learns/types/courseChapters"
import { CourseLesson } from "../../features/learns/types/lessons"
import { StudentCourseLessonProgress, StudentCourseProgress } from "../../features/learns/types/progress"
import { useAnnouncementsCourses } from "../../features/stores/hooks/useListAnnouncementsCourses"
import { useUser } from "../../hooks/useUser"
import { getFileNameFromSrc } from "../../utils/functions"

interface _CourseContentProp {
    chapters: CourseChapter[]
    studentCourseProgress: StudentCourseProgress,
    currentLesson?: CourseLesson,
    onSelectLesson?: (lesson: CourseLesson) => void,
    onUpdateProgress?: (progress: StudentCourseLessonProgress) => void,
}

function _CourseContent({ chapters, onUpdateProgress, studentCourseProgress, onSelectLesson, currentLesson }: _CourseContentProp) {
    function _getChapterProgress(chapterID: string) {
        return studentCourseProgress.lessons.filter((lesson) => {
            if (lesson.chapterID == chapterID) return true
            return false
        })
    }
    return (
        <div className="w-full flex flex-col items-center">
            {chapters.map((chapter, index) => (
                <ChapterOutline chapter={chapter} lessonsProgress={_getChapterProgress(chapter.chapterID)} onSelectLesson={onSelectLesson} key={index}
                    onUpdateProgress={onUpdateProgress} currentLesson={currentLesson} />
            ))}
        </div>
    )
}

interface _LessonDisplayProp {
    lesson: CourseLesson | undefined,
    progress: StudentCourseLessonProgress | undefined
    onLessonEnd: () => void,
    onUpdateProgress: (progress: StudentCourseLessonProgress) => void
}

function _LessonDisplay({ lesson, progress, onLessonEnd, onUpdateProgress }: _LessonDisplayProp) {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0)
    if (!lesson) return (<div className="font-semibold sm:text-lg text-[#606060]">คลิ๊กเลือกบทเรียนด้านล่าง เพื่อเริ่มเรียนกันเถอะ</ div>)
    if (lesson.lessonType == 'video') {
        return (
            <div>
                <VideoLessonPlayer url={lesson.src} onProgressUpdate={onUpdateProgress} lessonProgress={progress} />
            </div>
        )
    } else if (lesson.lessonType == "quiz") {
        if (progress.finished) {
            return (
                <div className="w-full">
                    <CourseMultipleChoiceQuizReport quizID={lesson.src} />
                </div>
            )
        } else {
            return (
                <div className=" overflow-hidden">
                    <CourseMultipleChoiceQuiz lesson={lesson} progress={progress}
                        onDone={() => {
                            progress.finished = true
                            forceUpdate()
                            onLessonEnd()
                        }} />
                </div>
            )
        }
    } else if (lesson.lessonType == "files" || lesson.lessonType == "file") {
        return (
            <div className="flex rounded-xl justify-center h-[200px] w-full " >
                <div className='flex flex-col bg-white w-4/5 pt-4 px-4 border-2 h-full py-2'>
                    <p className="text-3xl font-semobold">เอกสารที่สามารถดาวโหลดได้</p>
                    <a className="text-blue-500 py-2" target='_blank' href={lesson.src}>
                        {getFileNameFromSrc(lesson.src)}
                    </a>
                </div>
            </div>
        )
    }
}

function LearnCourse() {
    const { courseID } = useParams<{ courseID: string }>()
    const { user } = useUser()
    const { progress, updateLessonProgress } = useStudentCourseProgress(user.userID, courseID)
    const { chapters } = useCourseChapters(courseID)
    const { announcements, isFetching } = useAnnouncementsCourses(courseID)
    const [searchParams, setSearchParams] = useSearchParams()
    const [outlineViewMode, setOutlineViewMode] = useState<'contents' | 'announcements'>(searchParams.get('view') == 'announcements' ? 'announcements' : 'contents')
    const [currentLesson, setCurrentLesson] = useState<CourseLesson | undefined>(undefined)
    const [_, forceUpdate] = useReducer((x) => x + 1, 0)


    const getChapter = (chapterID: string) => {
        const idx = chapters.findIndex((chapter) => chapter.chapterID == chapterID)
        if (idx == -1) throw new Error("Chapter not found")
        return chapters[idx]
    }

    function getCurrentLessonProgress() {
        if (currentLesson == undefined) return undefined
        const idx = progress.lessons.findIndex((lesson) => lesson.lessonID == currentLesson.lessonID)
        if (idx == -1) return undefined
        return progress.lessons[idx]
    }

    function onLessonEnd() {
        // set current lesson progress to finished
        if (currentLesson == undefined) return
        const currentProgress = getCurrentLessonProgress()
        currentProgress.finished = true
        updateLessonProgress(currentProgress).then(() => { forceUpdate() })
    }
    function updateProgress(lessonProgress: StudentCourseLessonProgress) {
        const idx = progress.lessons.findIndex((lp) => lp.lessonID == lessonProgress.lessonID)
        if (idx == -1) throw new Error("Lesson not found")
        progress.lessons[idx] = lessonProgress
        updateStudentCourseLessonProgress(user.userID, courseID, lessonProgress).then(() => {
            forceUpdate()
        })
    }
    useEffect(() => {
        setSearchParams({ view: outlineViewMode })
    }, [setSearchParams, outlineViewMode])

    if (isFetching || chapters.length == 0) return (<div className="flex justify-center items-center h-screen">
        <LoadingSpash />
    </div>)

    return (
        <div className="">
            <div className="flex pt-8 pl-14 pb-14">
                <h1 className="text-black font-bold text-4xl">คอร์สเรียน</h1>
                <h1 className="text-gray-600 font-semibold text-3xl my-auto ml-4"></h1>
            </div>
            <div className="flex items-center justify-center w-full">
                <_LessonDisplay lesson={currentLesson} progress={getCurrentLessonProgress()} onLessonEnd={onLessonEnd} onUpdateProgress={updateProgress} />
            </div>
            <div className="flex flex-col items-center mt-20 h-full">

                {(() => {
                    if (currentLesson == undefined) return (<></>)
                    const currentChapter = getChapter(currentLesson.chapterID)
                    return (
                        <div className="w-4/5">
                            <h1 className="text-black font-bold text-xl pb-4">บทที่ {currentChapter.chapterNumber}: {currentChapter.name}</h1>
                            <p className="font-medium text-lg" >{currentChapter.description}</p>
                        </div>
                    )
                })()}

                <div className="flex w-4/5 mt-20 mb-10">
                    <button onClick={() => { setOutlineViewMode("contents") }}>
                        <h1 className="text-xl font-bold">เนื้อหาคอร์สเรียน</h1>
                        <div className={`bg-black ${outlineViewMode == "contents" ? "h-2 mt-1" : "h-2 mt-1 bg-transparent"}`}></div>
                    </button>
                    <button className="ml-10" onClick={() => { setOutlineViewMode("announcements") }}>
                        <h1 className="text-xl font-bold">ประกาศจากคอร์สเรียน</h1>
                        <div className={`bg-black ${outlineViewMode == "announcements" ? "h-2 mt-1" : "h-2 mt-1 bg-transparent"}`}></div>
                    </button>
                </div>
                <div className="bg-white flex justify-center w-4/5 pt-8 pb-8">
                    {(() => {
                        if (outlineViewMode == 'contents') {
                            return (
                                <_CourseContent chapters={chapters} studentCourseProgress={progress} onSelectLesson={(l) => {
                                    setCurrentLesson(l)
                                    forceUpdate()
                                }}
                                    onUpdateProgress={updateLessonProgress} currentLesson={currentLesson} />
                            )
                        }
                        else {
                            if (isFetching) {
                                return (
                                    <div className="flex justify-center items-center h-screen">
                                        <LoadingSpash />
                                    </div>
                                )
                            }
                            return (
                                <div className="">

                                    {announcements.length > 0 ? (
                                        <div className="w-full flex flex-col-reverse">
                                            {announcements.map((announcement) => (
                                                <div key={announcement.announcementID}>
                                                    <CourseAnnouncementDropdown {...announcement} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="w-full flex items-center justify-center">
                                            <div className="text-xl font-semibold text-[#505050]">ยังไม่มีประกาศในคอร์สเรียนขณะนี้</div>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    })()}
                </div>
            </div>
        </div>
    )
}

export default LearnCourse