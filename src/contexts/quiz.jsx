import { createContext, useReducer } from "react";
import questions from "../data"
import { shuffleAnswers } from "../helpers";
import PropTypes from 'prop-types';

const initialState = {
    questions,
    currentQuestionIndex: 0,
    showResults: false,
    correctAnswerCount: 0,
    answers: shuffleAnswers(questions[0]),
    currentAnswer: ''
};

const reducer = (state, action) => {

    console.log("reducer", state, action);
    switch (action.type) {
        case 'SELECT_ANSWER': {
            const correctAnswerCount = 
            action.payload === 
            state.question[state.currentQuestionIndex].correctAnswer 
            ? state.correctAnswerCount +1 
            :state.correctAnswerCount
            return{
                ...state, 
                currentAnswer: action.payload,
                correctAnswerCount,
            }
        }
        case "NEXT_QUESTION": {
            const showResults = 
            state.currentQuestionIndex === state.questions.length - 1;
            const currentQuestionIndex = showResults 
            ? state.currentQuestionIndex 
            : state.currentQuestionIndex +1;
            return {
                ...state,
                currentQuestionIndex,
                showResults,
            };
        }
        case'RESTART': {
            return initialState
        }
        default:
            return state;
    }
};
 
export const QuizContext = createContext();

export const QuizProvider = ({children} ) => {
    const value = useReducer(reducer, initialState)
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

QuizProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };