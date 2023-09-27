import ProgramSlot from "../features/stores/components/ProgramSlot"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllClasses } from "../features/stores/services/classes"
import { ClassProgram } from "../features/stores/types/class"




export default function AllClasses() {
    
    const [classes, setClasses] = useState<ClassProgram[] | null>(null)
    useEffect(() => {
        async function fetchProgramCourses() {
            const classes = await getAllClasses(20!)
            setClasses(classes)
        }
        fetchProgramCourses()
    }, [])
    
    if (classes === null) {
        return null;
    } 
    
    const renderClasses = () => {
        return (
            <>
                {classes.map((program, index) => {
                        return (
                            <Link to={`/detail/class/${program.id}`} key={index} className="mx-5 my-2" >
                                <ProgramSlot key={index} courseThumbnailUrl={program.cover}
                                    courseName={program.name}
                                    instructorName={program.intructor.name}
                                    percentCompleted={100}
                                    regisDate={program.registerEndedDate} voter={0} price={program.price} tag={program.tags[0].tagName}
                                    lvl={"พื้นฐาน"} />
                            </Link>
                        )
                })}  
            </>
        )
    }
    

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