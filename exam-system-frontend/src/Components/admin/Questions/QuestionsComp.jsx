import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, deleteQuestion, fetchQuestionById, clearSelectedQuestion } from '../../../store/questions/questionsSlice';
import AddQuestionForm from './AddQuestionForm';
import UpdateQuestionForm from './UpdateQuestionForm';
import QuestionDetailsComp from './QuestionDetailsComp';

const QuestionsComp = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const selectedQuestion = useSelector((state) => state.questions.selectedQuestion);
  const status = useSelector((state) => state.questions.status);
  const error = useSelector((state) => state.questions.error);

  const [editQuestion, setEditQuestion] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [status, dispatch]);

  const handleDeleteQuestion = (id) => {
    dispatch(deleteQuestion(id));
  };

  const clearEdit = () => {
    setEditQuestion(null);
    setShowUpdateForm(false);
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    dispatch(fetchQuestions());
  };

  const handleUpdateSuccess = () => {
    clearEdit();
    dispatch(fetchQuestions());
  };

  const handleShowDetails = (questionId) => {
    dispatch(fetchQuestionById(questionId));
  };

  const handleBackToList = () => {
    dispatch(clearSelectedQuestion());
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Questions</h2>
      {!selectedQuestion && (
        <>
          <button onClick={() => setShowAddForm(true)}>Add Question</button>
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions && questions.length > 0 ? (
                questions.map((question) => (
                  <tr key={question._id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                      <button onClick={() => { setEditQuestion(question); setShowUpdateForm(true); }}>Edit</button>
                      <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
                      <button onClick={() => handleShowDetails(question._id)}>Details</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No questions available</td>
                </tr>
              )}
            </tbody>
          </table>

          {showAddForm && (
            <AddQuestionForm onSuccess={handleAddSuccess} />
          )}

          {showUpdateForm && editQuestion && (
            <UpdateQuestionForm
              questionToEdit={editQuestion}
              onSuccess={handleUpdateSuccess}
              clearEdit={clearEdit}
            />
          )}
        </>
      )}

      {selectedQuestion && (
        <QuestionDetailsComp
          question={selectedQuestion}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default QuestionsComp;
