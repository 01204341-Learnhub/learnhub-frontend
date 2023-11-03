import { useState } from "react"
import { Link } from "react-router-dom"
import { LoadingSpash } from "../components/LoadingSpash"
import ProgramSlot from "../features/stores/components/ProgramSlot"
import { useAllClasses } from "../features/stores/hooks/useAllClasses"
import { useTags } from "../features/teaches/hooks/useTags.ts"
import { availableLevels } from "../features/teaches/types/class.ts"




export default function AllClasses() {
    const { tags } = useTags()
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedLvl, setSelectedLvl] = useState(null);
    const { classes, isFetching } = useAllClasses()
    if (isFetching) return (
        <div className="flex h-screen w-screen justify-center items-center ">
            <LoadingSpash></LoadingSpash>
        </div>
    )

    const filterClasses = () => {
        return classes.filter((program) => {
            if (selectedTag && program.tags[0].name !== selectedTag) {
                return false
            }
            if (selectedLvl && program.difficultyLevel !== selectedLvl) {
                return false
            }
            return true
        })
    }

    const renderClasses = () => {
        return (
            <>
                {filterClasses().map((program, index) => {
                    return (
                        <Link to={`/detail/class/${program.classID}`} key={index} className="mx-5 my-2" >
                            <ProgramSlot key={index} courseThumbnailUrl={program.thumbnailURL}
                                courseName={program.name}
                                instructorName={program.instructor.name}
                                percentCompleted={null}
                                regisDate={program.registerEndedDate.toString()} voter={null} price={program.price} tag={program.tags[0].name}
                                rating={9999999} // HARDCODE
                                lvl={program.difficultyLevel} />
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
            <main className="flex flex-wrap px-4">
                <section className="flex-[1] flex justify-center ">
                    <div className="flex flex-col px-4 border-2 w-full sm:w-5/6 bg-[#f5f5f5] shadow-lg">
                        <h3 className=" mx-8 mt-8 py-2 font-semibold text-[20px]">หมวดหมู่</h3>
                        <select className="mx-8 p-2 border-2 text-[20px]"
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                        >
                            <option value="">{"<"}- หมวดหมู่ทั้งหมด -{">"}</option>
                            {tags.map((tag) => (
                                <option value={tag.name}>{tag.name}</option>
                            ))}
                        </select>
                        <h3 className=" mx-8 py-2 font-semibold text-[20px]">ระดับ</h3>
                        <select className="mx-8 p-2 border-2 text-[20px]"
                            value={selectedLvl}
                            onChange={(e) => setSelectedLvl(e.target.value)}
                        >
                            <option value="">{"<"}- ระดับทั้งหมด -{">"}</option>
                            {availableLevels.map((lvl) => (
                                <option value={lvl}>{lvl}</option>
                            ))}
                        </select>
                    </div>
                </section>
                <section className="flex-[3] flex flex-wrap">
                    {renderClasses()}
                </section>
            </main>
        </>
    )
}