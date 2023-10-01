import { useSelector } from "react-redux"
import { RootState } from "../store"

function Profile() {
    const { user } = useSelector((state: RootState) => state.user)
    return (
        <div className="w-full h-full">
            <div className="flex">
                <h1>โปรไฟล์</h1>
                <h1>ตั้งค่าบัญชี</h1>
            </div>
            <div className="h-full border-black border-2 mx-10 my-5">
                <div className="flex justify-between">
                    <div>
                        <h1>ชื่อของคุณ</h1>
                        <h2>{user.username}</h2>
                    </div>
                    <div className="flex flex-col avatar">
                        <div className="w-24 rounded-full">
                            <img src={user.profilePicture} />
                        </div>
                        <button className="btn">แก้ไข</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile