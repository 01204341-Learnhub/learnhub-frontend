import axios from "axios";
import { ClassInfo, CreatingClass } from "../types/class.ts";
const baseURL = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";

async function listTeacherClasses(teacherID: string) {
  const mock: ClassInfo[] = [
    {
      classID: "1",
      className: "Course 1",
      classThumbnailUrl: "https://picsum.photos/200",
      percentCompleted: 20,
      studentCount: 200,
      studentLimit: 500,
    },
    {
      classID: "2",
      className: "Course 2",
      classThumbnailUrl: "https://picsum.photos/300",
      percentCompleted: 20,
      studentCount: 200,
      studentLimit: 500,
    },
    {
      classID: "3",
      className: "Course 3",
      classThumbnailUrl: "https://picsum.photos/300",
      percentCompleted: 20,
      studentCount: 200,
      studentLimit: 500,
    },
    {
      classID: "4",
      className: "Course 4",
      classThumbnailUrl: "https://picsum.photos/400",
      percentCompleted: 20,
      studentCount: 200,
      studentLimit: 500,
    },
    {
      classID: "5",
      className: "Course 5",
      classThumbnailUrl: "https://picsum.photos/500",
      percentCompleted: 20,
      studentCount: 200,
      studentLimit: 500,
    },
    {
      classID: "6",
      className: "Course 6",
      classThumbnailUrl: "https://picsum.photos/600",
      percentCompleted: 20,
      studentCount: 200,
      studentLimit: 500,
    },
  ];
  return mock;
}

async function publishClass(
  teacherID: string,
  cls: CreatingClass
): Promise<string> {
  const url = `${baseURL}/programs/classes`;
  const body = {
    name: cls.name,
    class_pic: cls.pictureUrl,
    teacher_id: teacherID,
    max_student: cls.maxStudent,
    price: cls.price,
    description: cls.description,
    class_objective: cls.objectives,
    class_requirement: cls.requirement,
    difficulty_level: "HARDCODE-PUBLISH-CLASS",
    tag_ids: [cls.tag.tagID],
    schedules: cls.schedule.map((s) => ({
      start: parseInt((s.start.getTime() / 1000).toFixed(0)),
      end: parseInt((s.end.getTime() / 1000).toFixed(0)),
    })),
    registration_ended_date: parseInt(
      (cls.registrationEnd?.getTime() ?? 0 / 1000).toFixed(0)
    ),
    open_date: parseInt((cls.start?.getTime() ?? 0 / 1000).toFixed(0)),
    class_ended_date: parseInt((cls.end?.getTime() ?? 0 / 1000).toFixed(0)),
  };
  const res = await axios.post<{ class_id: string }>(url, body);
  return res.data.class_id;
}

export { listTeacherClasses, publishClass };
