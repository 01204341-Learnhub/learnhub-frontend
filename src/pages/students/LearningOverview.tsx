import ClassTeachNow from "../../features/learns/components/ClassTeachNow"
import ProgramCarousel from "../../features/stores/components/ProgramCarousel"
function LearningOverview() {
    return (
        <>
        <div className="flex">   
            <div className="basis-3/4 bg-pink-300 ">
                <div className="text-3xl font-bold m-9 mx-[10%]">การเรียนรู้ของฉัน</div>
                <div className="text-xl font-bold m-7 mx-[10%]">คลาสเรียนที่กำลังสอนแล้ว</div>
                <div className="mx-[10%] bg-gray-200 rounded-xl">
                    <ClassTeachNow ThumbnailUrl={"https://miro.medium.com/v2/resize:fit:1400/0*mMBXJ9daWzStSCt5.jpg"} TitleName={"Principal Redstone Designs"} Minute={49.00} ></ClassTeachNow>
                </div>
            </div>
            <div className="basis-1/4 bg-green-500">
            calculator
            </div>
        </div>

        <div className="flex mx-[10%] bg-slate-400">
            <div className="basis-2/5">
                <div className="text-xl font-bold m-7 mx-[10%]">
                คลาสเรียนที่ใกล้จะเริ่มสอน
                </div>
                <div>
                    
                </div>
            </div>
            <div className="basis-3/5">
                <div className="text-xl font-bold m-7 mx-[10%]">
                การบ้านในคลาสที่ต้องส่งเร็วๆนี้
                </div>
            </div>
        </div>
        </>
    )
}

export default LearningOverview