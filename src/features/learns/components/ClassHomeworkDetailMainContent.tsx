import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PeopleSvg from "../../../assets/images/people.svg";
import { LearnhubUser } from "../../../types/user";
import { toDateTimeStringOmitDateOnSameDay } from "../../../utils/functions";
import { Thread } from "../types/thread";
import ClassThreadAttachment from "./ClassThreadAttachment";
import ClassThreadReplyEntry from "./ClassThreadReplyEntry";
import ClassThreadReplyInputBar from "./ClassThreadReplyInputBar";

interface ClassHomeworkDetailMainContentProps {
  user: LearnhubUser;
  thread: Thread;
  onAddReply: (text: string) => void;
}

function ClassHomeworkDetailMainContent({
  user,
  thread,
  onAddReply,
}: ClassHomeworkDetailMainContentProps) {
  const [showRepliesAndTextBox, setShowRepliesAndTextBox] = useState<boolean>(
    thread.replies.length === 0 ? false : true
  );

  return (
    <div className="bg-white p-5 w-full">
      <div className="flex items-start space-x-5 pb-4 border-b-2 w-full">
        <div className="flex items-center justify-center rounded-full bg-[#d9d9d9] min-w-[55px] max-w-[55px] min-h-[55px] max-h-[55px]">
          <FontAwesomeIcon icon={faClipboardList} size="2x" />
        </div>
        <div className="w-full">
          <h1 className="text-black text-[22px] font-bold">{thread.name}</h1>
          <div className="flex justify-between items-start w-full mt-1">
            <p className="text-[#404040] text-[14px] font-semibold">
              {thread.homeworkSubmissionStatus === "submitted-and-graded" &&
                thread.homeworkGotScore !== undefined
                ? `${thread.homeworkGotScore}/`
                : ""}
              {thread.homeworkFullScore} คะแนน
            </p>
            <p className="text-[#404040] text-[14px] font-semibold">
              {`กำหนดส่ง ${toDateTimeStringOmitDateOnSameDay(
                thread.homeworkDueDateTime
              )}`}
            </p>
          </div>
        </div>
      </div>
      <div
        className={
          thread.text.length > 0 || thread.attachments.length > 0
            ? "block"
            : "hidden"
        }
      >
        <div className="mt-4 pb-4 border-b-2">
          <p className="text-[#404040] text-[15px] font-medium mx-3 w-[95%] break-words">
            {thread.text}
          </p>
          <div className={thread.attachments.length > 0 ? "block" : "hidden"}>
            <div className="flex flex-wrap mx-3 mt-4">
              {thread.attachments.map((attachment, index) => (
                <div key={index} className="m-1">
                  <ClassThreadAttachment attachment={attachment} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={showRepliesAndTextBox ? "hidden" : "block"}>
        <button
          className="text-[#404040] text-[18px] font-bold mx-3 mt-4 hover:opacity-80"
          onClick={() => setShowRepliesAndTextBox(true)}
        >
          เพิ่มความคิดเห็นสำหรับงานนี้
        </button>
      </div>
      <div className={showRepliesAndTextBox ? "block" : "hidden"}>
        <div className="flex items-center space-x-5 mx-3 mt-4">
          <img src={PeopleSvg} width={23} />
          <h3 className="text-[#808080] text-[18px] font-bold">
            ความคิดเห็นสำหรับงานนี้
          </h3>
        </div>
        <div className={thread.replies.length > 0 ? "block" : "hidden"}>
          <div className="flex flex-col w-full space-y-5 mx-3 mt-5">
            {thread.replies.map((reply, index) => (
              <ClassThreadReplyEntry key={index} reply={reply} />
            ))}
          </div>
        </div>
        <div className="mt-7 w-[95%]">
          <ClassThreadReplyInputBar user={user} onAddReply={onAddReply} />
        </div>
      </div>
    </div>
  );
}

export default ClassHomeworkDetailMainContent;
