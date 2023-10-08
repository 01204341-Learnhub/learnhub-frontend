import axios from "axios";
import { CourseChapter } from "../types/courseChapters";
import {
  GetCourseChapterResponse,
  ListCourseChaptersResponse,
} from "../types/response";

const baseURL = "http://localhost:8000";
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
  const chapters: CourseChapter[] = [];
  for (let i = 0; i < res.data.chapters.length; i++) {
    const c = await getCourseChapter(courseID, res.data.chapters[i].chapter_id);
    chapters.push({
      ...c,
      chapterLength: 0,
      lessonCount: 0,
    });
  }
  return chapters;
}

export { getCourseChapter, listCourseChapters };
