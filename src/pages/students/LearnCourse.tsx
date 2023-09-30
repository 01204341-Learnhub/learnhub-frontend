import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import VideoPlayer from "../../components/VideoPlayer"
import ChapterOutline from "../../features/learns/components/ChapterOutline"
import CourseAnnouncementDropdown from "../../features/learns/components/CourseAnnouncementDropdown"
import CourseMultipleChoiceQuiz from "../../features/learns/components/CourseMultipleChoiceQuiz"
import { fetchChapters } from "../../features/learns/services/course"
import { fetchUserCourseProgress } from "../../features/learns/services/progress"
import { CourseChapter, CourseLesson } from "../../features/learns/types/course"
import { UserCourseProgress } from "../../features/learns/types/progress"
import { CourseQuiz } from "../../features/learns/types/quiz"
import { listCourseAnnouncements } from "../../features/stores/services/courses"
import { CourseAnnouncement } from "../../features/stores/types/course"

interface _CourseContentProp {
    chapters: CourseChapter[]
    chapterProgress: UserCourseProgress,
    onSelectLesson?: (lesson: CourseLesson) => void
}

function _CourseContent({ chapters, chapterProgress, onSelectLesson }: _CourseContentProp) {
    return (
        <div>
            {chapters.map((chapter, index) => (
                <ChapterOutline chapter={chapter} chapterProgress={chapterProgress} onSelectLesson={onSelectLesson} key={index} />
            ))}
        </div>
    )
}

function _LessonDisplay({ lesson }: { lesson: CourseLesson | undefined }) {
    if (!lesson) return (<div>Not found</div>)
    if (lesson.lessonType == 'video') {
        return (
            <div>
                <VideoPlayer url={lesson.src} />
            </div>
        )
    } else {
        const quiz: CourseQuiz = {
            quizID: "1",
            name: "Quiz 1",
            description: "Quiz 1 description",
            questions: [
                {
                    questionNumber: 1,
                    question: "Question 1",
                    options: [
                        "Option 1",
                        "Option 2",
                        "Option 3",
                    ]
                },
                {
                    questionNumber: 2,
                    question: "Question 2",
                    options: [
                        "Option 1",
                        "Option 2",
                        "Option 3",
                        "Option 4",
                    ]
                },
                {
                    questionNumber: 3,
                    question: "Question 3",
                    options: [
                        "Option 1",
                        "Option 3",
                        "Option 4",
                    ]
                },
            ]
        }
        return (
            <CourseMultipleChoiceQuiz quiz={quiz} />
        )
    }
}

function LearnCourse() {
    const { courseID } = useParams<{ courseID: string }>()
    const [fetching, setFetching] = useState(false)
    const [progress, setProgress] = useState<UserCourseProgress | undefined>()
    const [chapters, setChapters] = useState<CourseChapter[]>([])
    const [outlineViewMode, setOutlineViewMode] = useState<'contents' | 'announcements'>('contents')
    const [currentLesson, setCurrentLesson] = useState<CourseLesson | undefined>(undefined)
    const [announcements, setAnnouncements] = useState<CourseAnnouncement[]>([])

    useEffect(() => {
        if (!courseID) return
        async function fetchData(courseID: string) {
            const fetchedChapters = await fetchChapters(courseID)
            const progress = await fetchUserCourseProgress(courseID)
            const fetchedAnnouncements = await listCourseAnnouncements(courseID)
            setChapters(fetchedChapters)
            setProgress(progress)
            setAnnouncements(fetchedAnnouncements)
        }

        setFetching(true)
        fetchData(courseID).then(() => { setFetching(false) })
    }, [courseID])

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

    if (fetching) return (<div>Fetching...</div>)
    if (!progress || !chapters) return (<div>Not found</div>)
    return (
        <div className="bg-[#e0e0e0] h-full">
            <div className="flex">
                <h1 className="text-black font-bold text-4xl">คอร์สเรียน</h1>
                <h1 className="text-gray-600 font-semibold text-3xl my-auto ml-4">No name course</h1>
            </div>
            <div>
                <_LessonDisplay lesson={currentLesson} />
            </div>
            <div className="mx-12 mt-10">

                {(() => {
                    if (currentLesson == undefined) return (<></>)
                    const currentChapter = getChapter(currentLesson.chapterID)
                    return (
                        <div>
                            <h1 className="text-black font-bold">คำอธิบาย (ของ ch) บทที่ {currentChapter.chapterNum}: {currentChapter.name}</h1>
                            <p>{currentChapter.description}</p>
                        </div>
                    )
                })()}
                <div className="flex mt-20">
                    <button onClick={() => { setOutlineViewMode("contents") }}>
                        <h1>เนื้อหาคอร์สเรียน</h1>
                        <div className={`bg-slate-700 ${outlineViewMode == "contents" ? "h-3" : ""}`}></div>
                    </button>
                    <button className="ml-10" onClick={() => { setOutlineViewMode("announcements") }}>
                        <h1>ประกาศจากคอร์สเรียน</h1>
                        <div className={`bg-slate-700 ${outlineViewMode == "announcements" ? "h-3" : ""}`}></div>
                    </button>
                </div>
                <div className="bg-white px-10 py-12">
                    {(() => {
                        if (outlineViewMode == 'contents') {
                            return (
                                <_CourseContent chapters={chapters} chapterProgress={progress} onSelectLesson={(l) => { setCurrentLesson(l) }} />

                            )
                        }
                        else {
                            return (
                                <div>

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