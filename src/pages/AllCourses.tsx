// use effect fetch data from services

import ProgramSlot from "../features/stores/components/ProgramSlot"
import { Link } from "react-router-dom"

function mockCourses(num: number) {
    const programs = []
    const mockInstructor = [
        "อาจารย์ อนันต์ สุขสวัสดิ์",
        "อาจารย์ สมชาย สุขสวัสดิ์",
        "อาจารย์ สมหญิง สุขสวัสดิ์",
        "mrs Jiraporn",
        "mr. Jirapong",
    ]
    for (let i = 0; i < num; i++) {
        programs.push({
            courseName: `คอร์สเรียนที่ ${i + 1}`,
            courseId: ` B${i + 1}`,
            instructorName: mockInstructor[i % mockInstructor.length],
            percentCompleted: Math.floor(Math.random() * 100),
            courseThumbnailUrl: `https://picsum.photos/${i}/${300}`,
        })
    }
    return programs
}

const renderClasses = () => {
    return (
        <>
            {mockCourses(20).map((course, index) => {
                    return (
                        <Link to={`/detail/course/${course.courseId}`} key={index} className="mx-5 my-2" >
                            <ProgramSlot key={index} courseThumbnailUrl={course.courseThumbnailUrl}
                                courseName={course.courseName}
                                instructorName={course.instructorName}
                                percentCompleted={course.percentCompleted}
                                regisDate={""} voter={0} price={3000} tag={"ยอดนิยม"}
                                lvl={"พื้นฐาน"} />
                        </Link>
                    )
            })}  
        </>
    )
}

export default function AllCloures() {
    

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
                    {renderClasses()}
                </section>
            </main>
        </>
    )
}