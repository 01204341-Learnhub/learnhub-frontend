import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

interface ClassIncomingProps {
    titleName: string;
    dayOfWeek: string;
    day: number;
    month: string;
    start: string;
    end: string;
    instrName: string;
    color: string;
}

export default function ClassIncoming (props: ClassIncomingProps) { 
    return (
        <div className=" flex flex-cols-2 w-[460px] h-[150px] shadow-xl">
            <div className={` bg-[${props.color}] w-[10px]`}>
            </div>

            <div className=" flex flex-rows-3 relative bg-white">
                <div className=" space-y-[2%]">
                    <p className=" font-bold text-3xl ml-[2%]">{props.titleName}</p>
                    <hr className=" bg-slate-800 w-[450px] h-[2px]" />
                </div>
                <div className=" absolute left-3 top-16 flex space-x-3">
                    <FontAwesomeIcon icon={faCalendarDays} size="xl"></FontAwesomeIcon>
                    <div>วัน{props.dayOfWeek}ที่ {props.day} {props.month}</div>
                    <div className=" font-extrabold text-[15px]"> | </div>
                    <FontAwesomeIcon icon={faClock} size="xl"></FontAwesomeIcon>
                    <div>{props.start} - {props.end}</div>
                </div>
                <div className=" absolute left-2 top-28 flex space-x-3">
                    <FontAwesomeIcon icon={faChalkboardTeacher} size="xl"></FontAwesomeIcon>
                    <div>{props.instrName}</div>
                </div>
            </div>
        </div>
    );
}