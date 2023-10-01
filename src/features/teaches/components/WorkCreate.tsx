import { faClipboardList, faFile, faUpload, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Calendar from "../../learns/components/Calendar"
import { Work } from "../types/classWork"

interface WorkCreateProps {
    availableTopics: string[]
    onSubmit: (work: Work) => void,
    onCancel: () => void
}

function WorkCreate({ availableTopics, onCancel, onSubmit }: WorkCreateProps) {
    const [work, setWork] = useState<Work>({ name: '', description: '', attachments: [], score: 0, topic: '' })

    const onWorkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWork((p) => ({ ...p, name: e.target.value }))
    }
    const onWorkDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWork((p) => ({ ...p, description: e.target.value }))
    }
    const onWorkScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWork((p) => ({ ...p, score: Number(e.target.value) }))
    }
    const onWorkDateChange = (date: Date) => {
        setWork((p) => ({ ...p, dueDate: date }))
    }
    const setWorkTopic = (topic: string) => {
        setWork((p) => ({ ...p, topic: topic }))
    }
    const [newTopic, setNewTopic] = useState<string>("")
    const onNewTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTopic(e.target.value)
        if (e.target.value != "") {
            setWorkTopic(e.target.value)
        }
    }
    const createNewTopic = () => {
        const modal = document.getElementById("create-topic-modal")
        modal?.showModal()
        if (newTopic != "") {
            setWorkTopic(newTopic)
        }
    }
    return (
        <div className="w-full h-full">
            <div className="flex justify-between">
                <div className="flex">
                    <FontAwesomeIcon icon={faX} size="lg" className="mx-3" onClick={onCancel} />
                    <FontAwesomeIcon icon={faClipboardList} size="lg" className="mx-3" />
                    <h1 className="text-black font-bold ml-5">สร้างงานในชั้นเรียน</h1>
                </div>
                <button className="btn bg-black mr-10"
                    onClick={() => { onSubmit(work) }}>
                    <h1 className="text-white">มอบหมายงาน</h1>
                </button>
            </div>
            <hr />
            <div className="bg-[#e0e0e0] flex h-full w-full">
                <div className="w-3/4 m-10">
                    <div className="flex flex-col bg-white rounded-lg border-gray-500 border-2">
                        <input type="text" value={work.name}
                            onChange={onWorkNameChange}
                            className="input input-bordered mb-2 mx-10 mt-10" 
                            placeholder="หัวข้อ"/>
                        <textarea   
                            // onChange={onWorkDescriptionChange}
                            // value={work.description}
                            className="input input-bordered mt-2 mx-10 mb-10  " 
                            placeholder="อธิบายงานในส่วนนี้ (ไม่จำเป็นต้องกรอกก็ได้)"/>
                    </div>
                    <div className="bg-white mt-5 border-gray-400 border-2 rounded-xl pt-4">
                        <h1 className="text-gray-500 font-bold mx-8 ">แนบ</h1>
                        <div className="flex justify-center m-5">
                            <div className="ml-8">
                                <div className="flex justify-center items-center border-2 w-12 h-12 rounded-full">
                                    <button>
                                        <FontAwesomeIcon icon={faFile} size="lg" className="mx-3" />
                                    </button>
                                </div>
                                <h1 className="m-2">ลิ้งก์</h1>
                            </div>
                            <div className="ml-8">
                                <div className="flex justify-center items-center border-2 w-12 h-12 rounded-full">
                                    <button>
                                        <FontAwesomeIcon icon={faUpload} size="lg" className="mx-3" />
                                    </button>
                                </div>
                                <h1 className="m-2">อัพโหลด</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 bg-white">
                    <div>
                        <h1>คะแนน</h1>
                        <input type="number" value={work.score} onChange={onWorkScoreChange} className="input input-bordered bg-gray-400" />
                    </div>
                    <div>
                        <h1>กำหนดส่ง</h1>
                        <div className="dropdown">
                            <label tabIndex={0} className="btn m-1">
                                <h1>{work.dueDate ? work.dueDate.toString() : "ไม่มีกำหนดส่ง"}</h1>
                            </label>
                            <div tabIndex={0} className="dropdown-content z-[1] p-2 bg-white">
                                <Calendar targetDate={work.dueDate} onDateSelect={onWorkDateChange} />
                                <h1 className="btn">เลือกเวลาแต่ยังไม่ได้ทำ</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>หัวข้อ</h1>
                        <dialog id="create-topic-modal" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">Press ESC key or click outside to close</p>
                                <input type="text" value={newTopic} onChange={onNewTopicChange} placeholder="หัวข้อใหม่" />
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">ตกลง</button>
                                    </form>
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                        <div className="dropdown">
                            <label tabIndex={0} className="btn m-1">
                                {work.topic == "" ? "ไม่มีหัวข้อ" : work.topic}
                            </label>
                            <div tabIndex={0} className="dropdown-content z-[1] p-2 bg-white">
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 w-52">
                                    <li><a onClick={() => { setWorkTopic("") }}>ไม่มีหัวข้อ</a></li>
                                    <li><a onClick={createNewTopic}>{newTopic ? newTopic + " (หัวข้อใหม่)" : "สร้างหัวข้อใหม่"}</a></li>
                                    <hr />
                                    {availableTopics.map((topic) => {
                                        return (
                                            <li><a onClick={() => { setWorkTopic(topic) }}>{topic}</a></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default WorkCreate