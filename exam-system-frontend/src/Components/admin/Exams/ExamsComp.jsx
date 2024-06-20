import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams, deleteExam, fetchExamById, clearSelectedExam } from '../../../store/exams/examSlice';
import AddExamsForm from './AddExamsForm';
import UpdateExamsForm from './UpdateExamsForm';
import ExamsDetailsComp from './ExamsDetailsComp';
import { BiPlusCircle, BiPencil, BiTrash, BiDetail } from 'react-icons/bi';
import '../../../css/Exams/ExamsComp.css';

const ExamsComp = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.exams);
  const selectedExam = useSelector((state) => state.exams.selectedExam);
  const status = useSelector((state) => state.exams.status);
  const error = useSelector((state) => state.exams.error);

  const [editExam, setEditExam] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExams());
    }
  }, [status, dispatch]);

  const handleDeleteExam = (id) => {
    dispatch(deleteExam(id));
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

  if (status === 'loading') {
    return <h3 className='alert alert-info container m-auto mt-5 w-75'>Loading...</h3>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
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
