import { CourseContext } from "../../../pages/teachers/CreateCourse.tsx";
import { useContext } from "react";

function _Name() {
  const courseContext = useContext(CourseContext);
  return <></>;
}

function _Description() {
  const courseContext = useContext(CourseContext);
  return <></>;
}

function _Thumbnail() {
  const courseContext = useContext(CourseContext);
  return <></>;
}

function _Price() {
  const courseContext = useContext(CourseContext);
  return <></>;
}

function _Category() {
  const courseContext = useContext(CourseContext);
  return <></>;
}

function CoursePublishingInfoForm() {
  const courseContext = useContext(CourseContext);
  return (
    <div className="flex flex-col justify-start items-start space-y-10 bg-white p-8 w-full">
      <h1 className="text-[32px] font-semibold text-black w-full py-4 border-b-2">
        เผยแพร่คอร์ส
      </h1>
      <div className="flex flex-col justify-start items-start space-y-3 w-full">
        <h2 className="text-black text-[18px] font-semibold">
          หน้าเริ่มต้นของหลักสูตร
        </h2>
        <p className="text-[16px] w-full">
          คำอธิบายต่อไปนี้จะปรากฏต่อสาธารณะในหน้าเริ่มต้นของหลักสูตร
          และจะมีผลโดยตรงต่อประสิทธิภาพหลักสูตรของคุณ
          คำอธิบายเหล่านี้จะช่วยให้ผู้เรียนตัดสินใจว่าหลักสูตรของคุณเหมาะกับพวกเขาหรือไม่
        </p>
      </div>
      <_Name />
      <_Description />
      <_Thumbnail />
      <_Price />
      <_Category />
    </div>
  );
}

export default CoursePublishingInfoForm;
