import { useState } from 'react';
import { faCaretDown, faCaretUp ,faCirclePlay,faFileLines} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface ChapterDropdownProp {
    chapterNum: number;
    name: string;
    courseID: string;
    chapterLength: number;
    lessoncompleted: number;
    lessonCount: number;
    lessons:Array<LessonSlotProp>;
}

export default function ChapterDropdown(props:ChapterDropdownProp) {
    const [show,setShow] = useState(false)
    
    return (
        <>
        <div className='mx-[10%]'>
            <div className="flex bg-[#ECF3F9] justify-between"  onClick={()=>setShow(!show)}>
                <div className='text-xl m-5'>
                    <div>{props.name}</div>
                    <div className='flex mt-2'>
                        <div className='mx-5 text-sm'>{props.lessoncompleted}/{props.lessonCount}</div>
                        <div className='mx-5 text-sm'>{props.chapterLength/3600 >= 1? props.chapterLength/3600+"ชั่วโมง"+ ((props.chapterLength%3600>0)? props.chapterLength%3600+"นาที":"") :props.chapterLength/60+"นาที"}</div>
                    </div>
                </div>
                <button onClick={()=>setShow(!show)} className='mx-5'>
                    {show?
                        <FontAwesomeIcon icon={faCaretUp} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                        :<FontAwesomeIcon icon={faCaretDown} size='2xl' className=" opacity-50"></FontAwesomeIcon>
                    }
                </button>
            </div>
            <hr/>
            {show && props.lessons.map((item)=>(
                <div key={item.lessonID}>
                    <LessonSlot name={item.name} lessonType={item.lessonType} lessonID={item.lessonID} chapterID={item.chapterID} finished={item.finished} ></LessonSlot>
                    <hr/>
                </div>
            ))
            }
        </div>
        </>
    )
}


interface LessonSlotProp {
    name: string;
    lessonType:string;
    lessonID: string;
    chapterID: string;
    finished: boolean;
}



function LessonSlot(prop:LessonSlotProp) {
    return (
        <div className='flex justify-between  h-[75px]'>
        <div className="flex justify-center items-center">
            <div className="flex h-[75px] w-[75px] bg-[#D9D9D9] justify-center items-center">{prop.lessonType=="video"?<FontAwesomeIcon icon={faCirclePlay} size='2xl' className=" opacity-50"></FontAwesomeIcon>
            :prop.lessonType=="pdf"?<FontAwesomeIcon icon={faFileLines} size='2xl' className=" opacity-50"></FontAwesomeIcon>
            :<></>}
            </div>
            <div className='mx-5'>
                <h1>{prop.name}</h1>
            </div>
        </div>
        <input type="checkbox" className='mx-5' checked={prop.finished}></input>
    </div>
    )
}

