import { CourseBasicInfo, CourseGoalsInfo } from "../types/course.ts";
import { useState } from "react";

interface _ObjectivesProps {
  onUpdateObjective: (index: number, objective: string) => void;
  courseBasicInfo: CourseBasicInfo;
}

function _Objectives({ onUpdateObjective, courseBasicInfo }: _ObjectivesProps) {
  return <></>;
}

interface _RequirementProps {
  onUpdateRequirement: (requirement: string) => void;
  courseBasicInfo: CourseBasicInfo;
}

function _Requirement({
  onUpdateRequirement,
  courseBasicInfo,
}: _RequirementProps) {
  return <></>;
}

interface _LevelProps {
  courseBasicInfo: CourseBasicInfo;
}

function _Level({ courseBasicInfo }: _LevelProps) {
  return <></>;
}

interface CourseGoalsFormProps {
  onUpdate: (goalsInfo: CourseGoalsInfo) => void;
  courseBasicInfo: CourseBasicInfo;
}

function CourseGoalsInfoForm({
  onUpdate,
  courseBasicInfo,
}: CourseGoalsFormProps) {
  const [objectives, setObjectives] = useState<string[]>([]);
  const [requirement, setRequirement] = useState<string>("");

  const onUpdateObjective = (index: number, objective: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = objective;
    setObjectives(newObjectives);
    onUpdate({
      objectives: objectives,
      requirement: requirement,
    });
  };
  const onUpdateRequirement = (requirement: string) => {
    setRequirement(requirement);
    onUpdate({
      objectives: objectives,
      requirement: requirement,
    });
  };

  return (
    <div className="flex flex-col justify-start items-start space-y-10 bg-white p-8 w-full">
      <h1 className="text-[32px] font-semibold text-black w-full py-4 border-b-2">
        เป้าหมายของคอร์ส
      </h1>
      <p className="text-[16px] w-full">
        คำอธิบายต่อไปนี้จะปรากฏต่อสาธารณะในหน้าเริ่มต้นของหลักสูตร
        และจะมีผลโดยตรงต่อประสิทธิภาพหลักสูตรของคุณ
        คำอธิบายเหล่านี้จะช่วยให้ผู้เรียนตัดสินใจว่าหลักสูตรของคุณเหมาะกับพวกเขาหรือไม่
      </p>
      <_Objectives
        onUpdateObjective={onUpdateObjective}
        courseBasicInfo={courseBasicInfo}
      />
      <_Requirement
        onUpdateRequirement={onUpdateRequirement}
        courseBasicInfo={courseBasicInfo}
      />
      <_Level courseBasicInfo={courseBasicInfo} />
    </div>
  );
}

export default CourseGoalsInfoForm;
