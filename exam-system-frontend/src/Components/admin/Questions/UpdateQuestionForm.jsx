import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuestion } from '../../../store/questions/questionsSlice';

const UpdateQuestionForm = ({ questionToEdit, onSuccess, clearEdit }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(questionToEdit.question);
  const [answer, setAnswer] = useState(questionToEdit.answer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateQuestion({ id: questionToEdit._id, question, answer }))
      .then(() => {
        onSuccess();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Question</h2>
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
      <button type="submit">Update Question</button>
      <button type="button" onClick={clearEdit}>Cancel</button>
    </form>
  );
};

export default UpdateQuestionForm;
