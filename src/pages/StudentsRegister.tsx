import { faEnvelope, faUnlockKeyhole, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStudentWithEmail } from "../services/auth/createUser";

function StudentsRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullname(event.target.value);
    }

    const handleRegister = async () => {
        if (password !== confirmpassword) {
            alert("Password and Confirm Password not match");
            return
        }
        try {
            await createStudentWithEmail(email, password, username, fullname)
            navigate('/login', { replace: true });
        } catch (error) {
            alert(`cannot register ${error}`);
        }
    }

    return (
        <div className=" bg-gray-300 h-screen">
            <div className="grid grid-cols-2">
                <div className=" ">
                    <button onClick={() => { navigate('/register', { replace: true }) }} className="text-[24px] ml-[2%]">Back</button>
                    <p className="text-[24px] text-center mt-[100px] font-bold">**text**</p>
                </div>

                <div className="bg-white h-screen flex flex-col justify-center items-center">
                    <div className="">
                        <h1 className=" mb-[50px] text-center text-black text-[32px] font-bold">สร้างบัญชีผู้เรียน</h1>
                    </div>
                    <div className=" flex border-[2px]  rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                        <div className="  opacity-50 flex space-x-10 ml-4 w-[95%] ">
                            <FontAwesomeIcon icon={faUser} size='2xl'></FontAwesomeIcon>
                            <input
                                type="text"
                                className="border-none outline-none text-[24px] w-full bg-white"
                                placeholder="ชื่อ-นามสกุล"
                                value={fullname}
                                onChange={handleFullnameChange}
                            />
                        </div>
                    </div>
                    <div className=" mt-10 flex border-[2px]  rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                        <div className="  opacity-50 flex space-x-10 ml-4 w-[95%] ">
                            <FontAwesomeIcon icon={faUser} size='2xl'></FontAwesomeIcon>
                            <input
                                type="text"
                                className="border-none outline-none text-[24px] w-full bg-white"
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                    </div>
                    <div className=" mt-10 flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                        <div className=" opacity-50 flex space-x-10 ml-4 w-[95%]">
                            <FontAwesomeIcon icon={faEnvelope} size='2xl'></FontAwesomeIcon>
                            <input
                                type="email"
                                className="border-none outline-none text-[24px] w-full"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                    </div>
                    <div className=" mt-10 flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                        <div className=" opacity-50 flex space-x-10 ml-4 w-[95%]">
                            <FontAwesomeIcon icon={faUnlockKeyhole} size='2xl'></FontAwesomeIcon>
                            <input
                                type="password"
                                className="border-none outline-none text-[24px] w-full "
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    <div className=" mt-10 flex border-[2px] rounded-xl space-x-10 object-contain h-[53px] w-[494px] items-center">
                        <div className=" opacity-50 flex space-x-10 ml-4 w-[95%]">
                            <FontAwesomeIcon icon={faUnlockKeyhole} size='2xl'></FontAwesomeIcon>
                            <input
                                type="password"
                                className="border-none outline-none text-[24px] w-full "
                                placeholder="Confirm Password"
                                value={confirmpassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>
                    </div>

                    <div className=" flex justify-center">
                        <button className=" mt-12 text-white bg-[#18334E] py-2 px-10 rounded-md shadow-md text-[24px] flex justify-center"
                            onClick={() => { handleRegister().then() }}>สมัครสมาชิก</button>
                    </div>

                    <div className=" mt-20"></div>

                </div>
            </div>
        </div>
    )
}

export default StudentsRegister
