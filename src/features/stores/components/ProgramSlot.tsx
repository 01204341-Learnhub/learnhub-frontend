import { faChartColumn, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProgramSlotProps {
    courseThumbnailUrl: string;
    regisDate: string;
    courseName: string;
    instructorName: string;
    percentCompleted: number;
    voter: number;
    price: number;
    tag: string;
    lvl: string;
}

// function intToThaiMonth(month:number) {
//     const thaiMonth = [
//         "ม.ค.", "ก.พ.", "มี.ค.",
//         "เม.ย.", "พ.ค.", "มิ.ย.",
//         "ก.ค.", "ส.ค.", "ก.ย.",
//         "ต.ค.", "พ.ย.", "ธ.ค."
//     ]

//     if (month >= 1 && month <= 12) {
//         return thaiMonth[month - 1]
//     } else {
//         return "invalid month";
//     }
// }

function ProgramSlot(myProgram: ProgramSlotProps) {

    // const [dd, mm, yy] = myProgram.regisDate.split('/')

    return (
        <div className="bg-white m-2 rounded-[10px] w-[286px] h-[300px] max-w-sm overflow-hidden shadow-lg ">
            <div className=" w-[286px] h-[130px]">
                <img className="w-full h-full" src={myProgram.courseThumbnailUrl} alt="Larm On Chang" />
                {/* {dd && mm && yy && (
                <p className="absolute font-semibold text-[14px] text-white bottom-3 left-5">
                    ลงทะเบียนได้ถึง {dd} {intToThaiMonth(parseInt(mm))} {yy}
                </p>
                )} */}
            </div>
            <div className="px-5 h-[150px] flex flex-col">
                <div className=" font-extrabold text-[16px] mb-2">{myProgram.courseName}</div>
                <p className="-mt-3 font-bold text-gray-500 text-[14px]">{myProgram.instructorName}</p>
                <div className=" flex items-center space-x-1 text-[14px] font-bold">{myProgram.percentCompleted}
                    {[1, 2, 3, 4, 5].map((index) => (
                        <FontAwesomeIcon
                        icon={faStar}
                        key={index}
                        className={`w-3 h-3 ${index <= myProgram.percentCompleted ? 'text-black' : 'text-gray-300'}`}
                        aria-hidden="true"
                        />
                        
                    ))}
                    <p className="font-bold text-gray-400">({myProgram.voter})</p>
                </div>
                <div className=" text-[18px] grow font-bold">{myProgram.price} บาท</div>
                <div className=" flex justify-between items-center">
                    <div className="bg-[#FF8989] h-[34px] w-[68px] font-semibold text-black text-[13px] flex items-center justify-center">{myProgram.tag}</div>
                    <div className="flex items-center ">
                        <FontAwesomeIcon icon={faChartColumn} size="2xl"/>
                        <div className="  p-2 font-semibold text-[14px] text-gray-500 text-center " >{myProgram.lvl}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramSlot

