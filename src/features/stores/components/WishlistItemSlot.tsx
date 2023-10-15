import { WishlistItem } from "../types/wishlist"
import { Link } from 'react-router-dom'

interface WishlistItemSlotProps {
    item: WishlistItem
}

function WishlistItemSlot({ item }: WishlistItemSlotProps) {
    return (
            <div className="flex flex-row border-1 h-[145px] items-center shadow-sm " key={item.itemID}>
                <img className="object-cover w-[144px] h-[90px] " src={item.thumbnailURL} />
                <div className="ml-[10px] flex flex-col text-left">
                    <h1 className=" font-bold text-[14px]">{item.name}</h1>
                    <h1 className=" font-semibold text-[#808080] text-[10px]">{item.teacherName}</h1>
                    <h1 className=" font-bold text-[14px] ">{item.price} บาท</h1>   
                </div>
                <div>
                    <button className="btn">เพิ่มไปยังตะกร้า</button>
                    <button className="btn">ลบออกจากรายการ</button>
                </div>
            </div>
    )
}

export default WishlistItemSlot