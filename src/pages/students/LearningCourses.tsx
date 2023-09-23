import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import CourseCard from "../../features/learns/components/CourseCard"
import { listEnrolledCourses } from "../../features/learns/services/programs"
import { EnrolledCourse } from "../../features/learns/types/programs"

export default function LearningCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("IN-PROGRESS")

    useEffect(() => {
        // get enrolled courses
        async function fetchEnrolledCourses() {
            if (loading) return
            setLoading(true)
            const data = await listEnrolledCourses("1")
            setEnrolledCourses(data)
            setLoading(false)
        }
        fetchEnrolledCourses()
    }, [])
    if (loading) return <div>Loading...</div>
    return (
        <div className="">
            <div className="flex mt-5">
                <h1 className="ml-5 text-2xl text-black font-bold">คอร์สเรียนของฉัน</h1>
                <div className="flex bg-white drop-shadow-xl ml-16">
                    <input type="text" placeholder="ค้นหาคอร์สเรียน" />
                    <button className="bg-black p-2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" size="xl" />
                    </button>
                </div>
            </div>
            <div className="ml-20">
                <h1 className="text-black text-2xl font-bold my-5">เลือก ความคืบหน้า</h1>
                <div className="flex">
                    <button className={`bg-white p-2 ${query === "IN-PROGRESS" ? "bg-[#808080]" : ""}`} onClick={() => setQuery("IN-PROGRESS")}>กำลังเรียน</button>
                    <button className={`bg-white p-2 ${query === "COMPLETED" ? "bg-[#808080]" : ""}`} onClick={() => setQuery("COMPLETED")}>เสร็จสิ้้นแล้ว</button>
                    <button className={`bg-white p-2 ${query === "NOT-START" ? "bg-[#808080]" : ""}`} onClick={() => setQuery("NOT-START")}>ยังไม่ได้เริ่มเรียน</button>
                </div>
            </div>
            <h1 className="ml-5 text-xl font-bold mt-20">คอร์สเรียน</h1>
            <ul className="grid grid-cols-5 mx-5">
                {enrolledCourses.map((course) => (
                    <li key={course.id} className={`flex justify-center mt-5`}>
                        <CourseCard courseName={course.name}
                            courseThumbnailUrl={course.thumbnailUrl}
                            instructorName={course.instructor[0]}
                            percentCompleted={course.progress} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
