import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CourseDetailedSummary from "../features/stores/components/CourseDetailedSummary"
import ProgramCoverWithInstructorProfile from "../features/stores/components/ProgramCoverWithInstructorProfile"
import { getClass } from "../features/stores/services/classes"
import { ClassProgram } from "../features/stores/types/class"

function ClassDetail() {
    const { id } = useParams()
    const [classProgram, setClassProgram] = useState<ClassProgram | null>(null)
    useEffect(() => {
        async function fetchClassDetail() {
            const classProgram = await getClass(id!)
            setClassProgram(classProgram)
        }
        fetchClassDetail()
    }, [id])
    if (classProgram === null) {
        return null;
    }
    return (
        <div className="w-full grid grid-cols-3">
            <div className="col-span-2" >
                <div>
                    <span className="text-2xl font-bold">คลาสเรียน</span>
                    <span className="mx-2 text-2xl font-bold text-gray-500">{classProgram.name}</span>
                </div>
                <ProgramCoverWithInstructorProfile programCoverUrl={classProgram.cover}
                    instructor={{ profileUrl: classProgram.intructor.avatarUrl, name: classProgram.intructor.name, jobTitle: classProgram.intructor.jobTitle }}
                    reviewCount={0}
                    rating={0} />
                <h1 className="text-5xl font-bold mt-3">{classProgram.name}</h1>
                <p className="mt-3">{classProgram.description}</p>
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

export default ClassDetail