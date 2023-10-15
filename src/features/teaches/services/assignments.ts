import axios from "axios";
import {
  ClassAssignmentSubmission,
  ListClassAssignmentSubmissionsResponse,
} from "../types/classWork";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

async function listAssignmentSubmissions(
  assignmentID: string,
  classID: string
) {
  const url = `${baseURL}/programs/classes/${classID}/assignments/${assignmentID}/submissions/`;
  const res = await axios.get<ListClassAssignmentSubmissionsResponse>(url);
  const submissions: ClassAssignmentSubmission[] = [];
  for (let i = 0; i < res.data.submissions.length; i++) {
    const s = res.data.submissions[i];
    const studentSubmissionUrl = `${baseURL}/programs/classes/${classID}/assignments/${assignmentID}/submissions/${s.student.student_id}`;
    const studentSubmissionRes = await axios.get<{
      attachments: { attachment_type: string; src: string }[];
    }>(studentSubmissionUrl);
    const submission: ClassAssignmentSubmission = {
      status: res.data.submissions[i].status,
      score: res.data.submissions[i].score,
      submissionDate: new Date(res.data.submissions[i].submission_date),
      student: {
        studentID: res.data.submissions[i].student.student_id,
        name: res.data.submissions[i].student.student_name,
        profilePicture: res.data.submissions[i].student.profile_pic,
      },
      attachments: studentSubmissionRes.data.attachments.map((attachment) => ({
        attachmentType: attachment.attachment_type,
        src: attachment.src,
      })),
    };
    submissions.push(submission);
  }
  return submissions;
}

async function markAssignmentSubmission(
  assignmentID: string,
  classID: string,
  studentID: string,
  score: number
) {
  const url = `${baseURL}/programs/classes/${classID}/assignments/${assignmentID}/submissions/${studentID}/score`;
  const body = {
    score: score,
  };
  await axios.patch(url, body);
}

export { listAssignmentSubmissions, markAssignmentSubmission };
