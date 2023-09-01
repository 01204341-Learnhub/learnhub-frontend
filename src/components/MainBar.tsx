import { faBell, faBook, faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/Images/textNameLogo.png'

function MainBar() {
    return (
        <div className='flex w-screen justify-between py-5'>
            <div>
                <img src={logo} alt="logo" />
            </div>
            <div className='bg-gray-300 rounded-xl w-2/4 py-2 px-2'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div className='flex w-1/12 justify-evenly'>
                <FontAwesomeIcon icon={faBook} size='xl' />
                <FontAwesomeIcon icon={faHeart} size='xl' color='red' />
                <FontAwesomeIcon icon={faCartShopping} size='xl' />
                <FontAwesomeIcon icon={faBell} size='xl' />
            </div>
            <div className='bg-black rounded-full w-10 h-10 mr-3' />
        </div>
    )
}

export default MainBar