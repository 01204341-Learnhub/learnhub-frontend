import { useContext, useState } from "react";
import { CreatingClassContext } from "../../../pages/teachers/CreateClass";
import BetterCalendar from "./BetterCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTimes } from "@fortawesome/free-solid-svg-icons";

function _isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

function _RegistrationEnd() {
  const creatingClassContext = useContext(CreatingClassContext);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleSelectDate = (date: Date) => {
    if (
      selectedDates.some((selectedDates) => _isSameDay(selectedDates, date))
    ) {
      setSelectedDates([]);
      const updatedClass = { ...creatingClassContext.cls };
      updatedClass.registrationEnd = undefined;
      creatingClassContext.setCls(updatedClass);
    } else {
      setSelectedDates([date]);
      const updatedClass = { ...creatingClassContext.cls };
      updatedClass.registrationEnd = new Date(date.setHours(23, 59, 0, 0));
      creatingClassContext.setCls(updatedClass);
    }
  };

  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        กำหนดวันสิ้นสุดการลงทะเบียนของคลาส
      </h2>
      <p className="text-black text-[16px]">
        เลือกเดือน และ “คลิก” วันจากปฏิทินด้านล่างนี้ เพื่อกำหนดวันสิ้นสุด
        โดยเวลาสิ้นสุดจะเป็น 23.59 น. ของวันที่คุณกำหนด
      </p>
      <div className="self-center pt-2 pb-4">
        <BetterCalendar
          onDateSelect={handleSelectDate}
          targetDates={selectedDates}
        />
      </div>
      <p className="text-black text-[16px] font-semibold">
        {creatingClassContext.cls.registrationEnd !== undefined ? (
          `วันที่คุณเลือก: ${creatingClassContext.cls.registrationEnd.toLocaleString(
            "th-TH",
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}`
        ) : (
          <span className="text-black text-[16px]">
            {"วันที่คุณเลือก: ยังไม่ได้เลือก"}
          </span>
        )}
      </p>
    </div>
  );
}

