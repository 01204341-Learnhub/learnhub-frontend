import { faEnvelope, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bookLogo from "../../src/assets/Images/bookLogo.png";
import textNameLogo from "../../src/assets/Images/textNameLogo.png";
import { signInWithEmail } from "../services/auth/signIn";


export default function Login() {
    const [mode, setMode] = useState<"student" | "teacher">("student") // student or teacher
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const navigate = useNavigate()
    const handleSignIn = () => {
        if (password === "") {
            alert("กรุณากรอกรหัสผ่าน")
            return
        }

        signInWithEmail(email, password, mode).then((user) => {
            if (mode == "student") navigate("/home");
            else navigate("/teach/overview", { replace: true });
        }).catch((error) => {
            alert(`cannot login ${error}`)
        })
    }

    function handleBack() {
        navigate("/", { replace: true })
    }

    return (
        <>
            <button className=" text-[24px] ml-5 mt-10" onClick={handleBack}>
                Back
            </button>
            <div className="grid grid-cols-2">
                <div className=" mt-36">
                    <div className="flex flex-row justify-center space-x-4 scale-150">
                        <img src={bookLogo} />
                        <img src={textNameLogo} className=" object-contain h-[45] w-[342]" />
                    </div>
                    <p className="text-[40px] text-center mt-12 font-bold">เรียนรู้เเละพัฒนาตนเองกับ LearnHub</p>
                </div>

                <div className=" mt-36 mr-14 shadow-xl rounded-3xl">
                    <div className="">
                        <h1 className="text-center text-[40px] font-bold">เข้าสู่ระบบ</h1>
                    </div>
                    <div className=" flex flex-row justify-center space-x-10 mt-4">
                        <div className=" text-center text-[24px] font-bold">
                            <button className={mode == "student" ? "underline underline-offset-[6px] decoration-[#18334E] decoration-8" : ""}
                                onClick={() => { setMode("student") }}
                            >ผู้เรียน
                            </button>
                        </div>
                        <div className="text-center text-[24px] font-bold">
                            <button className={mode == "teacher" ? "underline underline-offset-[6px] decoration-[#18334E] decoration-8" : ""}
                                onClick={() => { setMode("teacher") }}
                            >ผู้สอน
                            </button>
                        </div>

                    </div>
                    <div className=" mt-10 ml-48 flex border-[5px] rounded-xl space-x-10 object-contain h-[60px] w-[500px] items-center">
                        <div className=" flex space-x-[6%] ml-[4%] w-[95%]">
                            <FontAwesomeIcon icon={faEnvelope} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                            <input type="text" className=" text-[24px] outline-none container" placeholder={mode == "student" ? "อีเมลล์ผู้เรียน" : "อีเมลล์ผู้สอน"} required
                                value={email} onChange={handleEmailChange}></input>
                        </div>
                    </div>
                    <div className=" mt-10 ml-48 flex border-[5px] rounded-xl space-x-10 object-contain h-[60px] w-[500px] items-center">
                        <div className=" flex space-x-[6%] ml-[4%] w-[95%]">
                            <FontAwesomeIcon icon={faUnlockKeyhole} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                            <input type="password" className=" text-[24px] outline-none container" placeholder={mode == "student" ? "รหัสผ่านผู้เรียน" : "รหัสผ่านผู้สอน"} required
                                value={password}
                                onChange={handlePasswordChange}></input>
                        </div>
                    </div>
                    <div className=" flex justify-center ">
                        <Link to="/Register" className=" mt-10 font-bold text-[24px] flex text-blue-600">ลืมรหัสผ่าน?</Link>
                    </div>
                    <div className=" flex justify-center">
                        <button className=" mt-12 text-white bg-[#18334E] py-2 px-10 rounded-md shadow-md text-[24px] flex justify-center"
                            onClick={handleSignIn}>เข้าสู่ระบบ</button>
                    </div>
                    <div className=" mt-16 flex space-x-4 justify-center">
                        <p className=" font-bold text-[24px]">ยังไม่มีบัญชี ?</p>
                        <Link to="/Register" className=" font-bold text-[24px] text-blue-600">คลิกเพื่อสร้างบัญชี</Link>
                    </div>
                    <div className=" mt-20"></div>

                </div>
            </div>
        </>
    )
}
