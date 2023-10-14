interface CardProps {
    email : string,
    profile_pic : string,
    fullname : string,
    students : number,
    classes : number,
    courses : number
}

export default function TeacherProfileCard(profilecard : CardProps) {
    return (
        <div className="w-[300px] h-[100vh] bg-white flex flex-col items-center">
            <img className="mt-[24px] rounded-full w-[200px] h-[200px]" src={profilecard.profile_pic}></img>
            <div className="mt-[44px]">
                <div className="font-extrabold text-black text-[20px]">{profilecard.fullname}</div>
                <div className=" font-bold text-gray-500 text-[14px]">ศาสตราจารย์</div>
                <div className=" font-bold text-black text-[15px]">ผู้เรียน {profilecard.students} คน</div>
                <div className=" font-bold text-black text-[15px]">มีหลักสูตร {profilecard.courses + profilecard.classes} รายการ</div>
                <div className=" font-bold text-gray-500 text-[15px]">-หลักสูตรคอร์สเรียน {profilecard.courses} รายการ</div>
                <div className=" font-bold text-gray-500 text-[15px]">-หลักสูตรคลาสเรียน {profilecard.classes} รายการ</div>
            </div>
        </div>
    )
}
