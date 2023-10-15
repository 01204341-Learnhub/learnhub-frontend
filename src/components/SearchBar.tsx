import { faBell, faBook, faBookmark, faCartShopping, faHeart, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import booklogo from '../assets/images/bookLogo.png'
import namelogo from '../assets/images/textNameLogo.png'
import BasketItemSlot from '../features/stores/components/BasketItemSlot'
import { fetchBasketItems } from '../features/stores/services/purchase'
import { useUser } from '../hooks/useUser'
import { signOut } from '../services/auth/signOut'
import { addItem, clearItem, setStatusFetchOnce } from '../slices/basketSlice'
import { clearUser } from '../slices/userSlice'
import { RootState } from '../store'
function Searchbar(){
    return(
<div className='bg-gray-300 flex rounded-full w-2/4 py-2 px-2'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} color='black' size='xl' className='mr-4 ml-4' />
                    <input
                        type="search"
                        className=" bg-transparent border-none outline-none w-full text-[18px] font-semibold "
                    />
                </div>
)
}

export default Searchbar