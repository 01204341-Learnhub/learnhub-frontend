// use effect fetch data from services
import { useEffect, useState } from "react"
import ProgramSlot from "../features/stores/components/ProgramSlot"
import { Link } from "react-router-dom"
import { Course } from "../features/stores/types/course"
import { getAllCourses } from "../features/stores/services/courses"





export default function AllCloures() {
    const [courses, setCourses] = useState<Course[] | null>(null)
    useEffect(() => {
        async function fetchProgramCourses() {
            const courses = await getAllCourses(20!)
            setCourses(courses)
        }
        fetchProgramCourses()
    }, [])
    console.log(courses)
    if (courses === null) {
        return null;
    }
    const renderCourse = () => {
        return (
            <>
                {courses.map((course, index) => {
                        return (
                            <Link to={`/detail/course/${course.id}`} key={index} className="mx-5 my-2" >
                                <ProgramSlot key={index} courseThumbnailUrl={course.cover}
                                    courseName={course.name}
                                    instructorName={course.intructor.name}
                                    percentCompleted={100}
                                    regisDate={""} voter={1000} price={course.price} tag={"ยอดนิยม"}
                                    lvl={"พื้นฐาน"} />
                            </Link>
                        )
                })}  
            </>
        )
    }
    return (
        <>
            <header className="flex px-4 py-8">
                <h1 className="text-3xl font-bold">คอร์สเรียนทั้งหมด</h1>
            </header>
            <main className="flex px-4">
                <section className="flex-[1] flex justify-center">
                    <div className="flex flex-col items-start px-4 border-2 w-5/6">
                        <h3 className="py-2 text-lg font-medium">หมวดหมู่</h3>
                        <select name="" id=""></select>
                        <h3 className="py-2 text-lg font-medium">ระดับ</h3>
                        <select name="" id=""></select>
                    </div>
                </section>
                <section className="flex-[3] flex flex-wrap">
                    {renderCourse()}
                </section>
            </main>
        </>
    )
}