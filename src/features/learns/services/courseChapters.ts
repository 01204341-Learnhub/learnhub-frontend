import axios from "axios";
import { CourseChapter } from "../types/courseChapters";
import {
  GetCourseChapterResponse,
  ListCourseChaptersResponse,
} from "../types/response";

const baseURL = import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8000";
async function getCourseChapter(
  courseID: string,
  chapterID: string
): Promise<Omit<CourseChapter, "chapterLength" | "lessonCount">> {
  const url = `${baseURL}/programs/courses/${courseID}/chapters/${chapterID}`;
  const res = await axios.get<GetCourseChapterResponse>(url);
  const chapter: Omit<CourseChapter, "chapterLength" | "lessonCount"> = {
    chapterID: res.data.chapter_id,
    courseID: courseID,
    chapterNumber: res.data.chapter_num,
    name: res.data.name,
    description: res.data.description,
  };
  return chapter;
}

async function listCourseChapters(courseID: string): Promise<CourseChapter[]> {
  const url = `${baseURL}/programs/courses/${courseID}/chapters`;
  const res = await axios.get<ListCourseChaptersResponse>(url);
  console.log(res.data)
  const chapters: CourseChapter[] = [];
  for (let i = 0; i < res.data.chapters.length; i++) {
    const chapter_url = `${baseURL}/programs/courses/${courseID}/chapters/${res.data.chapters[i].chapter_id}`;
    const c = await axios.get<GetCourseChapterResponse>(chapter_url)
    chapters.push({
      chapterID: res.data.chapters[i].chapter_id,
      courseID: courseID,
      chapterNumber: res.data.chapters[i].chapter_num,
      name: res.data.chapters[i].name,
      description: c.data.description,
      chapterLength: res.data.chapters[i].chapter_length,
      lessonCount: res.data.chapters[i].lesson_count,
    });
  }
  return chapters;
}

export { getCourseChapter, listCourseChapters };
