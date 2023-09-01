import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()

    function handleBack() {
        navigate(-1)
    }

  return (
    <>
        <div className=" flex-row">
            <button className=" ml-4 py-3 text-[24px]" onClick={handleBack}>ย้อนกลับ</button>
        </div>

        <div className=" flex-row">
            <p className="mb-4 text-center text-[40px] font-normal">
          สร้างบัญชีผู้ใช้สำหรับ
            </p>
        </div>

        <div className="grid grid-cols-2">
            <div className="text-center">
                <img src="../../src/assets/images/reg-student.png" className="w-full h-[750px] opacity-20 relative z-0"/>
                <div className=" absolute z-50 bottom-64">
                    <h1 className=" mb-10 text-[32px] text-center font-bold">ผู้เรียน</h1>
                    <h1 className=" ml-32 text-left text-[20px] font-bold">
                    สำหรับผู้ใช้ที่เข้าแพลทฟอร์มมาเพื่อหาความรู้ในเรื่องต่างๆ<br></br>
                    บัญชีผู้เรียนจะสามารถเข้าเรียนได้เท่านั้น จะไม่สามารถสร้างสื่อการสอนได้<br></br>
                    ไม่สามารถได้รับรายได้จากแพลทฟอร์มนี้ได้
                    </h1>
                    <div className=" mt-80">
                        <Link to="/Login" className=" text-white bg-[#007399] p-2 rounded-md shadow-md text-[24px]">สร้างบัญชีผู้เรียน</Link>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <img src="../../src/assets/images/reg-teacher.png" className="w-full h-[750px] opacity-20 relative z-0"/>
                <div className=" absolute z-50 bottom-64 ml-16">
                    <h1 className=" mb-10 text-[32px] text-center font-bold">ผู้สอน</h1>
                    <p className=" ml-32 text-left text-[20px] font-bold">
                    ผู้ใช้ที่เข้าแพลทฟอร์มมาเพื่อเปิดห้องเรียนสร้างและเผยแพร่สื่อการสอน<br></br>
                    บัญชีผู้สอนจะไม่สามารถซื้อและเข้าเรียนคอร์สหรือคลาสได้<br></br>
                    สามารถหารายได้จากแพลทฟอร์มนี้ได้
                    </p>
                    <div className=" mt-80">
                        <Link to="/Login" className=" text-white bg-[#007399] p-2 rounded-md shadow-md text-[24px]">สร้างบัญชีผู้สอน</Link>
                    </div>
                </div>
            </div>
        </div>

        <div className=" mt-5 flex flex-row justify-center space-x-2 text-[24px]">
            <h3 className=" font-semibold">มีบัญชีเเล้ว?</h3>
            <Link to="/Login" className=" font-bold text-blue-600">คลิกเพื่อลงชื่อเข้าสู่ระบบ</Link>
        </div>  
    </>
  );
}
