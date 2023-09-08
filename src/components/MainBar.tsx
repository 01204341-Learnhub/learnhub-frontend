import { faBell, faBook, faBookmark, faCartShopping, faHeart, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import booklogo from '../assets/Images/bookLogo.png'
import namelogo from '../assets/Images/textNameLogo.png'
import mockprofile from '../assets/Images/regStudent.png'
import { useState } from 'react'

function MainBar() {

    const [isDropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
    }

    return (
        <nav style={{height: '10vh'}} className='fixed bg-white flex w-screen items-center py-5'>
            <div className='flex flex-row items-center justify-center w-1/12'>
                <img className=' w-2/5' src={booklogo} alt="booklogo" />
            </div>
            <div className='flex flex-row items-center w-2/12'>
                <img className='' src={namelogo} alt="namelogo" />
            </div>
            <div className='bg-gray-300 flex rounded-full w-2/4 py-2 px-2'>
                <FontAwesomeIcon icon={faMagnifyingGlass} color='black' size='xl' className='mr-4 ml-4' />
                <input
                    type="search"
                    className=" bg-transparent border-none outline-none w-full text-[18px] font-semibold "
                />
            </div>
            <div className='w-2/12 flex justify-evenly my-2'>
                <FontAwesomeIcon icon={faBook} size='xl' />
                <FontAwesomeIcon icon={faHeart} size='xl' color='red' />
                <FontAwesomeIcon icon={faCartShopping} size='xl' />
                <FontAwesomeIcon icon={faBell} size='xl' />
            </div>
            <button
                className="w-[50px] h-[50px] mr-3 justify-self-center"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
            >
                <img src={mockprofile} alt="profile" className=' h-full rounded-full' />
            </button>
            <div
            className={`${
                isDropdownOpen ? 'block' : 'hidden' }
                absolute top-[70px] right-[70px] mt-2 w-[320px] h-[550px] bg-white border border-gray-300 rounded-lg shadow divide-y divide-gray-100`}
                id="user-dropdown"
            >
                <div className="px-8 py-3">
                    <img src={mockprofile} alt="profile" className=' h-[50px] w-[50px] rounded-full' />
                    <span className="block text-[18px] font-bold text-black">Barameehee</span>
                    <span className="block text-[16px]  text-gray-500 truncate ">barabara@mikelab.com</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <a  className="block px-8 py-2 text-[18px] font-medium text-black hover:bg-gray-100">หน้าแรก</a>
                    </li>
                    <li>
                        <a  className="block px-8 py-2 text-[18px] font-medium text-black hover:bg-gray-100 ">การเรียนรู้ของฉัน
                            <FontAwesomeIcon icon={faBook} size='xl' color='#068FFF' className='mx-3'/>
                        </a>
                    </li>
                    <li>
                        <a  className="block px-8 py-2 text-[18px] font-medium text-black hover:bg-gray-100 ">หลักสูตรที่อยากได้
                            <FontAwesomeIcon icon={faBookmark} size='xl' color='#F1C93B' className='mx-3'/>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a  className=" block px-8 py-2 text-[18px] font-medium text-black hover:bg-gray-100">ตั้งค่าบัญชี</a>
                    </li>
                    <li>
                        <a  className=" block px-8 py-2 text-[18px] font-medium text-black hover:bg-gray-100">แก้ไขโปรไฟล์</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a  className=" block px-8 py-2 text-[18px] font-medium text-black hover:bg-gray-100">ประวัติการซื้อ</a>
                    </li>
                    <li>
                        <a  className=" block px-8 py-2 text-[18px] font-medium text-black hover:bg-gray-100">วิธีการชำระเงิน</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a  className=" absolute bottom-0 block w-full px-8 py-2 text-[18px] font-medium text-black hover:bg-gray-100">ออกจากระบบ
                            <FontAwesomeIcon icon={faRightFromBracket} size='xl' className='mx-3'/>
                        </a>
   
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainBar