import React, { useState } from "react";
import "../styles/start.css";

const StartScreen = ({ startExam }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    examName: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message with form data
    const message = encodeURIComponent(
      `Hello! I would like to request a new exam for NPTEL Practice 2025.\n\n` +
      `📝 My Details:\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `📚 Requested Exam: ${formData.examName}\n\n` +
      `${formData.message ? `📄 Additional Details:\n${formData.message}\n\n` : ''}` +
      `Thank you!`
    );
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/919640179624?text=${message}`, "_blank");
    
    // Show success message
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowRequestForm(false);
      setSubmitted(false);
      setFormData({ name: "", email: "", examName: "", message: "" });
    }, 3000);
  };

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/jaya-charan-ambati-901052254/", "_blank");
  };
  
  const openWhatsApp = () => {
    window.open("https://wa.me/919640179624", "_blank");
  };

  return (
    <div className="start-screen">
      <h1>NPTEL 2025 Practice</h1>
      <p>Select an exam to begin</p>
      
      <div className="exam-buttons">
        <button className="exam-btn" onClick={() => startExam("wildlife")}>
          <span className="btn-icon">🎓</span>
          <span className="btn-text">Wildlife Ecology</span>
        </button>
        <button className="exam-btn" onClick={() => startExam("education")}>
          <span className="btn-icon">🎓</span>
          <span className="btn-text">Educational Leadership</span>
        </button>
        <button className="request-btn" onClick={() => setShowRequestForm(!showRequestForm)}>
          <span className="btn-icon">➕</span>
          <span className="btn-text">Request New Exam</span>
        </button>
      </div>

      {showRequestForm && (
        <div className="request-form-container">
          <div className="request-form-card">
            <button className="close-btn" onClick={() => setShowRequestForm(false)}>✕</button>
            
            {!submitted ? (
              <>
                <h2>📝 Request a New Exam</h2>
                <p className="form-subtitle">Let us know which exam you'd like to practice!</p>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      name="examName"
                      placeholder="Exam Name (e.g., Data Structures) *"
                      value={formData.examName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Additional details or message (optional)"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Send Request ✉️
                  </button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h2>Request Sent Successfully!</h2>
                <p className="request-info">
                  WhatsApp is opening with your request details. Please send the message to complete your request.
                </p>
                <p className="success-note">
                  This window will close automatically...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default StartScreen;
