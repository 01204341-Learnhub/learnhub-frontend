import useThread from "../hooks/useThread";
import { SimpleThread } from "../types/classes";
import { LearnhubUser } from "../../../types/user";
import { toDateTimeStringOmitDateOnSameDay } from "../../../utils/functions";
import ClassThreadAttachment from "./ClassThreadAttachment";
import ClassThreadReplyInputBar from "./ClassThreadReplyInputBar";
import ClassThreadReplyEntry from "./ClassThreadReplyEntry";
import PeopleSvg from "../../../assets/images/people.svg";

interface ClassAnnouncementThreadProps {
  user: LearnhubUser;
  classId: string;
  simpleThread: SimpleThread;
}

function ClassAnnouncementThread({
  user,
  classId,
  simpleThread,
}: ClassAnnouncementThreadProps) {
  const { thread, addReply } = useThread(
    user,
    classId,
    simpleThread.threadId,
    "announcement",
  );
  return (
    <div className="bg-white border-[1px] border-[#a0a0a080] rounded-[10px] w-full">
      {thread && (
        <>
          <div className="flex space-x-5 items-center mx-5 mt-5">
            <img
              src={thread.teacher.profilePicture}
              alt={`https://robohash.org/${thread.teacher.userID}`}
              className="min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] rounded-full bg-[#d9d9d9]"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-black text-[16px] font-[500]">
                {thread.teacher.username}
              </p>
              <p className="text-[#A0A0A0] text-[14px] font-[500]">
                {toDateTimeStringOmitDateOnSameDay(thread.lastEdit)}
              </p>
            </div>
          </div>
          <div className={thread.text.length > 0 ? "block" : "hidden"}>
            <p className="text-black text-[15px] font-medium w-[95%] break-words mt-4 mx-7">
              {thread.text}
            </p>
          </div>
          <div className={thread.attachments.length > 0 ? "block" : "hidden"}>
            <div className="flex flex-wrap w[95%] mx-6 mt-4">
              {thread.attachments.map((attachment, index) => {
                return (
                  <div key={index} className="m-1">
                    <ClassThreadAttachment attachment={attachment} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t-[1px] mt-4 px-5 py-5">
            <div className="flex items-center space-x-5 mx-2">
              <img src={PeopleSvg} width={23} />
              <h3 className="text-[#808080] text-[18px] font-bold">
                {`ความคิดเห็นในชั้นเรียน ${thread.replies.length}`}
              </h3>
            </div>
            <div className={thread.replies.length > 0 ? "block" : "hidden"}>
              <div className="flex flex-col w-full space-y-5 mx-3 mb-7 mt-3">
                {thread.replies.map((reply, index) => (
                  <ClassThreadReplyEntry key={index} reply={reply} />
                ))}
              </div>
            </div>
            <div className="w-[95%]">
              <ClassThreadReplyInputBar user={user} onAddReply={addReply} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ClassAnnouncementThread;
