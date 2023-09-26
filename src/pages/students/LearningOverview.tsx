import Calendar from "../../features/learns/components/Calendar"
import ClassHomeworks from "../../features/learns/components/ClassHomeworks"
import ClassIncoming from "../../features/learns/components/ClassIncoming"
import ClassTeachNow from "../../features/learns/components/ClassTeachNow"
function LearningOverview() {
    return (
        <>
        <div className="flex">   
            <div className="basis-3/4 ">
                <div className="text-3xl font-bold m-9 mx-[10%] overflow-hidden">การเรียนรู้ของฉัน</div>
                <div className="text-xl font-bold m-7 mx-[10%] overflow-hidden">คลาสเรียนที่กำลังสอนแล้ว</div>
                <div className="mx-[10%] bg-gray-200 rounded-xl overflow-hidden">
                    <ClassTeachNow ThumbnailUrl={""} TitleName={"Principal Redstone Designs"} Minute={49.00} ></ClassTeachNow>
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
                    <ClassIncoming titleName={"Principal Redstone Designs"} dayOfWeek={"ศุกร์"} day={19} month={"กรกฏาคม"} start={"10.00"} end={"12.00"} instrName={"by Instructor Name1"} color={"#B1E8ED"}></ClassIncoming>
                </div>
            </div>
            <div className="basis-3/5 mx-5">
                <div className="text-2xl font-bold m-7 mx-[10%]">
                    การบ้านในคลาสที่ต้องส่งเร็วๆนี้
                </div>
                <div className="m-5">
                    <ClassHomeworks homeworks={[]}></ClassHomeworks>
                </div>
            </div>
        </div>
        </>
    )
}

export default LearningOverview