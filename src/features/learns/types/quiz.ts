type CourseQuiz = {
  quizID: string;
  name: string;
  description: string;
  questions: MultipleChoiceQuestion[];
};

type MultipleChoiceQuestion = {
  questionNumber: number;
  question: string;
  options: string[];
};

type MultipleChoiceQuestionAnswer = {
  questionNumber: number;
  answers: number[];
};

export type {
  CourseQuiz,
  MultipleChoiceQuestion,
  MultipleChoiceQuestionAnswer,
};
