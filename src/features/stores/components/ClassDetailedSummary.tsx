import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import { faChartColumn } from "@fortawesome/free-solid-svg-icons"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"


interface ClassDetailedSummaryProps {
    costs: number;
    quantity : number;
    level: string;
    students: number;
    status : string;
    availablesource : number;
    timeTeaching : number;
  }

function ClassDetailedSummary(myClassDetailedSummary: ClassDetailedSummaryProps){

    return (
        <>
        <div className="card w-[508px] h-[414px] bg-base-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[5px] cursor-pointer">        
            <div className="flex justify-between content-center items-center mx-[10%] pt-[2%]">
                <p className="font-bold	text-[32px]">
                    {myClassDetailedSummary.costs} บาท
                </p>
                <button className="flex justify-between items-center content-center  text-sm w-[240px] h-[52px] bg-[#D9D9D9] rounded-xl px-[5%]">
                    <FontAwesomeIcon icon={faHeart} color="#FF2171" size="xl"/>
                    <p className="font-bold	">
                        เพิ่มในนการเรียนรู้ที่อยากได้
                    </p>
                </button>
            </div>
            <div className="flex justify-center">
                <div className="flex justify-between w-[412px] h-[72.339px] border-2 border-gray-300 rounded-xl mt-2">
                    <div className="flex justify-center w-[50%] items-center ">
                        <div>
                            <FontAwesomeIcon icon={faBook} color="#000000" size="2xl"/>
                        </div>
                        <div className="ml-4">
                            <p>บทเรียนทั้งหมด</p>
                            <p className="font-bold">{myClassDetailedSummary.quantity}</p>
                        </div>
                    </div>

                    <div className="h-full border border-gray-300"></div>
                    
                    <div className="flex justify-center w-[50%] items-center">
                            <div className="flex w-8 justify-center">
                                <FontAwesomeIcon icon={faChartColumn} color="#000000" size="2xl"/>
                            </div>
                            <div className="ml-4">
                                <p>ระดับความยาก</p>
                                <p className="font-bold">{myClassDetailedSummary.level}</p>
                            </div>                   
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center content-center pt-[4%] px-[10%]">
                    <div className="flex w-8 justify-center">
                        <FontAwesomeIcon icon={faUserGroup} color="#000000" size="xl"/>
                    </div>
                    <p className="ml-3">ผู้เรียน 
                        <span className="font-bold ml-2">
                            {myClassDetailedSummary.students}
                        </span>
                    </p>
                </div>
                
                <div className="flex items-center content-center pt-[4%] px-[10%]">
                    <div className="flex w-8 justify-center">
                        <FontAwesomeIcon icon={faClipboardList} color="#000000" size="xl"/>
                    </div>
                    <p className="ml-3">แบทฝึกหัด 
                        <span className="font-bold ml-2">
                            {myClassDetailedSummary.availablesource} แบบฝึกหัด
                        </span>
                    </p>
                </div>
                <div className="flex items-center content-center pt-[4%] px-[10%]">
                    <div className="flex w-8 justify-center">
                        <FontAwesomeIcon icon={faClipboardList} color="#000000" size="xl"/>
                    </div>
                    <p className="ml-3">จำนวนครั้งที่เรียน 
                        <span className="font-bold ml-2">
                            {myClassDetailedSummary.timeTeaching} ครั้ง
                        </span>
                    </p>
                </div>
                
            </div>
            <div className="flex pt-[7%] px-[10%]">
                <div className="pr-2">
                    <button className="bg-black shadow-xl hover:shadow-2xl cursor-pointer w-[165px] h-[65px] text-white font-bold text-xl border rounded-3xl ">
                        ลงทะเบียน
                    </button>
                </div>
                <div className="px-2">
                    <button className="flex justify-center items-center content-center bg-white shadow-xl hover:shadow-2xl cursor-pointer w-[165px] h-[65px] text-black font-bold text-xl border-2 border-gray-300 rounded-3xl ">
                        <FontAwesomeIcon icon={faCartShopping} color="#000000" size="xl"/>
                        <p className="ml-3">
                            ใส่รถเข็น
                        </p>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ClassDetailedSummary