import { faBell, faBook, faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import booklogo from '../assets/Images/bookLogo.png'
import namelogo from '../assets/Images/textNameLogo.png'

function MainBar() {
    return (
        <div style={{height: '10vh'}} className='fixed bg-white flex w-screen items-center py-5'>
            <div className='flex flex-row items-center justify-center w-1/12'>
                <img className=' w-2/5' src={booklogo} alt="booklogo" />
            </div>
            <div className='flex flex-row items-center w-2/12'>
                <img className='' src={namelogo} alt="namelogo" />
            </div>
            <div className='bg-gray-300 rounded-xl w-2/4 py-2 px-2'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className='w-2/12 flex justify-evenly my-2'>
                <FontAwesomeIcon icon={faBook} size='xl' />
                <FontAwesomeIcon icon={faHeart} size='xl' color='red' />
                <FontAwesomeIcon icon={faCartShopping} size='xl' />
                <FontAwesomeIcon icon={faBell} size='xl' />
            </div>
            <div className='bg-black rounded-full w-1/12 h-10 mr-3' />
        </div>
    )
}

export default MainBar