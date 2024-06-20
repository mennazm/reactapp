import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewExam } from '../../../store/exams/examSlice';
import { fetchQuestions } from '../../../store/questions/questionsSlice';

const AddExamForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const status = useSelector((state) => state.questions.status);

  const [name, setName] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [status, dispatch]);

  const handleQuestionChange = (questionId) => {
    setSelectedQuestions(prevSelected =>
      prevSelected.includes(questionId)
        ? prevSelected.filter(id => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewExam({ name, questions: selectedQuestions }))
      .then(() => {
        onSuccess();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Exam</h2>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Questions:</label>
        {questions && questions.length > 0 ? (
          questions.map((question) => (
            <div key={question._id}>
              <label>
                <input
                  type="checkbox"
                  value={question._id}
                  onChange={() => handleQuestionChange(question._id)}
                />
                {question.question} - {question.answer}
              </label>
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
      <button type="submit">Add Exam</button>
      <button type="button" onClick={onSuccess}>Cancel</button>
    </form>
  );
};

export default AddExamForm;
