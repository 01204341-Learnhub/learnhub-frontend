import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import CourseCardPreview from "../../features/teaches/components/CourseCardPreview"

interface _TopPanelProps {
    className: string,
    courseThumbnailUrl: string,
    classLevel: string
}

function _TopPanel({ className, classLevel, courseThumbnailUrl }: _TopPanelProps) {
    return (
        <div className="flex mb-5">
            <div className="flex-2 bg-[#d9d9d9] p-4">
                <CourseCardPreview courseThumbnailUrl={courseThumbnailUrl}
                    courseName={className}
                    lvl={classLevel} price={3500}
                    tag="YAY"
                    instructorName="Baramee No PDPA" />
            </div>
            <div className="flex-1 bg-white drop-shadow-md ml-5">
                {/* <div className="ml-5">
                    <h1 className="font-bold mb-5">ภาพรวม</h1>
                    <h2>จำนวนบทเรียน 9</h2>
                    <h2>จำนวนคลิปวิดีโอ 9</h2>
                    <h2>จำนวนแบบฝึก 9</h2>
                    <h2>จำนวนไฟล์ที่ดาวโหลดได้ 9</h2>
                </div> */}
            </div>
        </div>
    )
}

function _ModeIndicator({ mode, onChangeMode }: { mode: string, onChangeMode: (m: string) => void }) {
    return (
        <div className="bg-white flex flex-col">
            <div className="flex items-center">
                {mode == "purpose" && <div className="w-3 h-6 bg-slate-600"></div>}
                <button onClick={() => { onChangeMode("purpose") }} className="mx-auto">
                    <h1 className="font-bold my-3">เป้าหมายของ class</h1>
                </button>
            </div>
            <div className="flex items-center">
                {mode == "publish" && <div className="w-3 h-6 bg-slate-600"></div>}
                <button onClick={() => { onChangeMode("publish") }} className="mx-auto">
                    <h1 className="font-bold my-3">เผยแผร่ class</h1>
                </button>
            </div>
        </div>
    )
}

