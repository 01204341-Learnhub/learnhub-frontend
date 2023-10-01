import { Link, useNavigate, useSearchParams } from "react-router-dom";
import studentImage from "../../src/assets/Images/regStudent.png";
import teacherImage from "../../src/assets/Images/regTeacher.png";
import StudentsRegister from "./StudentsRegister";
import TeacherRegister from "./TeacherRegister";

export default function Register() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    function handleBack() {
        navigate(-1)
    }

    if (searchParams.get("u") === null) return (
        <div className="w-screen h-screen bg-red-100">
            <div className=" flex-row">
                <button className=" ml-[1%] py-[0.5%] text-[24px]" onClick={handleBack}>ย้อนกลับ</button>
            </div>

            <div className=" flex-row">
                <p className=" text-center text-[40px] font-normal">
                    สร้างบัญชีผู้ใช้สำหรับ
                </p>
            </div>

            <div className="grid grid-cols-2">
                <div className="text-center">
                    <img src={studentImage} className="w-full h-full opacity-20 relative z-0" />
                    <div className="absolute z-50 bottom-[30%]">
                        <h1 className=" mb-[5%] text-[32px] text-center font-bold">ผู้เรียน</h1>
                        <h1 className=" ml-[25%] text-left text-[20px] font-bold">
                            สำหรับผู้ใช้ที่เข้าแพลทฟอร์มมาเพื่อหาความรู้ในเรื่องต่างๆ<br></br>
                            บัญชีผู้เรียนจะสามารถเข้าเรียนได้เท่านั้น จะไม่สามารถสร้างสื่อการสอนได้<br></br>
                            ไม่สามารถได้รับรายได้จากแพลทฟอร์มนี้ได้
                        </h1>
                        <div className="">
                            <Link to={{ pathname: "/register", search: "?u=student" }} replace={true} className=" text-white bg-[#007399] p-2 rounded-md shadow-md text-[24px]">สร้างบัญชีผู้เรียน</Link>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <img src={teacherImage} className="w-full h-full opacity-20 relative z-0" />
                    <div className=" absolute z-50 bottom-[30%] ml-[8%]">
                        <h1 className=" mb-[5%] text-[32px] text-center font-bold">ผู้สอน</h1>

                        <div className="flex flex-col text-xl font-bold">
                            <p className="text-xl font-bold">ผู้ใช้ที่เข้าแพลทฟอร์มมาเพื่อเปิดห้องเรียนสร้างและเผยแพร่สื่อการสอน</p>
                            <p className="">บัญชีผู้สอนจะไม่สามารถซื้อและเข้าเรียนคอร์สหรือคลาสได้</p>
                            <p className="">สามารถหารายได้จากแพลทฟอร์มนี้ได้</p>
                        </div>
                        <div className="">
                            <Link to={{ pathname: "/register", search: "?u=teacher" }} replace={true} className=" text-white bg-[#007399] p-2 rounded-md shadow-md text-[24px]">สร้างบัญชีผู้สอน</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" flex flex-row justify-center space-x-2 text-[24px]">
                <h3 className=" font-semibold">มีบัญชีเเล้ว?</h3>
                <Link to="/login" replace={true} className=" font-bold text-blue-600">คลิกเพื่อลงชื่อเข้าสู่ระบบ</Link>
            </div>
        </div>
    );
    else if (searchParams.get("u") === "student") return (
        <StudentsRegister />
    )
    else if (searchParams.get("u") === "teacher") return (
        <TeacherRegister />
    )
}
