import { useState } from "react";
import CourseCardPreview from "../../features/teaches/components/CourseCardPreview";
import CourseChapterCreate from "../../features/teaches/components/CourseChapterCreate";
import CourseChapterInfo from "../../features/teaches/components/CourseChapterInfo";
import CourseCreateStepper, {
  BasicCourseInfo,
} from "../../features/teaches/components/CourseCreateStepper";
import { CourseChapter } from "../../features/teaches/types/course";

function _ModeIndicator({
  mode,
  onChangeMode,
}: {
  mode: string;
  onChangeMode: (m: string) => void;
}) {
  return (
    <div className="bg-white flex flex-col">
      <div className="flex items-center">
        {mode == "purpose" && <div className="w-3 h-6 bg-slate-600"></div>}
        <button
          onClick={() => {
            onChangeMode("purpose");
          }}
          className="mx-auto"
        >
          <h1 className="font-bold my-3">เป้าหมายของ course</h1>
        </button>
      </div>
      <div className="flex items-center">
        {mode == "main" && <div className="w-3 h-6 bg-slate-600"></div>}
        <button
          onClick={() => {
            onChangeMode("main");
          }}
          className="mx-auto"
        >
          <h1 className="font-bold my-3">สร้างเนื้อหาของ course</h1>
        </button>
      </div>
      <div className="flex items-center">
        {mode == "publish" && <div className="w-3 h-6 bg-slate-600"></div>}
        <button
          onClick={() => {
            onChangeMode("publish");
          }}
          className="mx-auto"
        >
          <h1 className="font-bold my-3">เผยแผร่ course</h1>
        </button>
      </div>
    </div>
  );
}

interface _TopPanelProps {
  basicCouseInfo: BasicCourseInfo;
  courseThumbnailUrl: string;
}

function _TopPanel({ basicCouseInfo, courseThumbnailUrl }: _TopPanelProps) {
  return (
    <div className="flex mb-5">
      <div className="flex-2 bg-[#d9d9d9] p-4">
        <CourseCardPreview
          courseThumbnailUrl={courseThumbnailUrl}
          courseName={basicCouseInfo.courseName}
          lvl={basicCouseInfo.courseLevel}
          price={3500}
          tag={basicCouseInfo.courseCategory}
          instructorName="Baramee No PDPA"
        />
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
  );
}

