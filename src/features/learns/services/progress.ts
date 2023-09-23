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

export { fetchChapters };
