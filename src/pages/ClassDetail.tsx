
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassDetailedSummary from "../features/stores/components/ClassDetailedSummary"
import ProgramCoverWithInstructorProfile from "../features/stores/components/ProgramCoverWithInstructorProfile"
import { getClasses } from "../features/stores/services/classes"
import { ClassProgramDetail } from "../features/stores/types/class"

function formatTimeFromTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
function formatDateFromTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const optionDays = { weekday: 'long', locale: 'th-TH' };
    const dayName = new Intl.DateTimeFormat('th-TH', optionDays).format(date);
    const day = date.getDate();
    const optionMonts = { month: 'long', locale: 'th-TH' };
    const monthName = new Intl.DateTimeFormat('th-TH', optionMonts).format(date);
    const year = date.getUTCFullYear();
    return `${dayName}ที่ ${day} ${monthName} ${year + 543}`;
}
function checkColors(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long' };
    const dayName = date.toLocaleDateString(undefined, options);
    return dayName;
}
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
        <div >
            <div className="w-full flex justify-center p-10">
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
                <div className="flex justify-center mt-10 ml-10">
                    <ClassDetailedSummary costs={classProgram.price}
                        quantity={classProgram.assignmentCount}
                        level={classProgram.difficultyLevel}
                        students={classProgram.studentCount}
                        availablesource={classProgram.assignmentCount}
                        timeTeaching={classProgram.meetingCount}
                        status={classProgram.status}
                    />
                </div>

            </div>
            <div className="w-full flex justify-center">
                <div className=" w-[1500px] mx-10">
                    {classProgram.schedules.map((c) => {
                        return (
                            <div className="flex h-10 items-center mt-5">
                                <div className={`h-10 ${checkColors(c.start) == 'Monday' ? 'bg-yellow-400' : checkColors(c.start) == 'Tuesday' ? 'bg-pink-400' : checkColors(c.start) == 'Wednesday' ? 'bg-green-400' : checkColors(c.start) == 'Thursday' ? 'bg-orange-400' : checkColors(c.start) == 'Friday' ? 'bg-blue-400' : checkColors(c.start) == 'Saturday' ? 'bg-purple-400' : 'bg-red-400'} w-5`}></div>
                                <div className="flex h-full justify-between items-center bg-white shadow-lg w-[500px]">
                                    <div className="flex">
                                        <FontAwesomeIcon icon={faCalendarDays} size="xl" className="mr-3 ml-5" />
                                        <div>{formatDateFromTimestamp(c.start)}</div>
                                    </div>
                                    <div className="flex">
                                        <FontAwesomeIcon icon={faClock} size="xl" />
                                        <div className="mx-5">
                                            {`เวลา ${formatTimeFromTimestamp(c.start)} - ${formatTimeFromTimestamp(c.end)} น`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ClassDetail