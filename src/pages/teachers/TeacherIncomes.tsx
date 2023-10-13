


function TeacherIncomes(){

    return (
        <div className="flex-cols h-full px-8 py-1">
            <div className="flex items-center w-full h-[30%]
            px-20 my-6 bg-[#f0f0f0]">
                <div className="flex flex-rows items-end">
                    <div className="text-2xl text-black">
                        ยอดเงินรวมที่ได้รับ
                    </div>
                    <div className="w-20 "></div>
                    <div className="text-6xl font-bold text-black">
                        5000
                    </div>
                    <div className="w-5 "></div>
                    <div className="text-3xl font-bold text-black">
                        บาท
                    </div>
                </div>

            </div>
            <div className="w-full h-full">
                <_TransactionBox/>
            </div>
        </div>
    )

}

function _TransactionBox() {
    return (
        <div className="flex w-full h-[70px] shadow-xl bg-white items-center">
            <div className="w-[8%] h-full bg-green-500">
                <img
                    src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"
                    alt="programCover"
                    className="w-full h-full object-cover"
                >
                </img>
            </div>
            <div className="w-[5%]"></div>
            <div className="flex w-[25%] h-full text-xl text-black items-center">
                course_name
            </div>
            <div className="flex w-[25%] h-full text-xl text-black items-center">
                ถูกซื้อโดย
            </div>
            <div className="flex w-[25%] h-full text-xl text-black items-center">
                student_name
            </div>
            <div className="flex w-[12%] h-full text-3xl text-black bg-[#ade792] justify-center items-center">
                +price
            </div>

        </div>
    )
}


export default TeacherIncomes