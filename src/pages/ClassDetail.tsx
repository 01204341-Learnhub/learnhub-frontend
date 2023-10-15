
import { faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpash } from "../components/LoadingSpash";
import ClassDetailedSummary from "../features/stores/components/ClassDetailedSummary";
import ProgramCoverWithInstructorProfile from "../features/stores/components/ProgramCoverWithInstructorProfile";
import { getClasses } from "../features/stores/services/classes";
import { ClassProgramDetail } from "../features/stores/types/class";

function formatTimeFromTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
function formatDateFromTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const optionDays = { weekday: 'long', locale: 'th-TH' } as Intl.DateTimeFormatOptions;
    const dayName = new Intl.DateTimeFormat('th-TH', optionDays).format(date);
    const day = date.getDate();
    const optionMonts = { month: 'long', locale: 'th-TH' } as Intl.DateTimeFormatOptions;
    const monthName = new Intl.DateTimeFormat('th-TH', optionMonts).format(date);
    const year = date.getUTCFullYear();
    return `${dayName}ที่ ${day} ${monthName} ${year + 543}`;
}
function checkColors(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long' } as Intl.DateTimeFormatOptions;
    const dayName = date.toLocaleDateString(undefined, options);
    return dayName;
}



function ClassDetail() {
    const { id } = useParams()
    const [isFetching, setisFetching] = useState(true)
    const [classProgram, setClassProgram] = useState<ClassProgramDetail | null>(null)
    useEffect(() => {
        async function fetchClassDetail() {
            const classProgram = await getClasses(id)
            setClassProgram(classProgram)
        }

        setisFetching(true);
        fetchClassDetail().then(() => {
            console.log(classProgram)
            setisFetching(false);
        })
    }, [id, classProgram]
    )
    if (isFetching || classProgram === null) return (
        <div className="w-screen h-screen justify-center items-center">
            <LoadingSpash></LoadingSpash>
        </div>
    )
    return (
        <div >
            <div className="w-full flex justify-center p-10">
                <div className="col-span-2" >
                    <div>
                        <span className="text-2xl font-bold">คลาสเรียน</span>
                        <span className="mx-2 text-2xl font-bold text-gray-500">{classProgram.name}</span>
                    </div>
                    <ProgramCoverWithInstructorProfile programCoverUrl={classProgram.thumbnailURL}
                        instructor={{ profileUrl: classProgram.instructor.avatarURL, name: classProgram.instructor.name, jobTitle: "HARDCODE JOBTITLE", teacherID: classProgram.instructor.teacherID }}
                        reviewCount={0}
                        rating={0} />
                    <h1 className="text-4xl font-bold mt-3">{classProgram.name}</h1>
                    <p className="mt-3 mx-5 text-lg">{classProgram.description}</p>
                    <div className="self-start mx-5 mt-10">
                        <h1 className="text-xl font-semibold pb-2">สิ่งที่คุณจะได้เรียนรู้</h1>
                        <ul className="list-disc px-8 ">
                            {classProgram.classObjective.map((objective, index) => {
                                return (
                                    <li key={index} className="py-2 text-lg">
                                        {objective}
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="pb-8 pt-12">
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10 ml-10">
                    <ClassDetailedSummary costs={classProgram.price}
                        quantity={classProgram.assignmentCount}
                        level={classProgram.difficultyLevel}
                        students={classProgram.studentCount}
                        availablesource={classProgram.assignmentCount}
                        timeTeaching={classProgram.meetingCount}
                        status={classProgram.status}
                        classesID={classProgram.classID}
                    />
                </div>


            </div>
            <div className="w-full flex justify-center mb-10">
                <div className=" w-[1500px] mx-10">
                    {classProgram.schedules.map((c) => {
                        return (
                            <div className="flex h-14 items-center mt-5">
                                <div className={`h-14 ${checkColors(c.start) == 'Monday' ? 'bg-yellow-400' : checkColors(c.start) == 'Tuesday' ? 'bg-pink-400' : checkColors(c.start) == 'Wednesday' ? 'bg-green-400' : checkColors(c.start) == 'Thursday' ? 'bg-orange-400' : checkColors(c.start) == 'Friday' ? 'bg-blue-400' : checkColors(c.start) == 'Saturday' ? 'bg-purple-400' : 'bg-red-400'} w-5`}></div>
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