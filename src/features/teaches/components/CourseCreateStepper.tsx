import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type BasicCourseInfo = {
  courseName: string;
  courseCategory: string;
  courseLevel: string;
};

interface CourseCreateStepperProps {
  onSubmit: (info: BasicCourseInfo) => void;
}

function _StepperNav({
  onPrev,
  onNext,
  nextWord,
  readyToNext,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  nextWord?: string;
  readyToNext: boolean;
}) {
  return (
    <div className="flex flex-row justify-between items-center bg-white p-8 m-2">
      <button
        onClick={onPrev}
        className={`bg-black ${
          onPrev !== undefined ? "block" : "hidden"
        } rounded-lg py-2 px-3 hover:drop-shadow-md flex flex-row justify-center items-center space-x-2 `}
      >
        <FontAwesomeIcon icon={faAngleLeft} color="white" />
        <p className="text-white font-normal">ก่อนหน้า</p>
      </button>

      <div className="flex-grow"></div>

      <button
        onClick={readyToNext ? onNext : undefined}
        className={`${readyToNext ? "bg-black" : "bg-[#C0C0C0]"} ${
          onNext !== undefined ? "block" : "hidden"
        } rounded-lg py-2 px-3 hover:drop-shadow-md flex flex-row justify-center items-center space-x-2`}
      >
        <p className="text-white font-normal">{nextWord ?? "ถัดไป"}</p>
        <FontAwesomeIcon icon={faAngleRight} color="white" />
      </button>
    </div>
  );
}

function CourseCreateStepper({ onSubmit }: CourseCreateStepperProps) {
  const [step, setStep] = useState(1);
  const [courseName, setCourseName] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const navigate = useNavigate();

  const onNext = () => {
    setStep(step + 1);
  };

  const onPrev = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep(step - 1);
    }
  };

  const checkInputOk = () => {
    if (step === 1) {
      return courseName.length > 0 && courseName.length <= 60;
    } else if (step === 2) {
      return courseCategory !== "";
    } else if (step === 3) {
      return courseLevel !== "";
    } else {
      return false;
    }
  };

  const onSubmitCourse = () => {
    onSubmit({
      courseName,
      courseCategory,
      courseLevel,
    });
  };

  if (step == 1) {
    return (
      <div className="relative w-full h-[500px] bg-[#F0F0F0] border-black border-2">
        <div className="flex flex-col justify-center mt-[120px]">
          <p className="text-black text-center text-[24px] font-bold">
            ชื่อคอร์สเรียนของคุณ
          </p>
          <p className="text-black text-center text-[18px] font-normal mt-[18px]">
            ไม่เป็นไรหากไม่สามารถคิดชื่อที่เหมาะสมได้ในตอนนี้
            คุณสามารถเปลี่ยนได้ในภายหลัง
          </p>
          <input
            type="text"
            value={courseName}
            placeholder="ตัวอย่าง : เรียนรู้วิธีใช้ microsoft word เริ่มจาก 0"
            onChange={(e) => setCourseName(e.target.value)}
            maxLength={60}
            className="mt-[29px] mx-auto w-2/3 max-w-[585px] h-[45px] px-4"
          />
        </div>
        <div className="absolute bottom-0 w-full">
          <_StepperNav
            onPrev={onPrev}
            onNext={onNext}
            readyToNext={checkInputOk()}
          />
        </div>
      </div>
    );
  } else if (step == 2) {
    return (
      <div className="relative w-full h-[500px] bg-[#F0F0F0] border-black border-2">
        <div className="flex flex-col justify-center mt-[120px]">
          <p className="text-black text-center text-[24px] font-bold">
            หมวดหมู่คอร์สเรียนของคุณ
          </p>
          <p className="text-black text-center text-[18px] font-normal mt-[18px]">
            หากคุณไม่แน่ใจว่าหมวดหมู่ถูกต้องหรือไม่ คุณสามารถเปลี่ยนได้ในภายหลัง
          </p>
          <select
            value={courseCategory}
            onChange={(e) => setCourseCategory(e.target.value)}
            className="mt-[29px] mx-auto w-2/3 max-w-[585px] h-[45px] px-4"
          >
            <option value="">เลือกหมวดหมู่</option>
            <option value="programming">การเขียนโปรแกรม</option>
            <option value="graphic design">การออกแบบกราฟิก</option>
            <option value="marketing">การตลาด</option>
            <option value="learning">การเรียนรู้</option>
          </select>
        </div>
        <div className="absolute bottom-0 w-full">
          <_StepperNav
            onPrev={onPrev}
            onNext={onNext}
            readyToNext={checkInputOk()}
          />
        </div>
      </div>
    );
  } else if (step == 3) {
    return (
      <div className="relative w-full h-[500px] bg-[#F0F0F0] border-black border-2">
        <div className="flex flex-col justify-center mt-[120px]">
          <p className="text-black text-center text-[24px] font-bold">
            ระดับคอร์สเรียนของคุณ
          </p>
          <p className="text-black text-center text-[18px] font-normal mt-[18px]">
            หากคุณไม่แน่ใจว่าระดับถูกต้องหรือไม่ คุณสามารถเปลี่ยนได้ในภายหลัง
          </p>
          <select
            value={courseLevel}
            onChange={(e) => setCourseLevel(e.target.value)}
            className="mt-[29px] mx-auto w-2/3 max-w-[585px] h-[45px] px-4"
          >
            <option value="">เลือกระดับ</option>
            <option value="beginner">ระดับต้น</option>
            <option value="intermediate">ระดับกลาง</option>
            <option value="advanced">ระดับสูง</option>
          </select>
        </div>
        <div className="absolute bottom-0 w-full">
          <_StepperNav
            onPrev={onPrev}
            onNext={onSubmitCourse}
            nextWord="สร้าง"
            readyToNext={checkInputOk()}
          />
        </div>
      </div>
    );
  }
}

export default CourseCreateStepper;
export type { BasicCourseInfo };
