import { faClipboardList, faFile, faUpload, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Calendar from "../../learns/components/Calendar"



type Work = {
    workName: string
    workDescription: string
    workAttachments: { src: string, name: string }[]
    workDueDate?: Date
    workScore: number,
    workTopic: string
}

interface WorkCreateProps {
    availableTopics: string[]
    onSubmit: (work: Work) => void,
    onCancel: () => void
}

function WorkCreate({ availableTopics, onCancel, onSubmit }: WorkCreateProps) {
    const [work, setWork] = useState<Work>({ workName: '', workDescription: '', workAttachments: [], workScore: 0, workTopic: '' })

    const onWorkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWork((p) => ({ ...p, workName: e.target.value }))
    }
    const onWorkDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWork((p) => ({ ...p, workDescription: e.target.value }))
    }
    const onWorkScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWork((p) => ({ ...p, workScore: Number(e.target.value) }))
    }
    const onWorkDateChange = (date: Date) => {
        setWork((p) => ({ ...p, workDueDate: date }))
    }
    const setWorkTopic = (topic: string) => {
        setWork((p) => ({ ...p, workTopic: topic }))
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
                    <FontAwesomeIcon icon={faClipboardList} size="lg" className="mx-3" onClick={() => { onSubmit(work) }} />
                    <h1 className="text-black font-bold ml-5">สร้างงานในชั้นเรียน</h1>
                </div>
                <button className="btn bg-black mr-10">
                    <h1 className="text-white">มอบหมายงาน</h1>
                </button>
            </div>
            <hr />
            <div className="bg-[#e0e0e0] flex h-full w-full">
                <div className="w-3/4 m-10">
                    <div className="flex flex-col bg-white rounded-lg border-gray-500 border-2">
                        <h1>ชื่อของงาน</h1>
                        <input type="text" value={work.workName}
                            onChange={onWorkNameChange}
                            className="input input-bordered m-5" />
                        <h1>คำอธิบายของงาน</h1>
                        <input type="text" multiple value={work.workDescription}
                            onChange={onWorkDescriptionChange}
                            className="input input-bordered m-5" />
                    </div>
                    <div className="bg-white mt-5 border-gray-500 border-2 rounded-lg pt-4">
                        <h1 className="text-gray-500 font-bold">แนบ</h1>
                        <div className="flex justify-center">
                            <div>
                                <button>
                                    <FontAwesomeIcon icon={faFile} size="lg" className="mx-3" />
                                </button>
                                <h1>ลิ้งค์</h1>
                            </div>
                            <div>
                                <button>
                                    <FontAwesomeIcon icon={faUpload} size="lg" className="mx-3" />
                                </button>
                                <h1>อัพโหลด</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/4 bg-white">
                    <div>
                        <h1>คะแนน</h1>
                        <input type="text" value={work.workScore} onChange={onWorkScoreChange} className="input input-bordered bg-gray-400" />
                    </div>
                    <div>
                        <h1>กำหนดส่ง</h1>
                        <div className="dropdown">
                            <label tabIndex={0} className="btn m-1">
                                <h1>{work.workDueDate ? work.workDueDate.toString() : "ไม่มีกำหนดส่ง"}</h1>
                            </label>
                            <div tabIndex={0} className="dropdown-content z-[1] p-2 bg-white">
                                <Calendar targetDate={work.workDueDate} onDateSelect={onWorkDateChange} />
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
                                {work.workTopic == "" ? "ไม่มีหัวข้อ" : work.workTopic}
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