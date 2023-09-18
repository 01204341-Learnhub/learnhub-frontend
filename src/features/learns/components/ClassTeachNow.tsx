//  TO-DO = ask backend how long does the class has start

import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface ClassTeachNowProp {
    ThumbnailUrl: string;
    TitleName: string;
    Minute: number; 
}

export default function ClassTeachNow (props:ClassTeachNowProp) {

    return (
    <div className="relative w-[80%] h-[220px]">
        <div className="static">
            <img src={props.ThumbnailUrl} alt="Thumbnail Picture" className=" object-cover w-[100%] h-[220px] opacity-70 rounded-xl hover:opacity-50" />
            <div className="absolute top-2 left-4">
                <div className="text-5xl font-bold ">{props.TitleName}</div>
                <div className=" flex space-x-2 items-center">
                    <div className="text-[20px] font-bold translate-y-[40%] bg-[#ADE792] rounded-xl p-1">กำลังสอน</div>
                    <FontAwesomeIcon icon={faClockRotateLeft} className=" translate-y-[60%]" size="xl"></FontAwesomeIcon>
                    <div className=" text-[20px] font-bold translate-y-[50%]">เริ่มสอนไปแล้ว {props.Minute} นาที</div>
                </div>
            </div>
        </div>
        <Link to="/Login" className=" absolute bottom-2 right-4 bg-black text-white p-1 rounded-xl text-[20px] font-bold">ไปยังคลาสเรียนนี้</Link>
    </div>
    )
}