function _Schedule() {
  const creatingClassContext = useContext(CreatingClassContext);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    creatingClassContext.cls.schedule.map((session) => session.start)
  );
  const [startHour, setStartHour] = useState<number | undefined>(undefined);
  const [startMinute, setStartMinute] = useState<number | undefined>(undefined);
  const [endHour, setEndHour] = useState<number | undefined>(undefined);
  const [endMinute, setEndMinute] = useState<number | undefined>(undefined);

  const handleSelectDate = (date: Date) => {
    if (date.getTime() < new Date().setHours(0, 0, 0, 0)) {
      alert("ไม่สามารถเลือกวันในอดีตได้");
      return;
    }
    if (selectedDates.some((selectedDate) => _isSameDay(selectedDate, date))) {
      setSelectedDates(
        selectedDates.filter((selectedDate) => !_isSameDay(selectedDate, date))
      );
      const updatedClass = { ...creatingClassContext.cls };
      updatedClass.schedule = updatedClass.schedule.filter(
        (session) => !_isSameDay(session.start, date)
      );
      creatingClassContext.setCls(updatedClass);
      return;
    }
    setSelectedDate(date);
    setStartHour(0);
    setStartMinute(0);
    setEndHour(0);
    setEndMinute(0);
    (
      document.getElementById("select-session-time-dialog") as HTMLDialogElement
    ).showModal();
  };

  const inputIsCompleteAndValid = () => {
    return (
      startHour <= endHour &&
      (startHour < endHour || startMinute < endMinute) &&
      new Date(selectedDate.setHours(endHour, endMinute)).getTime() -
        new Date(selectedDate.setHours(startHour, startMinute)).getTime() >=
        30 * 60 * 1000
    );
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-3 w-full">
        <h2 className="text-black text-[18px] font-semibold">
          กำหนดวันที่เรียนของคลาส
        </h2>
        <p className="text-black text-[16px]">
          คุณสามารถกำหนดเวลาที่คุณพร้อมที่จะเริ่มสอนได้ และ
          วันที่ที่คุณจะใช้สอนทั้งหมดในคลาสเรียนของคุณ
        </p>
        <p className="text-black text-[14px] font-semibold">
          *ความยาวการสอนหนึ่งครั้งต้องยาวอย่างน้อย 30 นาที
        </p>
        <div className="self-center pt-2 pb-4">
          <BetterCalendar
            onDateSelect={handleSelectDate}
            targetDates={selectedDates}
          />
        </div>
        <div className="flex space-x-4 items-start w-full">
          <p className="text-black text-[16px] font-semibold min-w-fit">
            วันและเวลาที่คุณเลือก:
          </p>
          <div className="flex flex-col space-y-2 w-full">
            {creatingClassContext.cls.schedule.map((session, index) => (
              <div
                key={index}
                className="flex justify-start items-center space-x-3 p-2 bg-[#F5F5F5] border-[#808080] border-[1px] w-[85%]"
              >
                <p className="text-black text-[16px] font-medium">
                  {session.start.toLocaleDateString("th-TH", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <FontAwesomeIcon icon={faClock} color="black" />
                <p className="text-black text-[16px] font-medium">
                  {session.start.toLocaleTimeString("th-TH", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" - "}
                  {session.end.toLocaleTimeString("th-TH", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="flex-1"></div>
                <button
                  onClick={() => {
                    setSelectedDates(
                      selectedDates.filter(
                        (date) => !_isSameDay(date, session.start)
                      )
                    );
                    const updatedClass = { ...creatingClassContext.cls };
                    updatedClass.schedule = updatedClass.schedule.filter(
                      (s) => s !== session
                    );
                    creatingClassContext.setCls(updatedClass);
                  }}
                  className="rounded-full min-w-[30px] min-h-[30px] bg-[#E5E5E5] hover:opacity-80 hover:bg-[#C4C4C4] hover:drop-shadow-md"
                >
                  <FontAwesomeIcon icon={faTimes} color="black" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <dialog id="select-session-time-dialog" className="modal">
        <div className="modal-box w-fit">
          <div className="flex flex-col items-center space-y-4">
            <div className="self-start flex space-x-3 items-center">
              <FontAwesomeIcon icon={faClock} color="black" />
              <h1 className="text-lack text-[18px] font-semibold">เลือกเวลา</h1>
            </div>
            <div className="flex space-x-3 items-center">
              <p className="text-black text-[18px] font-semibold">เริ่มต้น</p>
              <select
                className="border-2 border-[#C0C0C0] py-2 px-3 w-fit"
                onChange={(e) => {
                  console.log(e.target.value);
                  setStartHour(parseInt(e.target.value));
                }}
                value={startHour}
              >
                <option value={""} disabled>
                  ชั่วโมง
                </option>
                {[...Array(24).keys()].map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <select
                className="border-2 border-[#C0C0C0] py-2 px-3 w-fit"
                onChange={(e) => {
                  console.log(e.target.value);
                  setStartMinute(parseInt(e.target.value));
                }}
                value={startMinute}
              >
                <option value={""} disabled>
                  นาที
                </option>
                {[...Array(60).keys()].map((minute, index) => (
                  <option key={index} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-3 items-center">
              <p className="text-black text-[18px] font-semibold">สิ้นสุด</p>
              <select
                className="border-2 border-[#C0C0C0] py-2 px-3 w-fit"
                onChange={(e) => {
                  console.log(e.target.value);
                  setEndHour(parseInt(e.target.value));
                }}
                value={endHour}
              >
                <option value={""} disabled>
                  ชั่วโมง
                </option>
                {[...Array(24).keys()].map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <select
                className="border-2 border-[#C0C0C0] py-2 px-3 w-fit"
                onChange={(e) => {
                  console.log(e.target.value);
                  setEndMinute(parseInt(e.target.value));
                }}
                value={endMinute}
              >
                <option value={""} disabled>
                  นาที
                </option>
                {[...Array(60).keys()].map((minute, index) => (
                  <option key={index} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
            <form method="dialog">
              <button
                className={`text-[#068FFF] text-[18px] font-semibold ${
                  inputIsCompleteAndValid() ? "block" : "hidden"
                }`}
                onClick={() => {
                  setSelectedDates([...selectedDates, selectedDate]);
                  const updatedClass = { ...creatingClassContext.cls };
                  updatedClass.schedule.push({
                    start: new Date(
                      selectedDate.setHours(startHour, startMinute)
                    ),
                    end: new Date(selectedDate.setHours(endHour, endMinute)),
                  });
                  updatedClass.schedule.sort((a, b) =>
                    a.start.getTime() < b.start.getTime() ? -1 : 1
                  );
                  creatingClassContext.setCls(updatedClass);
                }}
              >
                ตกลง
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ClassDatesInfoForm() {
  return (
    <div className="flex flex-col justify-start items-start space-y-10 bg-white p-8 w-full">
      <h1 className="text-[32px] font-semibold text-black w-full pb-4 border-b-2">
        กำหนดเวลาของคลาส
      </h1>
      <_RegistrationEnd />
      <_Schedule />
    </div>
  );
}

export default ClassDatesInfoForm;
