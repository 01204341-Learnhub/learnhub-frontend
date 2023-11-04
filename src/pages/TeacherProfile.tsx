import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TeacherProfileCard from "../features/profiles/components/TeacherProfileCard.tsx";
import { useInstructor } from "../features/stores/hooks/useInstructor..ts";




function TeacherProfile() {
    const { id } = useParams<{ id: string }>()
    const [displayedCourses, setDisplayedCourses] = useState(true)
    const [displayedClasses, setDisplayedClasses] = useState(true)
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
                {instructor.courses.map((program, index) => {
                    console.log(program.courseID)
                    return (
                        <div className="flex mr-10 my-5 pl-[10%] ">
                            <img src={program.thumbnailUrl} className="h-[100px] aspect-square object-cover  bg-black  rounded-l-lg"></img>
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
                {instructor.classes.map((program, index) => {
                    return (
                        <div className="flex mr-10  my-5 pl-[10%] ">
                            <img src={program.classThumbnailUrl} className="h-[100px]  aspect-square object-cover bg-black ml-[10px] rounded-l-lg"></img>
                            <div className="h-[100px] w-[250px] bg-white border-r border-y border-gray-300 rounded-r-lg">
                                <div>
                                    <div className="mx-5 mt-4 mb-2 font-bold truncate">
                                        {program.className}
                                    </div>
                                    <div className="mx-5">
                                        <Link to={`/detail/class/${program.classID}`} key={index} className="my-4">
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
                <div className=" flex flex-col items-center w-full overflow-hidden">
                    <h1 className=" my-5 mx-[60px] text-[24px] font-semibold self-start">คอร์สเรียนยอดนิยม</h1>
                    <div className={`pl-5 mt-5 ${displayedCourses? 'h-[150px] overflow-hidden':'pb-5'} grid grid-cols-4`}>
                        {renderProgramCourse()}
                    </div>
                    {(instructor.courses.length > 4 ) ? (
                        <button
                            className="p-2.5 rounded-xl bg-[#505050] text-lg text-white font-bold shadow-xl"
                            onClick={()=>{setDisplayedCourses(!displayedCourses)}}
                        >
                            {displayedCourses? 'แสดงคอร์สเพิ่มเติม':'แสดงคอร์สน้อยลง'}
                        </button>
                    ) :
                        null
                    }
                </div>
                <div className="relative flex flex-col items-center w-full overflow-hidden">
                    <h1 className=" my-5 mx-[60px]  text-[24px] font-semibold self-start">คลาสเรียนที่กำลังสอน</h1>
                    <div className={`pl-5 mt-5 ${displayedClasses? 'h-[150px] overflow-hidden':'pb-5'} grid grid-cols-4`}>
                        {renderProgramClass()}
                    </div>
                    {(instructor.classes.length > 4 ) ? (
                        <button
                            className="p-2.5 rounded-xl bg-[#505050] text-lg text-white font-bold shadow-xl"
                            onClick={()=>{setDisplayedClasses(!displayedClasses)}}
                        >
                            {displayedClasses? 'แสดงคลาสเพิ่มเติม':'แสดงคลาสน้อยลง'}
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