import { faEnvelope, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function StudentsRegister() {


    return (
    <div className=" h-screen">
        <div className="grid grid-cols-2">
            <div className=" ">
                <Link to="/Register" className="text-[24px]">ย้อนกลับ</Link>
                <p className="text-[24px] text-center  mt-[100px]  font-bold">**text**</p>
            </div>

            <div className="bg-gray-700 h-screen flex flex-col justify-center items-center">
                <div className="">
                    <h1 className=" mb-[50px] text-center text-[32px] font-normal">สร้างบัญชีผู้เรียน</h1>
                </div>
                <div className=" flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                    <div className=" opacity-50 flex space-x-10 ml-4">
                        <FontAwesomeIcon icon={faEnvelope} size='2xl'></FontAwesomeIcon>
                        <p className=" text-[24px]">Username</p>
                    </div>
                </div>
                <div className=" mt-10 flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                    <div className=" opacity-50 flex space-x-10 ml-4">
                        <FontAwesomeIcon icon={faEnvelope} size='2xl'></FontAwesomeIcon>
                        <p className=" text-[24px]">อีเมลล์</p>
                    </div>
                </div>
                <div className=" mt-10 flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                    <div className=" opacity-50 flex space-x-10 ml-4">
                        <FontAwesomeIcon icon={faUnlockKeyhole} size='2xl'></FontAwesomeIcon>
                        <p className=" text-[24px]">รหัสผ่าน</p>
                    </div>
                </div>
                <div className=" mt-10 flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                    <div className=" opacity-50 flex space-x-10 ml-4">
                        <FontAwesomeIcon icon={faUnlockKeyhole} size='2xl'></FontAwesomeIcon>
                        <p className=" text-[24px]">ยืนยันรหัสผ่าน</p>
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
