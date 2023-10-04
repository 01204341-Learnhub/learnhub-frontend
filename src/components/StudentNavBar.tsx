import { faBookOpen, faCalendar, faChalkboardUser, faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

function StudentNavBar() {
    return (
        <div className="">
            <h1 className="px-2 ml-4 my-3 h-[25px] w-[68px] bg-[#a1ccd1] rounded-xl font-semibold text-[13px] text-center inline-block">ผู้เรียน</h1>
            <NavLink to="/learn/overview" replace={true} className={({ isActive }) => ` flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faBookOpen} color='black' size='xl' className="ml-4 mr-2" />
                <h1 className="ml-2 font-bold text-[20px]">ภาพรวม</h1>
            </NavLink>
            <NavLink to="/learn/courses" replace={true} className={({ isActive }) => ` flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faBookOpen} color='black' size='xl' className="ml-4 mr-2" />
                <h1 className="ml-2 font-bold text-[20px]">คอร์สเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/learn/classes" replace={true} className={({ isActive }) => ` flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faChalkboardUser} color='black' size='xl' className="ml-3 mr-1" />
                <h1 className="ml-2 font-bold text-[20px]">คลาสเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/learn/homework" replace={true} className={({ isActive }) => ` flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faClipboardList} color='black' size='xl' className="ml-4 mr-2" />
                <h1 className="ml-2 font-bold text-[20px]">งานที่ต้องทำ</h1>
            </NavLink>
            <NavLink to="/learn/schedule" replace={true} className={({ isActive }) => ` flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faCalendar} color='black' size='xl' className="ml-4 mr-2" />
                <h1 className="ml-2 font-bold text-[20px]">ตารางเรียน</h1>
            </NavLink>
        </div>
    )
}

export default StudentNavBar