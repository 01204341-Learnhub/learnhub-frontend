import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomeworkSubmissionFile, Thread } from "../types/thread";
import {
  faCirclePlay,
  faFileLines,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  getFileNameFromSrc,
  toDateTimeStringOmitDateOnSameDay,
} from "../../../utils/functions";
import { useRef } from "react";

interface _FileEntryProps {
  homeworkStatus: "open" | "closed";
  homeworkSubmissionStatus:
    | "submitted"
    | "not-submitted"
    | "submitted-and-graded";
  homeworkSubmissionFile: HomeworkSubmissionFile;
  onRemoveHomeworkSubmissionFile: (src: string) => void;
}

function _FileEntry({
  homeworkStatus,
  homeworkSubmissionStatus,
  homeworkSubmissionFile,
  onRemoveHomeworkSubmissionFile,
}: _FileEntryProps) {
  const handleRemoveHomeworkSubmissionFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onRemoveHomeworkSubmissionFile(homeworkSubmissionFile.src);
  };

  return (
    <div
      className="group flex items-center space-x-3 h-[60px] bg-white rounded-[6px] border-[1px] border-[#DADCE0] hover:shadow-md cursor-pointer"
      onClick={() => {
        window.open(homeworkSubmissionFile.src, "_blank");
      }}
    >
      <div className="h-full aspect-square flex items-center justify-center border-r-[1px]">
        {(() => {
          if (homeworkSubmissionFile.typ === "image") {
            return (
              <img
                src={homeworkSubmissionFile.src}
                alt="File homeworkSubmissionFilehumbnail"
                className="rounded-l-[5px] h-full aspect-square object-cover"
              />
            );
          }
          if (homeworkSubmissionFile.typ === "video") {
            return (
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faCirclePlay} size="2x" />
              </div>
            );
          } else {
            return (
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faFileLines} size="2x" />
              </div>
            );
          }
        })()}
      </div>
      <div className="w-1/2">
        <p className="text-[#707070] group-hover:text-black text-[16px] font-semibold truncate">
          {getFileNameFromSrc(homeworkSubmissionFile.src)}
        </p>
        <p className="text-[#808080] text-[16px] font-normal">
          {homeworkSubmissionFile.typ}
        </p>
      </div>
      <div
        className={
          homeworkStatus === "closed" ||
          homeworkSubmissionStatus === "submitted" ||
          homeworkSubmissionStatus === "submitted-and-graded"
            ? "hidden"
            : "block"
        }
      >
        <button
          className={`justify-self-end rounded-full bg-white min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] hover:bg-[#F9F9F9]`}
          onClick={handleRemoveHomeworkSubmissionFile}
        >
          <FontAwesomeIcon icon={faXmark} color="#8c8a8e" size="lg" />
        </button>
      </div>
    </div>
  );
}
interface ClassHomeworkDetailFileUploaderProps {
  thread: Thread;
  onAddHomeworkSubmissionFile: (file: File) => void;
  onRemoveHomeworkSubmissionFile: (src: string) => void;
  onSubmitHomework: () => void;
  onUnsubmitHomework: () => void;
}

function ClassHomeworkDetailFileUploader({
  thread,
  onAddHomeworkSubmissionFile,
  onRemoveHomeworkSubmissionFile,
  onSubmitHomework,
  onUnsubmitHomework,
}: ClassHomeworkDetailFileUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddHomeworkSubmissionFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.item(0);
    onAddHomeworkSubmissionFile(file!);
  };

  return (
    <div className="flex flex-col space-y-4 bg-white rounded-[10px] p-5 drop-shadow-md">
      <div className="flex justify-between items-start">
        <p className="text-black text-[20px] font-[500]">งานของคุณ</p>
        <div className="flex flex-col items-end space-y-1">
          <p className="text-[#808080] text-[16px] font-semibold">
            {(() => {
              if (thread.homeworkSubmissionStatus === "not-submitted") {
                return "ยังไม่ได้ส่ง";
              }
              if (thread.homeworkSubmissionStatus === "submitted") {
                return "ส่งแล้ว";
              }
              if (thread.homeworkSubmissionStatus === "submitted-and-graded") {
                return "ตรวจแล้ว";
              }
            })()}
          </p>
          <div
            className={
              thread.homeworkLastSubmissionDateTime != undefined
                ? "block"
                : "hidden"
            }
          >
            <p className="text-[#707070] text-[14px] font-normal">
              {thread.homeworkLastSubmissionDateTime &&
                `ส่งครั้งล่าสุด ${toDateTimeStringOmitDateOnSameDay(
                  thread.homeworkLastSubmissionDateTime
                )}`}
            </p>
          </div>
        </div>
      </div>
      <div
        className={
          thread.homeworkSubmissionFiles.length > 0 ? "block" : "hidden"
        }
      >
        <div className="flex flex-col space-y-2">
          {thread.homeworkSubmissionFiles.map(
            (homeworkSubmissionFile, index) => (
              <_FileEntry
                key={index}
                homeworkStatus={thread.homeworkStatus}
                homeworkSubmissionStatus={thread.homeworkSubmissionStatus}
                homeworkSubmissionFile={homeworkSubmissionFile}
                onRemoveHomeworkSubmissionFile={onRemoveHomeworkSubmissionFile}
              />
            )
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div
          className={
            thread.homeworkStatus === "open" &&
            thread.homeworkSubmissionStatus === "not-submitted"
              ? "block"
              : "hidden"
          }
        >
          <input
            type="file"
            ref={fileRef}
            onChange={handleAddHomeworkSubmissionFile}
            className="hidden"
          />
          <button
            className="h-[40px] w-full bg-white rounded-[6px] border-[1px] border-[#DADCE0] hover:drop-shadow-md"
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <p className="text-[#606060] text-[18px] font-[500]">เพิ่มไฟล์</p>
          </button>
        </div>
        <button
          className={`h-[40px] w-full rounded-[6px] border-[1px] bg-black hover:drop-shadow-md ${
            thread.homeworkStatus === "open" ? "hover:opacity-80" : "opacity-50"
          }`}
          onClick={() => {
            if (thread.homeworkStatus === "closed") {
              return;
            }
            if (thread.homeworkSubmissionStatus === "not-submitted") {
              onSubmitHomework();
            } else {
              onUnsubmitHomework();
            }
          }}
        >
          <p className="text-white text-[18px] font-[500]">
            {thread.homeworkSubmissionStatus === "not-submitted"
              ? "ส่งงาน"
              : "ถอนการส่งงาน"}
          </p>
        </button>
        <div
          className={thread.homeworkStatus === "closed" ? "block" : "hidden"}
        >
          <p className="text-[#808080] text-[14px] font-semibold text-right">
            {thread.homeworkStatus === "closed" ? "ปิดรับงานแล้ว" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClassHomeworkDetailFileUploader;
