import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProgramSlot from "./ProgramSlot";

interface ProgramCardProps {
    programThumbnailUrl: string;
    programName: string;
    programId: string;
    instructorName: string;
    percentCompleted: number;
    voter: number;
    price: number;
    tag: string;
    lvl: string;

}


interface ProgramCarouselProps {
    type: "course" | "class",
    programs: ProgramCardProps[],
    displayCount?: number,
    carouselName: string
}


export default function ProgramCarousel({ type, programs, displayCount, carouselName }: ProgramCarouselProps) {
    const [offset, setOffset] = useState(0)
    const handleLeft = () => {
        setOffset(prev => {
            if (prev === 0) {
                return prev
            }
            return prev - 1
        })
    }
    const handleRight = () => {
        setOffset(prev => {
            // if (prev === programs.length - (displayCount ?? 4)) {
            //     return prev
            // }
            if (prev === programs.length - 1) {
                return prev
            }
            else if (prev === programs.length - 1 - (displayCount ?? 4)) {
                return prev
            }
            return prev + 1
        })
    }
    const isEnd = () => {
        if (offset === programs.length - 1) {
            return true
        }
        else if (offset === programs.length - 1 - (displayCount ?? 4)) {
            return true
        }
        return false
    }
    return (
        <>
            <h1 className="text-2xl font-bold text-black mx-10">{carouselName}</h1>
            <div className="flex">
                <button onClick={handleLeft}>
                    <FontAwesomeIcon icon={faChevronCircleLeft} size="2x" color={offset == 0 ? "gray" : "black"} />
                </button>
                <ul className="flex flex-row">
                    {programs.map((program, index) => {
                        if (index < offset) {
                            return null
                        }
                        if (index > offset + (displayCount ?? 3)) {
                            return null
                        }

                        return (
                            <Link to={`/detail/${type}/${program.programId}`} key={index} className="mx-5" >
                                <ProgramSlot courseThumbnailUrl={program.programThumbnailUrl}
                                    courseName={program.programName}
                                    instructorName={program.instructorName}
                                    percentCompleted={type=== "course"? program.percentCompleted : null}
                                    regisDate={""} voter={type === "course" ? program.voter : null} price={program.price} tag={program.tag}
                                    lvl={program.lvl} />
                            </Link>
                        )
                    })}
                </ul>
                <button onClick={handleRight}>
                    <FontAwesomeIcon icon={faChevronCircleRight} size="2x" color={isEnd() ? "gray" : "black"} />
                </button>
            </div>
        </>
    )
}
