import axios from "axios";
import { Class, EnrolledClass, generateMockClass } from "../types/classes";
import { ListEnrolledClassesResponse } from "../types/response";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function listEnrolledClass(studentID: string): Promise<EnrolledClass[]> {
  studentID;
  const url = `${baseURL}/users/students/${studentID}/classes`;
  const res = await axios.get<ListEnrolledClassesResponse>(url);
  const enrolled: EnrolledClass[] = res.data.classes.map((c) => {
    return {
      id: c.class_id,
      imageClassUrl: c.class_pic,
      name: c.name,
      price: 0,
      tags: [{ id: "HARDCODED", name: "HARDCODED" }],
      status: "HARDCODE",
      teacher: {
        id: c.teacher.teacher_id,
        name: c.teacher.teacher_name,
        imageProfileUrl: c.teacher.profile_pic,
      },
      registrationEndDate: new Date(c.class_ended_date),
    };
  });
  return enrolled;
}

async function fetchClass(classId: string): Promise<Class> {
  console.log(`Fetching class ${classId}`);
  // TODO: Implement this
  console.log("Class fetched");
  // TODO: Switch to real data
  return generateMockClass(classId);
}

export { fetchClass, listEnrolledClass };
