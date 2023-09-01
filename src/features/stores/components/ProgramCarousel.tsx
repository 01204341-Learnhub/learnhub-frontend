import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CourseCard from "../../learns/components/CourseCard";

interface CourseCardProps {
    courseThumbnailUrl: string;
    courseName: string;
    instructorName: string;
    percentCompleted: number;
}
interface ProgramCarouselProps {
    programs: CourseCardProps[],
    displayCount?: number,
    carouselName: string
}


export default function ProgramCarousel({ programs, displayCount, carouselName }: ProgramCarouselProps) {
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
            if (prev === programs.length - (displayCount ?? 4)) {
                return prev
            }
            return prev + 1
        })
    }
    return (
        <>
            <h1 className="text-2xl font-bold text-black mx-10">{carouselName}</h1>
            <div className="flex">
                <button onClick={handleLeft}>
                    <FontAwesomeIcon icon={faChevronCircleLeft} size="2x" />
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
                            <li key={index} className="mx-5">
                                <CourseCard courseThumbnailUrl={program.courseThumbnailUrl}
                                    courseName={program.courseName}
                                    instructorName={program.instructorName}
                                    percentCompleted={program.percentCompleted} />
                            </li>
                        )
                    })}
                </ul>
                <button onClick={handleRight}>
                    <FontAwesomeIcon icon={faChevronCircleRight} size="2x" />
                </button>
            </div>
        </>
    )
}
