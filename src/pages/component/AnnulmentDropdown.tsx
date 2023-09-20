import { useState } from 'react';


interface AnnulmentDropdownProp {
    title: string;
    works: Array<any>
}

export default function AnnulmentDropdown(props:AnnulmentDropdownProp) {
    const [show,setShow] = useState(false)
    return (
        <>
        <div className='mx-[10%]'>
            <div className="flex bg-red-500 justify-between">
                <div className='text-xl'>{props.title}</div>
                <button onClick={()=>setShow(!show)}>show</button>
            </div>
            {show && props.works.map((item)=>(
            <li key={item.id} className='flex justify-between mx-[5%]'>
                <h1>{item.name}</h1>
                <input type="checkbox"></input>
            </li>    
            ))
                
            }
        </div>
        </>
    )
}

