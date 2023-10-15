import { faBook, faCartShopping, faChartColumn, faCirclePlay, faClipboardList, faFileArrowDown, faHeart, faInfinity, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { useUser } from "../../../hooks/useUser"
import { setStatusFetchOnce } from "../../../slices/basketSlice"
import { setWishStatusFetchOnce } from "../../../slices/wishlistSlice"
import { addBasketItem } from "../services/purchase"
import { addWishListItem } from "../services/wishlist"

interface CourseDetailedSummaryProps {
    costs: number;
    quantity: number;
    level: string;
    students: number;
    hours: number;
    examples: number;
    status: string;
    availablesource: number;
    courseID: string;
}

function CourseDetailedSummary(myCourseDetailedSummary: CourseDetailedSummaryProps) {

    const dispatcher = useDispatch()
    const { user } = useUser()
    async function handleAddBusketItems() {
        const basketItmeID = await addBasketItem(myCourseDetailedSummary.courseID, "course", user.userID)
        if (!basketItmeID) {
            Swal.fire({
                title: 'ไม่สามารถดำเนินการนี้ได้',
                text: 'คุณมีคอร์สนี้อยู่แล้ว หรือ คอร์สนี้อยู่ในรถเข็นอยู่แล้ว',
                icon: 'error'
            })

        } else {
            Swal.fire({
                title: 'เพิ่มไปยังรถเข็นแล้ว',
                icon: 'success',
                confirmButtonColor: 'green'

            })
            dispatcher(setStatusFetchOnce(false))
        }

    }
    async function handleAddWishlistItems() {
        const wishlistItmeID = await addWishListItem(myCourseDetailedSummary.courseID, "course", user.userID)
        if (!wishlistItmeID) {
            Swal.fire({
                title: 'ไม่สามารถดำเนินการนี้ได้',
                text: 'คุณมีคอร์สนี้อยู่แล้ว หรือ คอร์สนี้อยู่ในรายการที่อยากได้อยู่แล้ว',
                icon: 'error'
            })

        } else {
            Swal.fire({
                title: 'เพิ่มไปยังรายการที่อยากได้แล้ว',
                icon: 'success',
                confirmButtonColor: 'green'

            })
            dispatcher(setWishStatusFetchOnce(false))
        }

    }

    return (
        <>
            <div className="card flex w-[518px] h-[544px] bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[5px] cursor-pointer">
                <div className="flex justify-between content-center items-center mx-[10%] pt-[2%]">
                    <p className="font-bold	text-[32px]">
                        {myCourseDetailedSummary.costs} บาท
                    </p>
                    {
                        user.userType == "student" ? 
                        <button
                            onClick={() => {
                                handleAddWishlistItems()
                            }}
                            type="button"
                            className="flex justify-between items-center content-center  text-base h-[52px] bg-[#D9D9D9] rounded-2xl px-[5%] my-4">
                                <FontAwesomeIcon icon={faHeart} color="#FF2171" size="2xl" />
                                <p className="font-bold	pl-2">
                                    เพิ่มในการเรียนรู้ที่อยากได้
                                </p>
                        </button> : <></>
                    }
                </div>
                <div className="flex justify-center">
                    <div className="flex justify-between w-[412px] h-[72.339px] border-2 border-gray-300 rounded-xl mt-2">
                        <div className="flex justify-center w-[50%] items-center ">
                            <div>
                                <FontAwesomeIcon icon={faBook} color="#000000" size="2xl" />
                            </div>
                            <div className="ml-4">
                                <p>บทเรียนทั้งหมด</p>
                                <p className="font-bold">{myCourseDetailedSummary.quantity}</p>
                            </div>
                        </div>

                        <div className="h-full border border-gray-300"></div>

                        <div className="flex justify-center w-[50%] items-center">
                            <div className="flex w-8 justify-center">
                                <FontAwesomeIcon icon={faChartColumn} color="#000000" size="2xl" />
                            </div>
                            <div className="ml-4">
                                <p>ระดับความยาก</p>
                                <p className="font-bold">{myCourseDetailedSummary.level}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center content-center pt-[4%] px-[10%]">
                        <div className="flex w-8 justify-center">
                            <FontAwesomeIcon icon={faUserGroup} color="#000000" size="xl" />
                        </div>
                        <p className="ml-3">ผู้เรียน
                            <span className="font-bold ml-2">
                                {myCourseDetailedSummary.students}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center content-center pt-[4%] px-[10%]">
                        <div className="flex w-8 justify-center">
                            <FontAwesomeIcon icon={faCirclePlay} color="#000000" size="xl" />
                        </div>
                        <p className="ml-3">วิดีโอสอน
                            <span className="font-bold ml-2">
                                {myCourseDetailedSummary.availablesource} ชั่วโมง
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center content-center pt-[4%] px-[10%]">
                        <div className="flex w-8 justify-center">
                            <FontAwesomeIcon icon={faClipboardList} color="#000000" size="xl" />
                        </div>
                        <p className="ml-3">แบทฝึกหัด
                            <span className="font-bold ml-2">
                                {myCourseDetailedSummary.availablesource} แบบฝึกหัด
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center content-center pt-[4%] px-[10%]">
                        <div className="flex w-8 justify-center">
                            <FontAwesomeIcon icon={faInfinity} color="#000000" size="xl" />
                        </div>
                        <p className="ml-3">การเข้าถึง
                            <span className="font-bold ml-2">
                                {myCourseDetailedSummary.availablesource}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center content-center pt-[4%] px-[10%]">
                        <div className="flex w-8 justify-center">
                            <FontAwesomeIcon icon={faFileArrowDown} color="#000000" size="xl" />
                        </div>
                        <p className="ml-3">
                            แหล่งข้อมูลที่ดาวโหลดได้
                            <span className="font-bold ml-2">
                                {myCourseDetailedSummary.availablesource}
                            </span>
                        </p>
                    </div>
                </div>
                {user.userType == "student" ?
                    <div className="flex pt-[7%] px-[10%]">
                        <div className="pr-2">
                            {user.userType == "student" ?
                                <button className="bg-black shadow-xl hover:shadow-2xl cursor-pointer w-[165px] h-[65px] text-white font-bold text-xl border rounded-3xl ">
                                    ซื้อเลย
                                </button> : <></>}
                        </div>
                        <div className="px-2">
                            <button
                                onClick={() => {
                                    handleAddBusketItems()
                                }}
                                type="button"
                                className="flex justify-center items-center content-center bg-white shadow-xl hover:shadow-2xl cursor-pointer w-[165px] h-[65px] text-black font-bold text-xl border-2 border-gray-300 rounded-3xl ">
                                <FontAwesomeIcon icon={faCartShopping} color="#000000" size="xl" />
                                <p className="ml-3">
                                    ใส่รถเข็น
                                </p>
                            </button>
                        </div>
                    </div> : <></>}
            </div>
        </>
    )
}

export default CourseDetailedSummary