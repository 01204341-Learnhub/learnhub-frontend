import axios from "axios";
import { CourseQuiz } from "../types/courseQuiz";

const baseURL = "http://localhost:8000";

async function createCourseQuiz(quiz: CourseQuiz): Promise<string> {
  const url = `${baseURL}/quizzes`;
  const body = {
    name: quiz.name,
    description: quiz.description,
    time_limit: quiz.timeLimit,
    quiz_pic: "https://picsum.photos/200",
    problems: quiz.problems.map((problem) => {
      return {
        problem_num: problem.problemNumber,
        question: problem.question,
        multiple_correct_answers: problem.multipleCorrectAnswers,
        choice: {
          choice_a: problem.choices.choiceA,
          choice_b: problem.choices.choiceB,
          choice_c: problem.choices.choiceC,
          choice_d: problem.choices.choiceD,
          choice_e: problem.choices.choiceE,
          choice_f: problem.choices.choiceF,
        },
        correct_answer: {
          answer_a: problem.correctAnswers.choiceA,
          answer_b: problem.correctAnswers.choiceB,
          answer_c: problem.correctAnswers.choiceC,
          answer_d: problem.correctAnswers.choiceD,
          answer_e: problem.correctAnswers.choiceE,
          answer_f: problem.correctAnswers.choiceF,
        },
        explanation: problem.explaination,
      };
    }),
  };
  const res = await axios.post<{ quiz_id: string }>(url, body);
  const quizID = res.data.quiz_id;
  return quizID;
}

export { createCourseQuiz };
