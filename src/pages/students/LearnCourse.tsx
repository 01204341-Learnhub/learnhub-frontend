import { useState } from "react"
import { useParams } from "react-router-dom"
import VideoPlayer from "../../components/VideoPlayer"
import ChapterOutline from "../../features/learns/components/ChapterOutline"
import CourseAnnouncementDropdown from "../../features/learns/components/CourseAnnouncementDropdown"
import CourseMultipleChoiceQuiz from "../../features/learns/components/CourseMultipleChoiceQuiz"
import CourseMultipleChoiceQuizReport from "../../features/learns/components/CourseMultipleChoiceQuizReport"
import { useCourseChapters } from "../../features/learns/hooks/useCourseChapters"
import { useStudentCourseProgress } from "../../features/learns/hooks/useStudentCourseProgress"
import { CourseChapter } from "../../features/learns/types/courseChapters"
import { CourseLesson } from "../../features/learns/types/lessons"
import { StudentCourseLessonProgress, StudentCourseProgress } from "../../features/learns/types/progress"
import { CourseAnnouncement } from "../../features/stores/types/course"
import { useUser } from "../../hooks/useUser"

interface _CourseContentProp {
    chapters: CourseChapter[]
    studentCourseProgress: StudentCourseProgress,
    onSelectLesson?: (lesson: CourseLesson) => void,
    onUpdateProgress?: (progress: StudentCourseLessonProgress) => void,
}

function _CourseContent({ chapters, onUpdateProgress, studentCourseProgress, onSelectLesson }: _CourseContentProp) {
    function _getChapterProgress(chapterID: string) {
        return studentCourseProgress.lessons.filter((lesson) => {
            if (lesson.chapterID == chapterID) return true
            return false
        })
    }
    return (
        <div>
            {chapters.map((chapter, index) => (
                <ChapterOutline chapter={chapter} lessonsProgress={_getChapterProgress(chapter.chapterID)} onSelectLesson={onSelectLesson} key={index}
                    onUpdateProgress={onUpdateProgress} />
            ))}
        </div>
    )
}

function _LessonDisplay({ lesson, progress }: { lesson: CourseLesson | undefined, progress: StudentCourseLessonProgress }) {
    if (!lesson) return (<div>Not found</div>)
    if (lesson.lessonType == 'video') {
        return (
            <div>
                <VideoPlayer url={lesson.src} />
            </div>
        )
    } else if (lesson.lessonType == "quiz") {
        if (progress.finished) {
            return (
                <CourseMultipleChoiceQuizReport quizID={lesson.src} />
            )
        } else {
            return (
                <CourseMultipleChoiceQuiz lesson={lesson} progress={progress} />
            )
        }
    }
}

function LearnCourse() {
    const { courseID } = useParams<{ courseID: string }>()
    const { user } = useUser()
    const { progress, updateLessonProgress } = useStudentCourseProgress(user.userID, courseID)
    const { chapters } = useCourseChapters(courseID)
    const [outlineViewMode, setOutlineViewMode] = useState<'contents' | 'announcements'>('contents')
    const [currentLesson, setCurrentLesson] = useState<CourseLesson | undefined>(undefined)
    const [announcements, setAnnouncements] = useState<CourseAnnouncement[]>([])

    const announcementAdapter = (announcement: CourseAnnouncement) => {
        return {
            topic: announcement.name,
            postDate: "091223",
            content: announcement.text,
            teacherName: "Mister Hardcode",
            teacherProfile: "https://www.w3schools.com/howto/img_avatar.png"
        }
    }

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
    return (
        <div className="bg-[#eeeeee80] h-full pb-20">
            <div className="flex pt-8 pl-14 pb-14">
                <h1 className="text-black font-bold text-4xl">คอร์สเรียน</h1>
                <h1 className="text-gray-600 font-semibold text-3xl my-auto ml-4"></h1>
            </div>
            <div className="flex items-center justify-center">
                <_LessonDisplay lesson={currentLesson} progress={getCurrentLessonProgress()} />
            </div>
            <div className="flex flex-col items-center mx-20 mt-20">

                {(() => {
                    if (currentLesson == undefined) return (<></>)
                    const currentChapter = getChapter(currentLesson.chapterID)
                    return (
                        <div className="self-start">
                            <h1 className="text-black font-bold text-2xl pb-4">คำอธิบาย (ของ ch) บทที่ {currentChapter.chapterNumber}: {currentChapter.name}</h1>
                            <p className="font-medium text-lg" >{currentChapter.description}</p>
                        </div>
                    )
                })()}
                <div className="flex mt-20 mb-10 self-start">
                    <button onClick={() => { setOutlineViewMode("contents") }}>
                        <h1 className="text-2xl font-bold">เนื้อหาคอร์สเรียน</h1>
                        <div className={`bg-black ${outlineViewMode == "contents" ? "h-3" : "h-3 bg-transparent"}`}></div>
                    </button>
                    <button className="ml-10" onClick={() => { setOutlineViewMode("announcements") }}>
                        <h1 className="text-2xl font-bold">ประกาศจากคอร์สเรียน</h1>
                        <div className={`bg-black ${outlineViewMode == "announcements" ? "h-3" : "h-3 bg-transparent"}`}></div>
                    </button>
                </div>
                <div className="bg-white w-full px-20 pt-12 pb-8 ">
                    {(() => {
                        if (outlineViewMode == 'contents') {
                            return (
                                <_CourseContent chapters={chapters} studentCourseProgress={progress} onSelectLesson={(l) => { setCurrentLesson(l) }}
                                    onUpdateProgress={updateLessonProgress} />
                            )
                        }
                        else {
                            return (
                                <div className="">
                                    {announcements.map((announcement) => (
                                        <div key={announcement.announcementID}>
                                            <CourseAnnouncementDropdown {...announcementAdapter(announcement)} />
                                        </div>
                                    ))}
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