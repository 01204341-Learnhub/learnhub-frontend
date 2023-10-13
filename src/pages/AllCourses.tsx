// use effect fetch data from services
import { Link } from "react-router-dom"
import ProgramSlot from "../features/stores/components/ProgramSlot"
import { useAllCourses } from "../features/stores/hooks/useAllCourses"





export default function AllCloures() {
    const { courses, isFetching } = useAllCourses()
    const renderCourse = () => {
        return (
            <>
                {courses.map((course, index) => {
                    return (
                        <Link to={`/detail/course/${course.courseID}`} key={index} className="mx-5 my-2" >
                            <ProgramSlot key={index} courseThumbnailUrl={course.thumbnailUrl}
                                courseName={course.name}
                                instructorName={course.instructor.name}
                                percentCompleted={100}
                                regisDate={""} voter={1000} price={course.price} tag={course.tags[0].name}
                                lvl={"HARDCODE"} />
                        </Link>
                    )
                })}
            </>
        )
    }
    if (isFetching) {
        return (
            <div className="flex">
                <h1>Loading...</h1>
            </div>
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