import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from "react-redux"
import { removeItem, addItem, setStatusFetchOnce, clearItem, setStatusIsLoading } from "../slices/basketSlice"
import { RootState } from "../store"
import { fetchBasketItems, deleteBasketItem, purchaseCourse } from '../features/stores/services/purchase'
import { useEffect, useState } from 'react'
import { BasketItem } from '../features/stores/types/basket'
import { useUser } from '../hooks/useUser'

function Basket() {
    //console.log("in basket")
    const { user } = useUser()
    const { basket } = useSelector((state: RootState) => state.basket)
    const isFetchOnce = useSelector((state: RootState) => state.basket.isFetchOnce)
    const dispatcher = useDispatch()
    const [basketItemsState, setBasketItems] = useState< {items : BasketItem[]} | null>(null)
    

    async function handleDeleteBusketItems(itemID: string) {
        dispatcher(removeItem(itemID))
        const isDelete = await deleteBasketItem(user.userID, itemID)
        console.log(isDelete)
    }
    

    const handlePayment = async () => {
        const transction = await purchaseCourse(user.userID, "1111111111111");
        if (transction) {
            alert("ชำระเงินสำเร็จ")
            dispatcher(clearItem())
        } else {
            alert("ชำระเงินไม่สำเร็จ")
        }

    }

    useEffect(() => {
        async function fetchBasket() {
            console.log(isFetchOnce)
            if (!isFetchOnce) {
                const BasketItems = await fetchBasketItems(user.userID)
                setBasketItems(BasketItems)
                dispatcher(setStatusFetchOnce(true))
                dispatcher(clearItem())
                BasketItems.items.map((item) => {
                    dispatcher(addItem(item))
                })
                setStatusIsLoading(true)
                
            }
        }
        fetchBasket()
        
        
    }, []);
    
    
    return (
        <div className="bg-white flex flew-rox justify-center ">
            <div className='pl-6'>
                <h1 className="font-semibold text-[32px] pl-6">รถเข็นสินค้า
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
                                <h1 className=" mr-2 font-semibold text-[#808080] text-[14px]">• {item.level}</h1>
                            </div>
                        </div>
                        <div className=" mr-[25px] items-end flex flex-col">
                            <h1 className="mb-[15px] font-bold text-[20px] grow ">{item.price} บาท</h1>
                            <button 
                                className=" bg-red-500 w-20 font-bold py-[6px] text-[16px] text-white hover:bg-red-600 hover:text-white"
                                onClick={() => {
                                    handleDeleteBusketItems(item.itemID)
                            }}>ลบออก</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-1 mx-[70px] pl-4" >
                <h1 className="border-1 font-bold text-[32px] py-2">ทั้งหมด</h1>
                <h1 className="border-1 font-bold text-[40px] pb-4">{basket.items.reduce((acc, item) => acc + item.price, 0)} บาท</h1>
                <button
                    onClick={handlePayment}
                    type='button' 
                    className=" px-[55px] py-[15px] bg-[#d9d9d9] font-bold text-[20px] bg-blue-400 text-gray-100 hover:bg-blue-300">
                    ชำระเงิน
                </button>
            </div>
        </div>
    )
}

export default Basket