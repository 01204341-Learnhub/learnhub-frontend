import { useState } from "react"
import { useParams } from "react-router-dom"
import { fetchChapters } from "../../features/learns/services/progress"

function LearnCourse() {
    const { courseID } = useParams()
    const [fetching, setFetching] = useState(false)
    const [chapters, setChapters] = useState([])

    useState(() => {
        async function listChapters() {
            setFetching(true)
            setFetching(false)
            return await fetchChapters(courseID!)
        }

        listChapters().then((chapters) => {
            console.log(JSON.stringify(chapters, null, 2));
            setChapters(chapters)
        })
    }, [])

    if (fetching) return (<div>Fetching...</div>)

    return (
        <div>LearnCourse {courseID}</div>
    )
}

export default LearnCourse