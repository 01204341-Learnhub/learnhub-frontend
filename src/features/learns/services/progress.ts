import { UserCourseProgress } from "../types/progress";

async function fetchUserCourseProgress(
  course_id: string
): Promise<UserCourseProgress> {
  const mockData: UserCourseProgress = {
    studentID: "1",
    courseID: course_id,
    finished: false,
    lessons: [
      {
        lessonID: "1",
        chapterID: "1",
        finished: false,
        lessonCompleted: 0,
      },
    ],
  };
  return mockData;
}

export { fetchUserCourseProgress };
