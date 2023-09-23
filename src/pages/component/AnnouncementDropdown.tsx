import { useState } from 'react';
import AnnouncementSlot from './AnnouncementSlot'

interface AnnouncementDropdownProp {
    title: string;
    works: Array<any>
    Studied:string
    TotalTime:string
}

export default function AnnulmentDropdown(props:AnnouncementDropdownProp) {
    const [show,setShow] = useState(false)
    return (
        <>
        <div className='mx-[10%]'>
            <div className="flex bg-[#ECF3F9] justify-between"  onClick={()=>setShow(!show)}>
                <div className='text-xl m-5'>
                    <div>{props.title}</div>
                    <div className='flex mt-2'>
                        <div className='mx-5 text-sm'>{props.Studied}</div>
                        <div className='mx-5 text-sm'>{props.TotalTime}</div>
                    </div>
                </div>
                <button onClick={()=>setShow(!show)}>show</button>
            </div>
            <hr/>
            {show && props.works.map((item)=>(
                <div key={item.id}>
                    <AnnouncementSlot title={item.name} tpyeslot={item.tpyeslot} time={item.time}></AnnouncementSlot>
                    <hr/>
                </div>
            ))
                
            }
        </div>
        </>
    )
}

