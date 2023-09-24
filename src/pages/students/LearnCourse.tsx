import { useParams } from "react-router-dom"

function LearnCourse() {
    const { courseID } = useParams()
    return (
        <div>LearnCourse {courseID}</div>
    )
}

export default LearnCourse