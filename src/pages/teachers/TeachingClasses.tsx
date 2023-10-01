import { faClipboardList, faPlus,} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import WorkCreate from "../../features/teaches/components/WorkCreate"
import { Work } from "../../features/teaches/types/classWork"

type View = 'main' | 'works' | 'members' | 'create-work'

type ClassInfoPrototype = {
    className: string
    classThumbnail: string
}

const fakeURL = "https://www.hobbyfanclub.com/web/board/2022/odtjnwftssxcxgmfjaj5191220225035856071.jpg"

interface ViewSlectorProps {
    currentView: View,
    setView: (view: View) => void
}
function _ViewSlector({ currentView, setView }: ViewSlectorProps) {
    return (
        <div className="flex">
            <div className="m-5" onClick={() => { setView("main") }}>
                <h1>หน้าหลักในชั้นเรียน</h1>
                <div className={`bg-black ${currentView == "main" ? "h-3" : ""}`}></div>
            </div>
            <div className="m-5" onClick={() => { setView("works") }}>
                <h1>งานในชั้นเรียน</h1>
                <div className={`bg-black ${currentView == "works" ? "h-3" : ""}`}></div>
            </div>
            <div className="m-5" onClick={() => { setView("members") }}>
                <h1>คนในชั้นเรียน</h1>
                <div className={`bg-black ${currentView == "members" ? "h-3" : ""}`}></div>
            </div>
        </div>
    )
}

function _WorkSlot({ work }: { work: Work }) {
    return (
        <div className="bg-white flex m-3 items-center">
            <div className="flex justify-center items-center bg-[#D9D9D9] w-16 h-16 m-2 rounded-full">
                <FontAwesomeIcon icon={faClipboardList} size="2xl" />
            </div>
            <h1 className="text-xl text-gray-600 font-bold ml-5">{work.name}</h1>
        </div>
    )
}

interface _ClassWorksProps {
    onCreateClassWork: () => void
    works: Work[]
}

function _ClassWorks({ onCreateClassWork, works }: _ClassWorksProps) {
    const getAllTopics = () => {
        const topics: string[] = []
        works.forEach(w => {
            if (!topics.includes(w.topic)) {
                topics.push(w.topic)
            }
        })
        return topics
    }
    if (works.length == 0) {
        <div className="h-full w-full">
            <button className="btn m-7" onClick={onCreateClassWork}>
                <FontAwesomeIcon icon={faPlus} size="xl" />
                <h1 className="text-xl">สร้าง</h1>
            </button>
        </div>
    }
    return (
        <div className="h-full w-full">
            <button className="btn m-7" onClick={onCreateClassWork}>
                <FontAwesomeIcon icon={faPlus} size="xl" />
                <h1 className="text-xl">สร้าง</h1>
            </button>
            {getAllTopics().map((topic, index) => (
                <div key={index}>
                    <h1 className="mx-10 text-black font-bold text-3xl my-2">{topic}</h1>
                    <hr className="mx-10 h-1.5 bg-gray-300"/>
                    <div className="my-16">
                        {works.filter(w => w.topic == topic).map((w) => (
                            <div className="mx-10">
                                <_WorkSlot key={w.name} work={w} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

const mockWorks: Work[] = [
    {
        name: "Mock",
        description: "Mockckdkkfdksfk",
        topic: "ไม่ได้กำหนดหัวข้อ",
        attachments: [],
        score: 0
    },
    {
        name: "Mock 3",
        description: "Mockckdkkfdksfk",
        topic: "ไม่ได้กำหนดหัวข้อ",
        attachments: [],
        score: 0
    },
    {
        name: "Mock 2",
        description: "Mockckdkkfdksfk",
        topic: "ไม่ได้กำหนดหัวข้อ",
        attachments: [],
        score: 0
    },
    {
        name: "Mock 2",
        description: "Mockckdkkfdksfk",
        topic: "หัวข้อที่ 1",
        attachments: [],
        score: 0
    },
    {
        name: "Mock 2",
        description: "Mockckdkkfdksfk",
        topic: "หัวข้อที่ 2",
        attachments: [],
        score: 0
    },
]

function TeachingClasses() {
    const [view, setView] = useState<View>('main')
    const [classInfo, setClassInfo] = useState<ClassInfoPrototype>({ className: 'Mock class name', classThumbnail: fakeURL })
    const [works, setWorks] = useState<Work[]>([...mockWorks])
    if (view == 'main') {
        return (
            <div className="h-full">
                <_ViewSlector currentView={view} setView={setView} />
                <hr/>
                <div className="mx-7 mt-8">
                    <div className="flex">
                        <h1 className="text-2xl font-bold text-black">{classInfo.className}</h1>
                        <h1 className="px-2 py-1 bg-green-500 ml-5 rounded-l-full rounded-r-full ">class</h1>
                    </div>
                    <div className="mt-7">
                        <img src={classInfo.classThumbnail} alt="class-cover" className="object-cover w-full h-64" />
                    </div>
                </div>
            </div >
        )
    }
    else if (view == "works") {
        return (
            <div className="h-full">
                <_ViewSlector currentView={view} setView={setView} />
                <hr />
                <_ClassWorks onCreateClassWork={() => { setView("create-work") }} works={works} />
            </div>
        )
    }
    else if (view == "members") {
        return (
            <div className="h-full">
                <_ViewSlector currentView={view} setView={setView} />
                <hr />
            </div>
        )
    }
    else if (view == "create-work") {
        return (
            <WorkCreate availableTopics={["ฟัสสี่", "WTF"]} onCancel={() => { setView("works") }} onSubmit={(w) => {
                setWorks((p) => [...p, w])
                setView("works")
            }} />
        )
    }
}

export default TeachingClasses