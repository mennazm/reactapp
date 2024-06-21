import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Api/ExamApi'; 


export function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('id'); 
    if (!userId) {
      setError('User ID not found in local storage.');
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get(`/results/user/${userId}`);
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to fetch results. Please try again later.');
        setLoading(false);
      }
    };

    fetchResults();
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (results.length === 0) {
    return <div>No results found for this user.</div>;
  }

  return (
    <>
    <div className="results-container">
      <h1 className="text-center m-5">Exam Results</h1>
      <a href="/home" className="btn btn-primary fw-bold fs-5 mb-1">
        <i className="fas fa-home"></i>
      </a>
      <table className="table table-hover table-striped">
        <thead className="table-dark text-light text-center">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Exam Name</th>
            <th scope="col">Score</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result._id}>
              <td>{index + 1}</td>
              <td>{result.exam.name}</td>
              <td>{result.score}</td>
              <td>{new Date(result.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}