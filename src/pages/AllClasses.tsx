import { Link } from "react-router-dom"
import ProgramSlot from "../features/stores/components/ProgramSlot"
import { useAllClasses } from "../features/stores/hooks/useAllClasses"




export default function AllClasses() {

    const { classes, isFetching } = useAllClasses()
    if (isFetching) return (
        <div>
            LOADING!!!!
        </div>
    )

    const renderClasses = () => {
        return (
            <>
                {classes.map((program, index) => {
                    return (
                        <Link to={`/detail/class/${program.classID}`} key={index} className="mx-5 my-2" >
                            <ProgramSlot key={index} courseThumbnailUrl={program.thumbnailURL}
                                courseName={program.name}
                                instructorName={program.instructor.name}
                                percentCompleted={100}
                                regisDate={program.registerEndedDate.toString()} voter={0} price={program.price} tag={program.tags[0].name}
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