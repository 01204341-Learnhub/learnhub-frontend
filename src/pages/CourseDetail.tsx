import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CourseDetailedSummary from "../features/stores/components/CourseDetailedSummary"
import ProgramCoverWithInstructorProfile from "../features/stores/components/ProgramCoverWithInstructorProfile"
import { getCourse } from "../features/stores/services/courses"
import { Course } from "../features/stores/types/course"

function CourseDetail() {
    const { id } = useParams()
    const [course, setCourse] = useState<Course | null>(null)
    useEffect(() => {
        async function fetchCourseDetail() {
            const course = await getCourse(id!)
            setCourse(course)
        }
        fetchCourseDetail()
    }, [id])
    if (course === null) {
        return null;
    }
    return (
        <div className="w-full grid grid-cols-3">
            <div className="col-span-2" >
                <div>
                    <span className="text-2xl font-bold">คอร์สเรียน</span>
                    <span className="mx-2 text-2xl font-bold text-gray-500">{course.name}</span>
                </div>
                <ProgramCoverWithInstructorProfile programCoverUrl={course.cover}
                    instructor={{ profileUrl: course.intructor.avatarUrl, name: course.intructor.name, jobTitle: course.intructor.jobTitle }}
                    reviewCount={course.reviewerCount}
                    rating={course.rating} />
                <h1 className="text-5xl font-bold mt-3">{course.name}</h1>
                <p className="mt-3">{course.description}</p>
            </div>
            <div className="flex justify-center mt-10">
                <CourseDetailedSummary costs={4000}
                    quantity={10}
                    level="Beginner"
                    students={100}
                    availablesource={10000}
                    hours={10}
                    examples={200}
                    status="Available"
                />
            </div>
        </div>
    )
}

export default CourseDetail