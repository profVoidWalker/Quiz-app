"use client"
import { createContext, useContext, useReducer } from "react";
import { quiz } from "../data";

// Štartovací state
const initialState = {
  activeQuestion: 0,
  selectedAnswer: "",
  checked: false,
  selectedAnswerIndex: null,
  showResult: false,
  result: {
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  },
  questions: quiz.questions,
};

// Reducer na spracovanie akcií
const quizReducer = (state, action) => {
  switch (action.type) {
    case "ANSWER_QUESTION":
      return {
        ...state,
        checked: true,
        selectedAnswerIndex: action.payload.index,
        selectedAnswer: action.payload.answer === state.questions[state.activeQuestion].correctAnswer,
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        selectedAnswerIndex: null,
        result: state.selectedAnswer
          ? {
              ...state.result,
              score: state.result.score + 5,
              correctAnswers: state.result.correctAnswers + 1,
            }
          : {
              ...state.result,
              wrongAnswers: state.result.wrongAnswers + 1,
            },
        activeQuestion: state.activeQuestion !== state.questions.length - 1 ? state.activeQuestion + 1 : 0,
        showResult: state.activeQuestion === state.questions.length - 1,
        checked: false,
      };

    case "RESTART":
      return initialState;

    default:
      return state;
  }
};

// Vytvorenie Contextu
const QuizContext = createContext();

// Provider pre obalenie aplikácie
export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return <QuizContext.Provider value={{ state, dispatch }}>
    {children}
  </QuizContext.Provider>;
};

// Vlastný hook na používanie contextu
export const useQuiz = () => useContext(QuizContext);
