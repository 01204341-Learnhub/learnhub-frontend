
interface ClassHomeworkIncomingProps {
    titleName: string;
    homeworkName: string;
    deadlineDayOfWeek: string;
    deadlineTime: string;
    status: string;
}

export default function ClassHomeworkIncoming (props: ClassHomeworkIncomingProps) { 
    return (
        <div className=" flex w-[550px] h-[90px] bg-white drop-shadow-lg m-5">
            <div className={`bg-red-400 w-2`} />
            <div className="flex flex-col w-full pl-10 pr-3 py-2">
                <p className=" font-bold text-lg truncate">{props.homeworkName}</p>
                <div className="flex items-center justify-between">
                    <p className="text-[14px] text-[#404040] truncate">{props.titleName}</p>
                    <p className="text-[14px] text-[#404040] truncate">ถึง {props.deadlineTime} {props.deadlineDayOfWeek}</p>
                </div>
                <div className="self-end py-1 text-sm font-bold marker: text-red-600">{props.status}</div>
            </div>
        </div>
    );
}