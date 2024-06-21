import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuestion } from '../../../store/questions/questionsSlice';
import '../../../css/Questions/AddQuestionForm.css'


const UpdateQuestionForm = ({ questionToEdit, onSuccess, clearEdit }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(questionToEdit.question);
  const [answer, setAnswer] = useState(questionToEdit.answer);
  const [grade, setGrade] = useState(questionToEdit.grade);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateQuestion({ id: questionToEdit._id, question, answer,grade }))
      .then(() => {
        onSuccess();
      });
  };

  return (
    <div className="add-question-container">
       <h3 className="add-question-title">Update Question</h3>
       <hr className='custom-hr'/>
    <form onSubmit={handleSubmit} className="add-question-form mt-5">
    <div className="form-group">
    <label htmlFor="question" className="form-label">Question:</label>
        <input 
          type="text" 
          value={question} 
          className="form-control"
          onChange={(e) => setQuestion(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="answer" className="form-label">Answer:</label>
        <input 
          type="text" 
          value={answer} 
          className="form-control"
          onChange={(e) => setAnswer(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="grade" className="form-label">Grade:</label>
        <input 
          type="text" 
          value={grade} 
          className="form-control"
          onChange={(e) => setGrade(e.target.value)} 
          required 
        />
      </div>
      <br/>
      <button type="submit" className='btn' id='add-btn'>Update Question</button>
      <button type="button" onClick={clearEdit} className="btn btn-secondary mx-2">Cancel</button>
    </form>
    </div>
  );
};

export default UpdateQuestionForm;
