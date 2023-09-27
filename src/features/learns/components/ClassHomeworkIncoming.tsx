
interface ClassHomeworkIncomingProps {
    titleName: string;
    homeworkName: string;
    deadlineDayOfWeek: string;
    deadlineTime: string;
    status: string;
    color: string;
}

export default function ClassHomeworkIncoming (props: ClassHomeworkIncomingProps) { 
    return (
        <div className=" flex flex-row w-[550px] h-[100px] shadow-xl relative">
            <div className={` bg-[${props.color}] w-[10px] static`}>
            </div>

            <div className="flex flex-col ml-[10px] absolute w-full whitespace-nowrap">
                <div className=" space-y-[2%]">
                    <p className=" font-bold text-2xl ml-[2%]">{props.homeworkName}</p>
                </div>
                <div className=" mt-2 ml-[2%]">
                    <div>{props.titleName}</div>
                </div>
            </div>

            <div className=" flex flex-row-reverse absolute w-full whitespace-nowrap top-10">
                <div className=" absolute text-lg mr-2">ถึงวัน{props.deadlineDayOfWeek} {props.deadlineTime} น.</div>
                <div className=" absolute top-8 mr-2 font-bold marker: text-red-600">
                    {props.status}
                </div>
            </div>
        </div>
    );
}