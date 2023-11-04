import { useState } from "react"
import { useTeachIncomes } from "../../features/teaches/hooks/useIncomes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"



function TeacherIncomes(){
    const {incomes, isFetchingsIncomes} = useTeachIncomes()
    const [isShowMonth, setIsShowMonth] = useState<boolean>(false)

    function _getTotalPrice(){
        let total_price = 0
        incomes.filter((income) => (isShowMonth  && _isDateWithinNextMonth(income.purchaseTime)) || !isShowMonth).forEach(_income => total_price += _income.price)
        return total_price
    }

    if (isFetchingsIncomes) return <div>loading...</div>;
    const courseIncomes = incomes.filter((income) => (isShowMonth  && _isDateWithinNextMonth(income.purchaseTime)) || !isShowMonth)
                    .reduce(function (r,income ) {
                            r[income.programID] = r[income.programID] || []
                            r[income.programID].push(income)
                            return r
                        }, Object.create(null))
    return (
        <div className="flex-cols">
            <div className="flex-cols px-8 py-1">
                <div className="flex justify-between relative items-center w-full h-[200px]
                px-20 my-6 bg-[#f0f0f0]">
                    <div className="flex flex-rows w-[50%] justify-between items-end">
                        <h1 className="text-2xl text-black font-bold pb-5">
                            ยอดเงินรวมที่ได้รับ
                        </h1>
                        <div className="flex flex-rows items-end w-[50%] 
                        bg-[#47b5ff] px-7 py-4 rounded-3xl">
                            <h1 className="text-6xl font-bold text-white ordinal">
                                {_getTotalPrice().toLocaleString()}
                            </h1>
                            <div className="w-5"></div>
                            <p className="text-3xl font-bold text-white">
                                บาท
                            </p>
                        </div>
                    </div>
                    <div className=" w-[270px] h-[72px] flex flex-cols left-[72%]">
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

                </div>
                <p className="text-3xl font-bold">
                    {isShowMonth? 'ข้อมูลในเดือนนี้':'ข้อมูลทั้งหมด'}
                </p>
            </div>
            <div className="flex w-full border-b-4">
                <div className="flex w-full px-8 py-1 items-center justify-end">
                    <p className=" w-[205px] text-xl">
                        จำนวนที่ขายไป
                    </p>
                    <p className= "w-[355px] text-xl">
                        จำนวนเงินทั้งหมด
                    </p>
                </div>
            </div>
            <div className="flex-cols px-8 py-1">
                <div className="w-full h-full">
                    <ol>
                        {
                        Object.keys(courseIncomes).map((key, index) => {
                            const courseIncome = courseIncomes[key]
                            return <li key={index}>
                                <_TransactionBox 
                                type={courseIncome[0].type}
                                programID={courseIncome[0].programID}
                                programPic={courseIncome[0].programPic}
                                name={courseIncome[0].name}
                                totalPrice={courseIncome[0].price * courseIncome.length}
                                transactions={courseIncome.map((transaction,) => {
                                    return {
                                        buyer: transaction.buyer,
                                        purchaseTime: transaction.purchaseTime,
                                    }
                                })}
                                    
                                />

                            </li>
                        })
                    }
                    </ol>
                </div>
            </div>
        </div>
    )

}

interface _TransactionBoxProps {
    type: string
    programID: string
    programPic: string
    name: string
    totalPrice: number
    transactions: {
        buyer: {
            studentID: string
            studentName: string
        }
        purchaseTime: Date
    }[]

}

function _TransactionBox(props : _TransactionBoxProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function _formatDatetime(dt: Date): string{
        const date= dt.getDate()
        const month =dt.getMonth()
        const year = dt.getFullYear()
        const hours = dt.getHours()
        const minutes = dt.getMinutes().toString().padStart(2,'0')

        return `${date} ${month} ${year} | ${hours}.${minutes} น.`
    }

    return (
        <details className="dropdown w-full h-full">
            <summary onClick={()=>{
                setIsOpen(!isOpen)
            }} 
            className="flex h-[70px] drop-shadow-xl hover:bg-[#f0f0f0]
            bg-white items-center my-3">
                <div className="w-[8%] h-full bg-green-500">
                    <img
                        src={props.programPic}    
                        alt="programCover"
                        className="w-full h-full object-cover"
                    >
                    </img>
                </div>

                <div className="flex w-full h-full items-center">
                    <span className="flex truncate font-bold mr-4 w-3/5 ml-8">{props.name}</span>
                    <div className="flex w-2/5 h-full items-center font-bold justify-between mx-7">
                        <span className="truncate w-1/5 items-center font-bold ">ขายไปแล้ว {props.transactions.length}</span>
                        <span className="truncate w-1/5 h-full flex items-center justify-center text-xl font-bold bg-[#ade792]">+{props.totalPrice.toLocaleString()}</span>
                        <span className="flex justify-between truncate w-1/5 text-[#068fff] items-center">
                        <p>รายละเอียด</p> 
                        
                        <FontAwesomeIcon icon={isOpen?faChevronUp:faChevronDown} /> 
                        </span>
                    </div>
                </div>
            </summary>
            <ol className="w-full h-full">
                {
                    props.transactions.map((transaction, index) => {
                        return <li key={index}>
                            <div className='flex w-full px-4 h-[50px] border-b-2 border-spacing-2 bg-white'>
                                <div className="flex w-2/5 h-full items-center justify-between">
                                    <p className="">{transaction.buyer.studentName}</p>
                                    <p className="">{_formatDatetime(transaction.purchaseTime)}</p>
                                </div>
                            </div>
                        </li>
                    })
                }
            </ol>
        </details>
    )
}

function _isDateWithinNextMonth(date : Date): boolean {

    const lastMonthDate = new Date()
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  
    return date >= lastMonthDate;
  }

export default TeacherIncomes