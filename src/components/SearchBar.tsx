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
import { useAllClasses } from "../features/stores/hooks/useAllClasses";
import { useAllCourses } from "../features/stores/hooks/useAllCourses";
import { Course } from '../features/stores/types/course'


function Searchbar(){
    const { courses, isFetching: isFetchingCourses } = useAllCourses()
    const { classes, isFetching: isFetchingClasses } = useAllClasses()
    const [input, setInput] = useState("")
    const [isOpen, setISOpen] = useState(false);
    const [results,setResults] = useState([]);
    const [results2,setResults2] = useState([]);
    const fetchData = (value) => {
        const results = courses.filter((w) => {return value && w && w.name && w.name.toLocaleLowerCase().includes(value)})
        setResults2(results)
    }
    const fetchData2 = (value) => {
        const results = classes.filter((w) => {return value && w && w.name && w.name.toLocaleLowerCase().includes(value)})
        setResults(results)
    }
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
        fetchData2(value)
    }
    

    return(
<div className='w-2/4 '>
<div className='bg-gray-300 flex rounded-full w-full py-2 px-2 '>
                    <FontAwesomeIcon icon={faMagnifyingGlass} color='black' size='xl' className='mr-4 ml-4' />
                    { isOpen && <button className='bg-white  w-2/12 text-xl h-15' onClick={() => setISOpen(!isOpen)}>classes</button>}
                    { !isOpen && <button className='bg-white  w-2/12 text-xl h-15' onClick={() => setISOpen(!isOpen)}>courses</button>}
                    <input
                        type="search"
                        className=" bg-transparent border-none outline-none w-full text-[18px] font-semibold mx-5"
                        value={input}
                        onChange={(e)=>handleChange(e.target.value)}
                    />
                    { isOpen && <div>
                        </div>}
                    { !isOpen && <div>
                        </div>}   
                </div>
                { !isOpen &&results2.map((result,index) => {
                    return(
                        <div key={index} className=''>
                            <Link to={`/detail/course/${result.courseID}`}className="bg-white flex border-4"  onClick={()=>setResults2([])}>
                            <img className='justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-16 h-16 m-2 rounded-full' src={result.thumbnailUrl}></img>
                            <div>
                            <p>{result.name}</p>
                            <p>course</p>
                            </div>
                            </Link>
                        </div>
                    )
                })}
                { isOpen &&results.map((result,index) => {
                    return(
                        <div key={index} className=''>
                            <Link to={`/detail/class/${result.classID}`}className="bg-white flex border-4"  onClick={()=>setResults([])}>
                            <img className='justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-16 h-16 m-2 rounded-full' src={result.thumbnailUrl}></img>
                            <div>
                            <p>{result.name}</p>
                            <p>class</p>
                            </div>
                            </Link>
                        </div>
                    )
                })}
                </div>

)
    
}

export default Searchbar