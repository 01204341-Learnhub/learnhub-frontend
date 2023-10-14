import { SimpleThread } from "../types/classes.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { toDateTimeStringOmitDateOnSameDay } from "../../../utils/functions.ts";

interface ClassHomeworkListEntryProps {
  simpleThread: SimpleThread;
}

function ClassHomeworkListEntry({ simpleThread }: ClassHomeworkListEntryProps) {
  return (
    <div className="bg-white w-full p-5 border-transparent border-[1px] hover:drop-shadow-lg">
      <div className="flex items-center space-x-7">
        <div className="flex justify-center items-center min-w-[60px] max-w-[60px] min-h-[60px] max-h-[60px] bg-[#D9D9D9] rounded-full">
          <FontAwesomeIcon icon={faClipboardList} size="2x" />
        </div>
        <h2 className="text-[#606060] text-[20px] font-bold">
          {simpleThread.name}
        </h2>
        <div className="flex-1"></div>
        <p className="text-[#A0A0A0] text-[20px] font-bold">
          โพสต์เมื่อ {toDateTimeStringOmitDateOnSameDay(simpleThread.lastEdit)}
        </p>
      </div>
    </div>
  );
}

export default ClassHomeworkListEntry;
