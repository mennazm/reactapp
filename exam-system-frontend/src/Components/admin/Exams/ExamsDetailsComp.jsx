import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamById, clearSelectedExam } from '../../../store/exams/examSlice';
import { fetchQuestions } from '../../../store/questions/questionsSlice';
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
      dispatch(fetchQuestions()); // Fetch all questions to map with exam question IDs
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
    return question ? `${question.question} - ${question.answer}` : 'Question not found';
  };

  return (
    <div className="exam-details-container">
      <h3 className="exam-details-title">Exam Details</h3>
      {exam ? (
        <div className="exam-details-content">
          <p><strong>Name:</strong> {exam.name}</p>
          <p><strong>Questions:</strong></p>
          <ul>
            {exam.questions.map((question, index) => (
              <li key={question._id}>
                {`${question.question} - ${question.answer}`}
              </li>
            ))}
          </ul>
          <button onClick={onBack} className="exam-details-button">Back to Exams</button>
        </div>
      ) : (
        <div className='h3 alert alert-danger'>No exam details available</div>
      )}
    </div>
  );
};

export default ExamDetailsComp;
