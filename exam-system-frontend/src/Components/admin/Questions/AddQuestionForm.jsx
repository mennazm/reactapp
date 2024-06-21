import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewQuestion } from '../../../store/questions/questionsSlice';
import '../../../css/Questions/AddQuestionForm.css'

const AddQuestionForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [grade, setGrade] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewQuestion({ question, answer ,grade}))
      .then(() => {
        onSuccess();
      });
  };

  return (
    <div className="add-question-container">
       <h3 className="add-question-title">Add New Question</h3>
       <hr className='custom-hr'/>
    <form onSubmit={handleSubmit} className="add-question-form mt-5">
      <div className="form-group">
        <label htmlFor="question" className="form-label">Question:</label>
        <input 
          type="text" 
          className="form-control" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="answer" className="form-label">Answer:</label>
        <input 
          type="text" 
          className="form-control"
          value={answer} 
          onChange={(e) => setAnswer(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="grade" className="form-label">Grade:</label>
        <input 
          type="text" 
          className="form-control"
          value={grade} 
          onChange={(e) => setGrade(e.target.value)} 
          required 
        />
      </div>
      
      <br/>
      <button className="btn" type="submit" id='add-btn'>Add Question</button>
      <button type="button" onClick={onSuccess} className="btn btn-secondary mx-2">Cancel</button>
    </form>
    </div>
  );
};

export default AddQuestionForm;
