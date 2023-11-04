import { useParams } from "react-router-dom"
import { LoadingSpash } from "../components/LoadingSpash"
import CourseChaptersOutline from "../features/stores/components/CourseChaptersOutline"
import CourseDetailedSummary from "../features/stores/components/CourseDetailedSummary"
import ProgramCoverWithInstructorProfile from "../features/stores/components/ProgramCoverWithInstructorProfile"
import { useCourseChaptersOutline } from "../features/stores/hooks/useCourseChaptersOutline"
import { useCourseDetail } from "../features/stores/hooks/useCourseDetail"

function CourseDetailPage() {
    const { id } = useParams<{ id: string }>()
    const courseDetail = useCourseDetail(id);
    const courseChaptersOutline = useCourseChaptersOutline(id);
    if (courseChaptersOutline.isFetching || courseDetail.isFetching) {
        return (
            <div className="flex h-screen w-screen justify-center items-center">
                <LoadingSpash></LoadingSpash>
            </div>
        )
    }

    if (courseDetail.courseDetail == null) {
        return (
            <div>
                <h1>Cannot find</h1>
            </div>
        )
    }
    const { name, description, thumnailUrl, requirement, rating, instructor, reviewerCount, price,
        chapterCount, level, studentCount, fileCount, videoCount, quizCount, courseID } = courseDetail.courseDetail
    return (
        <div className="w-full flex pt-8 overflow-auto">
            <div className="flex-[3] px-20">
                <div className="pb-6">
                    <span className="text-3xl font-bold px-2">คอร์สเรียน</span>
                    <span className="mx-2 text-2xl font-bold text-gray-500">{name}</span>
                </div>
                <div className="flex flex-col items-center pb-4">
                    <ProgramCoverWithInstructorProfile programCoverUrl={thumnailUrl}
                        instructor={{
                            profileUrl: instructor.avatarUrl, name: instructor.name, teacherID: instructor.instructorID
                        }}
                        reviewCount={reviewerCount}
                        rating={rating} />


                    <h1 className="self-start text-4xl ml-8 font-bold mt-3">{name}</h1>
                    <p className="self-start mt-3 ml-8 text-lg mb-12">{description}</p>

                    <div className="self-start mx-8">
                        <h1 className="text-xl font-semibold">สิ่งที่คุณจะได้เรียนรู้</h1>
                        <ul className="list-disc px-8">
                            {courseDetail.courseDetail?.objective.map((objective, index) => {
                                return (
                                    <li key={index} className="py-4 text-lg">
                                        {objective}
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="pb-8 pt-12">
                            <CourseChaptersOutline chapters={courseChaptersOutline.courseChaptersOutline} courseID={id} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex-[2] flex flex-col mx-6 mt-8 sticky top-0">
                <CourseDetailedSummary costs={courseDetail.courseDetail.price}
                    quantity={courseDetail.courseDetail.chapterCount}
                    level={courseDetail.courseDetail.level}
                    students={courseDetail.courseDetail.studentCount}
                    availablesource={courseDetail.courseDetail.fileCount}
                    videolength={courseDetail.courseDetail.videoLength}
                    examples={courseDetail.courseDetail.quizCount}
                    status="Available"
                    courseID={courseDetail.courseDetail.courseID}
                />

                <div className="px-2 py-4 mt-8 mr-32">
                    <h1 className="px-2 text-2xl text-[#606060] font-bold">ความต้องการเบื้องต้น</h1>
                    <p className="px-2 pt-4 text-base">{requirement}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailPage