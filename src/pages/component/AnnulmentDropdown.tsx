import { useState } from 'react';


interface AnnulmentDropdownProp {
    title: string;
    works: Array<any>
}

export default function AnnulmentDropdown(props:AnnulmentDropdownProp) {
    const [show,setShow] = useState(false)
    return (
        <>
        <div>
            <div className="flex bg-red-500 justify-between">
                <div>{props.title}</div>
                <button onClick={()=>setShow(!show)}>show</button>
            </div>
            {show && props.works.map((item)=>(
            <li key={item.id}>
                <h1>{item.name}</h1>
            </li>    
            ))
                
            }
        </div>
        </>
    )
}

