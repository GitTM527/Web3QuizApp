import { useContext } from "react";
import { QuizContext } from "../contexts/quiz";
import Answer from "./Answer";

const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    
    console.log(quizState);

    return (
        <div>
            <div className="question">{currentQuestion.question}</div>
            <div className="answers">
                {quizState.answers.map((answer, index) => (
                    // Pass answerText directly if it's an object, otherwise just pass the string
                    <Answer 
                    answerText={answer.answerText || answer} 
                    key={index} 
                    index={index} 
                    currentAnswer = {quizState.currentAnswer}
                    correctAnswer = {currentQuestion.correctAnswer}
                    onSelectAnswer={(answerText) =>
                    dispatch({type: "SELECT_ANSWER", payload: answerText})
                    }
                    />
                ))}
            </div>
        </div>
    );
};

export default Question;
