import { faBookOpen, faCalendar, faClipboardList, faScaleBalanced } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

function StudentNavBar() {
    return (
        <div className="flex flex-col items-start px-4">
            <h1 className="px-4 py-0.5 mb-6 ml-2 mt-3 bg-teal-400 rounded-xl text-base font-semibold inline-block">ผู้เรียน</h1>
            <NavLink to="/learn/overview" replace={true} className={({ isActive }) => `flex items-center w-full my-2 py-2 hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faBookOpen} size="xl" className="pl-6 pr-3" />
                <h1 className="ml-2 font-bold text-2xl">ภาพรวม</h1>
            </NavLink>
            <NavLink to="/learn/courses" replace={true} className={({ isActive }) => `flex items-center w-full my-2 py-2 hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faBookOpen} size="xl" className="pl-6 pr-3"/>
                <h1 className="ml-2 font-bold text-2xl">คอร์สเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/learn/classes" replace={true} className={({ isActive }) => `flex items-center  w-full my-2 py-2 hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faScaleBalanced} size="xl" className="pl-6 pr-3"/>
                <h1 className="ml-2 font-bold text-2xl">คลาสเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/learn/homework" replace={true} className={({ isActive }) => `flex items-center w-full my-2 py-2 hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faClipboardList} size="2xl" className="pl-7 pr-3"/>
                <h1 className="ml-2 font-bold text-2xl">งานที่ต้องทำ</h1>
            </NavLink>
            <NavLink to="/learn/schedule" replace={true} className={({ isActive }) => `flex items-center w-full my-2 py-2 hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faCalendar} size="2xl" className="pl-6 pr-3" />
                <h1 className="ml-2 font-bold text-2xl">ตารางเรียน</h1>
            </NavLink>
        </div>
    )
}

export default StudentNavBar