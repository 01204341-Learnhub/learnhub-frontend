import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ClassCard from "../../features/teaches/components/ClassCard"
import CourseCard from "../../features/teaches/components/CourseCard"
import NewProgramClass from "../../features/teaches/components/NewProgramCard"
import { listTeacherClasses } from "../../features/teaches/services/classes"
import { listTeachCourse } from "../../features/teaches/services/courses"
import { ClassInfo } from "../../features/teaches/types/classes"
import { CourseInfo } from "../../features/teaches/types/course"

function TeacherOverview() {
    const [courses, setCourses] = useState<CourseInfo[]>([])
    const [classes, setClasses] = useState<ClassInfo[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchCoursesAndClasses() {
            const fetchedCourses = await listTeachCourse("1")
            const fetchedClasses = await listTeacherClasses("1")
            setCourses(fetchedCourses)
            setClasses(fetchedClasses)
        }
        setIsFetching(true)
        fetchCoursesAndClasses().then(() => { setIsFetching(false) })
    }, [])

    function handleNavigate(type: string) {
        navigate(`/teach/create/${type}`)
    }
    if (isFetching) return <div>loading...</div>

    return (
        <div className="flex flex-col">
            <div className="w-3/5 mx-5 bg-[#d9d9d9]">
                <h1 className="my-5 mx-5 text-2xl font-bold">สร้างคอร์สเรียน/คลาสเรียน</h1>
                <div className="flex">
                    <div className="mx-5 my-5">
                        <NewProgramClass type="คอร์ส" onClick={() => { handleNavigate("course") }} />
                    </div>
                    <div className="mx-5 my-5">
                        <NewProgramClass type="คลาส" onClick={() => { handleNavigate("class") }} />
                    </div>
                </div>
            </div>
            <div className="w-2/5">
            </div>
            <div className="flex m-6">
                <h1 className="font-bold text-2xl">คอร์สเรียนของฉัน</h1>
                <h2 className="rounded-full bg-pink-500 ml-5">course</h2>
            </div>
            <ul className="grid grid-cols-5 gap-5 ml-5">
                {courses.map(({ courseID, courseName, courseRating, courseThumbnailUrl, studentCount }) => (
                    <li key={courseID}>
                        <CourseCard
                            courseName={courseName}
                            courseThumbnailUrl={courseThumbnailUrl}
                            courseRating={courseRating}
                            studentcount={studentCount} />
                    </li>
                ))}
            </ul>
            <div className="flex m-6">
                <h1 className="font-bold text-2xl">คลาสเรียนที่กำลังดำเนิน</h1>
                <h2 className="rounded-full bg-green-500 ml-5">course</h2>
            </div>
            <ul className="grid grid-cols-5 gap-5 ml-5">
                {classes.map(({ classID, className, classThumbnailUrl, percentCompleted, participantLimit, participantCount }) => (
                    <li key={classID}>
                        <ClassCard
                            className={className}
                            classThumbnailUrl={classThumbnailUrl}
                            percentCompleted={percentCompleted}
                            participantCount={participantCount}
                            participantLimit={participantLimit} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TeacherOverview