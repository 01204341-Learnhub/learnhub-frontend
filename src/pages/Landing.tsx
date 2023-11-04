import { Link, Navigate, useNavigate } from "react-router-dom"
import ImageLogo from "../assets/images/bookLogo.png"
import ImageElephant from "../assets/images/elephantLogo.png"
import ClassIcon from "../assets/images/landingClassicIcon.png"
import CouseIcon from "../assets/images/landingCourseIcon.png"
import ImageLogoText from "../assets/images/textNameLogo.png"
import { useUser } from "../hooks/useUser"


function Landingmiddle() {
    const navigate = useNavigate()
    const { user } = useUser()
    if (user) {
        return (
            <Navigate to={"/home"} replace={true} state={{ from: "/" }} />
        )
    }
    return (
        <>
            <div className="flex flex-row w-screen px-[10%] pt-[1.5%]">
                <div className="flex flex-row w-screen">
                    <div className="flex flex-row items-center mx-2">
                        <img src={ImageLogo} />
                    </div>
                    <div className="flex flex-row items-center mx-2 mr-[4%]">
                        <img src={ImageLogoText} />
                    </div>
                    <Link to={"/home"} className="flex items-center font-bold mx-[2%] hover:text-[#007399]">หน้าแรก</Link>
                    <Link className="flex items-center font-bold mx-[2%] hover:text-[#007399]" to={"/home/courses"}>คอร์สเรียน</Link>
                    <Link className="flex items-center font-bold mx-[2%] hover:text-[#007399]" to={"/home/classes"}>คลาสเรียน</Link>
                </div>
                <div className="flex flex-row w-full justify-end ">
                    <Link to={"/login"} className="flex items-center font-bold mx-[6%]  hover:text-[#007399]">เข้าสู่ระบบ</Link>
                    <Link to={"/register"} className="flex py-[1.5%]  ">
                        <button className="bg-white hover:bg-gray-100
                        text-gray-800 font-semibold  border px-6
                        border-gray-400 rounded-[15%] shadow">สร้างบัญชี</button>
                    </Link>
                </div>
            </div>
            <div>
                <div className="flex flex-row  px-[10%] pt-[5%] justify-center">
                    <div className="justify-center content-center pt-[2%] w-[50%]">
                        <div className="text-base font-bold text-[#007399]">สำรวจคอร์สเรียนและคลาสออนไลน์</div>
                        <div className="text-4xl font-bold text-[#18334E] pt-4">
                            <p>เรียนรู้และพัฒนาตนเอง</p>
                            <p>กับ LearnHub </p>
                        </div>
                        <div className="text-lg pt-[5%]">
                            <p>แหล่งเรียนรู้และพัฒนาตนเองออนไลน์ที่จะทำให้คุณได้</p>
                            <p>สัมผัสประสบการณ์การเรียนรู้ที่ไม่เหมือนใคร</p>
                        </div>
                        <div className="pt-[10%]">
                            <button className="bg-[#18334E] hover:bg-blue-900 text-white font-semibold py-4 px-5 border border-gray-400 rounded shadow"
                                onClick={() => { navigate("/home") }}>
                                ดูคอร์ส/คลาสเรียนทั้งหมด
                            </button>
                        </div>
                        <div className="flex pt-[15%]">
                            <div>
                                <img src={CouseIcon} width="65%" className="" />
                            </div>
                            <div>
                                <img src={ClassIcon} width="60%" className="" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-cente w-[50%]">
                        <img src={ImageElephant} />
                    </div>
                </div>
            </div>
        </>
    )
}





export default function Landing() {
    return (
        <div className="flex-1 bg-[#C4D9EE] h-screen">
            <Landingmiddle />
        </div>
    );
}

