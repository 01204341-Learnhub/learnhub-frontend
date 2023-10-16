import { toDateTimeStringOmitDateOnSameDay } from "../../../utils/functions";
import { Reply } from "../types/thread";

interface ClassThreadReplyEntryProps {
  reply: Reply;
}

function ClassThreadReplyEntry({ reply }: ClassThreadReplyEntryProps) {
  return (
    <div className="flex w-full space-x-5">
      <img
        src={reply.user.profilePicture}
        className="rounded-full min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] bg-[#d9d9d9] mt-1"
        alt="profile picture"
      />
      <div className="flex flex-col w-full space-y-0.3">
        <div className="flex space-x-3">
          <p className="text-'[#505050] text-sm font-semibold">
            {reply.user.fullname}
          </p>
          <p className="text-[#707070] text-[14px] font-normal">
            {toDateTimeStringOmitDateOnSameDay(reply.dateTime)}
          </p>
        </div>
        <p className="text-[#707070] text-[15px] font-medium w-[75%] break-words">
          {reply.text}
        </p>
      </div>
    </div>
  );
}

export default ClassThreadReplyEntry;
