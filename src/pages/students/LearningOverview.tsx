import Calendar from "../../features/learns/components/Calendar"
import ClassHomeworkIncoming from "../../features/learns/components/ClassHomeworkIncoming"
import ClassIncoming from "../../features/learns/components/ClassIncoming"
import ClassTeachNow from "../../features/learns/components/ClassTeachNow"


const DataHomework =[{
    titleName:"What is Redstone1" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 9.00 น" ,status:"ยังไม่ได้ส่ง" ,color:"red"
},{
    titleName:"What is Redstone2" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 12.00 น" ,status:"ยังไม่ได้ส่ง" ,color:"red"
},{
    titleName:"What is Redstone3" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 15.00 น" ,status:"ยังไม่ได้ส่ง" ,color:"red"
},{
    titleName:"What is Redstone4" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 20.00 น" ,status:"ยังไม่ได้ส่ง" ,color:"red"
},{
    titleName:"What is Redstone5" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 23.59 น" ,status:"ยังไม่ได้ส่ง" ,color:"red"
}]



function LearningOverview() {
    return (
        <>
        <div className="flex">   
            <div className="basis-3/4 ">
                <div className="text-3xl font-bold m-9 mx-[10%] overflow-hidden">การเรียนรู้ของฉัน</div>
                <div className="text-xl font-bold m-7 mx-[10%] overflow-hidden">คลาสเรียนที่กำลังสอนแล้ว</div>
                <div className="mx-[10%] bg-gray-200 rounded-xl overflow-hidden">
                    <ClassTeachNow ThumbnailUrl={"https://image.makewebeasy.net/makeweb/m_1920x0/FZoJyLend/Home/zone9_pic3.png"} TitleName={"Principal Redstone Designs"} Minute={49.00} ></ClassTeachNow>
                </div>
            </div>
            <div className="basis-1/4 bg-white m-10">
            <Calendar></Calendar>
            </div>
        </div>

        <div className="flex mx-[10%]">
            <div className="basis-2/5">
                <div className="text-2xl font-bold m-7 mx-[10%]">
                คลาสเรียนที่ใกล้จะเริ่มสอน
                </div>
                <div className="m-5">
                    <ClassIncoming titleName={"Principal Redstone Designs"} dayOfWeek={"ศุกร์"} day={19} month={"กรกฏาคม"} start={"10.00"} end={"12.00"} instrName={"by Instructor Name1"} color={"red"}></ClassIncoming>
                </div>
            </div>
            <div className="basis-3/5 mx-5">
                <div className="text-2xl font-bold m-7 mx-[10%]">
                    การบ้านในคลาสที่ต้องส่งเร็วๆนี้
                </div>
                <div className="m-5">
                {DataHomework.map((item) => (
                    <ClassHomeworkIncoming  titleName={item.titleName} homeworkName={item.homeworkName} deadlineDayOfWeek={item.deadlineDayOfWeek} deadlineTime={item.deadlineTime} status={item.status} color={item.color}></ClassHomeworkIncoming>
                ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default LearningOverview