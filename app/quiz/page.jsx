'use client'
import React, {useState} from 'react'
import { quiz } from '../data'
import { useQuiz } from '../context/quizContext'

const page = () => {
  const { state, dispatch } = useQuiz();
  const { questions, activeQuestion, selectedAnswer, checked, selectedAnswerIndex, showResult, result } = state;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  // Select and check answer
  const onAnswerSelected = (answer, idx) => {
    dispatch({ type: "ANSWER_QUESTION", payload: { answer, index: idx } })
  }

  // Calculate score and increment to next question
  const nextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" })
  }

  return (
    <div className='container'>
      <h1>Quiz Page</h1>

      <div>
        {!showResult ? (
          <div>
            <h2>
              Question: {activeQuestion + 1}
              <span>/{questions.length}</span>
            </h2>

            <div className='quiz-container'>
              <h3>{question}</h3>
              {answers.map((answer, idx) => (
                <li 
                  key={idx}
                  onClick={() => onAnswerSelected(answer, idx)}
                  className={
                    selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
                  }
                >
                  <span>{answer}</span>
                </li>
              ))}

              {checked ? (
                <button onClick={nextQuestion} className='btn'>
                  {activeQuestion === question.length - 1 ? 'Finish' : 'Next'}
                </button>
              ) : (
                <button onClick={nextQuestion} disabled className='btn-disabled'>
                  {' '}
                  {activeQuestion === question.length - 1 ? 'Finish' : 'Next'}
                </button>
              )}
            </div>
          </div>
          ) : (
          <div>
            <h2>Results</h2>
          
            <div className='quiz-container'>
              <h3>Overall {(result.score / (questions.length * 5)) * 100}%</h3>
              <p>
                Total Questions: <span>{questions.length}</span>
              </p>
              <p>
                Total score: <span>{result.score}</span>
              </p>
              <p>
                Correct Answers: <span>{result.correctAnswers}</span>
              </p>
              <p>
                Wrong Answers: <span>{result.wrongAnswers}</span>
              </p>
              <button onClick={() => dispatch({ type: "RESTART" })}>Restart</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default page