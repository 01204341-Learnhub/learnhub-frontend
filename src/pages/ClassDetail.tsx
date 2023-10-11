import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ClassDetailedSummary from "../features/stores/components/ClassDetailedSummary"
import ProgramCoverWithInstructorProfile from "../features/stores/components/ProgramCoverWithInstructorProfile"
import { getClasses } from "../features/stores/services/classes"
import { ClassProgramDetail } from "../features/stores/types/class"

function ClassDetail() {
    const { id } = useParams()
    const [classProgram, setClassProgram] = useState<ClassProgramDetail | null>(null)
    useEffect(() => {
        async function fetchClassDetail() {
            const classProgram = await getClasses(id!)
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
                <ProgramCoverWithInstructorProfile programCoverUrl={classProgram.thumbnailURL}
                    instructor={{ profileUrl: classProgram.instructor.avatarURL, name: classProgram.instructor.name, jobTitle: "HARDCODE JOBTITLE" }}
                    reviewCount={0}
                    rating={0} />
                <h1 className="text-5xl font-bold mt-3">{classProgram.name}</h1>
                <p className="mt-3">{classProgram.description}</p>
            </div>
            <div className="flex justify-center mt-10">
                <ClassDetailedSummary costs={4000}
                    quantity={10}
                    level="Beginner"
                    students={100}
                    availablesource={10000}
                    timeTeaching={10}
                    status="Available"
                />
            </div>
        </div>
    )
}

export default ClassDetail