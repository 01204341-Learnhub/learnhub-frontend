//  TO-DO = ask backend how long does the class has start

import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface ClassTeachNowProp {
    ThumbnailUrl: string;
    ClassName: string;
}

export default function ClassTeachNow (props:ClassTeachNowProp) {

    return (
        <div className="relative">
            <img src={props.ThumbnailUrl} alt="Thumbnail Picture" className=" object-cover w-[680px] h-[220px] opacity-30 rounded-xl"/>
            <div className="absolute -translate-y-[250%] translate-x-[5%]">
                <div className="text-5xl font-bold">{props.ClassName}</div>
                <div className=" flex space-x-2 items-center">
                    <div className="text-[20px] font-bold translate-y-[40%] bg-[#ADE792] rounded-xl p-1">กำลังสอน</div>
                    <FontAwesomeIcon icon={faClockRotateLeft} className=" translate-y-[60%]" size="xl"></FontAwesomeIcon>
                    <div className=" text-[20px] font-bold translate-y-[50%]">เริ่มสอนไปแล้ว</div>
                </div>
            </div>
            <Link to="/Login" className=" absolute -translate-y-[140%] translate-x-[300%] bg-black text-white p-1 rounded-xl text-[20px] font-bold">ไปยังคลาสเรียนนี้</Link>
            
        </div>
    )
}