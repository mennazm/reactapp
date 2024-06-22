import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionById, clearSelectedQuestion } from '../../../store/questions/questionsSlice';
import '../../../css/Questions/QuestionDetailsComp.css';
import { IoIosArrowDropleftCircle } from "react-icons/io";




const QuestionDetailsComp = ({ questionId, onBack }) => {
  const dispatch = useDispatch();
  const question = useSelector(state => state.questions.selectedQuestion);
  const status = useSelector(state => state.questions.status);
  const error = useSelector(state => state.questions.error);

  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionById(questionId));
    }

    return () => {
      dispatch(clearSelectedQuestion());
    };
  }, [dispatch, questionId]);

  if (status === 'loading') {
    return <h3 className='alert alert-info container m-auto mt-5 w-75'>Loading...</h3>;
  }

  if (status === 'failed') {
    return <h3 className='alert alert-info container m-auto mt-5 w-75'>{error}</h3>;
  }

  return (
    <div className="question-details-container">
      <h3 className="question-details-title">Question Details</h3>
      <hr className='custom-hr'/>
      {question ? (
        <div className="question-details-content mt-5">
          <div className="chat-item">
            <div className="question"><strong>Question:</strong> {question.question}</div>
          </div>
          <div className="chat-item">
            <div className="answer"><strong>Answer:</strong> {question.answer}</div>
          </div><br/>
          <div className="chat-item">
            <div className="question"><strong>Grade:</strong> {question.grade}</div>
          </div><br/>
          <IoIosArrowDropleftCircle className="back-icon" onClick={onBack} />  
            </div>
      ) : (
        <div className='h3 alert alert-danger'>No question details available</div>
      )}
    </div>
  );
};

export default QuestionDetailsComp;
