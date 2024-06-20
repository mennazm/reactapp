import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExam } from '../../../store/exams/examSlice';
import { fetchQuestions } from '../../../store/questions/questionsSlice';

const UpdateExamForm = ({ examToEdit, onSuccess, clearEdit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(examToEdit.name);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const allQuestions = useSelector(state => state.questions.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
    setSelectedQuestions(examToEdit.questions.map(q => q._id)); // Initialize selected questions with current exam's question IDs
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
    <form onSubmit={handleSubmit}>
      <h2>Update Exam</h2>
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
        {allQuestions && allQuestions.length > 0 ? (
          allQuestions.map((question) => {
            const isChecked = selectedQuestions.includes(question._id);
            return (
              <div key={question._id}>
                <label>
                  <input
                    type="checkbox"
                    value={question._id}
                    checked={isChecked}
                    onChange={() => handleQuestionChange(question._id)}
                  />
                  {question.question} - {question.answer}
                </label>
              </div>
            );
          })
        ) : (
          <p>No questions available</p>
        )}
      </div>
      <button type="submit">Update Exam</button>
      <button type="button" onClick={clearEdit}>Cancel</button>
    </form>
  );
};

export default UpdateExamForm;
