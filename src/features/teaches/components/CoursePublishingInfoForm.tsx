import { CourseBasicInfo, CoursePublishingInfo } from "../types/course.ts";

interface CoursePublishingFormProps {
  onUpdate: (publishingInfo: CoursePublishingInfo) => void;
  courseBasicInfo: CourseBasicInfo;
}

function CoursePublishingInfoForm({
  onUpdate,
  courseBasicInfo,
}: CoursePublishingFormProps) {
  return <></>;
}

export default CoursePublishingInfoForm;
