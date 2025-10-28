import React from "react";
import "../styles/result.css";

const ResultScreen = ({ score, total, restart }) => {
  const percentage = Math.round((score / total) * 100);
  
  // Calculate grade and message
  let grade = "";
  let message = "";
  let emoji = "";
  
  if (percentage >= 90) {
    grade = "A+";
    message = "Outstanding! You're excellent!";
    emoji = "🏆";
  } else if (percentage >= 80) {
    grade = "A";
    message = "Excellent work! Keep it up!";
    emoji = "🌟";
  } else if (percentage >= 70) {
    grade = "B+";
    message = "Great job! You're doing well!";
    emoji = "👏";
  } else if (percentage >= 60) {
    grade = "B";
    message = "Good effort! Keep practicing!";
    emoji = "👍";
  } else if (percentage >= 50) {
    grade = "C";
    message = "Fair! Room for improvement!";
    emoji = "📚";
  } else {
    grade = "D";
    message = "Keep studying and try again!";
    emoji = "💪";
  }
  
  const copyUPI = () => {
    navigator.clipboard.writeText("ambatijayacharan18@ybl");
    alert("UPI ID copied to clipboard! ✅");
  };
  
  return (
    <div className="result-screen">
      <div className="result-card">
        <div className="emoji-badge">{emoji}</div>
        <h1 className="result-title">Exam Completed!</h1>
        
        <div className="score-circle">
          <div className="score-inner">
            <div className="score-value">{score}</div>
            <div className="score-total">out of {total}</div>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Total Questions</div>
            <div className="stat-value">{total} / 120</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Percentage</div>
            <div className="stat-value">{percentage}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Grade</div>
            <div className="stat-value grade">{grade}</div>
          </div>
        </div>
        
        <p className="result-message">{message}</p>
        
        <button className="restart-btn" onClick={restart}>
          <span>Try Another Exam</span>
          <span className="arrow">→</span>
        </button>
        
        {/* Buy Me a Coffee Section */}
        <div className="coffee-section">
          <div className="coffee-divider"></div>
          <div className="coffee-header">
            <span className="coffee-icon">☕</span>
            <h3>Enjoying the app?</h3>
          </div>
          <p className="coffee-text">Support the development with a coffee!</p>
          
          
          
          
          {/* UPI Copy Card */}
          <div className="upi-container">
            <div className="upi-card" onClick={copyUPI}>
              <div className="upi-icon">💳</div>
              <div className="upi-details">
                <span className="upi-label">UPI ID</span>
                <span className="upi-id">ambatijayacharan18@ybl</span>
              </div>
              <div className="copy-icon">📋</div>
            </div>
            <p className="copy-hint">Click to copy UPI ID</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
