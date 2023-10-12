import { useEffect, useState } from "react";
import { getStudentDashboard } from "../services/studentDashboard";
import { StudentDashboard } from "../types/studentDashboard";

function useStudentDashboard(studentID: string) {
    const [dashboard, setDashboard] = useState<StudentDashboard>()
    const [isFetching, setIsFetching] = useState<boolean>(false)
    async function fetchedStudentDashboard(studentID: string) {
        const fetchedDashboard = await getStudentDashboard(studentID)
        console.log(JSON.stringify(fetchedDashboard,null,2));
        setDashboard(fetchedDashboard)
    }

    useEffect(
        () => {
            setIsFetching(true)
            fetchedStudentDashboard(studentID).then(()=>{
                setIsFetching(false)
            })
        }, [studentID]
    )
    return {dashboard,isFetching}

}
export {useStudentDashboard}