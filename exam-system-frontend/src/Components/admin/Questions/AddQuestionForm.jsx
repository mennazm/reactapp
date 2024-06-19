import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewQuestion } from '../../../store/questions/questionsSlice';

const AddQuestionForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewQuestion({ question, answer }))
      .then(() => {
        onSuccess();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Question</h2>
      <div>
        <label>Question:</label>
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Answer:</label>
        <input 
          type="text" 
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Add Question</button>
      <button type="button" onClick={onSuccess}>Cancel</button>
    </form>
  );
};

export default AddQuestionForm;
