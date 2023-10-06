import { faBell, faBook, faBookmark, faCartShopping, faHeart, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import booklogo from '../assets/Images/bookLogo.png'
import namelogo from '../assets/Images/textNameLogo.png'
import BasketItemSlot from '../features/stores/components/BasketItemSlot'
import { fetchBasketItems } from '../features/stores/services/purchase'
import { useUser } from '../hooks/useUser'
import { signOut } from '../services/auth/signOut'
import { addItem, clearItem, setStatusFetchOnce } from '../slices/basketSlice'
import { RootState } from '../store'

function MainBar() {
    const { basket } = useSelector((state: RootState) => state.basket)
    const { user } = useUser()
    const isFetchOnce = useSelector((state: RootState) => state.basket.isFetchOnce)
    const dispatcher = useDispatch()

    const [openDropdown, setOpenDropdown] = useState(null)
    const basketItems = useSelector((state: RootState) => state.basket.basket.items)
    const navigate = useNavigate()
    const toggleDropdown = (dropdownName) => {
        if (openDropdown === dropdownName) {
            // If the clicked dropdown is already open, close it
            setOpenDropdown(null)
        } else {
            // If a different dropdown is open, close it and open the clicked one
            setOpenDropdown(dropdownName)
        }
    }

    const handleClickBasket = () => {
        async function fetchBasket() {
            console.log(isFetchOnce)
            if (!isFetchOnce) {
                const BasketItems = await fetchBasketItems(user.userID)

                dispatcher(setStatusFetchOnce(true))
                dispatcher(clearItem())
                BasketItems.items.map((item) => {
                    dispatcher(addItem(item))
                })
            }
        }
        fetchBasket()
        toggleDropdown('mycartdropdown')
    }

    return (
        <nav style={{ height: '100px', zIndex: 1000 }} className='fixed bg-white flex w-screen items-center py-5'>
            <div className=' flex flex-row items-center justify-center w-1/12'>
                <img className=' w-2/5' src={booklogo} alt="booklogo" />
            </div>
            <div className='flex flex-row items-center w-2/12' onClick={() => { navigate("/home") }}>
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
                <button onClick={handleClickBasket}>
                    <FontAwesomeIcon icon={faCartShopping} size='xl' color={openDropdown === 'mycartdropdown' ? 'red' : 'none'} />

                    {/* Mycart dropdown menu */}
                    <div className='flex flex-col  absolute w-[320px] bg-white border border-gray-300 rounded-lg shadow divide-y divide-gray-100'
                        style={{ display: openDropdown === 'mycartdropdown' ? 'block' : 'none', top: '90%', right: '13%' }}
                    >
                        <div
                            className='overflow-y-auto max-h-[450px] min-h-0'
                            style={{ display: openDropdown === 'mycartdropdown' ? 'block' : 'none', top: '90%', right: '13%' }}

                        >
                            <div className="px-8 py-3">
                                {basketItems.map((item) => (
                                    <div key={item.itemID}>
                                        <BasketItemSlot item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <h1 className=' font-bold text-[20px]'>{basketItems.reduce((acc, item) => acc + item.price, 0)} บาท</h1>
                        <div className='bg-[#d9d9d9] px-[40px] py-3 m-2'>
                            <Link to={{ pathname: "/baskets" }} className=' font-semibold text-[20px]'>ไปยังรถเข็น</Link>
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
            {
                (() => {
                    if (user) {
                        return (
                            <button
                                className="w-[50px] h-[50px] mr-3 justify-self-center"
                                onClick={() => toggleDropdown('userdropdown')}
                            >
                                <img src={user.profilePicture} alt="profile" className=' h-full rounded-full' />

                                {/* User dropdown menu */}
                                <div
                                    style={{ display: openDropdown === 'userdropdown' ? 'block' : 'none', top: '90%', right: '5%' }}
                                    className=" absolute w-[320px] h-[550px] bg-white border border-gray-300 rounded-lg shadow divide-y divide-gray-100"
                                >
                                    <div className="px-8 py-3">
                                        <img src={user.profilePicture} alt="profile" className=' h-[50px] w-[50px] rounded-full' />
                                        <span className="block text-[18px] font-bold text-black text-left">{user.username}</span>
                                        <span className="block text-[16px]  text-gray-500 truncate text-left ">{user.email}</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <a className="block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">หน้าแรก</a>
                                        </li>
                                        {user.userType === 'student' ?
                                            <li>
                                                <Link to={"/learn/overview"} className="block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100 ">การเรียนรู้ของฉัน
                                                    <FontAwesomeIcon icon={faBook} size='xl' color='#068FFF' className='mx-3' />
                                                </Link>
                                            </li> : <></>
                                        }
                                        {user.userType === 'student' ?
                                            <li>
                                                <a className="block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100 ">หลักสูตรที่อยากได้
                                                    <FontAwesomeIcon icon={faBookmark} size='xl' color='#F1C93B' className='mx-3' />
                                                </a>
                                            </li> : <></>
                                        }
                                    </ul>
                                    <ul>
                                        <li>
                                            <a className=" block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">ตั้งค่าบัญชี</a>
                                        </li>
                                        <li>
                                            <Link to={{ pathname: "/profile" }} className=" block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">แก้ไขโปรไฟล์</Link>
                                        </li>
                                    </ul>
                                    <ul>
                                        {user.userType === 'student' ?
                                            <li>
                                                <a className=" block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">ประวัติการซื้อ</a>
                                            </li> : <></>
                                        }
                                        <li>
                                            <a className=" block px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100">วิธีการชำระเงิน</a>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <a className=" absolute bottom-0 block w-full px-8 py-2 text-[18px] font-medium text-black text-left hover:bg-gray-100"
                                                onClick={() => { signOut().then(() => navigate('/', { replace: true })) }}>ออกจากระบบ
                                                <FontAwesomeIcon icon={faRightFromBracket} size='xl' className='mx-3' />
                                            </a>

                                        </li>
                                    </ul>
                                </div>
                                {/* User dropdown menu */}
                            </button>
                        )
                    }
                    else {
                        return (
                            <>
                                <div className='flex w-80'>
                                    <div className='px-2'>
                                        <button className='btn' onClick={() => { navigate("/register", { replace: true }) }}>สร้างบัญชี</button>
                                    </div>
                                    <div className='px-2'>
                                        <button className='btn' onClick={() => { navigate("/login", { replace: true }) }}>เข้าสู่ระบบ</button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                })()
            }
        </nav>
    )
}

export default MainBar