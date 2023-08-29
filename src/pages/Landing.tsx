import ImageElephant from "../assets/Images/Elephant.png"
import ImageLogo from "../assets/Images/Logo_landing.png"
import ImageLogoText from "../assets/Images/Textlogo_landing.png"
import CouseIcon from "../assets/Images/landingCouseIcon.png"
import ClassIcon from "../assets/Images/landingClassIcon.png"


function Landingmiddle(){

    return (
        <>
            <div className="flex flex-row w-screen px-[10%] pt-[1.5%]">
                <div className="flex flex-row w-screen">
                    <div className="flex flex-row items-center mx-2">
                        <img src={ImageLogo}/>
                    </div>
                    <div className="flex flex-row items-center mx-2 mr-[4%]">
                        <img src={ImageLogoText}/>
                    </div>
                    <div className="flex items-center font-bold mx-[2%] hover:text-[#007399]">หน้าแรก</div>
                    <div className="flex items-center font-bold mx-[2%] hover:text-[#007399]">คอร์สเรียน</div>
                    <div className="flex items-center font-bold mx-[2%] hover:text-[#007399]">คลาสเรียน</div>
                </div>
                <div className="flex flex-row w-full justify-end ">
                    <div className="flex items-center font-bold mx-[6%]  hover:text-[#007399]">เข้าสู่ระบบ</div>
                    <div className="flex py-[1.5%]  ">
                        <button className="bg-white hover:bg-gray-100
                        text-gray-800 font-semibold  border px-6
                        border-gray-400 rounded-[15%] shadow">สร้างบัญชี</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-row  px-[10%] pt-[5%] justify-between">
                    <div className="w-[50%] justify-center content-center pt-[2%]">
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
                            <button className="bg-[#18334E] hover:bg-blue-900 text-white font-semibold py-4 px-5 border border-gray-400 rounded shadow">
                                ดูคอส/คลาสเรียนทั้งหมด
                            </button>
                        </div>
                        <div className="flex pt-[15%]">
                            <div>
                                <img src={CouseIcon} width="65%" className=""/>
                            </div>
                            <div>
                                <img src={ClassIcon} width="60%" className=""/>
                            </div>
                        </div>
                    </div>
                        <div className="flex justify-end">
                            <img src={ImageElephant}  className="h-[80%]"/>
                        </div>
                </div>
            </div>
        </>
    )
}

export default function Landing() {
    return (
        <div className="flex-1 bg-[#C4D9EE] h-screen">
            <Landingmiddle/>
        </div>
    )
}
