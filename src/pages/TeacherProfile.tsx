import { useState } from "react";
import { Link } from "react-router-dom";
import TeacherProfileCard from "../features/profiles/components/TeacherProfileCard.tsx";
import ProgramSlot from "../features/stores/components/ProgramSlot";
import { useTeachClasses } from "../features/teaches/hooks/useTeachClasses.ts";
import { useTeachCourses } from "../features/teaches/hooks/useTeachCourses.ts";




function TeacherProfile() {
    const [displayedCourses, setDisplayedCourses] = useState<number>(4)
    const [displayedClasses, setDisplayedClasses] = useState<number>(4)
    const { courses, isFetchingCourse } = useTeachCourses()
    const { classes, isFetchingClasses } = useTeachClasses()

    if (isFetchingCourse || isFetchingClasses) {
        return (
            <div>
                LOADING...
            </div>
        );
    }

    const renderProgramCourse = () => {
        return (
            <>
                {courses.slice(0, displayedCourses).map((program, index) => {
                    return (
                        <Link to={`/detail/course/${program.courseID}`} key={index} className="my-4 px-6">
                            <ProgramSlot
                                key={index}
                                courseThumbnailUrl={program.thumbnailUrl}
                                courseName={program.name}
                                instructorName={"FULLNAME OF TEACHER"}
                                percentCompleted={100}
                                regisDate={""}
                                voter={program.rating}
                                price={-99999}
                                tag={"HARDCODE TAG"}
                                lvl={"HARDCODE LEVEL"}
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
                {classes.slice(0, displayedClasses).map((program, index) => {
                    return (
                        <Link to={`/detail/class/${program.classID}`} key={index} className="my-4 px-6" >
                            <ProgramSlot key={index} courseThumbnailUrl={program.classThumbnailUrl}
                                courseName={program.className}
                                instructorName={"HARDCODE INSTRUCTOR"}
                                percentCompleted={100}
                                regisDate={"2030303"} voter={0} price={3000} tag={"HARDCODE TAG"}
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
                    email={"HARDCODE EMAIL"}
                    profile_pic={"HARDCODE PROFILE PIC"}
                    fullname={"HARDCODE FULLNAME"}
                    rating={-1}
                    students={-1}
                    classes={-1}
                    courses={-1}
                />
            </div>
            <div>
                <div className=" flex flex-col items-center w-full">
                    <h1 className=" my-5 mx-[60px] absolute text-[24px] font-semibold self-start">คอร์สเรียนยอดนิยม</h1>
                    <div className="pl-5 mt-5 pt-8 grid grid-cols-4">
                        {renderProgramCourse()}
                    </div>
                    {(4 > 4 && 3 > 1) ? (
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
                    {(5 > 4 && 4 > displayedClasses) ? (
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