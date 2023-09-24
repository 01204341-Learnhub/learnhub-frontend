import { useState } from "react";
import CourseCardPreview from "../../features/teaches/components/CourseCardPreview";
import CourseChapterCreate from "../../features/teaches/components/CourseChapterCreate";
import CourseChapterInfo from "../../features/teaches/components/CourseChapterInfo";
import CourseCreateStepper, { BasicCourseInfo } from "../../features/teaches/components/CourseCreateStepper";
import { CourseChapter } from "../../features/teaches/types/course";

function CreateCourse() {
    const [basicCouseInfo, setBasicCourseInfo] = useState<BasicCourseInfo | undefined>(undefined);
    const [currentView, setCurrentView] = useState<string>("main");
    const [chapters, setChapters] = useState<CourseChapter[]>([])
    const onCreateBasicCourseInfo = (courseInfo: BasicCourseInfo) => {
        setBasicCourseInfo(courseInfo)
    }
    const onCreateChapter = (chapter: CourseChapter) => {
        setChapters(prev => [...prev, chapter])
        setCurrentView("main")
    }
    const fakeThumbnail = "https://thicc.mywaifulist.moe/waifus/650/21296f5d4968c9f8ff4a18a123535c0b52d9d14ea5e7a9899362ce940f41eeba_thumb.jpg"
    if (basicCouseInfo === undefined) return (
        <div className="mx-5">
            <h1 className="font-bold text-2xl">สร้างคอร์สเรียน</h1>
            <div className="w-11/12 h-1/3  justify-center">
                <CourseCreateStepper onSubmit={onCreateBasicCourseInfo} />
            </div>
        </div>
    )
    if (currentView === "main") return (
        <div className="bg-[#f5f5f5]">
            <div className="flex mb-5">
                <div className="flex-2 bg-[#d9d9d9] p-4">
                    <CourseCardPreview courseThumbnailUrl={fakeThumbnail}
                        courseName={basicCouseInfo.courseName}
                        lvl="BEGINNER" price={3500}
                        tag="YAY"
                        instructorName="Baramee No PDPA" />
                </div>
                <div className="flex-1 bg-white drop-shadow-md ml-5">
                    <div className="ml-5">
                        <h1 className="font-bold mb-5">ภาพรวม</h1>
                        <h2>จำนวนบทเรียน 9</h2>
                        <h2>จำนวนคลิปวิดีโอ 9</h2>
                        <h2>จำนวนแบบฝึก 9</h2>
                        <h2>จำนวนไฟล์ที่ดาวโหลดได้ 9</h2>
                    </div>
                </div>
            </div>
            <div className="flex bg-white">
                <div className="w-3/12">
                    <div className="bg-white">
                        <ul>
                            <h1 className="font-bold my-3">เป้าหมายของ course</h1>
                            <h1 className="font-bold my-3">สร้างเนื้อหาของ course</h1>
                            <h1 className="font-bold my-3">เผยแผร่ course</h1>
                        </ul>
                    </div>
                    <button className="bg-[#d9d9d9]">
                        <h1 className="font-bold text-black">
                            เผยแผร่ course
                        </h1>
                    </button>
                </div>
                <div>
                    <ol>
                        {chapters.map((chapter, idx) => (
                            <li key={idx}>
                                <CourseChapterInfo chapterName={chapter.chapterName}
                                    chapterDescription={chapter.chapterDescription}
                                    lessons={chapter.lessons} />
                            </li>
                        ))}
                    </ol>
                    <button className="bg-[#d9d9d9] p-x2 py-1" onClick={() => { setCurrentView("add-chapter") }}>
                        <h1>+ เพิ่มบทเรียน</h1>
                    </button>
                </div>
            </div>
        </div>
    )
    else if (currentView == "add-chapter") return (
        <>
            <CourseChapterCreate courseNumber={1} onSubmit={onCreateChapter} onCancel={() => { setCurrentView("main") }} />
        </>
    )
}

export default CreateCourse