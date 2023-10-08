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
            <img src={props.ThumbnailUrl} alt="Thumbnail Picture" className=" object-cover w-full h-full opacity-20 rounded-xl hover:opacity-30" />
            <div className="absolute flex flex-col items-center w-full h-full top-0">
                <div className="flex-[1] w-full ">
                    <div className="text-3xl py-2 w-full font-bold self-start mx-4">{props.TitleName}</div>
                    <div className="flex self-start py-2 items-center mx-4">
                        <div className="text-[20px] font-bold px-2 mr-4 bg-[#ADE792] rounded-xl">กำลังสอน</div>
                        <FontAwesomeIcon icon={faClockRotateLeft} size="xl"></FontAwesomeIcon>
                        <div className=" mx-4 text-[20px] font-bold">เริ่มสอนไปแล้ว {props.Minute} นาที</div>
                    </div>
                </div>
                <div className="self-end py-4 px-3">
                    <button className="bg-black text-white px-3 py-2 rounded-xl text-xl font-bold">ไปยังคลาสเรียนนี้</button>
                </div>
            </div>
        </div>
    </div>
    )
}