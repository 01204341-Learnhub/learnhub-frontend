import { CourseInfo } from "../types/course";

async function listTeacherCourse(teacherID: string) {
  const mock: CourseInfo[] = [
    {
      courseID: "1",
      courseName: "Course 1",
      courseRating: 4,
      courseThumbnailUrl: "https://picsum.photos/200",
      studentCount: 100,
    },
    {
      courseID: "2",
      courseName: "Course 2",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/300",
      studentCount: 200,
    },
    {
      courseID: "3",
      courseName: "Course 3",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/100",
      studentCount: 200,
    },
    {
      courseID: "4",
      courseName: "Course 4",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/600",
      studentCount: 200,
    },
    {
      courseID: "5",
      courseName: "Course 5",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/500",
      studentCount: 200,
    },
    {
      courseID: "6",
      courseName: "Course 6",
      courseRating: 2,
      courseThumbnailUrl: "https://picsum.photos/700",
      studentCount: 200,
    },
  ];
  return mock;
}

export { listTeacherCourse as listTeachCourse };
