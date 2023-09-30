import { BasketItem } from "../types/basket"

interface BasketItemSlotProps {
    item: BasketItem
}

function BasketItemSlot({ item }: BasketItemSlotProps) {
    return (
        // <div>
        //     <div className=" bg-white">
        //         <div className="w-20 h-20">
        //             <img src={item.thumbnailURL} />
        //             <div>
        //                 <p>{item.name}</p>
        //                 <p>{item.price}</p>
        //             </div>
        //         </div>
        //     </div>
        //     <hr />
        // </div>
        <div className="flex flex-row border-1 h-[145px] items-center shadow-sm " key={item.itemID}>
            <img className="object-cover w-[144px] h-[90px] " src={item.thumbnailURL} />
            <div className="ml-[10px] flex flex-col text-left">
                <h1 className=" font-bold text-[14px]">{item.name}</h1>
                <h1 className=" font-semibold text-[#808080] text-[10px]">{item.teacherName}</h1>
                <h1 className=" font-bold text-[14px] ">{item.price} บาท</h1>   
            </div>
        </div>
    )
}

export default BasketItemSlot