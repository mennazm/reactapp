import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewExam } from '../../../store/exams/examSlice';
import { fetchQuestions } from '../../../store/questions/questionsSlice';
import '../../../css/Exams/AddExamForm.css'

const AddExamForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const status = useSelector((state) => state.questions.status);

  const [name, setName] = useState('');
  const [score, setScore] = useState('');
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
    dispatch(addNewExam({ name, questions: selectedQuestions ,score}))
      .then(() => {
        onSuccess();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="add-exam-form mb-5">
      <h3>Add New Exam</h3>
      <hr className='custom-hr'/> <br/>
      <div className="form-group">
        <label htmlFor="examName">Name:</label>
        <input 
          type="text" 
          id="examName"
          value={name} 
          className="form-control"
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label htmlFor="examScore">Score:</label>
        <input 
          type="number" 
          id="examScore"
          value={score} 
          className="form-control"
          onChange={(e) => setScore(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Questions:</label>
        {questions && questions.length > 0 ? (
          questions.map((question,index) => (
            <div key={question._id} className="question-item">
              <label className="question-label">
                <input
                  type="checkbox"
                  value={question._id}
                  className="form-check-input"
                  onChange={() => handleQuestionChange(question._id)}
                />
                <div className="d-flex justify-content-between w-100 my-4 all-ques mx-2">
                  <span className="question-text ">
                    {index + 1} - {question.question}
                  </span>
                  <div className="question-details">
                    <p>Answer: {question.answer}</p>
                    <p>Grade: {question.grade}</p>
                  </div>
                </div>
              </label>
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Add Exam</button>
        <button type="button" onClick={onSuccess} className="btn btn-secondary mx-2">Cancel</button>
      </div>
    </form>
  );
};

export default AddExamForm;
