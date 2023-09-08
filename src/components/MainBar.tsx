import { faBell, faBook, faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import booklogo from '../assets/Images/bookLogo.png'
import namelogo from '../assets/Images/textNameLogo.png'
import mockprofile from '../assets/Images/regStudent.png'

function MainBar() {
    return (
        <div style={{height: '10vh'}} className='fixed bg-white flex w-screen items-center py-5'>
            <div className='flex flex-row items-center justify-center w-1/12'>
                <img className=' w-2/5' src={booklogo} alt="booklogo" />
            </div>
            <div className='flex flex-row items-center w-2/12'>
                <img className='' src={namelogo} alt="namelogo" />
            </div>
            <div className='bg-gray-300 flex rounded-xl w-2/4 py-2 px-2'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-3 ml-2' />
                <input
                    type="search"
                    className=" bg-transparent border-none outline-none w-full text-[16px] font-semibold "
                />
            </div>
            <div className='w-2/12 flex justify-evenly my-2'>
                <FontAwesomeIcon icon={faBook} size='xl' />
                <FontAwesomeIcon icon={faHeart} size='xl' color='red' />
                <FontAwesomeIcon icon={faCartShopping} size='xl' />
                <FontAwesomeIcon icon={faBell} size='xl' />
            </div>
            <div className='  w-[55px] h-[55px] mr-3 justify-self-center' >
                <img src={mockprofile} alt="profile" className=' h-full rounded-full' />
            </div>
        </div>
    )
}

export default MainBar