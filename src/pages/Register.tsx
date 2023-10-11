import { useNavigate, useSearchParams } from "react-router-dom";
import studentImage from "../../src/assets/Images/regStudent.png";
import teacherImage from "../../src/assets/Images/regTeacher.png";
import StudentsRegister from "./StudentsRegister";
import TeacherRegister from "./TeacherRegister";


function Register() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    function handleClickBack() {
        navigate(-1)
    }

    function handleClickRegister() {
        navigate("/login", { replace: true })
    }

    function handleClickStudent() {
        const queryparam = new URLSearchParams()
        queryparam.set('u', 'student')
        { navigate({ pathname: '/register', search: `?${queryparam.toString()}` }, { replace: true }) }
    }

    function handleClickTeacher() {
        { navigate("/register?u=teacher", { replace: true }) }
    }

    if (searchParams.get("u") === null) return (
        <div className=" flex flex-col h-screen relative">
            <button onClick={handleClickBack} className=" text-2xl font-semibold ml-[1%] mt-[1%] text-left relative">
                ย้อนกลับ
            </button>

            <div className=" text-3xl font-bold text-center mt-[0.5%] mb-[2%]">
                สร้างบัญชีผู้ใช้สำหรับ
            </div>

            <div className=" flex flex-row w-full h-full overflow-hidden">
                <div className="w-full h-full relative">
                    <div className=" absolute z-40 text-3xl top-[5%] left-[40%]">
                        ผู้เรียน
                    </div>
                    <div className=" absolute z-40 top-[15%] left-[20%] flex flex-col text-xl font-semibold">
                        <p>สำหรับผู้ใช้ที่เข้าแพลทฟอร์มมาเพื่อหาความรู้ในเรื่องต่างๆ</p>
                        <p>บัญชีผู้เรียนจะสามารถเข้าเรียนได้เท่านั้น</p>
                        <p>ไม่สามารถได้รับรายได้จากแพลทฟอร์มนี้ได้</p>
                    </div>

                    <button className=" absolute z-40 bottom-[20%] left-[35%] text-white bg-[#007399] p-2 rounded-md shadow-md text-[24px]" onClick={handleClickStudent}>
                        สร้างบัญชีผู้เรียน
                    </button>

                    <img src={studentImage} alt="stdImg" className=" z-0 w-full h-full opacity-20 relative" />
                </div>

                <div className="w-full h-full relative">
                    <div className=" absolute z-40 text-3xl top-[5%] left-[40%]">
                        ผู้สอน
                    </div>
                    <div className=" absolute z-40 top-[15%] left-[20%] flex flex-col text-xl font-bold">
                        <p>ผู้ใช้ที่เข้าแพลทฟอร์มมาเพื่อเปิดห้องเรียนสร้างและเผยแพร่สื่อการสอน</p>
                        <p>บัญชีผู้สอนจะไม่สามารถซื้อและเข้าเรียนคอร์สหรือคลาสได้</p>
                        <p>สามารถหารายได้จากแพลทฟอร์มนี้ได้</p>
                    </div>

                    <button className=" absolute z-40 bottom-[20%] left-[35%] text-white bg-[#007399] p-2 rounded-md shadow-md text-[24px]" onClick={handleClickTeacher}>
                        สร้างบัญชีผู้สอน
                    </button>

                    <img src={teacherImage} alt="teachImg" className=" z-0 w-full h-full opacity-20 relative" />
                </div>
            </div>

            <div className=" flex flex-row space-x-[1%] h-[10%] items-center justify-center">
                <h1 className=" font-bold text-lg">มีบัญชีเเล้ว ?</h1>
                <button className=" font-bold text-[#007399] text-lg" onClick={handleClickRegister}>คลิกเพื่อลงชื่อเข้าสู่ระบบ</button>
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

export default Register;