import React, { useState } from "react";
import StartScreen from "../components/StartScreen";
import QuizCard from "../components/QuizCard";
import ResultScreen from "../components/ResultScreen";
import wildlifeData from "../data/wildlife.json";
import educationData from "../data/education.json";
import "../styles/quiz.css";

function App() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startExam = (exam) => {
    setSelectedExam(exam);
    const questions = exam === "wildlife" ? wildlifeData.questions : educationData.questions;
    setShuffledQuestions(shuffleArray(questions));
    setCurrentQIndex(0);
    setScore(0);
    setFinished(false);
  };

  const exams = {
    wildlife: wildlifeData,
    education: educationData,
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const next = currentQIndex + 1;
    if (next < shuffledQuestions.length) {
      setCurrentQIndex(next);
    } else {
      setFinished(true);
    }
  };

  if (!selectedExam) {
    return <StartScreen startExam={startExam} />;
  }

  if (finished) {
    return (
      <ResultScreen
        score={score}
        total={shuffledQuestions.length}
        restart={() => {
          setSelectedExam(null);
          setShuffledQuestions([]);
        }}
      />
    );
  }

  const question = shuffledQuestions[currentQIndex];

  return (
    <div className="app">
      <h2>{exams[selectedExam].course}</h2>
      <QuizCard
        question={question}
        current={currentQIndex + 1}
        total={shuffledQuestions.length}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default App;
