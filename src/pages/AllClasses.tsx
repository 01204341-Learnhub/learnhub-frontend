import ProgramSlot from "../features/stores/components/ProgramSlot"
import { Link } from "react-router-dom"

function mockClasses(num: number) {
    const programs = []
    const mockInstructor = [
        "อาจารย์ อนันต์ สุขสวัสดิ์",
        "อาจารย์ สมชาย สุขสวัสดิ์",
        "อาจารย์ สมหญิง สุขสวัสดิ์",
        "mrs Jiraporn",
        "mr. Jirapong",
    ]
    for (let i = 0; i < num; i++) {
        programs.push({
            className: `คลาสรียนที่ ${i + 1}`,
            classId: ` B${i + 1}`,
            instructorName: mockInstructor[i % mockInstructor.length],
            percentCompleted: Math.floor(Math.random() * 100),
            courseThumbnailUrl: `https://picsum.photos/${i}/${300}`,
        })
    }
    return programs
}

const renderClasses = () => {
    return (
        <>
            {mockClasses(20).map((program, index) => {
                    return (
                        <Link to={`/detail/class/${program.classId}`} key={index} className="mx-5 my-2" >
                            <ProgramSlot key={index} courseThumbnailUrl={program.courseThumbnailUrl}
                                courseName={program.className}
                                instructorName={program.instructorName}
                                percentCompleted={program.percentCompleted}
                                regisDate={""} voter={0} price={3000} tag={"ยอดนิยม"}
                                lvl={"พื้นฐาน"} />
                        </Link>
                    )
            })}  
        </>
    )
}

export default function AllClasses() {
    return (
        <>
            <header className="flex px-4 py-8">
                <h1 className="text-3xl font-bold">คลาสเรียนทั้งหมด</h1>
            </header>
            <main className="flex px-4">
                <section className="flex-[1]">
                    <div className="flex flex-col items-start">
                        <h3>หมวดหมู่</h3>
                        <select name="" id=""></select>
                        <h3>ระดับ</h3>
                        <select name="" id=""></select>
                    </div>
                </section>
                <section className="flex-[3] flex flex-wrap border">
                    {renderClasses()}
                </section>
            </main>
        </>
    )
}