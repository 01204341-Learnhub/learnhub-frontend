import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faCircle as faCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { LoadingSpash } from "../../components/LoadingSpash.tsx";
import ClassCardPreview from "../../features/teaches/components/ClassCardPreview.tsx";
import ClassDateUpdateInfoForm from "../../features/teaches/components/ClassDateUpdateInforform.tsx";
import ClassGoalsUpdateForm from "../../features/teaches/components/ClassGoalsUpdateForm.tsx";
import ClassUpdatingInfoForm from "../../features/teaches/components/ClassUpdatingInfoForm.tsx";
import { useUpdatingClass } from "../../features/teaches/hooks/useUpdatingClass.ts";
import { updateClass } from "../../features/teaches/services/classes.ts";
import { CreatingClass } from "../../features/teaches/types/class.ts";

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
          อัพเดทคลาส
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
      <h1 className="text-black font-semibold text-[32px]">อัพเดทคลาส</h1>
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
          <p className="text-[#808080] text-[20px] font-semibold">
            วันสิ้นสุดการลงทะเบียน
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {cls.registrationEnd === undefined
              ? "ยังไม่ได้กำหนด"
              : cls.registrationEnd.toLocaleDateString("th-TH")}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            จำนวนครั้งการเรียน
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {cls.schedule.length} ครั้ง
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            วันแรกของการเรียน
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {cls.start === undefined
              ? "ยังไม่ได้กำหนด"
              : cls.start.toLocaleDateString("th-TH")}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            วันสุดท้ายของการเรียน
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {cls.start === undefined
              ? "ยังไม่ได้กำหนด"
              : cls.end.toLocaleDateString("th-TH")}
          </p>
        </div>
        <div className="flex justify-between items-center w-[450px]">
          <p className="text-[#808080] text-[20px] font-semibold">
            จำนวนผู้เรียนสูงสุด
          </p>
          <p className="text-[#808080] text-[20px] font-semibold">
            {cls.maxStudent} คน
          </p>
        </div>
      </div>
    </div>
  );
}

function checkReadyToPublish(cls: CreatingClass) {
  if (cls.name === "" || cls.pictureUrl === "" || cls.description.trim() === "") return false;
  if (cls.maxStudent <= 0 || cls.maxStudent > 100) return false;
  if (cls.price < 0) return false;
  if (cls.objectives.length !== 4) return false;
  if (cls.objectives.some((objective) => objective.trim() === "")) return false;
  if (cls.requirement.trim() === "") return false;
  if (cls.level === "") return false;
  if (cls.tag === undefined) return false;
  if (cls.schedule.length === 0) return false;
  if (cls.registrationEnd === undefined) return false;
  return true;
}

interface UpdatingClassContextType {
  cls: CreatingClass;
  setCls: (cls: CreatingClass) => void;
}

const UpdatingClassContext = createContext<
  UpdatingClassContextType | undefined
>(undefined);

function UpdateClass() {
  const navigate = useNavigate();
  const { classID } = useParams<{ classID: string }>()
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { cls, setCls, isFetching } = useUpdatingClass(classID);
  const [currentTab, setCurrentTab] = useState<string>("goals");

  const handleUpdateClass = () => {
    if (!checkReadyToPublish(cls)) {
      console.log(cls);
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setIsUpdating(true);
    updateClass(cls, classID)
      .then(() => {
        Swal.fire({
          title: "อัพเดทคลาสสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        })
      })
      .catch(() => {
        Swal.fire({
          title: "อัพเดทคลาสไม่สำเร็จ",
          text: "กรุณาลองใหม่อีกครั้ง",
          icon: "error",
          confirmButtonText: "ตกลง",
        })
      }).finally(() => {
        setIsUpdating(false);
      })
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpash />
      </div>
    )
  }

  if (isUpdating) {
    return (
      <div className="flex flex-col justify-center items-center space-y-10 p-10 bg-[#EEEEEE80] w-full min-h-screen">
        <h1 className="text-black font-semibold text-[32px]">กำลังอัพเดทคลาส</h1>
      </div>
    )
  }
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
            onPublish={handleUpdateClass}
            readyToPublish={checkReadyToPublish(cls)}
          />
          <UpdatingClassContext.Provider value={{ cls: cls, setCls: setCls }}>
            <ClassGoalsUpdateForm />
          </UpdatingClassContext.Provider>
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
            onPublish={handleUpdateClass}
            readyToPublish={checkReadyToPublish(cls)}
          />
          <UpdatingClassContext.Provider value={{ cls: cls, setCls: setCls }}>
            <ClassDateUpdateInfoForm />
          </UpdatingClassContext.Provider>
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
            onPublish={handleUpdateClass}
            readyToPublish={checkReadyToPublish(cls)}
          />
          <UpdatingClassContext.Provider value={{ cls: cls, setCls: setCls }}>
            <ClassUpdatingInfoForm />
          </UpdatingClassContext.Provider>
        </div>
      </div>
    );
  }
}

export default UpdateClass;
export { UpdatingClassContext };

