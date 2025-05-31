import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  onBack, 
  currentAnswer 
}) => {
  useEffect(() => {
    // Animate options entrance
    gsap.fromTo('.option-card', 
      { opacity: 0, y: 20, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }, [question]);

  const handleOptionClick = (value) => {
    // Animate selection
    const selectedCard = document.querySelector(`[data-value="${value}"]`);
    gsap.to(selectedCard, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        onAnswer(question.id, value);
      }
    });
  };

  return (
    <div className="question-screen phase-content">
      <div className="question-header">
        <button 
          className="back-button" 
          onClick={onBack}
          disabled={questionNumber === 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="progress-indicator">
          <span className="progress-text">{questionNumber} dari {totalQuestions}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="question-content">
        <h2 className="question-text">{question.question}</h2>
        
        <div className="options-grid">
          {question.options.map((option) => (
            <div
              key={option.value}
              className={`option-card ${currentAnswer === option.value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
              data-value={option.value}
            >
              <div className="option-icon">{option.icon}</div>
              <div className="option-label">{option.label}</div>
              {currentAnswer === option.value && (
                <div className="selected-indicator">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;