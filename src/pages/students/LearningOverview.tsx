import ClassTeachNow from "../../features/learns/components/ClassTeachNow"

function LearningOverview() {
    return (
        <>
        <div className="flex">
            <div className="basis-3/4 bg-pink-300">
            <div>การเรียนรู้ของฉัน</div>
            <div>คลาสเรียนที่กำลังสอนแล้ว</div>
            <div >
                <ClassTeachNow ThumbnailUrl={"https://miro.medium.com/v2/resize:fit:1400/0*mMBXJ9daWzStSCt5.jpg"} TitleName={"Principal Redstone Designs"} Minute={0} ></ClassTeachNow>
            </div>
            </div>
            <div className="basis-1/4 bg-green-500">
            calculator
            </div>
            
        </div>
        </>
    )
}

export default LearningOverview