import { LearnhubUser } from "../../../types/user";
import { toDateTimeStringOmitDateOnSameDay } from "../../../utils/functions";
import PeopleSvg from "../../../assets/images/people.svg";
import useThread from "../hooks/useThread";
import ClassAttachment from "./ClassAttachment";
import ClassReplyEntry from "./ClassReplyEntry";
import ClassReplyInputBar from "./ClassReplyInputBar";

interface ClassThread {
  user: LearnhubUser;
  classId: string;
  threadId: string;
}

function ClassThread({ user, classId, threadId }: ClassThread) {
  const { thread, addReply } = useThread(user, classId, threadId);
  return (
    <div className="bg-white border-[1px] border-[#a0a0a080] rounded-[10px] w-full">
      {thread && (
        <>
          <div className="flex space-x-5 items-center mx-5 mt-5">
            <img
              src={thread.teacher.profilePicture}
              alt="profile picture"
              className="min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] rounded-full bg-[#d9d9d9]"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-black text-[15px] font-[500]">
                {thread.teacher.fullname}
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
                    <ClassAttachment attachment={attachment} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t-[1px] mt-4 px-5 py-5">
            <div className="flex items-center space-x-5 mx-2 pb-4">
              <img src={PeopleSvg} width={23} alt="people icon" />
              <h3 className="text-[#808080] text-sm font-bold">
                {`ความคิดเห็นในชั้นเรียน ${thread.replies.length}`}
              </h3>
            </div>
            <div className={thread.replies.length > 0 ? "block" : "hidden"}>
              <div className="flex flex-col w-full space-y-5 mx-3 mb-7 mt-3">
                {thread.replies
                  .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
                  .map((reply, index) => (
                    <ClassReplyEntry key={index} reply={reply} />
                  ))}
              </div>
            </div>
            <div className="w-[95%]">
              <ClassReplyInputBar user={user} onAddReply={addReply} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ClassThread;
