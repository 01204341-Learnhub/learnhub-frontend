async function fetchUserCourseProgress(course_id: string) {
  const mockData = {
    student_id: "1",
    course_id: course_id,
    finished: false,
    lessons: [
      {
        lesson_id: "1",
        chapter_id: "1",
        finished: false,
        lesson_completed: 0,
      },
    ],
    fisnished_count: 0,
  };
  return mockData;
}

export { fetchUserCourseProgress };
