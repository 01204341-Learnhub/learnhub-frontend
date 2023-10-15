import { faClipboardList, faFile, faUpload, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Calendar from "../../features/learns/components/Calendar.tsx"
import { Work } from "../../features/teaches/types/classWork.ts"
import { Submission } from "../../features/teaches/types/submission.ts"
type View = 'main' | 'works' 
interface ViewSlectorProps {
    currentView: View,
    setView: (view: View) => void
}

const mockSubmission1: Submission[]=[
    {
      status: "check",
      score: 100,
      studentName: "name1",
      studentId: "1234",
      studentPic: ""
  },
  {
    status: "check",
    score: 90,
    studentName: "name1",
    studentId: "1234",
    studentPic: ""
},
{
    status: "check",
    score: 100,
    studentName: "name1",
    studentId: "1234",
    studentPic: ""
},
  
  ]
  const mockSubmission2: Submission[]=[
    {
      status: "uncheck",
      score: 0,
      studentName: "name4",
      studentId: "1234",
      studentPic: ""
  },
  {
    status: "uncheck",
    score: 0,
    studentName: "name5",
    studentId: "1234",
    studentPic: ""
},
{
    status: "uncheck",
    score: 0,
    studentName: "name6",
    studentId: "1234",
    studentPic: ""
},
  
  ]
  const mockSubmission3: Submission[]=[
    {
      status: "unsubmit",
      score: 0,
      studentName: "name1",
      studentId: "1234",
      studentPic: ""
  },
  {
    status: "unsubmit",
    score: 0,
    studentName: "name1",
    studentId: "1234",
    studentPic: ""
},
{
    status: "unsubmit",
    score: 0,
    studentName: "name1",
    studentId: "1234",
    studentPic: ""
},
  
  ]
  const mockSubmission4: Submission[]=[
    {
      status: "uncheck",
      score: 0,
      studentName: "name4",
      studentId: "1234",
      studentPic: ""
  },

  ]
  
function _ShowList({ submission }: { submission: Submission }){
    return(
        <button className="w-full flex bg-white  items-center border-2">
                    <div className=" justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-16 h-16 m-2 rounded-full" >
                            <img src={submission.studentPic} />
                        </div>
                    <h1 className="text-gray-600 font-bold ml-5">{submission.studentName}</h1>
                    <h1 className="text-gray-600 font-bold ml-5 justify-end">{submission.score}/100</h1>
                        </button>
    )
    
}
function _showsubmismoc(){
    return(
        <div className="w-8/12 bg-white px-5 py-5 my-5 h-fit" >
                            <div className="flex items-center ">
                            <div className=" justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-16 h-16 m-2 rounded-full" >
                                    <img src="" />
                                </div>
                            <h1 className="text-gray-600 font-bold ml-5">name</h1>
                            <h1 className="text-gray-600 font-bold ml-5">what is red stone</h1>
                            <div className=" flex ml-80 h-10">
                            <input type="text " className="border-2"></input>
                            <p className="bg-black text-white w-20 text-center">คะแนน</p>
                            <button className="bg-blue-500 border-2 ml-2 text-white">submit</button>
                            </div>
                            </div>
                            <div className="bg-gray-200 px-10 py-10 h-4/6 w-full">
                            <a className=" h-20 bg-white w-full flex">
                            <div className="w-1/6 h-full justify-center items-center border-2 text-center py-2">
                                <p>Preview</p>
                                <img></img>
                            </div>
                            <div className="w-5/6 border-2 h-full text-center py-2">
                                <p>ชื่อไฟล์ที่อัพโหลด</p>
                                <p>ประเภทของไฟล์</p>
                            </div>
                            </a>
                            </div>
                            <div className="h-fit my-10">
                            <h1>ความคิดเห็น</h1>
                            <_comment />
                            </div>

                         </div>
    )
}
function _ShowSubmistion({submission }: {submission: Submission }){
    return(
        <div className="w-8/12 bg-white px-5 py-5 my-5 h-fit" >
                            <div className="flex items-center ">
                            <div className=" justify-center items-center bg-[#D9D9D9] active:bg-blue-200 w-16 h-16 m-2 rounded-full" >
                                    <img src={submission.studentPic} />
                                </div>
                            <h1 className="text-gray-600 font-bold ml-5">{submission.studentName}</h1>
                            <h1 className="text-gray-600 font-bold ml-5">workname</h1>
                            <div className=" flex ml-80 h-10">
                            <input type="text " className="border-2">{submission.score}</input>
                            <p className="bg-black text-white w-20 text-center">คะแนน</p>
                            <button className="bg-blue-500 border-2 ml-2 text-white" >submit</button>
                            </div>
                            </div>
                            <div className="bg-gray-200 px-10 py-10 h-4/6 w-full">
                            <a className=" h-20 bg-white w-full flex" >
                            <div className="w-1/6 h-full justify-center items-center border-2 text-center py-2">
                                <p>Preview</p>
                                <img></img>
                            </div>
                            <div className="w-5/6 border-2 h-full text-center py-2">
                                <p>attachmentname</p>
                            </div>
                            </a>
                            </div>
                            <div className="h-fit my-10">
                            <h1>ความคิดเห็น</h1>
                            <_comment />
                            </div>

                         </div>
    )
}
function _comment(){
    return(
        <div></div>
    )
}

function Workreview(){
    const[submission1,setSubmission1] = useState<Submission[]>([...mockSubmission1]);
    const[submission2,setSubmission2] = useState<Submission[]>([...mockSubmission2]);
    const[submission3,setSubmission3] = useState<Submission[]>([...mockSubmission3]);
    const[submission4,setSubmission4] = useState<Submission[]>([...mockSubmission4]);
        return (
            
                <div className="w-full h-full bg-slate-100">
                    <div className="w-full border-2 px-4 py-4 flex">
                        <h1 className="text-3xl">งานในชั้นเรียน</h1>
                        <h1 className="text-3xl px-10">What is redstone</h1>
                    </div>
                    <div className="flex">
                    <div className="w-4/12 px-5 py-5">
                    <div className="bg-red-500 w-1/4  text-center my-10 ">
                    <p className="text-white py-2">ยังไม่ได้ตรวจ</p>
                    </div>
                    {submission2.map((submission,index) =>{
                        return(
                        <div key={index}>
                        <_ShowList submission={submission} />
                        </div>
                        )
                    })}
                    
                    
                    <div className="bg-yellow-400 w-1/4  text-center my-10">
                    <p className="text-white py-2">ยังไม่ได้ส่ง</p>
                    </div>
                    {submission1.map((submission,index) =>{
                        return(
                        <div key={index}>
                        <_ShowList submission={submission} />
                        </div>
                        )
                    })}
                    <div className="bg-green-600 w-1/4  text-center my-10">
                    <p className="text-white py-2">ตรวจแล้ว</p>
                    </div>
                    {submission3.map((submission,index) =>{
                        return(
                        <div key={index}>
                        <_ShowList submission={submission} />
                        </div>
                        )
                    })}
                    </div>
                    <_showsubmismoc/>
                    </div>
            
                </div>
               )
        
    
}


export default Workreview