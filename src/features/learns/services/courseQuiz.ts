import axios from "axios";
import { CourseLesson } from "../types/lessons";
import { StudentCourseLessonProgress } from "../types/progress";
import {
  CourseQuiz,
  CourseQuizReport,
  CourseQuizSubmission,
} from "../types/quiz";
import {
  GetQuizResponse,
  GetStudentCourseQuizReportResponse,
} from "../types/response";
import { updateStudentCourseLessonProgress } from "./progress";

const baseURL = "http://localhost:8000";
async function getCourseQuiz(quizID: string): Promise<CourseQuiz> {
  const url = `${baseURL}/quizzes/${quizID}/`;
  const res = await axios.get<GetQuizResponse>(url);
  const quizData = res.data;
  const quiz: CourseQuiz = {
    quizID: quizID,
    name: quizData.name,
    description: quizData.description,
    problems: quizData.problems.map((problem) => {
      return {
        problemNumber: problem.problem_num,
        question: problem.question,
        multipleCorrectAnswers: problem.multiple_correct_answers,
        choices: {
          choiceA: problem.choice.choice_a,
          choiceB: problem.choice.choice_b,
          choiceC: problem.choice.choice_c,
          choiceD: problem.choice.choice_d,
          choiceE: problem.choice.choice_e,
          choiceF: problem.choice.choice_f,
        },
      };
    }),
  };
  return quiz;
}

async function submitCourseQuiz(
  submission: CourseQuizSubmission,
  lesson: CourseLesson,
  lessonProgress: StudentCourseLessonProgress,
  studentID: string
) {
  const body = {
    status: "finish",
    answers: submission.answers.map((answer) => {
      return {
        problem_num: answer.problemNumber,
        answer: {
          answer_a: answer.answer.choiceA,
          answer_b: answer.answer.choiceB,
          answer_c: answer.answer.choiceC,
          answer_d: answer.answer.choiceD,
          answer_e: answer.answer.choiceE,
          answer_f: answer.answer.choiceF,
        },
      };
    }),
  };
  const url = `${baseURL}/quizzes/${lesson.src}/result`;
  await axios.patch(url, body, { params: { student_id: studentID } });
  lessonProgress.finished = true;
  await updateStudentCourseLessonProgress(
    studentID,
    lesson.courseID,
    lessonProgress
  );
}

async function getStudentCourseQuizReport(quizID: string, studentID: string) {
  const url = `${baseURL}/quizzes/${quizID}/result/`;
  const res = await axios.get<GetStudentCourseQuizReportResponse>(url, {
    params: { student_id: studentID },
  });
  const report: CourseQuizReport = {
    staus: res.data.status,
    score: res.data.score,
    problems: res.data.problems.map((problem) => {
      return {
        problemNumber: problem.problem_num,
        answer: {
          choiceA: problem.answer.answer_a,
          choiceB: problem.answer.answer_b,
          choiceC: problem.answer.answer_c,
          choiceD: problem.answer.answer_d,
          choiceE: problem.answer.answer_e,
          choiceF: problem.answer.answer_f,
        },
        correctAnswer: {
          choiceA: problem.correct_answer.answer_a,
          choiceB: problem.correct_answer.answer_b,
          choiceC: problem.correct_answer.answer_c,
          choiceD: problem.correct_answer.answer_d,
          choiceE: problem.correct_answer.answer_e,
          choiceF: problem.correct_answer.answer_f,
        },
        explaination: problem.explanation,
      };
    }),
  };
  return report;
}

export { getCourseQuiz, getStudentCourseQuizReport, submitCourseQuiz };
