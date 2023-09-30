import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CourseDetailedSummary from "../features/stores/components/CourseDetailedSummary"
import ProgramCoverWithInstructorProfile from "../features/stores/components/ProgramCoverWithInstructorProfile"
import { getCourse, getChapterInCourse } from "../features/stores/services/courses"
import { CourseDetailData } from "../features/stores/types/course"
import { CourseChaptersOutline } from "../features/stores/components/CourseChaptersOutline"
import { Chapter } from "../features/stores/types/chapter"

type ChapterPreview = Omit<Chapter, "description">

function CourseDetail() {
    const { id } = useParams()
    const [course, setCourse] = useState<CourseDetailData | null>(null)
    const [chapter, setChapters] = useState<Chapter[] | null>(null)
    useEffect(() => {
        async function fetchCourseDetail() {
            const course = await getCourse(id!)
            setCourse(course)

        }

        async function fetchChapter() {
            const chapter = await getChapterInCourse(id!)
            setChapters(chapter)
        }
        fetchChapter()
        fetchCourseDetail()
    }, [id])
    if (course === null) {
        return null;
    }

    

    return (
        <div className="w-full flex pt-8 overflow-auto">
            <div className="flex-[3] px-20">
                <div className="pb-6">
                    <span className="text-3xl font-bold px-2">คอร์สเรียน</span>
                    <span className="mx-2 text-2xl font-bold text-gray-500">{course.name}</span>
                </div>
                <div className="flex flex-col items-center pb-4">
                    <ProgramCoverWithInstructorProfile programCoverUrl={course.coursePic}
                        instructor={{ profileUrl: course.instructor.avatarUrl , name: course.instructor.name, jobTitle: course.instructor.name }}
                        reviewCount={course.reviewCount}
                        rating={course.rating} />

                    
                    <h1 className="self-start text-4xl ml-8 font-bold mt-3">{course.name}</h1>
                    <p className="self-start mt-3 ml-8 text-lg">{course.description}</p>
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
                            <CourseChaptersOutline  chapters={chapter}/>
                        </div>
                    </div>
                </div>
            
            </div>

            <div className="flex-[2] flex flex-col mx-6 mt-8 sticky top-0">
                <CourseDetailedSummary costs={course.price}
                    quantity={course.chapterCount}
                    level={course.level}
                    students={course.studentCount}
                    availablesource={course.fileCount}
                    hours={course.videoCount}
                    examples={course.quizCount}
                    status="Available"
                />

                <div className="px-2 py-4 mt-8 mr-32">
                    <h1 className="px-2 text-2xl text-[#606060] font-bold">ความต้องการเบื้องต้น</h1>
                    <p className="px-2 pt-4 text-base">{course.requirement}</p>
                    <p className="px-2 text-base">Lorem ipsum dolor sit, amet consectetur adipisicing elit. At id, aspernatur quo dolore distinctio reprehenderit dignissimos laborum, deleniti odio eos quidem labore animi aperiam exercitationem eveniet perspiciatis quasi maiores quam.</p>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail