import { useState } from "react"

type View = 'main' | 'works' | 'members'

type ClassInfoPrototype = {
    className: string
    classThumbnail: string
}

const fakeURL = "https://e0.pxfuel.com/wallpapers/488/717/desktop-wallpaper-izayoi-sakuya-sakuya-izayoi-touhou-anime-board.jpg"

function TeachingClasses() {
    const [view, setView] = useState<View>('main')
    const [classInfo, setClassInfo] = useState<ClassInfoPrototype>({ className: 'Mock class name', classThumbnail: fakeURL })
    return (
        <div className="h-full">
            <div className="flex">
                <div className="m-5" onClick={() => { setView("main") }}>
                    <h1>หน้าหลักในชั้นเรียน</h1>
                    <div className={`bg-black ${view == "main" ? "h-3" : ""}`}></div>
                </div>
                <div className="m-5" onClick={() => { setView("works") }}>
                    <h1>งานในชั้นเรียน</h1>
                    <div className={`bg-black ${view == "works" ? "h-3" : ""}`}></div>
                </div>
                <div className="m-5" onClick={() => { setView("members") }}>
                    <h1>คนในชั้นเรียน</h1>
                    <div className={`bg-black ${view == "members" ? "h-3" : ""}`}></div>
                </div>
            </div>
            <hr />
            <div className="flex">
                <h1 className="text-2xl font-bold text-black">{classInfo.className}</h1>
                <h1 className="px-2 py-1 bg-green-500 ml-5 rounded-l-full rounded-r-full ">class</h1>
            </div>
        </div >
    )
}

export default TeachingClasses