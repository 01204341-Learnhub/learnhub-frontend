import React from "react";
import { Lesson } from "../types/lesson";
import { Chapter } from "../types/chapter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faFileLines,
  faClipboardList,
  faFolder,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

interface LessonEntryProps {
  lesson: Lesson;
}

function LessonEntry(props: LessonEntryProps) {
  return (
    <div className="flex flex-row justify-left space-x-3">
      {props.lesson.lessonType === "video" && (
        <FontAwesomeIcon icon={faCirclePlay} color="#808080" />
      )}
      {props.lesson.lessonType === "doc" && (
        <FontAwesomeIcon icon={faFileLines} size="lg" color="#808080" />
      )}
      {props.lesson.lessonType === "quiz" && (
        <FontAwesomeIcon icon={faClipboardList} size="lg" color="#808080" />
      )}
      {props.lesson.lessonType === "files" && (
        <FontAwesomeIcon icon={faFolder} color="#808080" />
      )}
      <div className="text-[#808080] font-normal text-[13px]">
        {props.lesson.name}
      </div>
    </div>
  );
}

interface ChapterEntryProps {
  chapter: Chapter;
}

function ChapterEntry(props: ChapterEntryProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  // TODO: Get lessons from backend.
  const lessons: Lesson[] = [];
  const lessonTypes = ["video", "doc", "quiz", "files"];
  for (let i = 0; i < 4; i++) {
    const lesson: Lesson = {
      id: `${i}`,
      courseId: props.chapter.courseId,
      chapterId: props.chapter.id,
      name: `Lesson ${i}`,
      description: `This is lesson ${i}`,
      lessonNum: i,
      lessonType: lessonTypes[i % 4],
      lessonLength: 2500,
    };
    lessons.push(lesson);
  }

  return (
    <>
      <button className={"bg-[#D9D9D9] p-3 w-full"} onClick={handleExpand}>
        <div className="flex flex-row justify-between items-center">
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
      {isExpanded && (
        <div className="bg-[#d9d9d980] w-full">
          <div className="m-4 flex flex-col justify-start space-y-3">
            {lessons.map((lesson) => (
              <LessonEntry key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

interface CourseChaptersOutlineProps {
  chapters: Chapter[];
}

function CourseChaptersOutline(props: CourseChaptersOutlineProps) {
  return (
    <div className="w-[600px] bg-[#eaeaea66]">
      <div className="m-5 flex flex-col justify-start space-y-4">
        {props.chapters.map((chapter) => (
          <ChapterEntry key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}

export default CourseChaptersOutline;
