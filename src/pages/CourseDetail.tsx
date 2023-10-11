import { useParams } from "react-router-dom"
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
            <div className="flex">
                <h1>Loading...</h1>
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
                        instructor={{ profileUrl: instructor.avatarUrl, name: instructor.name, jobTitle: instructor.name }}
                        reviewCount={reviewerCount}
                        rating={rating} />


                    <h1 className="self-start text-4xl ml-8 font-bold mt-3">{name}</h1>
                    <p className="self-start mt-3 ml-8 text-lg">{description}</p>
                    <p className="self-start mr-10 ml-8 text-lg pb-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At ducimus ex eaque aspernatur quia illo, cupiditate beatae commodi placeat distinctio ab vel, veritatis nobis suscipit repudiandae aliquid magni iure? Saepe quos tenetur, quo molestiae ad adipisci minima facilis, obcaecati blanditiis, consequatur distinctio totam! Quis, asperiores praesentium. Adipisci culpa quod officia voluptatibus libero quam iusto incidunt numquam magnam. Voluptas qui sequi repellendus illo unde, ipsa sed delectus eius obcaecati libero alias incidunt, voluptatibus doloremque cumque, quasi aut? Expedita enim ipsa corporis explicabo iure consequuntur, dolorem impedit qui vel debitis, repudiandae veniam. Blanditiis debitis quasi similique aliquam laudantium quae repellat fuga veritatis?</p>

                    <div className="self-start mx-8">
                        <h1 className="text-xl font-semibold">สิ่งที่คุณจะได้เรียนรู้</h1>
                        <ul className="list-disc px-8">
                            <li className="py-4 text-lg">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, deleniti maxime cum voluptatibus laborum error deserunt repellendus illo aperiam. Architecto, recusandae nam deleniti perspiciatis cumque cupiditate quas doloribus quis. Quaerat?
                            </li>

                            <li className="py-4 text-lg">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, doloremque officiis vitae amet similique ab consequatur praesentium itaque! Quaerat facere est ipsa excepturi id eveniet sapiente animi magnam repudiandae sint?
                            </li>
                        </ul>
                        <div className="pb-8 pt-12">
                            <CourseChaptersOutline chapters={courseChaptersOutline.courseChaptersOutline} courseID={id} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex-[2] flex flex-col mx-6 mt-8 sticky top-0">
                <CourseDetailedSummary costs={price}
                    quantity={chapterCount}
                    level={level}
                    students={studentCount}
                    availablesource={fileCount}
                    hours={videoCount}
                    examples={quizCount}
                    status="Available"
                    courseID={courseID}
                />

                <div className="px-2 py-4 mt-8 mr-32">
                    <h1 className="px-2 text-2xl text-[#606060] font-bold">ความต้องการเบื้องต้น</h1>
                    <p className="px-2 pt-4 text-base">{requirement}</p>
                    <p className="px-2 text-base">Lorem ipsum dolor sit, amet consectetur adipisicing elit. At id, aspernatur quo dolore distinctio reprehenderit dignissimos laborum, deleniti odio eos quidem labore animi aperiam exercitationem eveniet perspiciatis quasi maiores quam.</p>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailPage