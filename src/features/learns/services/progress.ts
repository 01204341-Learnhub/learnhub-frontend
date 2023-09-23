async function fetchChapters(courseID: string) {
  const mockDataGen = (n: number) => ({
    chapter_num: n,
    name: `Chapter ${n}`,
    course_id: courseID,
    chapter_length: 10,
    lesson_count: 2,
    description: "This is a chapter",
  });

  const mockData = Array.from({ length: 5 }, (_, i) => mockDataGen(i + 1));
  return mockData;
}

async function fetchLessons(courseID: string, chapterID: string) {
  const mockDataGen = (n: number) => ({
    lesson_num: n,
    name: `Lesson ${n}`,
    course_id: courseID,
    chapter_id: chapterID,
    lesson_type: "video",
    src: "https://www.youtube.com/embed/2GJ8uNNJUH0",
    description: "This is a lesson",
  });

  const mockData = Array.from({ length: 10 }, (_, i) => mockDataGen(i + 1));
  return mockData;
}

export { fetchChapters, fetchLessons };
