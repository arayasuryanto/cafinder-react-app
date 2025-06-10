import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './SmartFinderPage.css';
import SmartFinderStart from './SmartFinderStart';
import QuestionCard from './QuestionCard';
import AnalysisScreen from './AnalysisScreen';
import RecommendationCard from './RecommendationCard';
import { generateAnalysis, generateRecommendations } from '../../utils/smartFinderUtils';

const SmartFinderPage = () => {
  const [currentPhase, setCurrentPhase] = useState('start'); // start, questions, analysis, recommendations
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [analysis, setAnalysis] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [savedCafes, setSavedCafes] = useState([]);
  const [currentRecommendation, setCurrentRecommendation] = useState(0);

  const questions = [
    {
      id: 'purpose',
      question: "Apa tujuan utama Anda mengunjungi kafe?",
      options: [
        { value: 'work', label: 'Bekerja/Belajar', icon: '💼' },
        { value: 'social', label: 'Hangout dengan teman', icon: '👥' },
        { value: 'business', label: 'Meeting bisnis', icon: '🤝' },
        { value: 'solo', label: 'Bersantai sendiri', icon: '☕' }
      ]
    },
    {
      id: 'time',
      question: "Kapan biasanya Anda mengunjungi kafe?",
      options: [
        { value: 'morning', label: 'Pagi (7-11am)', icon: '🌅' },
        { value: 'afternoon', label: 'Siang (11am-5pm)', icon: '☀️' },
        { value: 'evening', label: 'Sore (5-9pm)', icon: '🌆' },
        { value: 'night', label: 'Malam (9pm+)', icon: '🌙' }
      ]
    },
    {
      id: 'atmosphere',
      question: "Suasana kafe ideal Anda?",
      options: [
        { value: 'quiet', label: 'Tenang & minimalis', icon: '🤫' },
        { value: 'bustling', label: 'Ramai & energik', icon: '🎉' },
        { value: 'cozy', label: 'Hangat & intim', icon: '🛋️' },
        { value: 'modern', label: 'Modern & trendy', icon: '✨' }
      ]
    },
    {
      id: 'priority',
      question: "Apa yang paling penting bagi Anda?",
      options: [
        { value: 'wifi', label: 'WiFi kencang', icon: '📶' },
        { value: 'coffee', label: 'Kopi berkualitas', icon: '☕' },
        { value: 'instagram', label: 'Interior Instagramable', icon: '📸' },
        { value: 'price', label: 'Harga terjangkau', icon: '💵' }
      ]
    },
    {
      id: 'seating',
      question: "Bagaimana Anda suka duduk?",
      options: [
        { value: 'solo_table', label: 'Meja sendiri', icon: '🪑' },
        { value: 'counter', label: 'Counter/bar', icon: '🍸' },
        { value: 'sofa', label: 'Sofa/lounge', icon: '🛋️' },
        { value: 'outdoor', label: 'Outdoor terrace', icon: '🌿' }
      ]
    },
    {
      id: 'vibe',
      question: "Apa mood Anda hari ini?",
      options: [
        { value: 'productive', label: 'Fokus produktif', icon: '💪' },
        { value: 'creative', label: 'Inspirasi kreatif', icon: '🎨' },
        { value: 'social', label: 'Koneksi sosial', icon: '💬' },
        { value: 'relaxation', label: 'Relaksasi total', icon: '😌' }
      ]
    }
  ];

  useEffect(() => {
    // Save responses to localStorage
    if (Object.keys(userResponses).length > 0) {
      localStorage.setItem('smartFinderResponses', JSON.stringify(userResponses));
    }

    // Retrieve saved cafes from localStorage
    const saved = localStorage.getItem('savedCafes');
    if (saved) {
      setSavedCafes(JSON.parse(saved));
    }
  }, [userResponses]);

  const handleStart = () => {
    setCurrentPhase('questions');
    animatePhaseTransition();
  };

  const handleAnswer = (questionId, answer) => {
    setUserResponses({ ...userResponses, [questionId]: answer });
    
    if (currentQuestion < questions.length - 1) {
      animateQuestionTransition(() => {
        setCurrentQuestion(currentQuestion + 1);
      });
    } else {
      // All questions answered, move to analysis
      const newResponses = { ...userResponses, [questionId]: answer };
      setCurrentPhase('analysis');
      
      // Generate analysis after a delay
      setTimeout(() => {
        const analysisText = generateAnalysis(newResponses);
        setAnalysis(analysisText);
        
        // Generate recommendations asynchronously
        generateRecommendations(newResponses).then(recs => {
          setRecommendations(recs);
        });
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      animateQuestionTransition(() => {
        setCurrentQuestion(currentQuestion - 1);
      });
    }
  };

  const handleSwipe = (direction) => {
    const currentCafe = recommendations[currentRecommendation];
    
    if (direction === 'right') {
      // Save to favorites
      const newSaved = [...savedCafes, currentCafe];
      setSavedCafes(newSaved);
      localStorage.setItem('savedCafes', JSON.stringify(newSaved));
    }
    
    // Move to next recommendation immediately (no additional animation needed)
    if (currentRecommendation < recommendations.length - 1) {
      setCurrentRecommendation(currentRecommendation + 1);
    } else {
      // End of recommendations
      setCurrentPhase('end');
    }
  };

  const animatePhaseTransition = () => {
    gsap.fromTo('.phase-content', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  };

  const animateQuestionTransition = (callback) => {
    gsap.to('.question-content', {
      opacity: 0,
      x: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        callback();
        gsap.fromTo('.question-content',
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    });
  };

  const renderContent = () => {
    switch (currentPhase) {
      case 'start':
        return <SmartFinderStart onStart={handleStart} />;
      
      case 'questions':
        return (
          <QuestionCard
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onBack={handleBack}
            currentAnswer={userResponses[questions[currentQuestion].id]}
          />
        );
      
      case 'analysis':
        return (
          <AnalysisScreen 
            analysis={analysis} 
            onContinue={() => setCurrentPhase('recommendations')}
          />
        );
      
      case 'recommendations':
        return (
          <div className="card-stack-container">
            {/* Render stack of cards */}
            {recommendations.slice(currentRecommendation, currentRecommendation + 3).map((cafe, index) => (
              <div
                key={`${cafe.id}-${currentRecommendation}`}
                className={`stacked-card ${index === 0 ? 'active' : ''}`}
                style={{
                  zIndex: 10 - index,
                  transform: `scale(${1 - index * 0.03}) translateY(${index * 8}px)`,
                  opacity: index === 0 ? 1 : 0.9
                }}
              >
                <RecommendationCard
                  cafe={cafe}
                  onSwipe={index === 0 ? handleSwipe : undefined}
                  currentIndex={currentRecommendation + index + 1}
                  totalCount={recommendations.length}
                  isActive={index === 0}
                />
              </div>
            ))}
          </div>
        );
      
      case 'end':
        return (
          <div className="end-screen phase-content">
            <div className="end-content">
              <h2>Selesai! 🎉</h2>
              <p>Anda telah menyimpan {savedCafes.length} kafe favorit</p>
              <button 
                className="view-favorites-btn"
                onClick={() => window.location.href = '/saved'}
              >
                Lihat Favorit Anda
              </button>
              <button 
                className="restart-btn"
                onClick={() => {
                  setCurrentPhase('start');
                  setCurrentQuestion(0);
                  setUserResponses({});
                  setCurrentRecommendation(0);
                }}
              >
                Mulai Lagi
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="smart-finder-page">
      {renderContent()}
    </div>
  );
};

export default SmartFinderPage;