function CreateCourse() {
  const [basicCouseInfo, setBasicCourseInfo] = useState<
    BasicCourseInfo | undefined
  >(undefined);
  const [currentView, setCurrentView] = useState<string>("main");
  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const onCreateBasicCourseInfo = (courseInfo: BasicCourseInfo) => {
    setBasicCourseInfo(courseInfo);
  };
  const onCreateChapter = (chapter: CourseChapter) => {
    setChapters((prev) => [...prev, chapter]);
    setCurrentView("main");
  };
  const fakeThumbnail =
    "https://miro.medium.com/v2/resize:fit:691/1*VSQ0XEywxSgZBwW05GsZtw.png";
  if (basicCouseInfo === undefined)
    return (
      <div className="mx-5">
        <h1 className="font-bold text-2xl">สร้างคอร์สเรียน</h1>
        <div className="w-11/12 h-1/3  justify-center">
          <CourseCreateStepper onSubmit={onCreateBasicCourseInfo} />
        </div>
      </div>
    );
  if (currentView === "main")
    return (
      <div className="bg-[#f5f5f5]">
        <_TopPanel
          basicCouseInfo={basicCouseInfo}
          courseThumbnailUrl={fakeThumbnail}
        />
        <div className="flex bg-white">
          <div className="w-3/12">
            <_ModeIndicator mode="main" onChangeMode={setCurrentView} />
            <button className="bg-[#d9d9d9] mt-5 ml-3 p-2">
              <h1 className="font-bold text-black">เผยแผร่ course</h1>
            </button>
          </div>
          <div className="bg-white font-bold w-full">
            <ol>
              {chapters.map((chapter, idx) => (
                <li key={idx}>
                  <CourseChapterInfo
                    chapterName={chapter.chapterName}
                    chapterDescription={chapter.chapterDescription}
                    lessons={chapter.lessons}
                  />
                </li>
              ))}
            </ol>
            <button
              className="bg-[#d9d9d9] p-x2 py-1"
              onClick={() => {
                setCurrentView("add-chapter");
              }}
            >
              <h1>+ เพิ่มบทเรียน</h1>
            </button>
          </div>
        </div>
      </div>
    );
  else if (currentView == "purpose")
    return (
      <div className="bg-[#f5f5f5]">
        <_TopPanel
          basicCouseInfo={basicCouseInfo}
          courseThumbnailUrl={fakeThumbnail}
        />
        <div className="flex">
          <div className="w-3/12">
            <_ModeIndicator mode="purpose" onChangeMode={setCurrentView} />
            <button className="bg-[#d9d9d9] mt-5 ml-3 p-2">
              <h1 className="font-bold text-black">เผยแผร่ course</h1>
            </button>
          </div>
          <div className="bg-white font-bold w-full">
            <h1 className="bg-white text-2xl ml-4 my-4">เป้าหมายของ course</h1>
            <hr />
            <p>
              คำอธิบายต่อไปนี้จะปรากฏต่อสาธารณะในหน้าเริ่มต้นของหลักสูตร
              และจะมีผลโดยตรงต่อประสิทธิภาพหลักสูตรของคุณ
              คำอธิบายเหล่านี้จะช่วยให้ผู้เรียนตัดสินใจว่าหลักสูตรของคุณเหมาะกับพวกเขาหรือไม่
            </p>
            <h2>ผู้เรียนจะได้เรียนสิ่งใดในหลักสูตรของคุณ</h2>
            <p>
              คุณต้องกรอกจุดประสงค์การเรียนรู้หรือผลลัพธ์ที่ผู้เรียนคาดหวังหลังจากเรียนจบหลักสูตรอย่างน้อย
              4 รายการ
            </p>
            <input
              type="text"
              className="input input-bordered w-full rounded-none m-2"
              placeholder="ตัวอย่าง: มีความชำนาญในการเขียนภาษา HTML"
            />
            <input
              type="text"
              className="input input-bordered w-full rounded-none m-2"
              placeholder="ตัวอย่าง: มีความชำนาญในการเขียนภาษา CSS"
            />
            <input
              type="text"
              className="input input-bordered w-full rounded-none m-2"
              placeholder="ตัวอย่าง: มีความชำนาญในการสร้างอุปกรณ์จาก Redstone"
            />
            <input
              type="text"
              className="input input-bordered w-full rounded-none m-2"
              placeholder="ตัวอย่าง: มีความชำนาญในการเล่น Minecraft"
            />
            <h2>
              ความต้องการหรือข้อกำหนดเบื้องต้นสำหรับการเรียนหลักสูตรของคุณมีอะไรบ้าง
            </h2>
            <p>
              ระบุทักษะที่จำเป็น ประสบการณ์
              เครื่องมือหรืออุปกรณ์ที่ผู้เรียนควรมีก่อนเรียนหลักสูตรหากไม่มีความต้องการ
              ให้ใช้พื้นที่นี้เป็นโอกาสในการลดอุปสรรคสำหรับผู้เริ่มต้น
            </p>
            <input
              type="text"
              className="input input-bordered w-full rounded-none m-2"
              placeholder="ตัวอย่าง: ไม่จำเป็นต้องมีพื้นฐานในการเขียนภาษา HTML, CSS หรือ redstone design     มาก่อน"
            />
            <div className="flex">
              <h2>ระดับของ course นี้</h2>
              <input
                type="text"
                className="input input-bordered rounded-none m-2"
              />
            </div>
          </div>
        </div>
      </div>
    );
  else if (currentView == "publish")
    return (
      <div className="bg-[#f5f5f5]">
        <_TopPanel
          basicCouseInfo={basicCouseInfo}
          courseThumbnailUrl={fakeThumbnail}
        />
        <div className="flex">
          <div className="w-3/12">
            <_ModeIndicator mode="publish" onChangeMode={setCurrentView} />
            <button className="bg-[#d9d9d9] mt-5 ml-3 p-2">
              <h1 className="font-bold text-black">เผยแผร่ course</h1>
            </button>
          </div>
          <div className="bg-white font-bold w-full">
            <h1 className="bg-white text-2xl ml-4 my-4">เผยแผร่ course</h1>
            <hr />
            <h2 className="text-xl my-4">หน้าเริ่มต้นของหลักสูตร</h2>
            <p>
              หน้าเริ่มต้นของหลักสูตรมีความสำคัญ หากทำออกมาได้ดี
              ยังช่วยให้คุณปรากฏในเครื่องมือค้นหาเช่น Google ได้อีกด้วย
              เมื่อคุณทำส่วนนี้เสร็จแล้ว
              ให้นึกถึงการสร้างหน้าเริ่มต้นของหลักสูตรที่น่าสนใจเพื่อแสดงให้เห็นว่าทำไมผู้คนถึงอยาก
              ลงทะเบียนในหลักสูตรของคุณ
            </p>
            <h2>ชื่อ course เรียนของคุณ</h2>
            <input
              type="text"
              className="input input-bordered w-full rounded-none m-2"
              value={basicCouseInfo.courseName}
            />
            <p>
              ชื่อหลักสูตรของคุณควรเป็นการผสมผสานระหว่างการดึงดูดความสนใจ
              มีข้อมูล และเหมาะสำหรับการค้นหา
            </p>
            <h2 className="text-xl my-4">คำอธิบายคอร์สเรียนของคุณ</h2>
            <input
              type="text"
              className="input input-bordered w-full rounded-none m-2"
              placeholder="เพิ่มคำอธิบาย course เรียน"
            />
            <p>คำอธิบายควรยาวอย่างน้อย 200 คำ</p>
            <div className="flex my-5">
              <div className="w-2/12">
                <img
                  src="https://images7.alphacoders.com/130/1304859.jpg"
                  alt=""
                />
              </div>
            </div>
            <h2 className="text-xl my-4">กำหนดราคา</h2>
            <p>
              โปรดกรอกราคา (บาท) สำหรับหลักสูตรของคุณด้านล่าง และคลิก 'บันทึก'
            </p>
            <input
              type="text"
              className="input input-bordered w-2/12 rounded-none m-2"
              placeholder="ตัวอย่าง: 2000"
            />
            <h2 className="text-xl my-4">กำหนดหมวดหมู่</h2>
            <p>
              โปรดเลือกหมวดหมู่สำหรับคลาสเรียนของคุณ
              ถ้าไม่ระบุหลักสูตรของคุณจะอยู่ในหมวดหมู่ ทั้่วไป
            </p>
            <input
              type="text"
              className="input input-bordered w-2/12 rounded-none m-2"
              value={basicCouseInfo.courseCategory}
            />
          </div>
        </div>
      </div>
    );
  else if (currentView == "add-chapter")
    return (
      <>
        <CourseChapterCreate
          chapterNumber={chapters.length + 1}
          onSubmit={onCreateChapter}
          onCancel={() => {
            setCurrentView("main");
          }}
        />
      </>
    );
}

export default CreateCourse