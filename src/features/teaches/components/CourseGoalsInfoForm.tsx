import { CourseBasicInfo, CourseGoalsInfo } from "../types/course.ts";
import { useState } from "react";

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
  };

  const onUpdateRequirement = (requirement: string) => {
    setRequirement(requirement);
  };
  return <></>;
}

export default CourseGoalsInfoForm;
