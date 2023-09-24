import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

interface ClassIncomingProps {
    TitleName: string;
    DayOfWeek: string;
    Day: number;
    Month: string;
    Start: string;
    End: string;
    InstrName: string;
    Color: string;
}

export default function ClassIncoming (props: ClassIncomingProps) { 
    return (
        <div className=" flex flex-cols-2 w-[460px] h-[150px] shadow-xl">
            <div className={` bg-[${props.Color}] w-[10px]`}>
            </div>

            <div className=" flex flex-rows-3 relative">
                <div className=" space-y-[2%]">
                    <p className=" font-bold text-3xl ml-[2%]">{props.TitleName}</p>
                    <hr className=" bg-slate-800 w-[450px] h-[2px]" />
                </div>
                <div className=" absolute left-3 top-16 flex space-x-3">
                    <FontAwesomeIcon icon={faCalendarDays} size="xl"></FontAwesomeIcon>
                    <div>วัน{props.DayOfWeek}ที่ {props.Day} {props.Month}</div>
                    <div className=" font-extrabold text-[15px]"> | </div>
                    <FontAwesomeIcon icon={faClock} size="xl"></FontAwesomeIcon>
                    <div>{props.Start} - {props.End}</div>
                </div>
                <div className=" absolute left-2 top-28 flex space-x-3">
                    <FontAwesomeIcon icon={faChalkboardTeacher} size="xl"></FontAwesomeIcon>
                    <div>{props.InstrName}</div>
                </div>
            </div>
        </div>
    );
}