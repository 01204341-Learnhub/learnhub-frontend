import Calendar from "../../features/learns/components/Calendar"
import ClassHomeworkIncoming from "../../features/learns/components/ClassHomeworkIncoming"
import ClassIncoming from "../../features/learns/components/ClassIncoming"
import ClassTeachNow from "../../features/learns/components/ClassTeachNow"


const DataHomework =[{
    titleName:"What is Redstone1" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 9.00" ,status:"ยังไม่ได้ส่ง" ,color:"red"
},{
    titleName:"What is Redstone2" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 12.00" ,status:"ยังไม่ได้ส่ง" ,color:"red"
},{
    titleName:"What is Redstone3" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 15.00" ,status:"ยังไม่ได้ส่ง" ,color:"red"
},{
    titleName:"What is Redstone4" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 20.00" ,status:"ยังไม่ได้ส่ง" ,color:"red"
},{
    titleName:"What is Redstone5" ,homeworkName:"Principal Redstone Designs" ,deadlineDayOfWeek:"" ,deadlineTime:"พรุ่งนี้ 23.59" ,status:"ยังไม่ได้ส่ง" ,color:"red"
}]



function LearningOverview() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center pb-10 bg-[#f5f5f580]">
                <div className="flex justify-center w-full mt-10">   
                    <div className="w-[900px] pr-20 pb-4">
                        <div className="text-3xl font-bold mt-8 pb-4 overflow-hidden">การเรียนรู้ของฉัน</div>
                        <div className="text-xl font-bold pb-3 pt-4 overflow-hidden">คลาสเรียนที่กำลังสอนแล้ว</div>
                    
                            <ClassTeachNow 
                            ThumbnailUrl={"https://image.makewebeasy.net/makeweb/m_1920x0/FZoJyLend/Home/zone9_pic3.png"} 
                            TitleName={"Principal Redstone Designs"} Minute={49.00} />
                        
                    </div>
                    <div className="flex items-center justify-center bg-white mb-4">
                        <Calendar/>
                    </div>
                </div>

                <div className="flex w-full justify-center py-10">
                    <div className="flex flex-col bg-[#f5f5f580]">
                        <div className="text-2xl mt-10 pb-4 font-bold">คลาสเรียนที่ใกล้จะเริ่มสอน</div>
                        <div className="mr-52">
                            <ClassIncoming 
                                    titleName={"Principal Redstone Designs"} 
                                    dayOfWeek={"ศุกร์"} 
                                    day={19} 
                                    month={"กรกฏาคม"} 
                                    start={"10.00"} 
                                    end={"12.00"} 
                                    instrName={"by Instructor Name1"} 
                                    color={"green"}/>
                        </div>
                    </div>
                        <div className="mt-10">
                            <h1 className="text-2xl pl-4 font-bold">การบ้านในคลาสที่ต้องส่งเร็วๆนี้</h1>
                            
                            {DataHomework.map((item) => (
                                <ClassHomeworkIncoming  
                                    titleName={item.titleName} 
                                    homeworkName={item.homeworkName} 
                                    deadlineDayOfWeek={item.deadlineDayOfWeek} 
                                    deadlineTime={item.deadlineTime} 
                                    status={item.status} 
                                    color={item.color}/>
                            ))}
                        
                        </div>
                </div>

                <div className="self-start w-[500px]">
                    <h1 className="font-bold text-2xl pb-4">ประกาศจากผู้สอน</h1>
                    <div className="flex flex-col bg-white drop-shadow-lg pl-8 py-6">
                        <div className="flex items-center px-2 pt-2 pb-4">
                            <span className="text-xl px-1 font-semibold">ประกาศจากผู้สอน</span>
                            <span className="px-1 truncate font-semibold text-xl">classname</span>
                        </div>
                        <div className="flex">
                            <div className=" h-16 w-16 bg-slate-500 rounded-full mx-4">
                                <img src="" alt="" />
                            </div>
                            <div className="flex flex-col w-[280px]">
                                <span className="text-lg truncate">Name Instructor</span>
                                <span className="text-base">โพสประกาศ วัน อ.19 ก.ย.</span>
                                <h1 className="font-semibold truncate text-lg">headerName</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearningOverview