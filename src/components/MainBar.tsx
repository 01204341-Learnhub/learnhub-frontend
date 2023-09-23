import { faBell, faBook, faBookmark, faCartShopping, faHeart, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import booklogo from '../assets/Images/bookLogo.png'
import mockprofile from '../assets/Images/regStudent.png'
import namelogo from '../assets/Images/textNameLogo.png'

function MainBar() {



    const [openDropdown, setOpenDropdown] = useState(null)

    const toggleDropdown = (dropdownName) => {
        if (openDropdown === dropdownName) {
            // If the clicked dropdown is already open, close it
            setOpenDropdown(null)
        } else {
            // If a different dropdown is open, close it and open the clicked one
            setOpenDropdown(dropdownName)
        }
    }

    return (
        <nav style={{ height: '100px', zIndex: 1000 }} className='fixed bg-white flex w-screen items-center py-5'>
            <div className=' flex flex-row items-center justify-center w-1/12'>
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
                <Link to={"/learn/overview"}>
                    <FontAwesomeIcon icon={faBook} size='xl' />
                </Link>
                <button onClick={() => toggleDropdown('mypindropdown')}>
                    <FontAwesomeIcon icon={faHeart} size='xl' color={openDropdown === 'mypindropdown' ? '#FF2171' : 'none'} />

                    {/* Mypin dropdown menu */}
                    <div
                        style={{ display: openDropdown === 'mypindropdown' ? 'block' : 'none', top: '90%', right: '17%' }}
                        className=" absolute w-[320px] h-[550px] bg-white border border-gray-300 rounded-lg shadow divide-y divide-gray-100"
                    >
                        <div className="px-8 py-3">

                        </div>
                    </div>
                    {/* Mypin dropdown menu */}

                </button>
                <button onClick={() => toggleDropdown('mycartdropdown')}>
                    <FontAwesomeIcon icon={faCartShopping} size='xl' color={openDropdown === 'mycartdropdown' ? 'red' : 'none'} />

                    {/* Mycart dropdown menu */}
                    <div
                        style={{ display: openDropdown === 'mycartdropdown' ? 'block' : 'none', top: '90%', right: '13%' }}
                        className=" absolute w-[320px] h-[550px] bg-white border border-gray-300 rounded-lg shadow divide-y divide-gray-100"
                    >
                        <div className="px-8 py-3">

                        </div>
                    </div>
                    {/* Mycart dropdown menu */}

                </button>
                <button onClick={() => toggleDropdown('mynotidropdown')}>
                    <FontAwesomeIcon icon={faBell} size='xl' color={openDropdown === 'mynotidropdown' ? '#F1C93B' : 'none'} />

                    {/* MyNotification dropdown menu */}
                    <div
                        style={{ display: openDropdown === 'mynotidropdown' ? 'block' : 'none', top: '90%', right: '9%' }}
                        className=" absolute w-[320px] h-[550px] bg-white border border-gray-300 rounded-lg shadow divide-y divide-gray-100"
                    >
                        <div className="px-8 py-3">

                        </div>
                    </div>
                    {/* MyNotification dropdown menu */}

                </button>
            </div>
            <button
                className="w-[50px] h-[50px] mr-3 justify-self-center"
                onClick={() => toggleDropdown('userdropdown')}
            >
                <img src={mockprofile} alt="profile" className=' h-full rounded-full' />

                {/* User dropdown menu */}
                <div
                    style={{ display: openDropdown === 'userdropdown' ? 'block' : 'none', top: '90%', right: '5%' }}
                    className=" absolute w-[320px] h-[550px] bg-white border border-gray-300 rounded-lg shadow divide-y divide-gray-100"
                >
                    <div className="px-8 py-3">
                        <img src={mockprofile} alt="profile" className=' h-[50px] w-[50px] rounded-full' />
                        <span className="block text-[18px] font-bold text-black text-left">Barameehee</span>
                        <span className="block text-[16px]  text-gray-500 truncate text-left ">barabara@mikelab.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a className="block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">หน้าแรก</a>
                        </li>
                        <li>
                            <Link to={"/learn/overview"} className="block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100 ">การเรียนรู้ของฉัน
                                <FontAwesomeIcon icon={faBook} size='xl' color='#068FFF' className='mx-3' />
                            </Link>
                        </li>
                        <li>
                            <a className="block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100 ">หลักสูตรที่อยากได้
                                <FontAwesomeIcon icon={faBookmark} size='xl' color='#F1C93B' className='mx-3' />
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a className=" block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">ตั้งค่าบัญชี</a>
                        </li>
                        <li>
                            <a className=" block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">แก้ไขโปรไฟล์</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a className=" block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">ประวัติการซื้อ</a>
                        </li>
                        <li>
                            <a className=" block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">วิธีการชำระเงิน</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a className=" absolute bottom-0 block w-full px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">ออกจากระบบ
                                <FontAwesomeIcon icon={faRightFromBracket} size='xl' className='mx-3' />
                            </a>

                        </li>
                    </ul>
                </div>
                {/* User dropdown menu */}
            </button>
        </nav>
    )
}

export default MainBar