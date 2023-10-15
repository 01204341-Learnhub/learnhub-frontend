import {
  faCaretDown,
  faCaretUp,
  faClipboardList,
  faFile,
  faUpload,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useState } from "react";
import Calendar from "../../learns/components/Calendar";
import { Work } from "../types/classWork";

interface WorkCreateProps {
  availableTopics: string[];
  onSubmit: (work: Work) => void;
  onCancel: () => void;
}

function WorkCreate({ availableTopics, onCancel, onSubmit }: WorkCreateProps) {
  const [work, setWork] = useState<Work>({
    name: "",
    description: "",
    attachments: [],
    score: 0,
    topic: "",
    send: 0,
    nosend: 0,
  });
  const [dropdowndete, setdropdowndete] = useState<boolean>(false);

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
          `${selectedShowTime[0] == "0" ? "" : selectedShowTime[0]}${
            selectedShowTime[1]
          }`
        )
      );
      date.setMinutes(
        Number(
          `${selectedShowTime[3] == "0" ? "" : selectedShowTime[3]}${
            selectedShowTime[4]
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
        `${event.target.value[0] == "0" ? "" : event.target.value[0]}${
          event.target.value[1]
        }`
      )
    );
    selectedTime.setMinutes(
      Number(
        `${event.target.value[3] == "0" ? "" : event.target.value[3]}${
          event.target.value[4]
        }`
      )
    );
    console.log(3);
    setSelectedDate(selectedTime);
    console.log(4);
    setWork((p) => ({ ...p, dueDate: selectedTime }));
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
      <div className="flex h-full w-full">
        <div className="w-3/4 m-10">
          <div className="flex flex-col bg-white rounded-lg border-[#a0a0a0] border-2">
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
          </div>
          <div className="bg-white mt-5 border-gray-400 border-2 rounded-xl pt-4">
            <h1 className="text-gray-500 font-bold mx-8 ">แนบ</h1>
            <div className="flex justify-center m-5">
              <div className="ml-8">
                <div className="flex justify-center items-center border-2 w-12 h-12 rounded-full">
                  <button>
                    <FontAwesomeIcon icon={faFile} size="lg" className="mx-3" />
                  </button>
                </div>
                <h1 className="m-2">ลิ้งก์</h1>
              </div>
              <div className="ml-8">
                <div className="flex justify-center items-center border-2 w-12 h-12 rounded-full">
                  <button>
                    <FontAwesomeIcon
                      icon={faUpload}
                      size="lg"
                      className="mx-3"
                    />
                  </button>
                </div>
                <h1 className="m-2">อัพโหลด</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 bg-white ">
          <h1 className="mx-10 mt-10 mb-5 text-xl font-bold">คะแนน</h1>
          <input
            type="text"
            pattern="[0-9]+"
            onChange={onWorkScoreChange}
            className="mx-10 mb-5 input input-bordered bg-[#f0f0f0]"
          />
          <h1 className="mx-10 mt-10 mb-5 text-xl font-bold">กำหนดเวลา</h1>
          <div className="flex w-[100%] ml-10 ">
            <button
              onClick={() => {
                setdropdowndete(!dropdowndete);
              }}
              className="flex justify-end items-center h-12 w-[70%] border-solid border-2 border-gray-400 bg-[#f0f0f0] hover:bg-gray-200 pr-5 rounded-xl"
            >
              <div className="mr-1">
                {work.dueDate
                  ? `${work.dueDate.toLocaleTimeString()} ${work.dueDate.toDateString()}`
                  : ""}
              </div>
              {dropdowndete ? (
                <FontAwesomeIcon
                  icon={faCaretDown}
                  size="lg"
                  onClick={() => {
                    setdropdowndete(!dropdowndete);
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCaretUp}
                  size="lg"
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
                <div className="w-[90%] h-0.5 bg-gray-200 mb-5 mx-[5%]"></div>

                {/* <input type="time"  name="time"  className="mx-10  mb-5 input input-bordered bg-[#E0E0E0] hover:bg-gray-200 w-[70%]"/>                                 */}
                <div className="flex justify-center w-[100%] mb-5  dropdown">
                  <label
                    tabIndex={0}
                    className="w-[90%] btn  border-solid border-2 border-gray-200 shadow-md over"
                  >
                    <h1>
                      {work.dueDate
                        ? work.dueDate.toDateString()
                        : "ไม่มีกำหนดส่ง"}
                    </h1>
                  </label>
                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] p-2  bg-white "
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
                  className="w-[90%] p-2 m-[5%] rounded-lg border-solid border-2 border-gray-200 shadow-md  bg-gray-100 hover:bg-gray-200"
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
