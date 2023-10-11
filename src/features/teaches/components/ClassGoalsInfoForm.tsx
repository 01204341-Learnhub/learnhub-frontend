import { useContext } from "react";
import { ClassContext } from "../../../pages/teachers/CreateClass.tsx";
import { availableLevels } from "../types/class.ts";

function _Objectives() {
  const classContext = useContext(ClassContext);
  const onUpdateObjective = (value: string, index: number) => {
    const updatedClass = { ...classContext.cls };
    updatedClass.objectives[index] = value;
    classContext.setCls(updatedClass);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        ผู้เรียนจะได้เรียนสิ่งใดในหลักสูตรของคุณ
      </h2>
      <p className="text-[16px] text-black">
        คุณต้องกรอกจุดประสงค์การเรียนรู้หรือผลลัพธ์ที่ผู้เรียนคาดหวังหลังจากเรียนจบหลักสูตรจำนวน
        4 รายการ
      </p>
      <div className="flex flex-col justify-start items-start space-y-2 w-[90%]">
        {classContext.cls.objectives.map((objective, index) => {
          return (
            <input
              className="border-2 border-[#C0C0C0] py-2 px-3 w-full"
              type="text"
              value={classContext.cls.objectives[index]}
              onChange={(e) => {
                onUpdateObjective(e.target.value, index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function _Requirement() {
  const classContext = useContext(ClassContext);
  const onUpdateRequirement = (value: string) => {
    const updatedClass = { ...classContext.cls };
    updatedClass.requirement = value;
    classContext.setCls(updatedClass);
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-3 w-full">
      <h2 className="text-black text-[18px] font-semibold">
        ความต้องการหรือข้อกำหนดเบื้องต้นสำหรับการเรียนหลักสูตรของคุณมีอะไรบ้าง
      </h2>
      <p className="text-[16px] text-black">
        ระบุทักษะที่จำเป็น ประสบการณ์
        เครื่องมือหรืออุปกรณ์ที่ผู้เรียนควรมีก่อนเรียนหลักสูตรหากไม่มีความต้องการ
        ให้ใช้พื้นที่นี้เป็นโอกาสในการลดอุปสรรคสำหรับผู้เริ่มต้น
      </p>
      <textarea
        className="border-2 border-[#C0C0C0] py-2 px-3 w-[90%]"
        value={classContext.cls.requirement}
        rows={8}
        onChange={(e) => {
          onUpdateRequirement(e.target.value);
        }}
      />
      <div className="flex flex-row justify-end items-center w-[90%]">
        <p className="text-[#606060] text-[16px] font-semibold">
          {classContext.cls.requirement.length}
        </p>
      </div>
    </div>
  );
}

function _Level() {
  const classContext = useContext(ClassContext);
  const onUpdateLevel = (value: string) => {
    const updatedClass = { ...classContext.cls };
    updatedClass.level = value;
    classContext.setCls(updatedClass);
  };
  return (
    <div className="flex justify-start items-center space-x-8 w-fit">
      <h2 className="text-black text-[18px] font-semibold min-w-fit">
        ระดับของคลาสนี้
      </h2>
      <select
        value={classContext.cls.level}
        onChange={(e) => {
          onUpdateLevel(e.target.value);
        }}
        className="border-2 border-[#C0C0C0] py-2 px-3 w-fit"
      >
        <option value="" disabled selected>
          เลือกระดับ
        </option>
        {availableLevels.map((level) => {
          return <option value={level}>{level}</option>;
        })}
      </select>
    </div>
  );
}

function ClassGoalsInfoForm() {
  return (
    <div className="flex flex-col justify-start items-start space-y-10 bg-white p-8 w-full">
      <h1 className="text-[32px] font-semibold text-black w-full pb-4 border-b-2">
        เป้าหมายของคลาส
      </h1>
      <p className="text-[16px] w-full">
        คำอธิบายต่อไปนี้จะปรากฏต่อสาธารณะในหน้าเริ่มต้นของหลักสูตร
        และจะมีผลโดยตรงต่อประสิทธิภาพหลักสูตรของคุณ
        คำอธิบายเหล่านี้จะช่วยให้ผู้เรียนตัดสินใจว่าหลักสูตรของคุณเหมาะกับพวกเขาหรือไม่
      </p>
      <_Objectives />
      <_Requirement />
      <_Level />
    </div>
  );
}

export default ClassGoalsInfoForm;
