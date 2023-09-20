
import { useState } from 'react';

export default function AnnulmentDropdown() {
    const works = [{id:1,name:"ก้อง"},{id:2,name:"โจโจ้"},{id:3,name:"โดโด้"}]
    const title = "บูมคนหล่อ"
    const [show,setShow] = useState(false)
    return (
        <>
        <div>
            <div className="flex bg-red-500 justify-between">
                <div>{title}</div>
                <button onClick={()=>setShow(!show)}>show</button>
            </div>
            {show && works.map((item)=>(
            <li key={item.id}>
                <h1>{item.name}</h1>
            </li>    
            ))
                
            }
        </div>
        </>
    )
}

