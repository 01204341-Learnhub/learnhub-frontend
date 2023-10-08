//  TO-DO = ask backend how long does the class has start

import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ClassTeachNowProp {
    ThumbnailUrl: string;
    TitleName: string;
    Minute: number; 
}

export default function ClassTeachNow (props:ClassTeachNowProp) {

    return (
    <div className="relative w-[720px] h-[240px] border-4">
        <div className="w-full h-full">
            <img src={props.ThumbnailUrl} alt="Thumbnail Picture" className=" object-cover w-[100%] h-[240px] opacity-50 rounded-xl hover:opacity-30" />
            <div className="absolute top-0">
                <div className="text-4xl font-bold pt-4 pb-0.5 px-4">{props.TitleName}</div>
                <div className=" flex space-x-2 px-4 items-center">
                    <div className="text-[20px] font-bold translate-y-[40%] px-2 space-x-4 bg-[#ADE792] rounded-xl p-1">กำลังสอน</div>
                    <FontAwesomeIcon icon={faClockRotateLeft} className=" translate-y-[60%]" size="xl"></FontAwesomeIcon>
                    <div className=" text-[20px] font-bold translate-y-[50%]">เริ่มสอนไปแล้ว {props.Minute} นาที</div>
                </div>
            </div>
            <button className="absolute bottom-2 right-5 px-4 py-1 bg-black text-white p-1 rounded-xl text-[20px] font-bold">ไปยังคลาสเรียนนี้</button>
        </div>
    </div>
    )
}