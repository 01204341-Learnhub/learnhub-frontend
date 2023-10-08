import axios from "axios";
import { CourseQuiz } from "../types/quiz";
import { GetQuizResponse } from "../types/response";

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

export { getCourseQuiz };
