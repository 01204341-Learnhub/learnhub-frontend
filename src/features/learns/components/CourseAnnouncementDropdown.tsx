import {
  faAngleDown,
  faAngleUp,
  faCirclePlay,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface CourseAnnouncementDropdownProps {
  announcementID: string;
  teacher: {
    teacherID: string;
    teacherName: string;
    profilePic: string;
  };
  name: string;
  lastEdit: number;
  text: string;
  attachments: {
    attachmentType: string;
    src: string;
  }[];
}

const CourseAnnouncementDropdown = (
  courseAnnouncement: CourseAnnouncementDropdownProps
) => {
  const [isExpanded, setIsExpanded] = useState(false);

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    if (isToday) {
      return (
        "วันนี้ " +
        date.toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } else {
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
      });
    }
  }

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const renderPreviewAttachments = (type: string, src: string) => {
    console.log(type);
    
    if (type == "image") {
      return <img src={src} alt="" className=" object-cover w-full h-full" />;
    } else if (type == "video") {
      return (
        <div className="flex items-center justify-center w-full h-full">
          
          <FontAwesomeIcon icon={faCirclePlay} color="#808080" size="xl" />
        </div>
      );
    } else if (type == "file") {
      return (
        <div className="flex items-center justify-center w-full h-full">
          
          <FontAwesomeIcon icon={faFile} color="#555555" size="xl" className="" />
        </div>
      );
    }
  };

  return (
    <div className="w-[800px]">
      <div
        className="cursor-pointer w-full bg-[#ECF3F9] border-b-[2px] border-b-[#b0b0b080] py-4"
        onClick={toggleExpansion}
      >
        <div className="flex items-center justify-between w-full">
          <h3 className=" flex-grow ml-[25px] font-me">
            {courseAnnouncement.name}
          </h3>
          <p className=" text-sm ">
            {formatDate(courseAnnouncement.lastEdit)}{" "}
          </p>
          {isExpanded ? (
            <FontAwesomeIcon
              icon={faAngleUp}
              color="black"
              size="xl"
              className=" mr-5 ml-4"
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleDown}
              color="black"
              size="xl"
              className=" mr-5 ml-4"
            />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="bg-white mb-2">
          <div className="px-2 pt-2 pb-8">
            <div className="flex flex-row">
              <div className="w-[55px] h-[55px] m-[20px] bg-black rounded-full">
                <img
                  src={courseAnnouncement.teacher.profilePic}
                  alt=""
                  className="w-[55px] h-[55px] rounded-full"
                />
              </div>
              <div className="my-[20px]">
                <h3 className="font-semibold text-[#404040]">
                  {courseAnnouncement.teacher.teacherName}
                </h3>
                <p className="text-sm text-[#808080]">
                  โพสประกาศ วัน {formatDate(courseAnnouncement.lastEdit)}
                </p>
              </div>
            </div>
            <div className="mx-12 my-3">
              <h3 className="font-bold text-lg">{courseAnnouncement.name}</h3>
              <p className="text-base">{courseAnnouncement.text}</p>
            </div>

            {courseAnnouncement.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center justify-center mx-2">
                <a
                  target="_blank"
                  href={attachment.src}
                  key={index}
                  className="flex items-center justify-center border border-[#a0a0a0]-5 mx-[25px] mt-[10px] h-20 w-11/12"
                >
                  <div className="w-1/5 h-full border-r flex items-center justify-center">
                    
                    {renderPreviewAttachments(
                      attachment.attachmentType,
                      attachment.src
                    )}
                  </div>
                  <p className="w-4/5 font-semibold text-xs mx-6 text-[#808080] truncate">
                    {attachment.src}
                  </p>
                  {/* <FontAwesomeIcon
                    icon={faDownload}
                    color="#555555"
                    size="2xl"
                    className=" mr-8 "
                  /> */}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAnnouncementDropdown;
