// src/components/StudentResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token'); 
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:8081/results/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container m-auto mt-5 All_exams">
      <h3 className="my-4">Student Results</h3>
      {results.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No results to show.
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Exam</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={result._id}>
                <td>{index + 1}</td>
                <td>{result.exam ? result.exam.name : 'N/A'}</td>
                <td>{result.score}</td>
                <td>{new Date(result.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentResults;
