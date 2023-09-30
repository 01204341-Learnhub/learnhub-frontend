import { useDispatch, useSelector } from "react-redux"
import { removeItem } from "../slices/basketSlice"
import { RootState } from "../store"

function Basket() {
    const { basket } = useSelector((state: RootState) => state.basket)
    const dispatcher = useDispatch()
    return (
        <div className="bg-white flex">
            <div>
                <h1>รถเข็นสินค้า</h1>
                {basket.items.map((item) => (
                    <div key={item.itemID}>
                        <img src={item.thumbnailURL} />
                        <h1>{item.name}</h1>
                        <h1>{item.price}</h1>
                        <button onClick={() => {
                            dispatcher(removeItem(item.itemID))
                        }}>ลบออก</button>
                    </div>
                ))}
            </div>
            <div>
                <h1>ทั้งหมด</h1>
                <h1>{basket.items.reduce((acc, item) => acc + item.price, 0)}</h1>
                <button className="btn">ชำระเงิน</button>
            </div>
        </div>
    )
}

export default Basket