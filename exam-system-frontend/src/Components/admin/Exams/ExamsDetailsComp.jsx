import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamById, clearSelectedExam } from '../../../store/exams/examSlice';
import { fetchQuestions } from '../../../store/questions/questionsSlice';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import '../../../css/Exams/ExamDetailsComp.css';

const ExamDetailsComp = ({ examId, onBack }) => {
  const dispatch = useDispatch();
  const exam = useSelector((state) => state.exams.selectedExam);
  const questions = useSelector((state) => state.questions.questions);
  const status = useSelector((state) => state.exams.status);
  const error = useSelector((state) => state.exams.error);

  useEffect(() => {
    if (examId) {
      dispatch(fetchExamById(examId));
      dispatch(fetchQuestions()); 
    }

    return () => {
      dispatch(clearSelectedExam());
    };
  }, [dispatch, examId]);

  if (status === 'loading') {
    return <h3 className='alert alert-info container m-auto mt-5 w-75'>Loading...</h3>;
  }

  if (status === 'failed') {
    return <h3 className='alert alert-info container m-auto mt-5 w-75'>{error}</h3>;
  }

  const getQuestionDetails = (questionId) => {
    const question = questions.find((q) => q._id === questionId);
    return question ? `${question.question} - ${question.answer} -  ${question.grade} ` : 'Question not found';
  };

  return (
    <div className="exam-details-container mb-5">
      <h3 className="exam-details-title text-center"> {exam.name} Exam Details</h3>
      <hr className='custom-hr'/> <br/>
      {exam ? (
        <div className="exam-details-content">
          <p><strong>Questions:</strong></p>
          <ol>
            {exam.questions.map((question) => (
              <li key={question._id} className="question-item">
                <span className="question-text"> {question.question}</span>
                  <div className="question-details">
                    <p><strong>Answer:</strong> {question.answer}</p>
                    <p><strong>Grade:</strong> {question.grade}</p>
                  </div>
              </li>
            ))}
          </ol>
          <IoIosArrowDropleftCircle className="back-icon" onClick={onBack} />  
        </div>
      ) : (
        <div className='h3 alert alert-danger'>No exam details available</div>
      )}
    </div>
  );
};

export default ExamDetailsComp;
