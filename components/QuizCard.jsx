import React, { useState } from "react";
import "../styles/quiz.css";

const QuizCard = ({ question, current, total, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [animation, setAnimation] = useState("fadeIn");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const handleClick = (option) => {
    if (showAnswer) return; // Prevent clicking while showing answer
    
    setSelected(option);
    const isCorrect = option === question.correct_answer;
    setIsAnswerCorrect(isCorrect);
    setShowAnswer(true);
    
    // Wait longer to show the correct/wrong animation
    setTimeout(() => {
      setAnimation("fadeOut");
      setTimeout(() => {
        setSelected(null);
        setShowAnswer(false);
        setIsAnswerCorrect(null);
        setAnimation("fadeIn");
        onAnswer(isCorrect);
      }, 600);
    }, 1500); // Show result for 1.5 seconds
  };

  const progress = (current / total) * 100;

  const getButtonClass = (opt) => {
    let className = "option-btn";
    
    if (showAnswer) {
      if (opt === selected) {
        // User's selection
        className += isAnswerCorrect ? " correct" : " wrong";
      }
      if (opt === question.correct_answer && !isAnswerCorrect) {
        // Show correct answer if user was wrong
        className += " show-correct";
      }
    }
    
    return className;
  };

  return (
    <div className={`quiz-card ${animation}`}>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="q-header">
        <span>Question {current} of {total}</span>
        <span className="progress-text">{Math.round(progress)}% Complete</span>
      </div>
      <h3>{question.question}</h3>
      <div className="options">
        {question.options.map((opt, index) => (
          <button
            key={index}
            className={getButtonClass(opt)}
            onClick={() => handleClick(opt)}
            disabled={showAnswer}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{opt}</span>
            {showAnswer && opt === selected && (
              <span className="result-icon">
                {isAnswerCorrect ? "✓" : "✗"}
              </span>
            )}
            {showAnswer && opt === question.correct_answer && !isAnswerCorrect && (
              <span className="result-icon">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
