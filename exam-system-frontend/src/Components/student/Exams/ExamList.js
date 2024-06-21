import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Api/ExamApi';
import { Link } from 'react-router-dom';
import '../../../styles/ExamList.css';
import { BiHighlight } from 'react-icons/bi';

export function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosInstance.get('/exams');
        console.log('Response:', response.data);
        
        // Filter exams with status "available"
        const availableExams = response.data.filter(exam => exam.status === 'available');
        
        setExams(availableExams);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching exams:', err);
        setError('Failed to fetch exams. Please try again later.');
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container exam-list-container">
      <h3 className="exam-list-title my-4">All Available Exams</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Exam Name</th>
            <th scope="col">Take Exam</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id}>
              <td>{exam.name}</td>
              <td>
                <Link to={`${exam._id}`}>
                <BiHighlight className="me-1" style={{ fontSize: '1.5rem' }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
