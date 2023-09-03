interface ProgramSlotProps {
    courseThumbnailUrl: string;
    regisDate: string;
    courseName: string;
    instructorName: string;
    rating: number;
    voter: number;
    price: number;
    tag: string;
    lvl: string;
}

function intToThaiMonth(month) {
    const thaiMonth = [
        "ม.ค.", "ก.พ.", "มี.ค.",
        "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.",
        "ต.ค.", "พ.ย.", "ธ.ค."
    ]

    if (month >= 1 && month <= 12) {
        return thaiMonth[month - 1]
    } else {
        return "invalid month";
    }
}

function ProgramSlot(myProgram: ProgramSlotProps) {

    const [dd, mm, yy] = myProgram.regisDate.split('/')

    return (
        <div className="m-2 rounded-[20px] w-[286px] h-[350px] max-w-sm overflow-hidden shadow-lg opacity-80 hover:opacity-100">
            <div className=" w-[286px] h-[146px] relative">
                <img className="w-full h-[146px]" src={myProgram.courseThumbnailUrl} alt="Larm On Chang" />
                {dd && mm && yy && (
                <p className="absolute font-semibold text-[14px] text-white bottom-3 left-5">
                    ลงทะเบียนได้ถึง {dd} {intToThaiMonth(parseInt(mm))} {yy}
                </p>
                )}
            </div>
            <div className="px-5 py-5">
                <div className="-mt-3 font-extrabold text-[16px] mb-2">{myProgram.courseName}</div>
                <p className="-mt-2 font-bold text-gray-500 text-[14px]">{myProgram.instructorName}</p>
                <div className="py-2 flex items-center space-x-1 text-[14px] font-bold">{myProgram.rating}
                    {[1, 2, 3, 4, 5].map((index) => (
                        <svg
                        key={index}
                        className={`w-3 h-3 ${index <= myProgram.rating ? 'text-black' : 'text-gray-300 dark:text-gray-500'}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        >
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                        />
                        </svg>
                    ))}
                    <p className="font-bold text-gray-400">({myProgram.voter})</p>
                </div>
                <p className="mb-5 text-[18px] font-bold">{myProgram.price} บาท</p>
                <div className="my-1 flex justify-between items-center">
                    <div className="bg-red-400  h-[25px] px-[4px] font-semibold text-black text-[13px] flex text-center justify-center ">{myProgram.tag}</div>
                    <div className="flex items-center ">
                        <img className="w-[30px] h-[25px]" src="https://gcdnb.pbrd.co/images/G0C0jeTiZxkL.png?o=1" alt="lvl" ></img>
                        <div className="  p-2 font-semibold text-[14px] text-gray-500 text-center " >{myProgram.lvl}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramSlot

