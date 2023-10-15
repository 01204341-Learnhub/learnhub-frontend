import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TeacherProfileCard from "../features/profiles/components/TeacherProfileCard.tsx";
import { useInstructor } from "../features/stores/hooks/useInstructor..ts";




function TeacherProfile() {
    const { id } = useParams<{ id: string }>()
    const [displayedCourses, setDisplayedCourses] = useState<number>(4)
    const [displayedClasses, setDisplayedClasses] = useState<number>(4)
    const { instructor, isFetching } = useInstructor(id)

    if (isFetching) {
        return (
            <div>
                LOADING...
            </div>
        );
    }
    function countStudent():number{
        let sumStudents = 0
        for (let i = 0; i < instructor.classes.length; i++) {
            sumStudents += instructor.classes[i].studentCount;
          }
        for (let i = 0; i < instructor.courses.length; i++) {
            sumStudents += instructor.courses[i].studentCount;
          }
        return sumStudents
    }

    const renderProgramCourse = () => {
        return (
            <>
                {instructor.courses.slice(0, displayedCourses).map((program, index) => {
                    return (
                        <div className="flex mr-10 my-5 pl-[10%] ">
                            <img src={program.thumbnailUrl} className="h-[100px] w-[100px] object-cover bg-black  rounded-l-lg"></img>
                            <div className="h-[100px] w-[250px] bg-white border-r border-y border-gray-300 rounded-r-lg">
                                <div>
                                    <div className="mx-5 mt-4 mb-2 font-bold truncate">
                                        {program.name}
                                    </div>
                                    <div className="mx-5">
                                        <Link to={`/detail/course/${program.courseID}`} key={index} className="my-4">
                                            รายละเอียด
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    const renderProgramClass = () => {
        return (
            <>
                {instructor.classes.slice(0, displayedCourses).map((program, index) => {
                    return (
                        <div className="flex mr-10 my-5 pl-[10%] overflow-hidden">
                            <img src={program.classThumbnailUrl} className="h-[100px] w-[100px] bg-black ml-[10px] rounded-l-lg"></img>
                            <div className="h-[100px] w-[250px] bg-white border-r border-y border-gray-300 rounded-r-lg">
                                <div>
                                    <div className="mx-5 mt-4 mb-2 font-bold">
                                        {program.className}
                                    </div>
                                    <div className="mx-5">
                                        <Link to={`/detail/course/${program.classID}`} key={index} className="my-4">
                                            รายละเอียด
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    const loadMoreCourses = () => {
        setDisplayedCourses((p) => {
            if (p > 4) {
                return 4
            }
            else {
                return p + 4
            }
        })
    }
    const loadMoreClasses = () => {
        setDisplayedClasses((p) => {
            if (p > 4) {
                return 4
            }
            else {
                return p + 4
            }
        }
        )
    }
    return (
        <div className=" bg-[#F0F0F0] h-full w-full flex flex-row">
            <div className=" h-full bg-white ">
                <TeacherProfileCard
                    email={instructor.email}
                    profile_pic={instructor.profilePic}
                    fullname={instructor.fullName}
                    students={countStudent()}
                    classes={instructor.classes.length}
                    courses={instructor.courses.length}
                />
            </div>
            <div>
                <div className=" flex flex-col items-center w-full">
                    <h1 className=" my-5 mx-[60px] absolute text-[24px] font-semibold self-start">คอร์สเรียนยอดนิยม</h1>
                    <div className="pl-5 mt-5 pt-8 grid grid-cols-4">
                        {renderProgramCourse()}
                    </div>
                    {(instructor.courses.length > 4 && 3 > 1) ? (
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
                    {(instructor.classes.length > 4 && 4 > displayedClasses) ? (
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