
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../Api/ExamApi';
import { MdTimer } from 'react-icons/md';
import '../../../styles/TakeExam.css'

export const TakeExam = () => {
  const { examId } = useParams();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(500);
  const [timerActive, setTimerActive] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');
  
    const fetchUserRole = async () => {
      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'user') {
        navigate('/login'); 
      } else {
        await fetchUserData();
        fetchExam();
      }
    };

    const fetchExam = async () => {
      try {
        const response = await axiosInstance.get(`/exams/${examId}`);
        setExam(response.data);
        setLoading(false);
        setTimerActive(true);
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError('Failed to fetch exam. Please try again later.');
        setLoading(false);
      }
    };
    
    const fetchUserData = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          const response = await axiosInstance.get(`/users/${storedUserId}`);
          console.log(response.data.user.name)
          setUserName(response.data.user.name);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };


    fetchUserRole();
  }, [navigate, examId]);

  
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            handleSubmit(); // Automatically submit when time is up
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timerActive, timeLeft]);

  const handleChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const { totalScore, gradedQuestions, correctAnswersCount } = calculateScore();
      setScore(totalScore);

      const resultData = {
        user: userId,
        exam: examId,
        score: totalScore,
      };

      const response = await axiosInstance.post('/results/submit', resultData);
      console.log('Exam submitted:', response.data);

      setSubmitted(true);
      setTimerActive(false);
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError('Failed to submit exam. Please try again later.');
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    let correctAnswersCount = 0;
    const gradedQuestions = exam.questions.map((question) => {
      const userAnswer = answers[question._id];
      let isCorrect = false;
      if (userAnswer && userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        totalScore += question.grade; // Add the grade of the question to the total score
        isCorrect = true;
        correctAnswersCount++;
      }
      return {
        ...question,
        userAnswer,
        isCorrect,
      };
    });

    return { totalScore, gradedQuestions, correctAnswersCount };
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (error) return <div className="error-message">{error}</div>;

  if (!exam || !exam.questions || exam.questions.length === 0) {
    return <div>No questions found for this exam.</div>;
  }

  if (!submitted) {
    return (
      <div className="container-fluid py-5">
        <div className="container bg-light rounded shadow p-2">
          <h3 className="my-3 user-name"> {userName} </h3>  
          <hr className='w-75 custom-hr'/>
          <div className='d-flex justify-content-between w-75 m-auto'>
          
          <h2 className="text-center my-3 exam-name">  <span id='examm' className='lead'>Exam</span> <br/>{exam.name}</h2> 
          <h2 className="text-center my-3 exam-name">  <span id='examm' className='lead'>Score</span> <br/>{exam.score}</h2> 
          
          
          <div className='d-flex align-items-start timer-container '>
         
         <MdTimer size={35} color="#093b56" />
         <p className='lead mx-1'>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60} Min</p>
         <p className='mt-4 ' id='time-left'>Time Left</p>
 
          </div>
         
     
          </div>
          
        <form onSubmit={handleSubmit} style ={{margin:'auto'}}className="take-exam-form  p-4 bg-white rounded shadow mt-3">
            {exam.questions.map((question,index) => (
              <div key={question._id} className="question mb-4  m-auto">
                <h5 className='text-center'>Question {index+1} </h5>
                <hr className='hr-custom '/><br/>
                <h3 className="h4">{question.question}</h3>
                <p className="text-muted mb-3">Grade: {question.grade}</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Answer here"
                  value={answers[question._id] || ''}
                  onChange={(e) => handleChange(question._id, e.target.value)}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-lg" id='btn-finish'>
              Finish Exam
            </button>
          </form><br/>
        </div>
      </div>
    );
  }

  const { totalScore, gradedQuestions, correctAnswersCount } = calculateScore();
  const passingScore = 60; 
  const isPassed = totalScore >= passingScore;

  const scorePercentage = (totalScore / exam.score) * 100;
  return (
    <div className="container-fluid py-5 results-page">
      <div className="container text-center results-container">
        <h1 className="mb-5">
          <span className="fw-bold">Your Result</span>
        </h1>
        <div className="result-circles d-flex justify-content-around my-4">
          <div className="score-circle">
            <div className="circle-inner">
              <div className="circle-content">
                <span>{scorePercentage.toFixed(2)}%</span>
                <p>Your Score: {totalScore}</p>
              </div>
            </div>
          </div>
          <div className="score-circle">
            <div className="circle-inner passing-circle">
              <div className="circle-content">
                <span>{passingScore}%</span>
                <p>Passing Score: {passingScore}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`alert ${isPassed ? 'alert-success' : 'alert-danger'} mt-4`} role="alert">
          <strong>{isPassed ? 'You passed!' : 'You didn’t pass'}</strong>
          <p>{isPassed ? 'Congratulations!' : 'Better Luck Next Time!'}</p>
        </div>
     
        <div className="detailed-results mt-5">
          <h2>Detailed Results:</h2>
          <ul className="list-unstyled">
            {gradedQuestions.map((q, index) => (
              <li key={index} className="my-4 p-3 border rounded shadow-sm bg-light">
                <p className="text-left">
                  <strong className="text-dark">Question:</strong> {q.question}<br />
                  <strong className="text-dark">Your Answer:</strong> {q.userAnswer || 'Not Answered'} <br />
                  <strong className="text-dark">Correct Answer:</strong> {q.answer}<br />
                  <strong className="text-dark">Grade:</strong> {q.grade} <br />
                  <strong className="text-dark">Status:</strong> <span className={q.isCorrect ? 'text-success' : 'text-danger'}>{q.isCorrect ? 'Correct' : 'Incorrect'}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <a href="/student/exams" className="btn btn-lg mt-4 m-auto" id='btn-finish'>
          Go Back
        </a>
      </div>
    </div>
  );
};

