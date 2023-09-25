import { useState } from "react";
import { quizData } from "../components/quizData";

const QuestionData= [
    {
    question:"วิธีใดที่บูมใช้ในการเดินทางไปรถไฟ วิธีใดที่บูมใช้ในการเดินทางไปรถไฟ วิธีใดที่บูมใช้ในการเดินทางไปรถไฟ",
    option:{a:"1",b:"2",c:"3",d:"4"}
    },
    {
    question:"วิธีใดที่บูมใช้ในการเดินทางไปรถไฟ วิธีใดที่บูมใช้ในการเดินทางไปรถไฟ วิธีใดที่บูมใช้ในการเดินทางไปรถไฟ",
    option:{a:"1",b:"2",c:"3",d:"4",e:'5'}

    },
    {
    question:"วิธีใดที่บูมใช้ในการเดินทางไปรถไฟ วิธีใดที่บูมใช้ในการเดินทางไปรถไฟ วิธีใดที่บูมใช้ในการเดินทางไปรถไฟ",
    option:{a:"1",b:"2",c:"3",d:"4"}

    },
]
export default function Quiz() {
    const [begint,setbegint] = useState(true)
    return (
    <>
        {begint?
            <div>
                <Describe name={"แบบทดสอบที่ 1"} describe={"(คำอธิบาย) Lorem ipsum dolor sit amet consectetur. Nam turpis vivamus iaculis commodo magna leo. Etiam nisl tortor pretium in tincidunt cras eget. Massa cursus ornare iaculis velit donec interdum tortor donec. Rhoncus accumsan velit nunc tempus pellentesque facilisis suspendisse iaculis elit. Facilisi ornare nibh fringilla phasellus suspendisse placerat tristique velit. Imperdiet sed semper lorem leo enim. Neque nibh ac tristique ipsum egestas id venenatis amet. Feugiat varius turpis lorem augue lacus consectetur tortor porttitor. Aliquet libero varius id nisi sit lacinia dolor consectetur. Quis netus pretium et eget enim dolor. Ultrices sit sodales ornare gravida augue pellentesque vitae nulla. Ac integer sed at integer."} index={0}></Describe>
                <button onClick={()=>setbegint(false)} className="my-5 mx-10 p-3 bg-black text-white rounded-xl">เริ่มทำแบบฝึกหัด</button>
            </div>
            :
            <div>
                <QuizExam Questions={"s"} Check={false} Clause={1}></QuizExam>
            </div>
        }
    </>
    )
}

interface DescribeSlotProp {
    index:number
    name: string;
    describe:string;
}


function Describe(prop : DescribeSlotProp){
    return (
        <>
        <div className="mynumber-5 mx-10">
            <div className="text-2xl font-bold my-5">{prop.name}</div>
            <div className="w-[70%]">{prop.describe}</div>
        </div>
        </>
    )
}


interface QuizExamSlotProp {
    Clause:number;
    Questions: string;
    Check:Array<string>;
}
``

function QuizExam(prop : QuizExamSlotProp){
    const [offset, setOffset] = useState(0)
    const Previous = () => {
        setOffset(prev => {
            if (prev === 0) {
                return prev
            }
            return prev - 1
        })
    }
    const Next = () => {
        setOffset(prev => {
            if (prev === QuestionData.length) {
                return prev
            }
            return prev + 1
        })
    }
    return (
        <>
        <div className="bg-gray-300 h-[100%] w-[100%]">
            <div className="text-2xl font-bold  mx-[10%] p-8">แบบฝึกหัดที่ {prop.Clause}</div>
            <div className="flex justify-center">
                <div className="mb-5 w-[50%] bg-white">
                    <div className="text-xl font-bold my-[2%] mx-[5%]">คำถามที่ {prop.Check} :</div>
                    <div className="text-xl my-[2%] mx-[10%]">{prop.Questions}</div>
                    <div className="">{prop.Check}</div>
                    <div className="flex justify-end">
                        <button className="m-5 p-2 bg-slate-400" onClick={Previous}>ข้อก่อนหน้า</button>
                        <button className="my-5 mr-10 p-2 bg-slate-400" onClick={Next}>ดูผลลัพท์</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}