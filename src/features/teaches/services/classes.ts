import { ClassInfo } from "../types/classes";

async function listTeacherClasses(teacherID: string) {
  const mock: ClassInfo[] = [
    {
      classID: "1",
      className: "Course 1",
      classThumbnailUrl: "https://picsum.photos/200",
      percentCompleted: 20,
      participantCount: 200,
      participantLimit: 500,
    },
    {
      classID: "2",
      className: "Course 2",
      classThumbnailUrl: "https://picsum.photos/300",
      percentCompleted: 20,
      participantCount: 200,
      participantLimit: 500,
    },
    {
      classID: "3",
      className: "Course 3",
      classThumbnailUrl: "https://picsum.photos/300",
      percentCompleted: 20,
      participantCount: 200,
      participantLimit: 500,
    },
    {
      classID: "4",
      className: "Course 4",
      classThumbnailUrl: "https://picsum.photos/400",
      percentCompleted: 20,
      participantCount: 200,
      participantLimit: 500,
    },
    {
      classID: "5",
      className: "Course 5",
      classThumbnailUrl: "https://picsum.photos/500",
      percentCompleted: 20,
      participantCount: 200,
      participantLimit: 500,
    },
    {
      classID: "6",
      className: "Course 6",
      classThumbnailUrl: "https://picsum.photos/600",
      percentCompleted: 20,
      participantCount: 200,
      participantLimit: 500,
    },
  ];
  return mock;
}

export { listTeacherClasses };
