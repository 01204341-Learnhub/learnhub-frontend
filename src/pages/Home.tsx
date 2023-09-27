import ProgramCarousel from "../features/stores/components/ProgramCarousel";
import ProgramSlot from "../features/stores/components/ProgramSlot";
import LearningClasses from "../pages/students/LearningClasses"
import { Link } from "react-router-dom"


function mockClass(num: number) {
    const classPrograms = []
    const mockInstructor = [
        "อาจารย์ อนันต์ สุขสวัสดิ์",
        "อาจารย์ สมชาย สุขสวัสดิ์",
        "อาจารย์ สมหญิง สุขสวัสดิ์",
        "mrs Jiraporn",
        "mr. Jirapong",
    ]
    for (let i = 0; i < num; i++) {
        classPrograms.push({
            programName: `คลาสเรียนที่ ${i + 1}`,
            programId: ` B${i + 1}`,
            instructorName: mockInstructor[i % mockInstructor.length],
            percentCompleted: Math.floor(Math.random() * 100),
            programThumbnailUrl: `https://picsum.photos/${i}/${300}`,
        })
    }
    return classPrograms
}

function mockCourse(num: number) {
    const coursePrograms = []
    const mockInstructor = [
        "อาจารย์ อนันต์ สุขสวัสดิ์",
        "อาจารย์ สมชาย สุขสวัสดิ์",
        "อาจารย์ สมหญิง สุขสวัสดิ์",
        "mrs Jiraporn",
        "mr. Jirapong",
    ]
    for (let i = 0; i < num; i++) {
        
        coursePrograms.push({
            programName: `คอร์สเรียนที่ ${i + 1}`,
            programId: ` B${i + 1}`,
            instructorName: mockInstructor[i % mockInstructor.length],
            percentCompleted: Math.floor(Math.random() * 100),
            programThumbnailUrl: `https://picsum.photos/${i}/${300}`,
        })
    }
    return coursePrograms
}

const renderProgramsCourse = () => {
    return (
        <>
            {mockCourse(20).map((program, index) => {
                if (index > 7){
                    return null
                } else {
                    return (
                        <Link to={`/detail/course/${program.programId}`} key={index} className="my-4 px-6" >
                            <ProgramSlot key={index} courseThumbnailUrl={program.programThumbnailUrl}
                                courseName={program.programName}
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
            {mockClass(20).map((program, index) => {
                if (index > 7){
                    return null
                } else {

                    return (
                        <Link to={`/detail/class/${program.programId}`} key={index} className="my-4 px-6" >
                            <ProgramSlot key={index} courseThumbnailUrl={program.programThumbnailUrl}
                                courseName={program.programName}
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
        <div className="flex flex-col items-center w-full">
            <div className="mt-5">
                <ProgramCarousel 
                    type="course"
                    programs={mockCourse(20)}
                    carouselName="คอร์สเรียนยอดนิยม"
                    displayCount={3} />
            </div>
            <hr className="border-[#d9d9d9] my-8 w-full"/>

            <div className="mt-5 mb-4">
                <ProgramCarousel
                    type="class"
                    programs={mockClass(20)}
                    carouselName="คลาสเรียนใหม่ล่าสุด"
                    displayCount={3} />
            </div>
            <hr className="border-[#d9d9d9] my-8 w-full"/>

            <section className="relative flex flex-col items-center w-full overflow-hidden">
                <h1 className="absolute left-[16%] pb-12 text-2xl font-bold self-start">คลาสเรียน</h1>
                <div className="pl-6 mt-5 pt-8 grid overflow-hidden grid-cols-4">
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

            <section className="relative flex flex-col items-center w-full overflow-hidden">
                <h1 className="absolute left-[16%] pb-12 text-2xl font-bold self-start">คอร์สเรียน</h1>
                <div className="pl-6 mt-5 pt-8 grid grid-cols-4">
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
