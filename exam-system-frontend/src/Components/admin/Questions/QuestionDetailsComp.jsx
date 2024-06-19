import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionById, clearSelectedQuestion } from '../../../store/questions/questionsSlice';

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
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Question Details</h2>
      {question ? (
        <div>
          <p><strong>Question:</strong> {question.question}</p>
          <p><strong>Answer:</strong> {question.answer}</p>
          <button onClick={onBack}>Back to Questions</button>
        </div>
      ) : (
        <div>No question details available</div>
      )}
    </div>
  );
};

export default QuestionDetailsComp;
