import {
  faAngleDown,
  faAngleUp,
  faDownload,
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
    return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
      });
  }

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-[720px]">
      <div className="cursor-pointer w-full bg-[#ECF3F9] border-[1px] border-t-[#b0b0b0] py-4" onClick={toggleExpansion}>
        <div className="flex items-center justify-between">
          <h3 className=" flex-grow ml-[25px] font-semibold">
            {courseAnnouncement.name}
          </h3>
          <p className=" text-sm ">
            วัน {formatDate(courseAnnouncement.lastEdit)}{" "}
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
        <div className="bg-white mb-2 w-full">
          <div className="px-2 pt-2 pb-8">
            <div className="flex flex-row">
              <div className="w-[55px] h-[55px] m-[20px] bg-black rounded-full" />
              <div className="my-[20px]">
                <h3 className="font-semibold text-[#404040]">
                  {courseAnnouncement.teacher.teacherName}
                </h3>
                <p className="text-sm text-[#808080]">
                  โพสประกาศ วัน {formatDate(courseAnnouncement.lastEdit)}
                </p>
              </div>
            </div>
            <div className="mx-[95px]">
              <h3 className="font-bold text-lg">{courseAnnouncement.name}</h3>
              <p className="text-base">{courseAnnouncement.text}</p>
            </div>

            {courseAnnouncement.attachments.map((attachment, index) => (
              <div className="flex items-center justify-center mx-2">
                <div
                  key={index}
                  className="flex items-center justify-center border border-[#a0a0a0]-50 mx-[25px] mt-[10px] h-20 w-11/12"
                >
                  <div className=" w-1/5 h-full border border-[#a0a0a0]-50 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faFile}
                      color="#555555"
                      size="2xl"
                      className=""
                    />
                  </div>
                  <p className="w-4/5 font-semibold text-xs mx-6 text-[#808080] truncate">
                    {attachment.src}
                  </p>
                  <FontAwesomeIcon
                    icon={faDownload}
                    color="#555555"
                    size="2xl"
                    className=" mr-8 "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAnnouncementDropdown;
