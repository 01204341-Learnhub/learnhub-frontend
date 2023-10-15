import { Link } from "react-router-dom";
import { LoadingSpash } from "../components/LoadingSpash";
import ProgramCarousel from "../features/stores/components/ProgramCarousel";
import ProgramSlot from "../features/stores/components/ProgramSlot";
import { useAllClasses } from "../features/stores/hooks/useAllClasses";
import { useAllCourses } from "../features/stores/hooks/useAllCourses";

export default function Home() {
    const { courses, isFetching: isFetchingCourses } = useAllCourses();
    const { classes, isFetching: isFetchingClasses } = useAllClasses();

    if (isFetchingCourses || isFetchingClasses) {
        return (

            <div className="flex justify-center items-center h-screen">
                <LoadingSpash></LoadingSpash>
            </div>
        )
    }

    function poppularCourseSlotProp() {
        const coursePopularSlot = []
        courses?.forEach((program) => {
            coursePopularSlot.push({
                programName: program.name,
                programId: program.courseID,
                instructorName: program.instructor.name,
                percentCompleted: program.rating,
                programThumbnailUrl: program.thumbnailUrl,
                voter: program.reviewerCount,
                price: program.price,
                tag: program.tags[0].name,
                lvl: program.difficultyLevel
            })
        })
        return coursePopularSlot
    }


    function classNewSlotProp() {
        const classNewSlot = []
        classes?.forEach((program) => {
            classNewSlot.push({
                programName: program.name,
                programId: program.classID,
                instructorName: program.instructor.name,
                percentCompleted: null,
                programThumbnailUrl: program.thumbnailURL,
                voter: null,
                price: program.price,
                tag: program.tags[0].name,
                lvl: program.difficultyLevel
            })
        })
        return classNewSlot
    }

    const renderProgramsCourse = () => {
        return (
            <>
                {courses.map((program, index) => {
                    if (index > 7) {
                        return null
                    } else {
                        return (
                            <Link to={`/detail/course/${program.courseID}`} key={index} className="my-4 px-6" >
                                <ProgramSlot key={index} courseThumbnailUrl={program.thumbnailUrl}
                                    courseName={program.name}
                                    instructorName={program.instructor.name}
                                    percentCompleted={program.rating}
                                    regisDate={""} voter={program.reviewerCount} price={program.price} tag={program.tags[0].name}
                                    lvl={program.difficultyLevel} />
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
                    if (index > 7) {
                        return null
                    } else {
                        return (
                            <Link to={`/detail/class/${program.classID}`} key={index} className="my-4 px-6" >
                                <ProgramSlot key={index} courseThumbnailUrl={program.thumbnailURL}
                                    courseName={program.name}
                                    instructorName={program.instructor.name}
                                    percentCompleted={null}
                                    regisDate={program.registerEndedDate.toString()} voter={null} price={program.price} tag={program.tags[0].name}
                                    lvl={program.difficultyLevel} />
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
                    programs={poppularCourseSlotProp()}
                    carouselName="คอร์สเรียนยอดนิยม"
                    displayCount={3} />
            </div>
            <hr className="border-[#d9d9d9] my-8 w-full" />

            <div className="mt-5 mb-4">
                <ProgramCarousel
                    type="class"
                    programs={classNewSlotProp()}
                    carouselName="คลาสเรียนใหม่ล่าสุด"
                    displayCount={3} />
            </div>
            <hr className="border-[#d9d9d9] my-8 w-full" />
            <section className="relative flex flex-col items-center w-full overflow-hidden">
                <h1 className="absolute left-[16%] pb-12 text-2xl font-bold self-start">คลาสเรียน</h1>
                <div className=" w-4/5 mt-5 pt-8 flex-[3] flex flex-wrap justify-center">
                    {renderProgramClasses()}
                </div>
                <Link to={`/home/classes`}>
                    <div className="flex pb-4 pt-2">
                        <button type="button" className="px-4 py-2 rounded-lg bg-[#404040] hover:bg-[#909090] text-lg text-white font-semibold hover:shadow-lg">
                            ดูทั้งหมด
                        </button>
                    </div>
                </Link>
            </section>
            <hr className="border-[#d9d9d9] my-8 w-full" />
            <section className="relative flex flex-col items-center w-full overflow-hidden">
                <h1 className="absolute left-[16%] pb-12 text-2xl font-bold self-start">คอร์สเรียน</h1>
                <div className=" w-4/5 mt-5 pt-8 flex-[3] flex flex-wrap justify-center">
                    {renderProgramsCourse()}
                </div>
                <Link to={`/home/courses`}>
                    <div className="pb-4 pt-2 ">
                        <button type="button" className="px-4 py-2 rounded-lg bg-[#404040] hover:bg-[#909090] text-lg text-white font-semibold hover:shadow-lg">
                            ดูทั้งหมด
                        </button>
                    </div>
                </Link>
            </section>
        </div>
    )
}
