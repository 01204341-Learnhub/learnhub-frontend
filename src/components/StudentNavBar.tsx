import { faBookOpen, faCalendar, faClipboardList, faScaleBalanced } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

function StudentNavBar() {
    return (
        <div className="">
            <h1 className="px-2 ml-2 mt-3 bg-teal-400 rounded-xl inline-block">ผู้เรียน</h1>
            <NavLink to="/learn/overview" replace={true} className={({ isActive }) => `flex my-3 hover:bg-gray-400 ${isActive ? "bg-gray-400" : ""}`}>
                <FontAwesomeIcon icon={faBookOpen} />
                <h1 className="ml-2 font-bold text-2xl">ภาพรวม</h1>
            </NavLink>
            <NavLink to="/learn/courses" replace={true} className={({ isActive }) => `flex my-3 hover:bg-gray-400 ${isActive ? "bg-gray-400" : ""}`}>
                <FontAwesomeIcon icon={faBookOpen} />
                <h1 className="ml-2 font-bold text-2xl">คอร์สเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/learn/classes" replace={true} className={({ isActive }) => `flex my-3 hover:bg-gray-400 ${isActive ? "bg-gray-400" : ""}`}>
                <FontAwesomeIcon icon={faScaleBalanced} />
                <h1 className="ml-2 font-bold text-2xl">คลาสเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/learn/homework" replace={true} className={({ isActive }) => `flex my-3 hover:bg-gray-400 ${isActive ? "bg-gray-400" : ""}`}>
                <FontAwesomeIcon icon={faClipboardList} />
                <h1 className="ml-2 font-bold text-2xl">งานที่ต้องทำ</h1>
            </NavLink>
            <NavLink to="/learn/schedule" replace={true} className={({ isActive }) => `flex my-3 hover:bg-gray-400 ${isActive ? "bg-gray-400" : ""}`}>
                <FontAwesomeIcon icon={faCalendar} />
                <h1 className="ml-2 font-bold text-2xl">ตารางเรียน</h1>
            </NavLink>
        </div>
    )
}

export default StudentNavBar