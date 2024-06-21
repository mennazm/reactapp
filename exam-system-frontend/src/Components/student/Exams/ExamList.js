import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Api/ExamApi';
import { Link } from 'react-router-dom';
import '../../../styles/ExamList.css';

export function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosInstance.get('/exams');
        console.log('Response:', response.data);
        setExams(response.data);
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
      <div className="d-flex justify-content-start">
        
        
      </div>
      <h1 className="exam-list-title text-center">All Available Exams</h1>
      <div className="row">
        {exams.map((exam) => (
          <div key={exam._id} className="col-md-6 mb-4">
            <div className="exam-item list-group-item">
            <Link to={`${exam._id}`} className="exam-link">{exam.name}</Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}