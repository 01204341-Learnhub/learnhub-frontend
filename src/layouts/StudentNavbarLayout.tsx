import { Outlet } from "react-router-dom"
import StudentNavBar from "../components/StudentNavBar"

function StudentNavbarLayout() {
    return (
        <div>
            <div className="grid grid-cols-12" style={{ height: `calc(100vh - ${90}px` }}>
                <div className="col-span-2 border-r-4 border-[#e0e0e0]">
                    <StudentNavBar />
                </div>
                <div className="col-span-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default StudentNavbarLayout