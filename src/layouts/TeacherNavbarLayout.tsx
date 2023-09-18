
import { Outlet } from "react-router-dom"
import TeacherNavBar from "../components/TeacherNavBar"

function TeacherNavbarLayout() {
    return (
        <div>
            <div className="grid grid-cols-12" style={{ height: `calc(100vh - ${90}px` }}>
                <div className="col-span-2 border-r-4 border-[#e0e0e0]">
                    <TeacherNavBar />
                </div>
                <div className="col-span-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TeacherNavbarLayout