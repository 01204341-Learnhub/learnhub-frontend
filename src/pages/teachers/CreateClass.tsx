import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faCircle as faCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassCardPreview from "../../features/teaches/components/ClassCardPreview.tsx";
import ClassDatesInfoForm from "../../features/teaches/components/ClassDatesInfoForm.tsx";
import ClassGoalsInfoForm from "../../features/teaches/components/ClassGoalsInfoForm.tsx";
import ClassPublishingInfoForm from "../../features/teaches/components/ClassPublishingInfoForm.tsx";
import { CreatingClass } from "../../features/teaches/types/class.ts";
import { useUser } from "../../hooks/useUser.ts";

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
        className={`w-fit h-fit p-3 hover:drop-shadow-md ${
          !readyToPublish || onPublish === undefined
            ? "bg-gray-200"
            : "bg-[#D9D9D9]"
        }`}
        onClick={onPublish}
      >
        <h1
          className={`font-semibold text-[20px] ${
            !readyToPublish || onPublish === undefined
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
  cls: CreatingClass;
}

function _TopPanel({ cls }: _TopPanelProps) {
  return (
    <div className="flex justify-start items-stretch space-x-10 w-full">
      <div className="bg-[#D9D9D9] p-6 w-fit h-fit">
        <ClassCardPreview
          classThumbnailUrl={cls.pictureUrl}
          className={cls.name}
          level={cls.level}
          category={cls.tag?.name}
          price={cls.price}
          instructorName={cls.teacher.fullname}
        />
      </div>
      <div className="flex flex-col justify-start items-start space-y-3 px-10 py-6 bg-white w-full min-w-fit">
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">Info 1</p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {"Goes here"}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">Info 2</p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {"Goes here"}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">Info 3</p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {"Goes here"}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">Info 4</p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {"Goes here"}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">Info 5</p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {"Goes here"}
          </p>
        </div>
      </div>
    </div>
  );
}

function checkReadyToPublish(cls: CreatingClass) {
  return (
    cls.name !== "" &&
    cls.pictureUrl !== "" &&
    cls.description !== "" &&
    cls.maxStudent > 0 &&
    cls.maxStudent <= 100 &&
    cls.price >= 0 &&
    cls.objectives.length > 0 &&
    cls.objectives.every((objective) => objective !== "") &&
    cls.requirement !== "" &&
    cls.level !== "" &&
    cls.tag !== undefined &&
    cls.schedule.length > 0 &&
    cls.start !== undefined &&
    cls.registrationEnd !== undefined &&
    cls.end !== undefined
  );
}

interface CreatingClassContextType {
  cls: CreatingClass;
  setCls: (cls: CreatingClass) => void;
}

const CreatingClassContext = createContext<
  CreatingClassContextType | undefined
>(undefined);

function CreateClass() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [cls, setCls] = useState<CreatingClass>({
    name: "",
    pictureUrl: "https://placehold.co/1920x1080",
    teacher: user,
    description: "",
    maxStudent: 0,
    price: 0,
    objectives: ["", "", "", ""],
    requirement: "",
    level: "",
    tag: undefined,
    schedule: [],
    start: undefined,
    registrationEnd: undefined,
    end: undefined,
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
          <CreatingClassContext.Provider value={{ cls: cls, setCls: setCls }}>
            <ClassGoalsInfoForm />
          </CreatingClassContext.Provider>
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
          <CreatingClassContext.Provider value={{ cls: cls, setCls: setCls }}>
            <ClassDatesInfoForm />
          </CreatingClassContext.Provider>
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
          <CreatingClassContext.Provider value={{ cls: cls, setCls: setCls }}>
            <ClassPublishingInfoForm />
          </CreatingClassContext.Provider>
        </div>
      </div>
    );
  }
}

export default CreateClass;
export { CreatingClassContext };
