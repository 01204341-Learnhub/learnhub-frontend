import { useState } from "react";
import CourseCreateStepper, { BasicCourseInfo } from "../../features/teaches/components/CourseCreateStepper";

function CreateCourse() {
    const [basicCouseInfo, setBasicCourseInfo] = useState<BasicCourseInfo | undefined>(undefined);
    const onCreateBasicCourseInfo = (courseInfo: BasicCourseInfo) => {
        setBasicCourseInfo(courseInfo)
    }
    if (basicCouseInfo === undefined) return (
        <div className="mx-5">
            <h1 className="font-bold text-2xl">สร้างคอร์สเรียน</h1>
            <div className="w-11/12 h-1/3  justify-center">
                <CourseCreateStepper onSubmit={onCreateBasicCourseInfo} />
            </div>
        </div>
    )
    else return (
        <h1>Need to Implements</h1>
    )
}

export default CreateCourse