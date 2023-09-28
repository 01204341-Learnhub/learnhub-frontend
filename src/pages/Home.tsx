import { useEffect, useState } from "react";
import ProgramCarousel from "../features/stores/components/ProgramCarousel";
import ProgramSlot from "../features/stores/components/ProgramSlot";
import LearningClasses from "../pages/students/LearningClasses"
import { Link } from "react-router-dom"
import { getAllCourses } from "../features/stores/services/courses";
import { getAllClasses } from "../features/stores/services/classes";
import { Course } from "../features/stores/types/course";
import { ClassProgram } from "../features/stores/types/class";


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




export default function Home() {

    const [courses, setCouses] = useState<Course[] | null>(null)
    const [classes, setClasses] = useState<ClassProgram[] | null>(null)

    useEffect(() => {
        async function fetchCourse() {
            const coursePrograms = await getAllCourses(8)
            setCouses(coursePrograms)
        }

        async function fetchClass() {
            const classProgram = await getAllClasses(8)
            setClasses(classProgram)
        }

        fetchCourse()
        fetchClass()
    }, [])
    if (courses === null || classes === null) {
        return null;
    }

    const renderProgramsCourse = () => {
        return (
            <>
                {courses.map((program, index) => {
                    if (index > 7){
                        return null
                    } else {
                        return (
                            <Link to={`/detail/course/${program.id}`} key={index} className="my-4 px-6" >
                                <ProgramSlot key={index} courseThumbnailUrl={program.cover}
                                    courseName={program.name}
                                    instructorName={program.intructor.name}
                                    percentCompleted={100}
                                    regisDate={""} voter={program.rating} price={program.price} tag={"ยอดนิยม"}
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
                {classes.map((program, index) => {
                    if (index > 7){
                        return null
                    } else {

                        return (
                            <Link to={`/detail/class/${program.id}`} key={index} className="my-4 px-6" >
                                <ProgramSlot key={index} courseThumbnailUrl={program.cover}
                                    courseName={program.name}
                                    instructorName={program.intructor.name}
                                    percentCompleted={100}
                                    regisDate={program.registerEndedDate} voter={0} price={3000} tag={program.tags[0].tagName}
                                    lvl={"พื้นฐาน"} />
                            </Link>
                        )
                    }
                })}
            </>
        )
    }

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
