import { CourseChapter, Lesson } from "../types/course";

async function fetchChapters(courseID: string): Promise<CourseChapter[]> {
  const mockChapters: CourseChapter[] = [
    {
      courseID: courseID,
      chapterNum: 1,
      name: "Chapter 1",
      chapterLength: 10,
      lessonCount: 10,
      description:
        "This is a chapter 2 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      courseID: courseID,
      chapterNum: 2,
      name: "Chapter 2",
      chapterLength: 10,
      lessonCount: 10,
      description: "This is a chapter 2",
    },
  ];
  return mockChapters;
}

async function fetchLessons(courseID: string, chapterID: string) {
  const mockLessons: Lesson[] = [
    {
      chapterID: chapterID,
      courseID: courseID,
      lessonNum: 1,
      lessonType: "video",
      name: "Lesson 1",
      src: "https://www.youtube.com/embed/3qHkcs3kG44",
      description: "This is a lesson 1",
    },
  ];
  return mockLessons;
}

export { fetchChapters, fetchLessons };
