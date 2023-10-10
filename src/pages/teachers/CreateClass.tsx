import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faCircle as faCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassCardPreview from "../../features/teaches/components/ClassCardPreview.tsx";
import ClassDatesInfoForm from "../../features/teaches/components/ClassDatesInfoForm.tsx";
import ClassGoalsInfoForm from "../../features/teaches/components/ClassGoalsInfoForm.tsx";
import ClassPublishingInfoForm from "../../features/teaches/components/ClassPublishingInfoForm.tsx";
import {
  availableCategories,
  Class,
} from "../../features/teaches/types/class.ts";

interface _SideNavProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onPublish?: () => void;
  readyToPublish: boolean;
}

function _SideNav({
  currentTab,
  onChangeTab,
  onPublish,
  readyToPublish,
}: _SideNavProps) {
  return (
    <div className="flex flex-col justify-start items-start space-y-5 min-w-fit">
      <div className="bg-white flex flex-col justify-start items-start p-5 space-y-3 w-fit h-fit">
        <button
          className="flex justify-start items-center space-x-4"
          onClick={() => {
            onChangeTab("goals");
          }}
        >
          <FontAwesomeIcon
            icon={currentTab === "goals" ? faCircleSolid : faCircleRegular}
            color="black"
          />
          <h1 className="font-semibold text-black text-[18px]">
            เป้าหมายของคลาส
          </h1>
        </button>
        <button
          className="flex justify-start items-center space-x-4"
          onClick={() => {
            onChangeTab("dates");
          }}
        >
          <FontAwesomeIcon
            icon={currentTab === "dates" ? faCircleSolid : faCircleRegular}
            color="black"
          />
          <h1 className="font-semibold text-black text-[18px]">
            กำหนดเวลาของคลาส
          </h1>
        </button>
        <button
          className="flex justify-start items-center space-x-4"
          onClick={() => {
            onChangeTab("publishing");
          }}
        >
          <FontAwesomeIcon
            icon={currentTab === "publishing" ? faCircleSolid : faCircleRegular}
            color="black"
          />
          <h1 className="font-semibold text-black text-[18px]">
            การเผยแพร่คลาส
          </h1>
        </button>
      </div>
      <button
        className={`w-fit h-fit p-3 hover:drop-shadow-md ${!readyToPublish || onPublish === undefined
            ? "bg-gray-200"
            : "bg-[#D9D9D9]"
          }`}
        onClick={onPublish}
      >
        <h1
          className={`font-semibold text-[20px] ${!readyToPublish || onPublish === undefined
              ? "text-gray-400"
              : "text-black"
            }`}
        >
          เผยแพร่คลาส
        </h1>
      </button>
    </div>
  );
}

interface _TopNavProps {
  onQuit: () => void;
}

function _TopNav({ onQuit }: _TopNavProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-black font-semibold text-[32px]">สร้างคลาส</h1>
      <button className="flex items-center space-x-4 w-fit" onClick={onQuit}>
        <h1 className="text-black font-semibold text-[29px]">ออก</h1>
        <FontAwesomeIcon icon={faArrowRight} color="black" size="lg" />
      </button>
    </div>
  );
}

interface _TopPanelProps {
  cls: Class;
}

