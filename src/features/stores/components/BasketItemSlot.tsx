import { BasketItem } from "../types/basket"

interface BasketItemSlotProps {
    item: BasketItem
}

function BasketItemSlot({ item }: BasketItemSlotProps) {
    return (
        <div>
            <div className=" bg-white">
                <div className="w-20 h-20">
                    <img src={item.thumbnailURL} />
                    <div>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default BasketItemSlot