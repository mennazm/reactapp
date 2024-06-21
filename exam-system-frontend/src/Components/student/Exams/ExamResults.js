import React from 'react';
import '../../../styles/TakeExam.css';

const ExamResults = ({ score }) => {
  return (
    <div className="container-fluid py-5 custom-background">
      <div className="container bg-white p-5 rounded shadow-lg text-center">
        <h1 className="mb-5 custom-score">Your Score: <span className="fw-bold">{score}</span></h1>
        <a href="/student/exams" className="btn btn-primary fw-bold p-2 fs-5 custom-back-btn">
          Go to Exams
        </a>
      </div>
    </div>
  );
};

export default ExamResults;
