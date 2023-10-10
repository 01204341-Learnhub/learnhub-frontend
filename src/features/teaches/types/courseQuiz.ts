type CourseQuiz = {
  name: string;
  description: string;
  timeLimit: number;
  pictureURL: string;
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
  correctAnswers: {
    choiceA: boolean;
    choiceB: boolean;
    choiceC: boolean;
    choiceD: boolean;
    choiceE: boolean;
    choiceF: boolean;
  };
  explaination: string;
};
export type { CourseQuiz, CourseQuizProblem };
