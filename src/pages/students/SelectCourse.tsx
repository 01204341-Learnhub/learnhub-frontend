import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import CourseCard from "../../features/learns/components/CourseCard"
import { useEnrolledCourses } from "../../features/learns/hooks/useEnrolledCourses"
import { useUser } from "../../hooks/useUser"

export default function SelectCourse() {
    const { user } = useUser()
    const { enrolledCourses, isFetching } = useEnrolledCourses(user.userID)
    const [query, setQuery] = useState("IN-PROGRESS")

    if (isFetching) return <div>Loading...</div>
    return (
        <div className="">
            <div className="flex mt-5">
                <h1 className="ml-5 text-2xl text-black font-bold">คอร์สเรียนของฉัน</h1>
            </div>
            <div className="ml-20">
                <h1 className="text-black text-2xl font-bold my-5">เลือก ความคืบหน้า</h1>
                <div className="flex">
                    <button className={`bg-white p-2 ${query === "IN-PROGRESS" ? "bg-[#808080]" : ""}`} onClick={() => setQuery("IN-PROGRESS")}>
                        <h1 className="text-xl font-bold">กำลังดำเนินการ</h1>
                        <div className="w-full h-2 bg-slate-500"></div>
                    </button>
                    <button className={`bg-white p-2 ${query === "COMPLETED" ? "bg-[#808080]" : ""}`} onClick={() => setQuery("COMPLETED")}>
                        <h1 className="text-xl font-bold">ยังไม่ได้เริ่ม</h1>
                    </button>
                    <button className={`bg-white p-2 ${query === "NOT-START" ? "bg-[#808080]" : ""}`} onClick={() => setQuery("NOT-START")}>
                        <h1 className="text-xl font-bold">เสร็จสิ้นแล้ว</h1>
                    </button>
                </div>
                <hr />
            </div>
            <div className=" my-8 ml-20">
                <div className="flex drop-shadow-md">
                    <input type="text" placeholder="ค้นหาคอร์สเรียน" />
                    <button className="bg-black p-2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" size="xl" />
                    </button>
                </div>
            </div>
            <h1 className="ml-5 text-xl font-bold mt-20">คอร์สเรียน</h1>
            <ul className="grid grid-cols-5 mx-5">
                {enrolledCourses.map(({ courseID, name, thumbnailUrl, teacher, progress }) => (
                    <li key={courseID} className={`flex justify-center mt-5`}>
                        <Link to={`/learn/courses/${courseID}`}>
                            <CourseCard courseName={name}
                                courseThumbnailUrl={thumbnailUrl}
                                instructorName={teacher.name}
                                percentCompleted={progress} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
