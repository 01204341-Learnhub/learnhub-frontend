import {
  faAngleDown,
  faAngleUp,
  faCirclePlay,
  faClipboardList,
  faFileLines,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Lesson } from "../types/lesson";

import { fetchLessons } from "../services/courses";
import { CourseChapterOutline } from "../types/course";

interface LessonEntryProps {
  lesson: Lesson;
}

function LessonEntry(props: LessonEntryProps) {
  return (
    <div className="flex flex-row justify-left space-x-3">
      {props.lesson.lessonType === "video" ? (
        <FontAwesomeIcon icon={faCirclePlay} color="#808080" />
      ) : null}
      {props.lesson.lessonType === "doc" ? (
        <FontAwesomeIcon icon={faFileLines} size="lg" color="#808080" />
      ) : null}
      {props.lesson.lessonType === "quiz" ? (
        <FontAwesomeIcon icon={faClipboardList} size="lg" color="#808080" />
      ) : null}
      {props.lesson.lessonType === "files" ? (
        <FontAwesomeIcon icon={faFolder} color="#808080" />
      ) : null}
      <div className="text-[#808080] font-normal text-[13px]">
        {props.lesson.name}
      </div>
      <div className="flex-1"></div>
      <div className="text-[#808080] font-normal text-[13px]">
        {(function () {
          if (props.lesson.lessonLength < 3600) {
            return `${Math.floor(props.lesson.lessonLength / 60)} นาที`;
          } else {
            return `${Math.floor(
              props.lesson.lessonLength / 3600
            )} ชั่วโมง ${Math.floor(
              (props.lesson.lessonLength % 3600) / 60
            )} นาที`;
          }
        })()}
      </div>
    </div>
  );
}

interface ChapterEntryProps {
  chapter: CourseChapterOutline;
  courseID: string
}

function ChapterEntry(props: ChapterEntryProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  async function handleExpand() {
    const lessonsData = await fetchLessons(props.courseID, props.chapter.chapterID);
    setIsExpanded(!isExpanded);
    setLessons(lessonsData);
  }


  return (
    <>
      <button className={"bg-[#D9D9D9] p-3 w-full"} onClick={handleExpand}>
        <div className="flex flex-row justify-between">
          <div className="text-left text-black text-[16px] font-semibold">
            {props.chapter.name}
          </div>
          <FontAwesomeIcon
            icon={isExpanded ? faAngleUp : faAngleDown}
            size="lg"
            color="black"
          />
        </div>
      </button>
      {isExpanded ? (
        <div className="bg-[#d9d9d980] w-full">
          <div className="m-4 flex flex-col justify-start space-y-3">
            {lessons.map((lesson) => (
              <LessonEntry key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

interface CourseChaptersOutlineProps {
  chapters: CourseChapterOutline[];
  courseID: string
}

function CourseChaptersOutline(props: CourseChaptersOutlineProps) {
  return (
    <div className="w-[600px] bg-[#eaeaea66] py-0.5">
      <div className="m-5 flex flex-col justify-start space-y-4">
        {props.chapters.map((chapter) => (
          <ChapterEntry key={chapter.chapterID} chapter={chapter} courseID={props.courseID} />
        ))}
      </div>
    </div>
  );
}

export default CourseChaptersOutline;