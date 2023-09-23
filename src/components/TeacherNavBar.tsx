import { faBookOpen, faClipboardList, faScaleBalanced } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

function TeacherNavBar() {
    return (
        <div className="">
            <h1 className="px-2 ml-2 mt-3 bg-pink-400 rounded-xl inline-block">ผู้สอน</h1>
            <NavLink to="/teach/courses" replace={true} className={({ isActive }) => `flex my-3 hover:bg-gray-400 ${isActive ? "bg-gray-400" : ""}`}>
                <FontAwesomeIcon icon={faBookOpen} />
                <h1 className="ml-2 font-bold text-2xl">คอร์สเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/teach/classes" replace={true} className={({ isActive }) => `flex my-3 hover:bg-gray-400 ${isActive ? "bg-gray-400" : ""}`}>
                <FontAwesomeIcon icon={faScaleBalanced} />
                <h1 className="ml-2 font-bold text-2xl">คลาสเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/teach/homework" replace={true} className={({ isActive }) => `flex my-3 hover:bg-gray-400 ${isActive ? "bg-gray-400" : ""}`}>
                <FontAwesomeIcon icon={faClipboardList} />
                <h1 className="ml-2 font-bold text-2xl">การบ้าน</h1>
            </NavLink>
        </div>
    )
}

export default TeacherNavBar