import React from "react";
import { Attachment } from "../types/thread";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faFileLines } from "@fortawesome/free-solid-svg-icons";

interface ClassThreadAttachmentProps {
  attachment: Attachment;
}

function ClassThreadAttachment({ attachment }: ClassThreadAttachmentProps) {
  return (
    <div
      className="flex items-center space-x-3 min-w-[340px] w-[340px] min-h-[70px] h-[70px] bg-white rounded-[6px] border-[1px] border-[#DADCE0] hover:shadow-md cursor-pointer"
      onClick={() => window.open(attachment.src, "_blank")}
    >
      <div className="h-full aspect-square flex items-center justify-center border-r-[1px]">
        {(() => {
          if (attachment.typ === "image") {
            return (
              <img
                src={attachment.src}
                alt="File Thumbnail"
                className="rounded-l-[5px] h-full aspect-square object-cover"
              />
            );
          }
          if (attachment.typ === "video") {
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
      <div className="w-[70%]">
        <p className="text-[#707070] group-hover:text-black text-[16px] font-semibold truncate">
          {attachment.src}
        </p>
        <p className="text-[#808080] text-[16px] font-normal">
          {attachment.typ}
        </p>
      </div>
    </div>
  );
}

export default ClassThreadAttachment;
