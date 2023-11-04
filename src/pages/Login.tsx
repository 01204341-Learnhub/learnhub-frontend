import { faEnvelope, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bookLogo from "../../src/assets/images/bookLogo.png";
import textNameLogo from "../../src/assets/images/textNameLogo.png";
import { LoadingSpash } from "../components/LoadingSpash";
import { signInWithEmail } from "../services/auth/signIn";


export default function Login() {
    const [mode, setMode] = useState<"student" | "teacher">("student") // student or teacher
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggingIn, setIsLoggingIn] = useState(false)

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

        setIsLoggingIn(true)
        signInWithEmail(email, password, mode).then(() => {
            Swal.fire({
                title: 'เข้าสู่ระบบสำเร็จ',
                icon: 'success',
                confirmButtonText: 'ตกลง'
            }).then(() => {
                if (mode == "student") navigate("/home");
                else navigate("/teach/overview", { replace: true });
            })
        }).catch((error) => {
            Swal.fire({
                title: 'เข้าสู่ระบบไม่สำเร็จ',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'ตกลง'
            }).then(() => {
                setIsLoggingIn(false)
            })
        }).finally(() => {
            setIsLoggingIn(false)
        })
    }

    function handleBack() {
        navigate("/", { replace: true })
    }

    if (isLoggingIn) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpash />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-[#eeeeee80]">
            <button className=" text-2xl font-bold ml-24 mt-6  self-start" onClick={handleBack}>
                ย้อนกลับ
            </button>
            <div className=" flex flex-col items-center justify-center h-full">
                <div className="flex w-full justify-evenly">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <img src={bookLogo} className="mr-4" />
                            <img src={textNameLogo} className="w-48 h-8" />
                        </div>
                        <div className="text-4xl font-bold pt-4">
                            <p className="">เรียนรู้เเละพัฒนาตนเองกับ</p>
                            <p className="">LearnHub</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center shadow-xl bg-white w-[600px] px-8 pt-8 pb-12 rounded-3xl">

                        <h1 className="text-center text-[40px] font-bold">เข้าสู่ระบบ</h1>
                        <div className=" flex flex-row justify-center space-x-10 mt-4">
                            <div className=" text-center text-[24px] font-bold">
                                <button className={mode == "student" ? "underline underline-offset-[10px] decoration-[#18334E] decoration-8" : ""}
                                    onClick={() => { setMode("student") }}
                                >ผู้เรียน
                                </button>
                            </div>
                            <div className="text-center text-[24px] font-bold">
                                <button className={mode == "teacher" ? "underline underline-offset-[10px] decoration-[#18334E] decoration-8" : ""}
                                    onClick={() => { setMode("teacher") }}
                                >ผู้สอน
                                </button>
                            </div>

                        </div>
                        <div className="mt-14 flex border-[5px] rounded-xl space-x-10 h-[60px] w-[500px] items-center">
                            <div className=" flex space-x-[6%] ml-[4%] w-[95%]">
                                <FontAwesomeIcon icon={faEnvelope} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                                <input type="text" className=" text-[24px] outline-none container" placeholder={mode == "student" ? "อีเมลล์ผู้เรียน" : "อีเมลล์ผู้สอน"} required
                                    value={email} onChange={handleEmailChange}></input>
                            </div>
                        </div>
                        <div className=" mt-4 flex border-[5px] rounded-xl space-x-10 h-[60px] w-[500px] items-center">
                            <div className=" flex space-x-[6%] ml-[4%] w-[95%]">
                                <FontAwesomeIcon icon={faUnlockKeyhole} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                                <input type="password" className=" text-[24px] outline-none container" placeholder={mode == "student" ? "รหัสผ่านผู้เรียน" : "รหัสผ่านผู้สอน"} required
                                    value={password}
                                    onChange={handlePasswordChange}></input>
                            </div>
                        </div>
                        <div className=" flex justify-center ">
                            <Link to="/Register" className=" mt-8 font-bold text-[24px] flex text-[#068FFF]">ลืมรหัสผ่าน?</Link>
                        </div>
                        <div className=" flex justify-center">
                            <button className=" mt-6 text-white bg-[#18334E] py-2 px-10 rounded-md shadow-md text-[24px] flex justify-center"
                                onClick={handleSignIn}>เข้าสู่ระบบ</button>
                        </div>
                        <div className=" mt-8 flex space-x-4 justify-center">
                            <p className=" font-bold text-[24px]">ยังไม่มีบัญชี ?</p>
                            <Link to="/Register" className=" font-bold text-[24px] text-blue-600">คลิกเพื่อสร้างบัญชี</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