function _LevelDropDown({ targetLevel, onChangeLevel }: { targetLevel: string, onChangeLevel: (l: string) => void }) {
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"]
    const levelToText = (level: string) => {
        switch (level) {
            case "BEGINNER": return "ผู้เริ่มต้น"
            case "INTERMEDIATE": return "ปานกลาง"
            case "ADVANCED": return "ขั้นสูง"
        }
    }
    if (collapsed) return (
        <div>
            <div className="flex bg-[#d0d0d0] px-2">
                <h1>{levelToText(targetLevel)}</h1>
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" onClick={() => { setCollapsed(!collapsed) }} />
            </div>
        </div>
    )
    return (
        <div>
            <div className="flex bg-[#d0d0d0] px-2">
                <h1>{levelToText(targetLevel)}</h1>
                <FontAwesomeIcon icon={faChevronUp} className="ml-2" onClick={() => { setCollapsed(!collapsed) }} />
            </div>
            <div>
                <ol className="flex flex-col">
                    {LEVELS.map((level, idx) => (
                        <li key={idx}>
                            <button onClick={() => { onChangeLevel(level) }}>
                                <div className={`${level == targetLevel ? "bg-blue-300" : "bg-white"} w-full`}>
                                    <h1 className={""}>{levelToText(level)}</h1>
                                </div>
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

function CreateClass() {
    const fakeUrl = "https://miro.medium.com/v2/resize:fit:691/1*VSQ0XEywxSgZBwW05GsZtw.png"
    const [mode, setMode] = useState<string>("purpose")
    const [className, setClassName] = useState<string>("")
    const [classLevel, setClassLevel] = useState<string>("BEGINNER")
    function onClassNameChange(e) {
        setClassName(e.target.value)
    }
    if (mode == "purpose") return (
        <div>
            <h1 className="text-2xl font-bold">สร้างคลาสเรียน</h1>
            <_TopPanel className={className} courseThumbnailUrl={fakeUrl} classLevel={classLevel} />
            <div className="flex">
                <div className="w-3/12">
                    <_ModeIndicator mode={mode} onChangeMode={setMode} />
                </div>
                <div className="bg-white w-full">
                    <h1 className="text-2xl font-bold my-5">เป้าหมายของคลาสเรียน</h1>
                    <hr />
                    <p className="my-4">คำอธิบายต่อไปนี้จะปรากฏต่อสาธารณะในหน้าเริ่มต้นของหลักสูตร และจะมีผลโดยตรงต่อประสิทธิภาพหลักสูตรของคุณ คำอธิบายเหล่านี้จะช่วยให้ผู้เรียนตัดสินใจว่าหลักสูตรของคุณเหมาะกับพวกเขาหรือไม่</p>
                    <h2 className="font-bold my-4">ผู้เรียนจะได้เรียนสิ่งใดในคลาสเรียนของคุณ</h2>
                    <p className="my-4">คุณต้องกรอกจุดประสงค์การเรียนรู้หรือผลลัพธ์ที่ผู้เรียนคาดหวังหลังจากเรียนจบหลักสูตรอย่างน้อย 4 รายการ</p>
                    <input type="text" className="input input-bordered w-full rounded-none m-2" placeholder="ตัวอย่าง: มีความชำนาญในการเขียนภาษา HTML" />
                    <input type="text" className="input input-bordered w-full rounded-none m-2" placeholder="ตัวอย่าง: มีความชำนาญในการเขียนภาษา CSS" />
                    <input type="text" className="input input-bordered w-full rounded-none m-2" placeholder="ตัวอย่าง: มีความชำนาญในการเขียนภาษา RedStone" />
                    <input type="text" className="input input-bordered w-full rounded-none m-2" placeholder="ตัวอย่าง: มีความชำนาญในการเขียนภาษา Minecraft" />
                    <h2 className="font-bold my-4">ผู้เรียนจะได้เรียนสิ่งใดในคลาสเรียนของคุณ</h2>
                    <p className="my-4">ระบุทักษะที่จำเป็น ประสบการณ์ เครื่องมือหรืออุปกรณ์ที่ผู้เรียนควรมีก่อนเรียนหลักสูตรหากไม่มีความต้องการ ให้ใช้พื้นที่นี้เป็นโอกาสในการลดอุปสรรคสำหรับผู้เริ่มต้น</p>
                    <input type="text" className="input input-bordered w-full rounded-none m-2" placeholder="ตัวอย่าง: ไม่จำเป็นต้องมีพื้นฐานในการเขียนภาษา HTML, CSS หรือ redstone design     มาก่อน" />
                    <div className="flex mb-10 h-20">
                        <h2 className="font-bold my-4 mr-5">ระดับของ class นี้</h2>
                        <_LevelDropDown targetLevel={classLevel} onChangeLevel={(l: string) => {
                            setClassLevel(l)
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
    else if (mode == "publish") return (
        <div>
            <h1 className="text-2xl font-bold">สร้างคลาสเรียน</h1>
            <_TopPanel className={className} courseThumbnailUrl={fakeUrl} classLevel={classLevel} />
            <div className="flex">
                <div className="w-3/12">
                    <_ModeIndicator mode={mode} onChangeMode={setMode} />
                </div>
                <div className="bg-white w-full">
                    <h1 className="bg-white text-2xl my-4 font-bold">เผยแผร่ class</h1>
                    <hr />
                    <h2 className="text-xl my-4">หน้าเริ่มต้นของหลักสูตร</h2>
                    <p>หน้าเริ่มต้นของหลักสูตรมีความสำคัญ หากทำออกมาได้ดี ยังช่วยให้คุณปรากฏในเครื่องมือค้นหาเช่น Google ได้อีกด้วย
                        เมื่อคุณทำส่วนนี้เสร็จแล้ว ให้นึกถึงการสร้างหน้าเริ่มต้นของหลักสูตรที่น่าสนใจเพื่อแสดงให้เห็นว่าทำไมผู้คนถึงอยาก
                        ลงทะเบียนในหลักสูตรของคุณ</p>
                    <h2>ชื่อ class เรียนของคุณ</h2>
                    <input type="text" className="input input-bordered w-full rounded-none m-2" value={className} onChange={onClassNameChange} />
                    <p>ชื่อหลักสูตรของคุณควรเป็นการผสมผสานระหว่างการดึงดูดความสนใจ มีข้อมูล และเหมาะสำหรับการค้นหา</p>
                    <h2 className="text-xl my-4">คำอธิบายคลาสเรียนของคุณ</h2>
                    <input type="text" className="input input-bordered w-full rounded-none m-2" placeholder="เพิ่มคำอธิบาย class เรียน" />
                    <p>คำอธิบายควรยาวอย่างน้อย 200 คำ</p>
                    <div className="flex my-5">
                        <div className="w-2/12">
                            <img src="https://images7.alphacoders.com/130/1304859.jpg" alt="" />
                        </div>
                    </div>
                    <h2 className="text-xl my-4">กำหนดราคา</h2>
                    <p>โปรดกรอกราคา (บาท) สำหรับหลักสูตรของคุณด้านล่าง และคลิก 'บันทึก'</p>
                    <input type="text" className="input input-bordered w-2/12 rounded-none m-2" placeholder="ตัวอย่าง: 2000" />
                    <h2 className="text-xl my-4">กำหนดหมวดหมู่</h2>
                    <p>โปรดเลือกหมวดหมู่สำหรับคลาสเรียนของคุณ ถ้าไม่ระบุหลักสูตรของคุณจะอยู่ในหมวดหมู่ ทั้่วไป</p>
                    <input type="text" className="input input-bordered w-2/12 rounded-none m-2" value={"HardCode"} />
                </div>
            </div>
        </div>
    )
}

export default CreateClass