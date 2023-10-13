import { useState } from "react";
import { useTeachIncomes } from "../../features/teaches/hooks/useIncomes"



function TeacherIncomes(){
    const {incomes, isFetchingsIncomes} = useTeachIncomes()

    function _getTotalPrice(){
        let total_price = 0
        incomes.forEach(_income => total_price += _income.price)
        return total_price
    }

    if (isFetchingsIncomes) return <div>loading...</div>;

    return (
        <div className="flex-cols h-full px-8 py-1">
            <div className="flex items-center w-full h-[25%]
            px-20 my-6 bg-[#f0f0f0]">
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
                    {incomes.map((income, index) => {
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
            <div className="flex w-[12%] h-full text-3xl text-black bg-[#ade792] justify-center items-center">
                +{props.price}
            </div>
        </div>
    )
}


export default TeacherIncomes