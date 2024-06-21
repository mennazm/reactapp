
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../../../Api/ExamApi';

// export const TakeExam = () => {
//   const { examId } = useParams();

//   const [exam, setExam] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [score, setScore] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(3600);
//   const [timerActive, setTimerActive] = useState(false);

//   useEffect(() => {
//     const fetchExam = async () => {
//       try {
//         const response = await axiosInstance.get(`/exams/${examId}`);
//         console.log(response);
//         setExam(response.data);
//         setLoading(false);
//         setTimerActive(true);
//       } catch (err) {
//         console.error('Error fetching exam:', err);
//         setError('Failed to fetch exam. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchExam();
//   }, [examId]);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('id');
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }
//   }, []);

//   useEffect(() => {
//     if (timerActive && timeLeft > 0) {
//       const intervalId = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 1) {
//             clearInterval(intervalId);
//             handleSubmit();
//           }
//           return prevTime - 1;
//         });
//       }, 1000);

//       return () => clearInterval(intervalId);
//     }
//   }, [timerActive, timeLeft]);

//   const handleChange = (questionId, answer) => {
//     setAnswers({
//       ...answers,
//       [questionId]: answer,
//     });
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     try {
//       const userScore = calculateScore();
//       setScore(userScore);

//       const resultData = {
//         user: userId,
//         exam: examId,
//         score: userScore,
//       };

//       const response = await axiosInstance.post('/results/submit', resultData);
//       console.log('Exam submitted:', response.data);

//       setSubmitted(true);
//       setTimerActive(false);
//     } catch (err) {
//       console.error('Error submitting exam:', err);
//       setError('Failed to submit exam. Please try again later.');
//     }
//   };

//   const calculateScore = () => {
//     let correctAnswers = 0;
//     exam.questions.forEach((question) => {
//       const userAnswer = answers[question._id];
//       if (userAnswer && userAnswer.toLowerCase() === question.answer.toLowerCase()) {
//         correctAnswers++;
//       }
//     });
//     return correctAnswers;
//   };

//   if (loading) return <div>Loading...</div>;

//   if (error) return <div>{error}</div>;

//   if (!exam || !exam.questions || exam.questions.length === 0) {
//     return <div>No questions found for this exam.</div>;
//   }
//   if (!submitted) {
//     return (
//       <div className="container-fluid py-5">
//         <div className="container bg-white p-5">
//           <div className="d-flex justify-content-between mb-4">
//             <h3>Exam: <span className="fw-bold">{exam.name}</span></h3>
//             <h3>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</h3>
//           </div>
//           <form onSubmit={handleSubmit} className="take-exam-form">
//             {exam.questions.map((question) => (
//               <div key={question._id} className="question mb-5">
//                 <h3 className="h3">{question.question}</h3>
//                 <input
//                   type="text"
//                   className="form-control mt-3"
//                   placeholder="Enter your answer here..."
//                   value={answers[question._id] || ''}
//                   onChange={(e) => handleChange(question._id, e.target.value)}
//                 />
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="btn fw-bold p-2 fs-5 mt-4"
//               style={{ backgroundColor: '#093b56', float: 'right', color: 'white' }}
//             >
//               <i className="fa-solid fa-circle-check"></i> Finish Exam
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
  

//   return (
//     <div className="container-fluid py-5">
//       <div className="container bg-white p-5">
//         <h1 className="mb-5">Your Result: <span className="fw-bold">{score}</span></h1>
//         <a
//           href="/student/exams"
//           className="btn fw-bold p-2 fs-5"
          
          
//         >
//           Go Back
//         </a>
//       </div>
//     </div>
//   );
  
// };

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../../../Api/ExamApi';

// export const TakeExam = () => {
//   const { examId } = useParams();

//   const [exam, setExam] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [score, setScore] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [submitted, setSubmitted] = useState(false); 
//   const [timeLeft, setTimeLeft] = useState(900); 
//   const [timerActive, setTimerActive] = useState(false);
//   const [totalQuestions, setTotalQuestions] = useState(0);

//   useEffect(() => {
//     const fetchExam = async () => {
//       try {
//         const response = await axiosInstance.get(`/exams/${examId}`);
//         console.log(response);
//         setExam(response.data);
//         setTotalQuestions(response.data.questions.length);
//         setLoading(false);
//         setTimerActive(true); 
//       } catch (err) {
//         console.error('Error fetching exam:', err);
//         setError('Failed to fetch exam. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchExam();
//   }, [examId]);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('id');
//     if (storedUserId) {
//       setUserId(storedUserId);
//     }
//   }, []);

//   useEffect(() => {
//     if (timerActive && timeLeft > 0) {
//       const intervalId = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime <= 1) {
//             clearInterval(intervalId);
//             handleSubmit(); 
//           }
//           return prevTime - 1;
//         });
//       }, 1000);

//       return () => clearInterval(intervalId);
//     }
//   },);

//   const handleChange = (questionId, answer) => {
//     setAnswers({
//       ...answers,
//       [questionId]: answer,
//     });
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     try {
//       const userScore = calculateScore();
//       setScore(userScore);

//       const resultData = {
//         user: userId,
//         exam: examId,
//         score: userScore,
//       };

//       const response = await axiosInstance.post('/results/submit', resultData);
//       console.log('Exam submitted:', response.data);

//       setSubmitted(true);
//       setTimerActive(false); 
//     } catch (err) {
//       console.error('Error submitting exam:', err);
//       setError('Failed to submit exam. Please try again later.');
//     }
//   };

//   const calculateScore = () => {
//     let correctAnswers = 0;
//     exam.questions.forEach((question) => {
//       const userAnswer = answers[question._id];
//       if (userAnswer && userAnswer.toLowerCase() === question.answer.toLowerCase()) {
//         correctAnswers++;
//       }
//     });
//     return correctAnswers;
//   };

//   if (loading) return <div>Loading...</div>;

//   if (error) return <div>{error}</div>;

//   if (!exam || !exam.questions || exam.questions.length === 0) {
//     return <div>No questions found for this exam.</div>;
//   }

//   if (!submitted) {
//         return (
//           <div className="container-fluid py-5">
//             <div className="container bg-white p-5">
//               <div className="d-flex justify-content-between mb-4">
//                 <h3>Exam: <span className="fw-bold">{exam.name}</span></h3>
//                 <h3>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</h3>
//               </div>
//               <form onSubmit={handleSubmit} className="take-exam-form">
//                 {exam.questions.map((question) => (
//                   <div key={question._id} className="question mb-5">
//                     <h3 className="h3">{question.question}</h3>
//                     <input
//                       type="text"
//                       className="form-control mt-3"
                      
//                       value={answers[question._id] || ''}
//                       onChange={(e) => handleChange(question._id, e.target.value)}
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="submit"
//                   className="btn fw-bold p-2 fs-5 mt-4"
//                   style={{ backgroundColor: '#093b56', float: 'right', color: 'white' }}
//                 >
//                   <i className="fa-solid fa-circle-check"></i> Finish Exam
//                 </button>
//               </form>
//             </div>
//           </div>
//         );
//       }
//   return (
//     <div className="container-fluid py-5">
//       <div className="container bg-white p-5">
//         <h1 className="mb-5">You Answer : <span className="fw-bold">{score} of {totalQuestions} Questions correctly</span></h1>
//         <a
//           href="/student/exams"
//           className="btn fw-bold p-2 fs-5"
//           style={{
//             backgroundColor: '#093b56',
//             float: 'right',
//             color: 'white',
//             marginTop: '20px'
//           }}
//         >
//           Go Back
//         </a>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');
    const fetchExam = async () => {
      try {
        const response = await axiosInstance.get(`/exams/${examId}`);
        setExam(response.data);
        setLoading(false);
        setTimerActive(true);
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError('Failed to fetch exam. Please try again later.');
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

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
        <div className="container bg-light rounded shadow">
          <h1 className="text-center mb-5">Exam: <span className="fw-bold text-primary">{exam.name}</span></h1>
          <h3 className="text-end text-success mb-4">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</h3>
          <form onSubmit={handleSubmit} style ={{margin:'auto'}}className="take-exam-form p-4 bg-white rounded shadow">
            {exam.questions.map((question) => (
              <div key={question._id} className="question mb-4">
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
            <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
              Finish Exam
            </button>
          </form>
        </div>
      </div>
    );
  }

  const { totalScore, gradedQuestions, correctAnswersCount } = calculateScore();

  return (
    <div className="container-fluid py-5">
      <div className="container text-center">
        <h1 className="mb-5">
          You Answered: <span className="fw-bold text-success">{correctAnswersCount} out of {exam.questions.length} Questions correctly</span>
        </h1>
        <h2>Your Total Score: <span className="fw-bold text-primary">{totalScore}</span></h2>
        <div className="mb-5">
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
        <a
          href="/student/exams"
          className="btn btn-outline-primary btn-lg mt-4"
        >
          Go Back
        </a>
      </div>
    </div>
  );
};

