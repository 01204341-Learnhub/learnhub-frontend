import { useState } from "react"
import { useTeachIncomes } from "../../features/teaches/hooks/useIncomes"



function TeacherIncomes(){
    const {incomes, isFetchingsIncomes} = useTeachIncomes()
    const [isShowMonth, setIsShowMonth] = useState<boolean>(false)

    function _getTotalPrice(){
        let total_price = 0
        incomes.filter((income) => (isShowMonth  && _isDateWithinNextMonth(income.purchaseTime)) || !isShowMonth).forEach(_income => total_price += _income.price)
        return total_price
    }

    if (isFetchingsIncomes) return <div>loading...</div>;

    return (
        <div className="flex-cols h-full px-8 py-1">
            <div className="flex relative items-center w-full h-[200px]
            px-20 my-6 bg-[#f0f0f0]">
                <div className="absolute w-[270px] h-[72px] flex flex-cols left-[72%]">
                    <button 
                    className={`h-full w-[50%] px-3 py-1 rounded-l-2xl justify-center font-bold text-xl
                    ${!isShowMonth? 'bg-[#d9d9d9] shadow-inner text-[#606060]' :
                    'bg-white drop-shadow-xl'}`}
                    onClick={() => setIsShowMonth(true)}
                    >
                        ในเดือนนี้
                    </button>
                    <button 
                    className={`h-full w-[50%] px-3 py-1 rounded-r-2xl justify-center font-bold text-xl
                    ${isShowMonth? 'bg-[#d9d9d9] shadow-inner text-[#606060]' :
                    'bg-white drop-shadow-xl'}`}
                    onClick={() => setIsShowMonth(false)}
                    >
                        ทั้งหมด
                    </button>
                </div>
                <div className="flex flex-rows items-end">
                    <div className="text-2xl text-black">
                        ยอดเงินรวมที่ได้รับ
                    </div>
                    <div className="w-20 "></div>
                    <h1 className="text-6xl font-bold text-black ordinal">
                        {_getTotalPrice().toLocaleString()}
                    </h1>
                    <div className="w-5 "></div>
                    <div className="text-3xl font-bold text-black">
                        บาท
                    </div>
                </div>

            </div>
            <div className="w-full h-full">
                <ol>
                    {incomes.filter((income) => (isShowMonth  && _isDateWithinNextMonth(income.purchaseTime)) || !isShowMonth).map((income, index) => {
                        return <li key={index}>
                            <_TransactionBox 
                            type={income.type}
                            programID={income.programID}
                            programPic={income.programPic}
                            name={income.name}
                            buyer={{
                                studentID: income.buyer.studentID,
                                studentName: income.buyer.studentName,
                            }}
                            price={income.price}
                            />

                        </li>
                    }) }
                </ol>
            </div>
        </div>
    )

}

interface _TransactionBoxProps {
    type: string
    programID: string
    programPic: string
    name: string
    buyer: {
        studentID: string
        studentName: string
    }
    price: number
}

function _TransactionBox(props : _TransactionBoxProps) {
    return (
        <div className="flex w-full h-[70px] drop-shadow-xl hover:bg-[#f0f0f0]
        bg-white items-center my-5">
            <div className="w-[8%] h-full bg-green-500">
                <img
                    src={props.programPic}    
                    alt="programCover"
                    className="w-full h-full object-cover"
                >
                </img>
            </div>
            <div className="w-[5%]"></div>
            <div className="flex w-[25%] h-full text-xl text-black items-center">
                {props.name}
            </div>
            <div className="flex w-[25%] h-full text-xl text-black items-center">
                ถูกซื้อโดย
            </div>
            <div className="flex w-[25%] h-full text-xl text-black items-center">
                {props.buyer.studentName}
            </div>
            <div className="flex w-[12%] h-full text-2xl text-black bg-[#ade792] justify-center items-center">
                +{props.price}
            </div>
        </div>
    )
}

function _isDateWithinNextMonth(date : Date): boolean {

    console.log(`purchase date: ${date}`)
    // Calculate the date one month from now
    const lastMonthDate = new Date()
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    console.log(`last month date: ${lastMonthDate}`)
  
    // Compare if the input date is greater than or equal to the current date
    // and less than the date one month from now
    return date >= lastMonthDate;
  }

export default TeacherIncomes