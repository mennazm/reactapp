import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams, deleteExam, fetchExamById, clearSelectedExam, updateExamStatusLocally, updateExamStatus } from '../../../store/exams/examSlice';
import AddExamsForm from './AddExamsForm';
import UpdateExamsForm from './UpdateExamsForm';
import ExamsDetailsComp from './ExamsDetailsComp';
import { BiPlusCircle, BiPencil, BiTrash, BiDetail } from 'react-icons/bi';
import '../../../css/Exams/ExamsComp.css';
import { useNavigate } from 'react-router-dom';

const ExamsComp = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.exams);
  const selectedExam = useSelector((state) => state.exams.selectedExam);
  const status = useSelector((state) => state.exams.status);
  const error = useSelector((state) => state.exams.error);
  const examId = useSelector((state) => state.exams.selectedExamId);
  const selectedQuestion = useSelector((state) => state.questions.selectedQuestion);

  const [editExam, setEditExam] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate(); 

  const fetchUserRole = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/login'); 
    } else {
      fetchExams(); 
    }
  };

  useEffect(() => {
    fetchUserRole(); 
  }, [navigate]);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExams());
    }
  }, [status, dispatch]);

  const handleDeleteExam = (examId) => {
      dispatch(deleteExam(examId));
  };

  const clearEdit = () => {
    setEditExam(null);
    setShowUpdateForm(false);
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    dispatch(fetchExams());
  };

  const handleUpdateSuccess = () => {
    clearEdit();
    dispatch(fetchExams());
  };

  const handleShowDetails = (examId) => {
    dispatch(fetchExamById(examId));
  };

  const handleBackToList = () => {
    dispatch(clearSelectedExam());
  };

  const handleStatusChange = (examId, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'unavailable' : 'available';
    // Optimistic update
    dispatch(updateExamStatusLocally({ id: examId, status: newStatus }));
    // Dispatch the async thunk to update the status in the backend
    dispatch(updateExamStatus({ id: examId, status: newStatus }));
  };

  if (status === 'loading') {
    return <h3 className='alert alert-info container m-auto mt-5 w-75'>Loading...</h3>;
  }

  if (status === 'failed') {
    return <h3 className='alert alert-info container m-auto mt-5 w-75'>{error}</h3>;
  }

  return (
    <div className='m-auto mt-5 All_exams'>
      {!showAddForm && !showUpdateForm && !selectedExam && (
        <>
          <div className="d-flex justify-content-between my-4">
            <div>
              <h3 className="m-0">All Exams</h3>
            </div>
            <BiPlusCircle className="add_icon" onClick={() => setShowAddForm(true)} />
          </div>
          <table className='custom-table table table-striped mt-4'>
            <thead>
              <tr>
                <th>#</th>
                <th>Exam Name</th>
                <th>Questions</th>
                <th>Avaliable</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams && exams.length > 0 ? (
                exams.map((exam, index) => (
                  <tr key={exam._id}>
                    <td>{index + 1}</td>
                    <td>{exam.name}</td>
                    <td>{exam.questions.length}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={exam.status === 'available'}
                        onChange={() => handleStatusChange(exam._id, exam.status)}
                      />
                    </td>
                    <td>
                      <button onClick={() => { setEditExam(exam); setShowUpdateForm(true); }} className="btn btn-outline-primary btn-sm me-2">
                        <BiPencil />
                      </button>
                      <button onClick={() => handleDeleteExam(exam._id)} className="btn btn-outline-danger btn-sm me-2">
                        <BiTrash />
                      </button>
                      <button onClick={() => handleShowDetails(exam._id)} className="btn btn-outline-info btn-sm">
                        <BiDetail />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className='h3 alert alert-danger'>No exams available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {showAddForm && (
        <AddExamsForm onSuccess={handleAddSuccess} />
      )}

      {showUpdateForm && editExam && (
        <UpdateExamsForm
          examToEdit={editExam}
          onSuccess={handleUpdateSuccess}
          clearEdit={clearEdit}
        />
      )}

      {selectedExam && (
        <ExamsDetailsComp
          exam={selectedExam}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default ExamsComp;
