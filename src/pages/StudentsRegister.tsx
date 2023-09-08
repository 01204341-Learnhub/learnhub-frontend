import { faEnvelope, faUnlockKeyhole, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function StudentsRegister() {

    return (
    <div className=" bg-gray-300 h-screen">
        <div className="grid grid-cols-2">
            <div className=" ">
                <Link to="/Register" className="text-[24px]">ย้อนกลับ</Link>
                <p className="text-[24px] text-center  mt-[100px]  font-bold">**text**</p>
            </div>

            <div className="bg-white h-screen flex flex-col justify-center items-center">
                <div className="">
                    <h1 className=" mb-[50px] text-center text-black text-[32px] font-bold">สร้างบัญชีผู้เรียน</h1>
                </div>
                <div className=" flex border-[2px]  rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                    <div className="  opacity-50 flex space-x-10 ml-4 w-full ">
                        <FontAwesomeIcon icon={faUser} size='2xl'></FontAwesomeIcon>
                        <input
                            type="text"
                            className="border-none outline-none text-[24px] w-full bg-white"
                            placeholder="Username / ชื่อผู้ใช้งาน"
                        />
                    </div>
                </div>
                <div className=" mt-10 flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                    <div className=" opacity-50 flex space-x-10 ml-4 w-full">
                        <FontAwesomeIcon icon={faEnvelope} size='2xl'></FontAwesomeIcon>
                        <input
                            type="email"
                            className="border-none outline-none text-[24px] w-full"
                            placeholder="Email / อีเมล"
                            />
                    </div>
                </div>
                <div className=" mt-10 flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                    <div className=" opacity-50 flex space-x-10 ml-4 w-full">
                        <FontAwesomeIcon icon={faUnlockKeyhole} size='2xl'></FontAwesomeIcon>
                        <input
                            type="password"
                            className="border-none outline-none text-[24px] w-full "
                            placeholder="Password / รหัสผ่าน"
                        />
                    </div>
                </div>
                <div className=" mt-10 flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                    <div className=" opacity-50 flex space-x-10 ml-4 w-full">
                        <FontAwesomeIcon icon={faUnlockKeyhole} size='2xl'></FontAwesomeIcon>
                        <input
                            type="password"
                            className="border-none outline-none text-[24px] w-full "
                            placeholder="Confirm Password / ยืนยันรหัสผ่าน"
                        />
                    </div>
                </div>
               
                <div className=" flex justify-center">
                    <Link to="/Login" className=" mt-12 text-white bg-[#18334E] py-2 px-10 rounded-md shadow-md text-[24px] flex justify-center">สมัครสมาชิก</Link>
                </div>
                
                <div className=" mt-20"></div>

            </div>
        </div>
    </div>
    )
}

export default StudentsRegister
