import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, deleteQuestion, fetchQuestionById, clearSelectedQuestion } from '../../../store/questions/questionsSlice';
import AddQuestionForm from './AddQuestionForm';
import UpdateQuestionForm from './UpdateQuestionForm';
import QuestionDetailsComp from './QuestionDetailsComp';
import { BiPlusCircle, BiPencil, BiTrash, BiDetail } from 'react-icons/bi';
import '../../../css/Questions/QuestionsComp.css';

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
    return <h3 className='alert alert-info container m-auto mt-5 w-75'>Loading...</h3>;
  }

  if (status === 'failed') {
    return <h3 className='alert alert-info container m-auto mt-5 w-75'>{error}</h3>;
  }

  return (
    <div className='m-auto mt-5 All_questions'>
      {!showAddForm && !showUpdateForm && !selectedQuestion && (
        <>
          <div className="d-flex justify-content-between my-4">
            <div>
              <h3 className="m-0">All Questions</h3>
            </div>
            <BiPlusCircle className="add_icon" onClick={() => setShowAddForm(true)} />
          </div>
          <table className='custom-table table table-striped mt-4'>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions && questions.length > 0 ? (
                questions.map((question, index) => (
                  <tr key={question._id}>
                    <td>{index + 1}</td>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>{question.grade}</td>
                    <td>
                      <button onClick={() => { setEditQuestion(question); setShowUpdateForm(true); }} className="btn btn-outline-primary btn-sm me-2">
                        <BiPencil />
                      </button>
                      <button onClick={() => handleDeleteQuestion(question._id)} className="btn btn-outline-danger btn-sm me-2">
                        <BiTrash />
                      </button>
                      <button onClick={() => handleShowDetails(question._id)} className="btn btn-outline-info btn-sm">
                        <BiDetail />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className='h3 alert alert-danger'>No questions available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

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
