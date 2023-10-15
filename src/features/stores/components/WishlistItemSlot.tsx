import { WishlistItem } from "../types/wishlist"
import { deleteWishlistItem } from "../features/stores/services/wishlist"

interface WishlistItemSlotProps {
    item: WishlistItem
}

function WishlistItemSlot({ item }: WishlistItemSlotProps) {
    return (
            <div className="border-b-2 h-[145px] ">
                <div className="m-1 flex flex-row justify-between   items-center " key={item.itemID}>
                    <img className="object-cover w-[144px] h-[90px] " src={item.thumbnailURL} />
                    <div className="ml-[10px] flex flex-col text-left">
                        <h1 className=" font-bold text-[14px]">{item.name}</h1>
                        <h1 className=" font-semibold text-[#808080] text-[10px]">{item.teacherName}</h1>
                        <h1 className=" font-bold text-[14px] ">{item.price} บาท</h1>   
                    </div>
                </div>
                <div className="mt-2 flex justify-end">
                    <button className="mx-1 px-3 py-1 rounded-lg bg-[#3a3a3a] hover:bg-[#909090] text-[14px] text-white font-semibold hover:shadow-lg">เพิ่มในตะกร้า</button>
                    <button className="mx-1 px-3 py-1 rounded-lg bg-[#eb9999] hover:bg-[#ff3232] text-[14px] text-white font-semibold hover:shadow-lg">ลบออก</button>
                </div>
            </div>
    )
}

export default WishlistItemSlot