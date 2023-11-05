import {
  faAngleDown,
  faAngleUp,
  faCirclePlay,
  faCircleQuestion,
  faClipboardList,
  faDownload,
  faEdit,
  faFileLines,
  faX,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Chapter, Lesson } from "../types/course.ts";

interface _LessonEntryProps {
  lesson: Lesson;
}

function _LessonEntry({ lesson }: _LessonEntryProps) {

  const totalSec = lesson.length;
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const length = `${hours > 0 ? `${hours} ชั่วโมง` : ""} ${
    minutes > 0 ? `${minutes} นาที` : ""
  }`;


  let icon: IconDefinition;
  if (lesson.type === "video") {
    icon = faCirclePlay;
  } else if (lesson.type === "doc") {
    icon = faFileLines;
  } else if (lesson.type === "quiz") {
    icon = faClipboardList;
  } else if (lesson.type === "files") {
    icon = faDownload;
  } else {
    icon = faCircleQuestion;
  }
  return (
    <div className="flex flex-row justify-between space-x-5 py-2">
      <div className="flex items-center">
        <FontAwesomeIcon icon={icon} size="xl" color="202020" className="px-2" />
        <p className="text-base text-[#404040] font-normal">{lesson.name}</p>
      </div>
        <p className="text-base ">{length}</p>
    </div>
  );
}

interface CourseChapterInfoProps {
  chapter: Chapter;
  onEdit: () => void;
  onRemove: () => void
}

function CourseChapterInfo({ chapter, onEdit, onRemove }: CourseChapterInfoProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="flex flex-col justify-start space-y-0.5">
      <div className="bg-white w-full drop-shadow-md p-5">
        <div className="flex flex-col justify-start space-y-4">
          <div className="flex justify-between items-start space-x-6">
            <div className="flex">
              <div className="flex flex-col min-w-fit">
                <p className="text-[18px] font-semibold text-black">
                  บทที่ {chapter.number}:
                </p>
              </div>
              <p className="text-[18px] font-semibold ml-5 text-[#808080]">
                {chapter.name}
              </p>
            </div>
            <div>
              <button className="hover:bg-slate-100 mr-5" onClick={onEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="hover:bg-slate-100" onClick={onRemove}>
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
          </div>
          <div className="flex justify-start items-start space-x-6">
            <div className="flex flex-col min-w-fit">
              <p className="text-[18px] font-semibold text-black">คำอธิบาย:</p>
            </div>
            <p className="text-[18px] font-semibold text-[#808080]">
              {chapter.description}
            </p>
          </div>
        </div>
      </div>
      <button
        className="bg-white w-full drop-shadow-md p-5"
        onClick={handleExpandClick}
      >
        <div className="flex justify-between">
          <p className="text-[18px] font-semibold text-black">
            เนื้อหาของบทนี้
          </p>
          {isExpanded ? (
            <FontAwesomeIcon icon={faAngleUp} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} size="lg" />
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="bg-[#F1F1F1] w-full min-h-fit p-5">
          {chapter.lessons.map((lesson) => (
            <div key={lesson.number}>
              <_LessonEntry lesson={lesson} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseChapterInfo;
