import {
  faClipboardList,
  faFile,
  faFolderBlank,
  faPlayCircle,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../../../pages/teachers/CreateCourse.tsx";
import { Chapter, Lesson } from "../types/course";
import FileLessonCreate from "./FileLessonCreate";
import QuizLessonCreate from "./QuizLessonCreate.tsx";
import VideoLessonCreate from "./VideoLessonCreate";

interface _LessonTypeSelectorProps {
  onSelect: (lessonType: string) => void;
}

function _LessonTypeSelector({ onSelect }: _LessonTypeSelectorProps) {
  return (
    <div className="mx-[70px]">
      {/* The button to open modal */}
      <label htmlFor="my_modal_7" className="btn bg-black text-white my-4">
        + เพิ่มเนื้อหา
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="bg-white">
            <button
              className="flex my-2 p-2 hover:bg-gray-200 w-full"
              onClick={() => {
                onSelect("video");
              }}
            >
              <FontAwesomeIcon icon={faPlayCircle} color="#505050" size="xl" />
              <h1 className="ml-5">วิดีโอ</h1>
            </button>
            <button className="flex my-2 p-2 hover:bg-gray-200 w-full"
              onClick={() => { onSelect("quiz") }}>
              <FontAwesomeIcon
                icon={faClipboardList}
                color="#505050"
                size="xl"
              />
              <h1 className="ml-5">แบบฝึกหัด</h1>
            </button>
            <button
              className="flex my-2 p-2 hover:bg-gray-200 w-full"
              onClick={() => {
                onSelect("file");
              }}
            >
              <FontAwesomeIcon icon={faFile} color="#505050" size="xl" />
              <h1 className="ml-5">ไฟล์ (ผู้เรียนสามารถดาวโหลดได้)</h1>
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
}

interface _LessonPreviewProps {
  lessonName: string;
  lessonType: string;
  onRemove: () => void
}

function _LessonPreview({ lessonName, lessonType, onRemove }: _LessonPreviewProps) {
  let icon = faFolderBlank;
  switch (lessonType) {
    case "video":
      icon = faPlayCircle;
      break;
    default:
      break;
  }
  return (
    <div className=" my-[10px] w-full bg-white flex p-4 justify-between">
      <div className="flex">
        <FontAwesomeIcon
          icon={icon}
          color="#505050"
          size="xl"
          className="ml-[20px]"
        />
        <h1 className="font-bold text-black mx-6">{lessonType}</h1>
        <h1 className="font-semibold text-[#808080]">{lessonName}</h1>
      </div>
      <button onClick={onRemove}>
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  );
}

interface CourseChapterCreateProps {
  onSubmit: () => void;
  onCancel: () => void;
  chapterToEdit?: number;
}

function CourseChapterCreate({ onSubmit, onCancel, chapterToEdit }: CourseChapterCreateProps) {
  const courseContext = useContext(CourseContext);
  const [chapterNumber, setChapterNumber] = useState<number>(0);
  const [chapterName, setChapterName] = useState<string>("");
  const [chapterDescription, setChapterDescription] = useState<string>("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [mode, setMode] = useState("main");
  useEffect(() => {
    setChapterNumber(chapterToEdit ?? courseContext.course.chapters.length + 1)
    setChapterName(courseContext.course.chapters[chapterToEdit - 1]?.name ?? "")
    setChapterDescription(courseContext.course.chapters[chapterToEdit - 1]?.description ?? "")
    setLessons(courseContext.course.chapters[chapterToEdit - 1]?.lessons ?? [])
  }, [chapterToEdit, courseContext.course.chapters])

  const handleSubmit = () => {
    if (lessons.length == 0) {
      alert("กรุณาเพิ่มบทเรียนอย่างน้อย 1 บทเรียน");
      return;
    }
    const newChapter: Chapter = {
      chapterId: new Date().getTime().toString(),
      name: chapterName,
      number: chapterNumber,
      description: chapterDescription,
      lessons: lessons,
    };
    if (chapterToEdit) {
      const updatedCourse = { ...courseContext.course }
      const idx = updatedCourse.chapters.findIndex(chapter => chapter.number === chapterToEdit)
      if (idx == -1) throw new Error("chapter not found")
      updatedCourse.chapters[idx] = newChapter
      courseContext.setCourse(updatedCourse)
      onSubmit();
      return
    }
    const updatedChapters = [...courseContext.course.chapters, newChapter];
    const updatedCourse = { ...courseContext.course };
    updatedCourse.chapters = updatedChapters;
    courseContext.setCourse(updatedCourse);
    onSubmit();
    return
  };

  const handleRemoveLesson = (lessonNumber: number) => {
    const updatedLessons = [...lessons.filter((lesson) => {
      return lesson.number !== lessonNumber;
    })]
    updatedLessons.forEach((lesson, index) => {
      lesson.number = index + 1
    })
    setLessons(updatedLessons)
  }

  const onChapterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChapterName(e.target.value);
  };
  const onChapterDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setChapterDescription(e.target.value);
  };
  const handleAddingLesson = (lessonType: string) => {
    setMode(`add-${lessonType}`);
  };
  const handleAddLesson = (lesson: Lesson) => {
    setLessons([...lessons, lesson]);
    setMode("main");
  };

  if (mode == "add-video") {
    return (
      <VideoLessonCreate
        chapterNumber={chapterNumber}
        chapterName={chapterName}
        lessonNumber={lessons.length + 1}
        onSubmit={handleAddLesson}
        onCancel={() => {
          setMode("main");
        }}
      />
    );
  }
  if (mode == "add-file") {
    return (
      <FileLessonCreate
        chapterNumber={chapterNumber}
        chapterName={chapterName}
        lessonNumber={lessons.length + 1}
        onSubmit={handleAddLesson}
        onCancel={() => {
          setMode("main");
        }}
      />
    );
  }
  if (mode == "add-quiz") {
    return (
      <QuizLessonCreate chapterName={chapterName} chapterNumber={chapterNumber}
        lessonNumber={lessons.length + 1} onCancel={() => { setMode("main") }}
        onSubmit={handleAddLesson} />
    )
  }
  return (
    <div className="w-full h-screen">
      <h1 className="ml-[70px] mt-[20px] flex items-center text-black text-[24px] font-bold">
        บทที่ {chapterNumber}
      </h1>
      <div className="ml-[70px] mr-[100px] mt-[30px] bg-white drop-shadow-xl">
        <div className=" grid items-center pt-2">
          <h1 className="my-[20px] mx-[40px] font-semibold text-[18px]">
            ชื่อบทเรียน
          </h1>
          <input
            type="text"
            placeholder="ชื่อบทเรียน"
            className="mx-[40px] min-w-0 grow input input-bordered"
            value={chapterName}
            onChange={onChapterNameChange}
          />
        </div>
        <div className=" grid items-center pt-2 pb-4 text-[18px]">
          <h1 className="my-[20px] mx-[40px] font-semibold ">
            คำอธิบาย
          </h1>
          <textarea
            placeholder="ผู้เรียนสามารถทำอะไรได้บ้างหลังจากจบส่วนนี้"
            className="  mx-[40px] min-w-0 min-h-[45px] h-[160px] max-h-[280px] py-2 px-4 grow input input-bordered mb-4"
            value={chapterDescription}
            onChange={onChapterDescriptionChange}
          />
        </div>
      </div>
      <ol className="ml-[70px] mr-[100px] mt-[30px] drop-shadow-xl">
        {lessons.map((lesson, index) => {
          return (
            <li key={index}>
              <_LessonPreview
                lessonName={lesson.name}
                lessonType={lesson.type}
                onRemove={() => { handleRemoveLesson(lesson.number) }}
              />
            </li>
          );
        })}
      </ol>
      <_LessonTypeSelector onSelect={handleAddingLesson} />
      <div className="flex mt-[40px] justify-end mr-[100px] w-full">
        <button className="btn bg-black text-white" onClick={handleSubmit}>
          บันทึก
        </button>
        <button className="btn ml-7 mr-[100px]" onClick={onCancel}>
          ยกเลิก
        </button>
      </div>
    </div>
  );
}

export default CourseChapterCreate;
