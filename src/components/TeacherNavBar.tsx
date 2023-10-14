import { faBookOpen, faClipboardList, faChalkboardUser, faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

function TeacherNavBar() {
    return (
        <div className="sticky top-[106px]">
            <h1 className="px-2 ml-4 my-3 h-[25px] w-[68px] bg-[#FF52a2] rounded-xl font-semibold text-[13px] text-white text-center inline-block">ผู้สอน</h1>
            <NavLink to="/teach/overview" replace={true} className={({ isActive }) => `flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faBookOpen} color='black' size='xl' className="ml-4 mr-2" />
                <h1 className="ml-2 font-bold text-[20px]">ภาพรวม</h1>
            </NavLink>
            <NavLink to="/teach/courses" replace={true} className={({ isActive }) => `flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faBookOpen} color='black' size='xl' className="ml-4 mr-2" />
                <h1 className="ml-2 font-bold text-[20px]">คอร์สเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/teach/classes" replace={true} className={({ isActive }) => `flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faChalkboardUser} color='black' size='xl' className="ml-3 mr-1" />
                <h1 className="ml-2 font-bold text-[20px]">คลาสเรียนของฉัน</h1>
            </NavLink>
            <NavLink to="/teach/homework" replace={true} className={({ isActive }) => `flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faClipboardList} color='black' size='xl' className="ml-4 mr-2" />
                <h1 className="ml-2 font-bold text-[20px]">การบ้าน</h1>
            </NavLink>
            <NavLink to="/teach/incomes" replace={true} className={({ isActive }) => `flex items-center my-[3px] h-[47px] hover:bg-[#d9d9d9] ${isActive ? "bg-[#d9d9d9]" : ""}`}>
                <FontAwesomeIcon icon={faMoneyCheckAlt} color='black' size='xl' className="ml-4 mr-2" />
                <h1 className="ml-2 font-bold text-[20px]">รายได้</h1>
            </NavLink>
        </div>
    )
}

export default TeacherNavBar