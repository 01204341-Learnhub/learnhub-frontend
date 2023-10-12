import { useDispatch} from "react-redux"
import { clearItem, } from "../slices/basketSlice"
import { purchaseCourse } from '../features/stores/services/purchase'
import { useUser } from '../hooks/useUser'
import Swal from 'sweetalert2'
import { useBasket } from '../features/stores/hooks/useBasket'
import { useNavigate } from "react-router-dom"

function BasketPayment() {
    const { user } = useUser()
    const basket = useBasket()
    const dispatcher = useDispatch()
    const sumPriceDiv=document.getElementById("sumPriceDiv")
    const navigate = useNavigate()

    const handlePayment = async () => {
        const transction = await purchaseCourse(user.userID, "1111111111111");
        if (transction) {
            Swal.fire({
                title: "ชำระเงินสำเร็จ",
                text: "",
                icon: "success",
                confirmButtonColor: "green"
            })
            dispatcher(clearItem())
        } else {
            Swal.fire({
                title: 'error',
                icon: 'error'
            })
        }

        
        { navigate({ pathname: '/learn/courses' }, { replace: true }) }
    }

    let sum=0;
    for (let i=0; i<basket.items.length; i++) {
        sum += basket.items[i].price
    }

    if (sumPriceDiv) {
        sumPriceDiv.innerText = `${sum.toString()} บาท`
    }

   
    return (
        <div className=" flex flex-row bg-[#e0dfdf80]">
            <div className=" flex flex-col w-[60%] mt-[3%] mb-[3%] bg-[#FFFFFF] shadow-lg">
                <div className=" ml-[5%] mr-[10%] ">
                    <div className=" font-extrabold text-4xl mt-[5%]">
                        ชำระเงิน
                    </div>
                    <div className=" font-extrabold text-3xl mt-[5%]">
                        วิธีการชำระเงิน
                    </div>
                
                    <div className=" flex flex-row space-x-10 mt-[3%] items-center bg-[#c8c7c780] p-4">
                        <input id="debit-checkbox" type="radio" name="group1" className="w-8 h-8" />
                        <label className="ml-2 text-xl font-semibold text-gray-900 dark:text-gray-300">บัตรเครดิต/เดบิต</label>
                    </div>

                    <div className=" flex flex-col bg-white border border-gray-300">
                        <div className=" ml-[5%]">
                            <p className=" mt-[2%] mb-[1%] font-bold text-lg">ชื่อบนบัตร</p>
                            <input type="text" placeholder="ชื่อบนบัตร" className="w-[60%] p-2 border border-gray-300 mb-[2%]"/>

                            <p className=" mt-[1%] mb-[1%] font-bold text-lg">หมายเลขบัตร</p>
                            <input type="text" placeholder="หมายเลขบัตร" className="w-[60%] p-2 border border-gray-300 mb-[2%]"/>

                            <div className=" flex flex-row space-x-[10%] w-[60%] mb-[2%]">
                                <div className=" flex flex-col">
                                    <p className=" mt-[1%] mb-[1%] font-bold text-lg">วันหมดอายุ</p>
                                    <input type="text" placeholder="วันหมดอายุ" className=" p-2 border border-gray-300"/>
                                </div>
                                <div className=" flex flex-col">
                                    <p className=" mt-[1%] mb-[1%] font-bold text-lg">CVC/CVV</p>
                                    <input type="text" placeholder="CVC/CVV" className=" p-2 border border-gray-300 mb-[5%]"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" flex flex-row space-x-10 mt-[4%] items-center bg-[#c8c7c780] p-4">                            
                        <input id="debit-checkbox" type="radio" name="group1" className="w-8 h-8 p" />
                        <label className="ml-2 text-xl font-semibold text-gray-900 dark:text-gray-300">PayPal</label>
                    </div>
                    

                    <div className=" font-extrabold text-3xl mt-[6%]">
                        รายละเอียดคำสั่งซื้อ
                    </div>
                    <div className="">
                        {basket.items.map((item) => (
                            <div className="flex flex-row border-1 w-[650px] h-[145px] items-center shadow-sm " key={item.itemID}>
                                <img className="mx-[30px] object-cover w-[144px] h-[90px] " src={item.thumbnailURL} />
                                <div className="flex flex-col grow">
                                    <h1 className=" font-semibold text-[16px]">{item.name}</h1>
                                    <h1 className=" font-semibold text-[#404040] text-[14px]">{item.teacherName}</h1>
                                    <div className="flex">
                                        <h1 className=" font-semibold text-[#404040] text-[14px]">{item.rating}</h1>
                                        <h1 className=" font-semibold text-[#808080] text-[14px]">({item.voter} votes)</h1>
                                    </div>
                                    <div className="flex">
                                        <h1 className=" mr-2 font-semibold text-[#808080] text-[14px]">• วิดิโอสอน {item.totalTime} ชั่วโมง</h1>
                                        <h1 className=" mr-2 font-semibold text-[#808080] text-[14px]">• {item.level}</h1>
                                    </div>
                                </div>
                                <div className=" mr-[25px] items-end flex flex-col">
                                    <h1 className="mb-[15px] font-bold text-[20px] grow ">{item.price} บาท</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className=" border-[#C0C0C0] mt-[4%] mb-[5%] ml-[5%] mr-[10%]" />
            </div>
            
            <div className=" flex flex-col w-[40%] ml-[5%] mt-[4%]">
                <div className="font-extrabold text-4xl mt-[3%] ml-[5%]">
                    สรุป
                </div>
                
                <div className=" flex flex-row mt-[5%] space-x-[10%] ml-[5%]">
                    <p className="font-extrabold text-3xl">
                        ราคารวมทั้งสิ้น
                    </p>
                    <div id="sumPriceDiv" className="font-medium text-3xl">

                    </div>
                </div>

                <hr className=" border-[#C0C0C0] mt-[4%] mb-[3%] w-[70%]" />
                
                <button
                        onClick={handlePayment}
                        type='button'
                        className=" w-[50%] h-[5%] ml-[10%] p-2 font-bold text-[20px] mt-[4%] bg-[#D9D9D9] text-black hover:bg-blue-300">
                        ชำระเงินให้เสร็จสิ้น
                </button>
            </div>
        </div>
    )
}

export default BasketPayment