import { useUser } from "../hooks/useUser"

function Profile() {
    const { user, isFetching } = useUser()
    if (isFetching) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }
    return (
        <div className="w-full h-full">
            <div className="flex text-2xl font-bold">
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