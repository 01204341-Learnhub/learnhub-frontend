type CourseQuiz = {
  quizID: string;
  name: string;
  description: string;
  problems: CourseQuizProblem[];
};

type CourseQuizProblem = {
  problemNumber: number;
  question: string;
  multipleCorrectAnswers: boolean;
  choices: {
    choiceA: string;
    choiceB: string;
    choiceC: string;
    choiceD: string;
    choiceE: string;
    choiceF: string;
  };
};

type CourseQuizSubmission = {
  status: string;
  answers: {
    problemNumber: number;
    answer: {
      choiceA: boolean;
      choiceB: boolean;
      choiceC: boolean;
      choiceD: boolean;
      choiceE: boolean;
      choiceF: boolean;
    };
  }[];
};

type CourseQuizSolution = {
  answer_responses: {
    problemNumber: number;
    correctAnswer: {
      choiceA: boolean;
      choiceB: boolean;
      choiceC: boolean;
      choiceD: boolean;
      choiceE: boolean;
      choiceF: boolean;
    };
    explaination: string;
  }[];
};

type CourseQuizReport = {
  staus: string;
  score: number;
  problems: {
    problemNumber: number;
    answer: {
      choiceA: boolean;
      choiceB: boolean;
      choiceC: boolean;
      choiceD: boolean;
      choiceE: boolean;
      choiceF: boolean;
    };
    correctAnswer: {
      choiceA: boolean;
      choiceB: boolean;
      choiceC: boolean;
      choiceD: boolean;
      choiceE: boolean;
      choiceF: boolean;
    };
    explaination: string;
  }[];
};

export type {
  CourseQuiz,
  CourseQuizProblem,
  CourseQuizReport,
  CourseQuizSolution,
  CourseQuizSubmission,
};
