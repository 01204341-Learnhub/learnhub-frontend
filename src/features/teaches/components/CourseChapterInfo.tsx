import {
  faAngleDown,
  faAngleUp,
  faCirclePlay,
  faCircleQuestion,
  faClipboardList,
  faDownload,
  faFileLines,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function _LessonEntry({
  lessonName,
  lessonType,
}: {
  lessonName: string;
  lessonType: string;
}) {
  let icon: IconDefinition;
  if (lessonType === "video") {
    icon = faCirclePlay;
  } else if (lessonType === "doc") {
    icon = faFileLines;
  } else if (lessonType === "quiz") {
    icon = faClipboardList;
  } else if (lessonType === "file") {
    icon = faDownload;
  } else {
    icon = faCircleQuestion;
  }
  return (
    <div className="flex flex-row justify-start space-x-5 py-2">
      <FontAwesomeIcon icon={icon} size="xl" color="#808080" />
      <p className="text-[13px] text-[#808080] font-normal">{lessonName}</p>
    </div>
  );
}

interface CourseChapterInfoProps {
  chapterName: string;
  chapterDescription: string;
  chapterNumber: number;
  lessons: {
    lessonNumber: number;
    lessonName: string;
    lessonType: string;
  }[];
}

function CourseChapterInfo({
  chapterName,
  chapterDescription,
  chapterNumber,
  lessons,
}: CourseChapterInfoProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="flex flex-col justify-start space-y-0.5">
      <div className="bg-white w-full drop-shadow-md p-5">
        <div className="flex flex-col justify-start space-y-4">
          <div className="flex justify-start items-start space-x-6">
            <div className="flex flex-col min-w-fit">
              <p className="text-[18px] font-semibold text-black">
                บทที่ {chapterNumber}:
              </p>
            </div>
            <p className="text-[18px] font-semibold text-[#808080]">
              {chapterName}
            </p>
          </div>
          <div className="flex justify-start items-start space-x-6">
            <div className="flex flex-col min-w-fit">
              <p className="text-[18px] font-semibold text-black">คำอธิบาย:</p>
            </div>
            <p className="text-[18px] font-semibold text-[#808080]">
              {chapterDescription}
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
          {lessons.map((lesson) => (
            <_LessonEntry
              lessonName={lesson.lessonName}
              lessonType={lesson.lessonType}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseChapterInfo;
