import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface ClassIncomingProps {
    titleName: string;
    date: string;
    start: string;
    end: string;
    instrName: string;
    profilePic:string
}

export default function ClassIncoming (props: ClassIncomingProps) { 
    const dayInWeek = props.date.split(" ")[0]
    let color = "red"

    if (dayInWeek === "Mon") {
        color = "yellow"
    }
    else if (dayInWeek === "Tue") {
        color = "pink"
    }
    else if (dayInWeek === "Wed") {
        color = "green"
    }
    else if (dayInWeek === "Thu") {
        color = "orange"
    }
    else if (dayInWeek === "Fri") {
        color = "blue"
    }
    else if (dayInWeek === "Sat") {
        color = "purple"
    }
    else {
        color = "red"
    }

    return (
        <div className=" flex flex-cols-2 w-[460px] h-[160px] drop-shadow-lg">
            <div className={`bg-${color}-400 w-[10px] px-1`}/>
    
            <div className=" flex flex-rows-3 relative bg-white">
                <div className="py-4">
                    <p className=" font-bold pb-2 px-2 text-xl ml-[2%] w-[400px] truncate">{props.titleName}</p>
                    <hr className=" bg-[#EBEBEB] w-[450px] h-[2px]" />
                </div>
                <div className=" absolute left-3 top-16 flex space-x-3 px-2 pt-2">
                    <FontAwesomeIcon icon={faCalendarDays} size="xl"></FontAwesomeIcon>
                    <div className="text-[#8f8f8f] font-bold">{props.date}</div>
                    <div className=" font-extrabold text-[15px]"> | </div>
                    <FontAwesomeIcon icon={faClock} size="xl"></FontAwesomeIcon>
                    <div className="text-[#8f8f8f] font-bold">{props.start} - {props.end}</div>
                </div>
                <div className=" absolute px-2 left-2 top-28 flex items-center justify-center">
                    {/* <FontAwesomeIcon icon={faChalkboardTeacher} size="xl"></FontAwesomeIcon> */}
                    <div className="w-8 h-8 bg-slate-200 rounded-full">
                        <img src={props.profilePic} className="w-8 h-8 object-cover rounded-full" alt="" />
                    </div>
                    <div className="px-2 text-[#8f8f8f] text-sm font-bold w-[370px] truncate ">{props.instrName}</div>
                </div>
            </div>
        </div>
    );
}