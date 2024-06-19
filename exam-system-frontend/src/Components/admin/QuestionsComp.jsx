import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../store/questions/questionsSlice'; // Adjust the import path as needed

const QuestionsComp = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.questions.questions); // Correctly access the questions array
  const status = useSelector(state => state.questions.status);
  const error = useSelector(state => state.questions.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      {questions && questions.length > 0 ? (
        <ul>
          {questions.map(question => (
            <li key={question._id}>{question.question} ------ {question.answer}</li> // Adjusted to use _id if that is the identifier
          ))}
        </ul>
      ) : (
        <div>No questions available</div>
      )}
    </div>
  );
};

export default QuestionsComp;
