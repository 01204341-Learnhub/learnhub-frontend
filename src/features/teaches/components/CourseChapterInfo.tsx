import { faChevronDown, faChevronUp, faCirclePlay, faCircleQuestion, faFileLines } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

interface CourseChapterInfoProps {
  chapterName: string,
  chapterDescription: string,
  lessons: {
    lessonNumber: number,
    lessonName: string,
    lessonType: string
  }[]
}

function _LessonInfoSlot({ lessonName, lessonType }: { lessonName: string, lessonType: string }) {
  let icon = faCircleQuestion
  if (lessonType === "video") {
    icon = faCirclePlay
  }
  else if (lessonType === "doc") {
    icon = faFileLines
  }
  return (
    <div className="flex align-middle py-2">
      <FontAwesomeIcon icon={icon} size="2xl" />
      <h1 className="ml-3">{lessonName}</h1>
    </div>
  )
}

function CourseChapterInfo({ lessons, chapterName, chapterDescription }: CourseChapterInfoProps) {
  const [showLessons, setShowLessons] = useState<boolean>(false)
  const toggleShowLessons = () => {
    setShowLessons(prev => !prev)
  }
  return (
    <div>
      <div className="shadow-md bg-white">
        <div className="flex">
          <h1 className="font-bold">บทที่ {1}: </h1>
          <h2 className="ml-3">{chapterName}</h2>
        </div>
        <div className=" flex">
          <h1 className="font-bold mr-2">คำอธิบาย</h1>
          <h2 className="text-gray-300">(ผู้เรียนสามารทำอะไรได้บ้างหลังจบจากส่วนนี้)</h2>
        </div>
        <p className="ml-10">{chapterDescription}</p>
      </div>
      <hr />
      <div className="bg-white">
        <div className="flex">
          <h1 className="py-3 text-xl font-bold mr-4">เนื้อหาของบทนี้</h1>
          <button onClick={toggleShowLessons}>
            {showLessons ? <FontAwesomeIcon icon={faChevronUp} size="xl" /> : <FontAwesomeIcon icon={faChevronDown} size="xl" />}
          </button>
        </div>
        <ol className="bg-[#f1f1f1]">
          {showLessons && lessons.map((lesson, idx) => (
            <li key={idx}>
              <_LessonInfoSlot lessonName={lesson.lessonName} lessonType={lesson.lessonType} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default CourseChapterInfo