import ProgramCarousel from "../features/stores/components/ProgramCarousel";
import ProgramSlot from "../features/stores/components/ProgramSlot";
import LearningClasses from "../pages/students/LearningClasses"
import { Link } from "react-router-dom"


function mockPrograms(num: number) {
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
            className: `คลาสเรียนที่ ${i + 1}`,
            courseId: ` B${i + 1}`,
            instructorName: mockInstructor[i % mockInstructor.length],
            percentCompleted: Math.floor(Math.random() * 100),
            courseThumbnailUrl: `https://picsum.photos/${i}/${300}`,
        })
    }
    return programs
}


const renderProgramsCourse = () => {
    return (
        <>
            {mockPrograms(20).map((program, index) => {
                if (index > 7){
                    return null
                } else {
                    return (
                        <Link to={`/detail/course/${program.courseId}`} key={index} className="mx-5 my-2" >
                            <ProgramSlot key={index} courseThumbnailUrl={program.courseThumbnailUrl}
                                courseName={program.courseName}
                                instructorName={program.instructorName}
                                percentCompleted={program.percentCompleted}
                                regisDate={""} voter={0} price={3000} tag={"ยอดนิยม"}
                                lvl={"พื้นฐาน"} />
                        </Link>
                    )
                }
            })}  
        </>
    )
}


const renderProgramClasses = () => {
    return (
        <>
            {mockPrograms(20).map((program, index) => {
                if (index > 7){
                    return null
                } else {

                    return (
                        <Link to={`/detail/course/${program.courseId}`} key={index} className="mx-5 my-2" >
                            <ProgramSlot key={index} courseThumbnailUrl={program.courseThumbnailUrl}
                                courseName={program.className}
                                instructorName={program.instructorName}
                                percentCompleted={program.percentCompleted}
                                regisDate={""} voter={0} price={3000} tag={"ยอดนิยม"}
                                lvl={"พื้นฐาน"} />
                        </Link>
                    )
                }
            })}
        </>
    )
}


export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <div className="mt-5">
                <ProgramCarousel programs={mockPrograms(20)}
                    carouselName="คลาสเรียนยอดนิยม"
                    displayCount={3} />
            </div>
            <hr className="border-[#d9d9d9] my-8 w-full"/>

            <div className="mt-5 mb-4">
                <ProgramCarousel programs={mockPrograms(20)}
                    carouselName="คลาสเรียนใหม่ล่าสุด"
                    displayCount={3} />
            </div>
            <hr className="border-[#d9d9d9] my-8 w-full"/>

            <section className="relative flex flex-col items-center">
                <h1 className="absolute left-[16%] pb-12 text-2xl font-bold self-start">คลาสเรียน</h1>
                <div className="pl-6 mt-5 w-[74%] pt-8 flex flex-wrap">
                    {renderProgramClasses()} 
                </div>
                <Link to={`/home/classes`}>
                    <div className="flex pb-4 pt-2">
                        <button
                            type="button"
                            className="text-lg font-bold">
                            ดูทั้งหมด
                        </button>
                    </div>
                </Link>
            </section>
            <hr className="border-[#d9d9d9] my-8 w-full"/>

            <section className="relative flex flex-col items-center">
                <h1 className="absolute left-[16%] pb-12 text-2xl font-bold self-start">คอร์สเรียน</h1>
                <div className="pl-6 mt-5 w-[74%] pt-8 flex flex-wrap">
                    {renderProgramsCourse()} 
                </div>
                <Link to={`/home/courses`}>
                    <div className="flex pb-4 pt-2">
                        <button
                            type="button"
                            className="text-lg font-bold">
                            ดูทั้งหมด
                        </button>
                    </div>
                </Link>
            </section>

            
        </div>
    )
}
