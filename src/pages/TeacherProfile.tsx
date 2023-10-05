import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mockprofile_pic from "../assets/Images/regTeacher.png";
import TeacherProfileCard from "../features/profiles/components/TeacherProfileCard.tsx";
import ProgramSlot from "../features/stores/components/ProgramSlot";
import { getAllClasses } from "../features/stores/services/classes";
import { getAllCourses } from "../features/stores/services/courses";
import { ClassProgram } from "../features/stores/types/class";
import { Course } from "../features/stores/types/course";



const mockTeacher = {
    email: "babarara@Gaymale.com",
    profile_pic: mockprofile_pic,
    fullname: "Bararynka Kapealla",
    rating: Math.floor(Math.random() * 5),
    students: Math.floor(Math.random() * 100),
    classes: Math.floor(Math.random() * 10),
    courses: Math.floor(Math.random() * 10)
};


function TeacherProfile() {
    const [mockcourses, setCouses] = useState<Course[] | null>(null)
    const [mockclasses, setClasses] = useState<ClassProgram[] | null>(null)
    const [displayedCourses, setDisplayedCourses] = useState<number>(4)
    const [displayedClasses, setDisplayedClasses] = useState<number>(4)



    useEffect(() => {
        async function fetchCourse() {
            const coursePrograms = await getAllCourses(mockTeacher.courses)
            setCouses(coursePrograms)
        }

        async function fetchClass() {
            const classProgram = await getAllClasses(mockTeacher.classes)
            setClasses(classProgram)
        }

        fetchCourse()
        fetchClass()

    }, [])

    if (mockcourses === null || mockclasses === null) {
        return null;
    }

    const renderProgramCourse = () => {
        return (
            <>
                {mockcourses.slice(0, displayedCourses).map((program, index) => {
                    return (
                        <Link to={`/detail/course/${program.id}`} key={index} className="my-4 px-6">
                            <ProgramSlot
                                key={index}
                                courseThumbnailUrl={program.cover}
                                courseName={program.name}
                                instructorName={mockTeacher.fullname}
                                percentCompleted={100}
                                regisDate={""}
                                voter={program.rating}
                                price={program.price}
                                tag={program.tags[0].name}
                                lvl={"พื้นฐาน"}
                            />
                        </Link>
                    )
                })}
            </>
        )
    }

    const renderProgramClass = () => {
        return (
            <>
                {mockclasses.slice(0, displayedClasses).map((program, index) => {
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
                })}
            </>
        )
    }

    const loadMoreCourses = () => { setDisplayedCourses(displayedCourses + 4) }
    const loadMoreClasses = () => { setDisplayedClasses(displayedClasses + 4) }

    return (
        <div className=" bg-[#F0F0F0] h-full w-full flex flex-row">
            <div className=" h-full bg-white ">
                <TeacherProfileCard
                    email={mockTeacher.email}
                    profile_pic={mockTeacher.profile_pic}
                    fullname={mockTeacher.fullname}
                    rating={mockTeacher.rating}
                    students={mockTeacher.students}
                    classes={mockTeacher.classes}
                    courses={mockTeacher.courses}
                />
            </div>
            <div>
                <div className=" flex flex-col items-center w-full">
                    <h1 className=" my-5 mx-[60px] absolute text-[24px] font-semibold self-start">คอร์สเรียนยอดนิยม</h1>
                    <div className="pl-5 mt-5 pt-8 grid grid-cols-4">
                        {renderProgramCourse()}
                    </div>
                    {mockTeacher.courses > 4 ? (
                        <button
                            className="p-4 rounded-xl bg-[#505050] text-lg text-white font-bold shadow-xl"
                            onClick={loadMoreCourses}
                        >
                            แสดงคอร์สเพิ่มเติม
                        </button>
                    ) :
                        null
                    }
                </div>
                <div className="relative flex flex-col items-center w-full overflow-hidden">
                    <h1 className=" my-5 mx-[60px] absolute text-[24px] font-semibold self-start">คลาสเรียนที่กำลังสอน</h1>
                    <div className="pl-3 mt-5 pt-8 grid grid-cols-4">
                        {renderProgramClass()}
                    </div>
                    {(mockTeacher.classes > 4 && mockTeacher.classes > displayedClasses) ? (
                        <button
                            className="p-4 rounded-xl bg-[#505050] text-lg text-white font-bold shadow-xl"
                            onClick={loadMoreClasses}
                        >
                            แสดงคลาสเพิ่มเติม
                        </button>
                    ) :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default TeacherProfile