

interface AnnouncementSlotProp {
    title: string;
    tpyeslot:string;
    time:string;
}



export default function AnnouncementSlot(prop:AnnouncementSlotProp) {
    return (
        <div className='flex justify-between mx-[5%] h-[75px]'>
        <div className="flex justify-center items-center">
            <div className="h-[75px] w-[75px]">icon{prop.tpyeslot}</div>
            <div>
                <h1>{prop.title}</h1>
                <div>{prop.time}</div>
            </div>
        </div>
        <input type="checkbox"></input>
    </div>
    )
}

