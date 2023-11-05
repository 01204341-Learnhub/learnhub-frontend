import {
  faCaretDown,
  faCaretUp,
  faCirclePlay,
  faClipboardList,
  faFile,
  faTimes,
  faUpload,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "../../../services/uploader/file";
import { uploadImageFile } from "../../../services/uploader/image";
import { getFileNameFromSrc } from "../../../utils/functions";
import Calendar from "../../learns/components/Calendar";
import { ClassAssignment } from "../types/classWork";

function getFileType(file: File): string {
  const imageTypes = ["image/jpeg", "image/png", "image/gif"];
  const videoTypes = [
    "video/mp4",
    "video/avi",
    "video/quicktime",
    "video/x-ms-wmv",
  ];
  if (imageTypes.includes(file.type)) {
    return "image";
  } else if (videoTypes.includes(file.type)) {
    return "video";
  } else {
    return "file";
  }
}

function getLinkType(link: string): string {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const videoExtensions = [".mp4", ".avi", ".mov", ".wmv"];
  if (link.includes("youtube.com/watch?v=")) {
    return "video";
  } else if (link.includes("1drv.ms") || link.includes("drive.google.com")) {
    const extension = link.substring(link.lastIndexOf("."));
    if (videoExtensions.includes(extension)) {
      return "video";
    } else {
      return "file";
    }
  } else if (imageExtensions.some((ext) => link.endsWith(ext))) {
    return "image";
  } else {
    return "file";
  }
}

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-6 pb-4 pt-5">
              <div className="mt-3 text-center flex flex-col items-start">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



interface WorkCreateProps {
  availableTopics: string[];
  onSubmit: (work: ClassAssignment) => void;
  onCancel: () => void;
}
const defaultWork: ClassAssignment = {
  assignmentID: "",
  name: "",
  description: "",
  lastEdit: new Date(),
  topic: "",
  dueDate: new Date(),
  score: 0,
  nosend: 0,
  send: 0,
  attachments: [],
};

function WorkCreate({ availableTopics, onCancel, onSubmit }: WorkCreateProps) {
  const [work, setWork] = useState<ClassAssignment>(defaultWork);
  const [dropdowndete, setdropdowndete] = useState<boolean>(false);
  const [attachmentLink, setAttachmentLink] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  console.log(work);
  const handleAttachmentFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files.length == 1) {
      const attachmentType = getFileType(files[0]);
      Swal.fire({
        title: "กำลังอัพโหลดไฟล์",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      let url = "";
      if (attachmentType == "image") {
        url = await uploadImageFile(files[0]);
      } else {
        url = await uploadFile(files[0]);
      }
      setWork((work) => ({ ...work, attachments: [...work.attachments, { attachmentType: attachmentType, src: url }] }));

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "อัพโหลดไฟล์สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "เลือกได้แค่ไฟล์เดียว",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleAttachmentLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const link = e.target.value;
    setAttachmentLink(link);
  };


  const handleAddLink = () => {
    const attachmentType = getLinkType(attachmentLink);
    setWork((work) => ({ ...work, attachments: [...work.attachments, { attachmentType: attachmentType, src: attachmentLink }] }));
    setIsModalOpen(false);
  };

  const handleDeleteAttachment = (index: number) => {
    const newAttachments = work.attachments.filter((attachment, i) => i !== index);
    newAttachments.slice(index, 1);
    setWork((work) => ({ ...work, attachments: newAttachments }));
    Swal.fire({
      icon: "success",
      title: "ลบไฟล์สำเร็จ",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setAttachmentLink("");
    setIsModalOpen(false);
  };


  const onWorkNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWork((p) => ({ ...p, name: e.target.value }));
  };
  // const onWorkDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setWork((p) => ({ ...p, description: e.target.value }))
  // }

  const onWorkDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setWork((p) => ({ ...p, description: e.target.value }));
  };
  const onWorkScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value !== e.target.value) {
      Swal.fire({
        icon: "error",
        title: "คะแนนต้องเป็นตัวเลขเท่านั้น",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.value = "";
    }
    if (e.target.value != "" && Number(e.target.value) >= 0) {
      setWork((p) => ({ ...p, score: Number(e.target.value) }));
      console.log(e.target.value);
    }
  };
  const onWorkDateChange = (date: Date) => {
    if (selectedShowTime == null) {
      setSelectedShowTime("00:00"); //default
      setSelectedDate(date);
    } else {
      date.setHours(
        Number(
          `${selectedShowTime[0] == "0" ? "" : selectedShowTime[0]}${selectedShowTime[1]
          }`
        )
      );
      date.setMinutes(
        Number(
          `${selectedShowTime[3] == "0" ? "" : selectedShowTime[3]}${selectedShowTime[4]
          }`
        )
      );
    }
    setWork((p) => ({ ...p, dueDate: date }));
  };
  const setWorkTopic = (topic: string) => {
    setWork((p) => ({ ...p, topic: topic }));
  };
  const [newTopic, setNewTopic] = useState<string>("");
  const onNewTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopic(e.target.value);
    if (e.target.value != "") {
      setWorkTopic(e.target.value);
    }
  };
  const createNewTopic = () => {
    const modal = document.getElementById(
      "create-topic-modal"
    ) as HTMLDialogElement;
    modal?.showModal();
    if (newTopic != "") {
      setWorkTopic(newTopic);
    }
  };
  const [selectedTime, setSelectedDate] = useState<Date>();
  const [selectedShowTime, setSelectedShowTime] = useState<string>();
  const onWorkTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(1);
    setSelectedShowTime(event.target.value);
    console.log(2);
    selectedTime.setHours(
      Number(
        `${event.target.value[0] == "0" ? "" : event.target.value[0]}${event.target.value[1]
        }`
      )
    );
    selectedTime.setMinutes(
      Number(
        `${event.target.value[3] == "0" ? "" : event.target.value[3]}${event.target.value[4]
        }`
      )
    );
    console.log(3);
    setSelectedDate(selectedTime);
    console.log(4);
    setWork((p) => ({ ...p, dueDate: selectedTime }));
  };


  const renderPreviewAttachments = (type: string, src: string) => {
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



  const renderAttachments = () => {
    return (
      <div className="pb-4">
        {work.attachments.map((attach, index) => {
          return (
            <div key={index} className="flex h-24 items-center justify-center mt-4">
              <div className="w-10/12 h-16 border-[1px] border-[#a0a0a0] flex">
                <div className="w-2/12 border-r-[1px] border-[#a0a0a0]">
                  {renderPreviewAttachments(attach.attachmentType, attach.src)}
                </div>
                <div className="w-full h-full flex flex-col items-start justify-center mx-2 overflow-hidden">
                  <a href={attach.src} target="_bank" className="w-11/12">
                    <p className="text-sm truncate">{getFileNameFromSrc(attach.src)}</p>
                    <h1 className="text-xs mr-4 text-[#606060] truncate">
                      {attach.src}
                    </h1>
                  </a>
                </div>
              </div>
              <button
                className="mx-2 pl-4"
                onClick={() => handleDeleteAttachment(index)}
              >
                <FontAwesomeIcon icon={faTimes} size="lg"></FontAwesomeIcon>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-[#eeeeee80]">
      <div className="flex justify-between py-6 bg-white">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faX}
            size="lg"
            className="ml-6 mr-3"
            onClick={onCancel}
          />
          <div className="flex items-center justify-center rounded-full w-14 h-14 bg-gray-200 mx-4">
            <FontAwesomeIcon
              icon={faClipboardList}
              size="2xl"
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="text-black font-bold ml-5">สร้างงานในชั้นเรียน</h1>
        </div>
        <button
          className="btn rounded-lg mr-6 bg-black"
          onClick={() => {
            onSubmit(work);
          }}
        >
          <h1 className="text-white">มอบหมายงาน</h1>
        </button>
      </div>
      <hr />
      <div className="flex h-full w-[calc(100%-40px)]">
        <div className="flex flex-col w-3/4 my-10 items-center">
          <div className="flex flex-col w-3/4 bg-white rounded-lg border-[#a0a0a0] border-2">
            <input
              type="text"
              value={work.name}
              onChange={onWorkNameChange}
              className="border-[#808080] border-[1px] py-2 px-4 mb-2 mx-10 mt-10 outline-none"
              placeholder="ชื่องาน"
            />
            <textarea
              onChange={onWorkDescriptionChange}
              // onChange={onWorkDescriptionChange}
              value={work.description}
              className="border-[#808080] border-[1px] resize-none h-36 py-2 px-4 mt-2 mx-10 mb-10 outline-none"
              placeholder="อธิบายงานในส่วนนี้ (ไม่จำเป็นต้องกรอกก็ได้)"
            />
            {renderAttachments()}
          </div>
          <div className="bg-white mt-5 w-3/4 border-gray-400 border-2 rounded-xl pt-4">
            <h1 className="text-gray-500 font-bold mx-8 ">แนบ</h1>
            <div className="flex justify-center m-5">
              <div className="">
                <div className="flex justify-center items-center border-2 w-12 h-12 rounded-full">
                  <button onClick={handleOpenModal}>
                    <FontAwesomeIcon icon={faFile} size="lg" className="mx-3 cursor-pointer" />
                  </button>
                  {isModalOpen ? (
                    <Modal>
                      <h3
                        className="text-base font-semibold leading-6 self-center text-gray-900"
                        id="modal-title"
                      >
                        แนบลิ้งก์
                      </h3>
                      <input
                        onChange={handleAttachmentLinkChange}
                        value={attachmentLink}
                        placeholder="เพิ่มลิ้งก์ที่นี้"
                        className="form-input mt-1 block w-full py-2 px-3 h-10 outline-none bg-[#F9F9FA]"
                        id="linkAnc"
                        name="linkAnc"
                        type="text"
                      />
                      <label
                        htmlFor="textAnc"
                        className="font-semibold text-sm pt-2 pb-1 pl-1"
                      ></label>
                      <div className="flex w-full items-center justify-end">
                        <button
                          onClick={handleCloseModal}
                          type="button"
                          className="btn border-2 border-[#e0e0e0] w-16 bg-white text-gray-500"
                        >
                          ยกเลิก
                        </button>
                        <button
                          type="button"
                          className="btn w-16 bg-blue-500 text-white ml-2"
                          onClick={handleAddLink}
                        >
                          เพิ่ม
                        </button>
                      </div>
                    </Modal>
                  ) : (
                    <></>
                  )}
                </div>
                <h1 className="m-2">ลิ้งก์</h1>
              </div>
              <div className="ml-8">
                <div className="flex justify-center items-center border-2 w-12 h-12 rounded-full relative">
                  <button>
                    <FontAwesomeIcon
                      icon={faUpload}
                      size="lg"
                      className="mx-3"
                    />
                    <input
                      type="file"
                      id="attachments"
                      onChange={handleAttachmentFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </button>
                </div>
                <h1 className="m-2">อัพโหลด</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 bg-white">
          <h1 className="mx-10 mt-10 mb-5 text-xl font-bold">คะแนน</h1>
          <input
            type="text"
            pattern="[0-9]*"
            onChange={onWorkScoreChange}
            className="mx-10 mb-5 input bg-[#f0f0f0]"
          />
          <h1 className="mx-10 mt-10 mb-5 text-xl font-bold">กำหนดเวลา</h1>
          <div className="flex ml-10 ">
            <button
              onClick={() => {
                setdropdowndete(!dropdowndete);
              }}
              className="flex justify-center items-center h-12 w-[70%] border-solid border-2 bg-[#f0f0f0] hover:bg-gray-200 pr-5 rounded-xl"
            >
              <div className="text-sm font-medium">
                {work.dueDate
                  ? `${work.dueDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} ${work.dueDate.toLocaleDateString("th-TH", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}`
                  : ""}
              </div>
              {dropdowndete ? (
                <FontAwesomeIcon
                  icon={faCaretDown}
                  size="lg"
                  className="ml-5"
                  onClick={() => {
                    setdropdowndete(!dropdowndete);
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCaretUp}
                  size="lg"
                  className="ml-5"
                  onClick={() => {
                    setdropdowndete(!dropdowndete);
                  }}
                />
              )}
            </button>
          </div>
          {dropdowndete && (
            <div className="w-[70%] bg-white  mt-2 rounded-xl ml-10 border-solid border-2 border-gray-200 shadow-2xl">
              <div className="mb-5">
                <div className="flex justify-center w-[100%]">
                  <h1 className="w-[90%] mt-5 mb-1 text-l font-bold">
                    กำหนดวัน & เวลา
                  </h1>
                </div>
                <div className="w-[90%] h-0.5 bg-gray-100 mb-5 mx-[5%]"></div>

                {/* <input type="time"  name="time"  className="mx-10  mb-5 input input-bordered bg-[#E0E0E0] hover:bg-gray-200 w-[70%]"/>                                 */}
                <div className="flex justify-center w-[100%] mb-5  dropdown">
                  <label
                    tabIndex={0}
                    className="w-[90%] btn  border-solid border-2 bg-[#f8f8f8]"
                  >
                    <h1>
                      {work.dueDate
                        ? work.dueDate.toLocaleDateString("th-TH", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                        : "ไม่มีกำหนดส่ง"}
                    </h1>
                  </label>
                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] p-2  bg-white"
                  >
                    <Calendar
                      targetDate={work.dueDate}
                      onDateSelect={onWorkDateChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-100% mb-4">
                <input
                  className="w-[90%] p-2 m-[5%] rounded-lg border-solid border-2 bg-[#f8f8f8] hover:bg-gray-50 outline-none"
                  type="time"
                  value={selectedShowTime}
                  onChange={onWorkTimeChange}
                />
              </div>
            </div>
          )}
          <div className="w-[100%]">
            <h1 className="mx-10 mt-10 mb-5 text-xl font-bold">หัวข้อ</h1>
            <dialog id="create-topic-modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">กรุณากรอกชื่อหัวข้อ</h3>
                {/* <p className="py-4">Press ESC key or click outside to close</p> */}
                <input
                  type="text"
                  value={newTopic}
                  onChange={onNewTopicChange}
                  placeholder="หัวข้อใหม่"
                  className="mt-4 rounded-lg border-gray-300 border-2"
                />
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">ตกลง</button>
                  </form>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            <div className="dropdown  w-[100%]">
              <label tabIndex={0} className="btn m-1 mx-10 w-[72%]">
                {work.topic == "" ? "ไม่มีหัวข้อ" : work.topic}
              </label>
              <div
                tabIndex={0}
                className="dropdown-content bg-white mx-10 w-[72%]"
              >
                <ul className="p-2 shadow-2xl menu dropdown-content  bg-base-100 w-[100%]">
                  <li>
                    <a
                      onClick={() => {
                        setWorkTopic("");
                      }}
                    >
                      ไม่มีหัวข้อ
                    </a>
                  </li>
                  <li>
                    <a onClick={createNewTopic}>
                      {newTopic
                        ? newTopic + " (หัวข้อใหม่)"
                        : "สร้างหัวข้อใหม่"}
                    </a>
                  </li>
                  <hr />
                  {availableTopics.map((topic) => {
                    return (
                      <li>
                        <a
                          onClick={() => {
                            setWorkTopic(topic);
                          }}
                        >
                          {topic}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkCreate;
