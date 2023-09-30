import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from "react-redux"
import { removeItem } from "../slices/basketSlice"
import { RootState } from "../store"

function Basket() {
    const { basket } = useSelector((state: RootState) => state.basket)
    const dispatcher = useDispatch()
    return (
        <div className="bg-white flex flew-rox justify-center ">
            <div>
                <h1 className="font-semibold text-[32px]">รถเข็นสินค้า
                    <FontAwesomeIcon className='ml-4' icon={faCartShopping} />
                </h1>
                
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
                                <h1 className=" mr-2 font-semibold text-[#808080] text-[14px]">• {item.tag}</h1>
                            </div>
                        </div>
                        <div className=" mr-[25px] justify-self-end flex flex-col">
                            <h1 className="mb-[15px] font-bold text-[20px] grow ">{item.price} บาท</h1>
                            <button 
                                className=" bg-[#d9d9d9] font-bold py-[6px] text-[16px] "
                                onClick={() => {
                                dispatcher(removeItem(item.itemID))
                            }}>ลบออก</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-1 mx-[70px]" >
                <h1 className="border-1 font-bold text-[32px]">ทั้งหมด</h1>
                <h1 className="border-1 font-bold text-[40px]">{basket.items.reduce((acc, item) => acc + item.price, 0)} บาท</h1>
                <button className=" px-[55px] py-[15px] bg-[#d9d9d9] font-bold text-[20px]">ชำระเงิน</button>
            </div>
        </div>
    )
}

export default Basket