function _TopPanel({ cls }: _TopPanelProps) {
  const diff = Math.abs(cls.endDate.getTime() - cls.startDate.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return (
    <div className="flex justify-start items-stretch space-x-10 w-full">
      <div className="bg-[#D9D9D9] p-6 w-fit h-fit">
        <ClassCardPreview
          classThumbnailUrl={cls.thumbnailUrl}
          className={cls.name}
          level={cls.level}
          price={cls.price}
          tag={
            availableCategories.find(
              (category) => category.categoryId === cls.categoryId,
            )?.name
          }
          instructorName={cls.instructorName}
        />
      </div>
      <div className="flex flex-col justify-start items-start space-y-3 px-10 py-6 bg-white w-full min-w-fit">
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            วันแรกของการเรียน
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {cls.startDate?.toLocaleDateString("th-TH")}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            วันสุดท้ายของการเรียน
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {cls.endDate?.toLocaleDateString("th-TH")}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            ระยะเวลาการเรียน
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {diffDays} วัน
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            วันสุดท้ายของการลงทะเบียน
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {cls.lastDateToRegister?.toLocaleDateString("th-TH")}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            จำกัดจำนวนผู้เรียนมากสุด
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {cls.studentLimit} คน
          </p>
        </div>
      </div>
    </div>
  );
}

function checkReadyToPublish(cls: Class) {
  return (
    cls.classId !== "" &&
    cls.name !== "" &&
    cls.thumbnailUrl !== "" &&
    cls.categoryId !== "" &&
    cls.level !== "" &&
    cls.instructorName !== "" &&
    cls.description !== "" &&
    cls.objectives.every((objective) => objective !== "") &&
    cls.requirement !== "" &&
    cls.studentLimit !== 0 &&
    cls.startDate !== null &&
    cls.endDate !== null &&
    cls.lastDateToRegister !== null
  );
}

interface ClassContextType {
  cls: Class;
  setCls: (cls: Class) => void;
}

const ClassContext = React.createContext<ClassContextType | undefined>(
  undefined,
);

function CreateClass() {
  const navigate = useNavigate();
  const [cls, setCls] = useState<Class>({
    classId: "1234567890", // TODO: Get an ID, possibly uuid.
    name: "",
    thumbnailUrl: "https://placehold.co/1920x1080",
    categoryId: "",
    level: "",
    instructorName: "John Doe", // TODO: Get from user profile.
    description: "",
    objectives: ["", "", "", ""],
    requirement: "",
    price: 0,
    rating: 0,
    studentCount: 0,
    studentLimit: 20, // TODO: Set in somewhere.
    startDate: new Date("2023-09-15"), // TODO: Set in ClassDatesInfoForm.
    endDate: new Date("2023-10-22"), // TODO: Set in ClassDatesInfoForm.
    lastDateToRegister: new Date("2023-09-14"), // TODO: Set in ClassDatesInfoForm.
    threads: [],
  });
  const [currentTab, setCurrentTab] = useState<string>("goals");

  const handlePublishClass = () => {
    // TODO: Send the class to the server.
    console.log(cls);
  };

  if (currentTab == "goals") {
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <_TopPanel cls={cls} />
        <div className="flex justify-start items-start space-x-10 w-full h-fit">
          <_SideNav
            currentTab="goals"
            onChangeTab={setCurrentTab}
            onPublish={handlePublishClass}
            readyToPublish={checkReadyToPublish(cls)}
          />
          <ClassContext.Provider value={{ cls, setCls }}>
            <ClassGoalsInfoForm />
          </ClassContext.Provider>
        </div>
      </div>
    );
  } else if (currentTab == "dates") {
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <_TopPanel cls={cls} />
        <div className="flex justify-start items-start space-x-10 w-full h-fit">
          <_SideNav
            currentTab="dates"
            onChangeTab={setCurrentTab}
            onPublish={handlePublishClass}
            readyToPublish={checkReadyToPublish(cls)}
          />
          <ClassContext.Provider value={{ cls, setCls }}>
            <ClassDatesInfoForm />
          </ClassContext.Provider>
        </div>
      </div>
    );
  } else if (currentTab == "publishing") {
    return (
      <div className="flex flex-col justify-start items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <_TopNav
          onQuit={() => {
            navigate("/teach/overview");
          }}
        />
        <_TopPanel cls={cls} />
        <div className="flex justify-start items-start space-x-10 w-full h-fit">
          <_SideNav
            currentTab="publishing"
            onChangeTab={setCurrentTab}
            onPublish={handlePublishClass}
            readyToPublish={checkReadyToPublish(cls)}
          />
          <ClassContext.Provider value={{ cls, setCls }}>
            <ClassPublishingInfoForm />
          </ClassContext.Provider>
        </div>
      </div>
    );
  }
}

export default CreateClass;
export { ClassContext };
