
import { Outlet } from "react-router-dom"
import TeacherNavBar from "../components/TeacherNavBar"
import { useUser } from "../hooks/useUser"

function TeacherNavbarLayout() {
    const { user } = useUser()
    if (user === undefined || user.userType !== "teacher") {
        return (
            <h1 className=" flex justify-center items-center h-screen font-bold text-7xl">How You get Here</h1>
        )
    }
    return (
        <div>
            <div className="grid grid-cols-12" style={{ height: `calc(100vh - ${90}px` }}>
                <div className="col-span-2 border-r-4 border-[#e0e0e0]">
                    <TeacherNavBar />
                </div>
                <div className="col-span-10 bg-[#eeeeee80]">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TeacherNavbarLayout