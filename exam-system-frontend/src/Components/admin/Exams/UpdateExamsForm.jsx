import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExam } from '../../../store/exams/examSlice';
import { fetchQuestions } from '../../../store/questions/questionsSlice';
import '../../../css/Exams/AddExamForm.css'


const UpdateExamForm = ({ examToEdit, onSuccess, clearEdit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(examToEdit.name);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const allQuestions = useSelector(state => state.questions.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
    setSelectedQuestions(examToEdit.questions.map(q => q._id)); 
  }, [dispatch, examToEdit.questions]);

  const handleQuestionChange = (questionId) => {
    setSelectedQuestions(prevSelected =>
      prevSelected.includes(questionId)
        ? prevSelected.filter(id => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionsObjects = allQuestions.filter(q => selectedQuestions.includes(q._id));
    dispatch(updateExam({ id: examToEdit._id, name, questions: questionsObjects }))
      .then(() => {
        onSuccess();
      });
  };

  return (
    <form onSubmit={handleSubmit}  className="add-exam-form mb-5">
      <h3>Update Exam</h3>
      <hr className='custom-hr'/> <br/>
      <div className="form-group">
      <label htmlFor="examName">Name:</label>
        <input 
          type="text" 
          value={name} 
          className="form-control"
           id="examName"
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Questions:</label>
        {allQuestions && allQuestions.length > 0 ? (
          allQuestions.map((question,index) => {
            const isChecked = selectedQuestions.includes(question._id);
            return (
              <div key={question._id} className="question-item">
                <label className="question-label">
                  <input
                    type="checkbox"
                    value={question._id}
                    checked={isChecked}
                    className="form-check-input"
                    onChange={() => handleQuestionChange(question._id)}
                  />
                  <div className="d-flex justify-content-between w-100 my-4 all-ques mx-2">
                  <span className="question-text px-2">
                    {index + 1} - {question.question}
                  </span>
                  <div className="question-details">
                    <p>Answer: {question.answer}</p>
                    <p>Grade: {question.grade}</p>
                  </div>
                </div>
                </label>
              </div>
            );
          })
        ) : (
          <p>No questions available</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Update Exam</button>
      <button type="button" onClick={clearEdit}  className="btn btn-secondary mx-2">Cancel</button>
    </form>
  );
};

export default UpdateExamForm;
