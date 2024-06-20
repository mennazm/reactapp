import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const ResultsList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token'); 
      
      try {
        const response = await axios.get('http://localhost:8080/results', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container m-auto mt-5 All_exams">
      <h3 className="my-4">Student Results</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Exam</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result._id}>
              <td>{index + 1}</td>
              <td>{result.user ? result.user.name : 'N/A'}</td>
              <td>{result.exam ? result.exam.name : 'N/A'}</td>
              <td>{result.score}</td>
              <td>{new Date(result.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsList;
