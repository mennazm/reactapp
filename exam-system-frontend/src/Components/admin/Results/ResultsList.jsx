import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResultsList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserRole = () => {
      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'admin') {
        navigate('/login'); 
      } else {
        fetchResults();
      }
    };

    const fetchResults = async () => {
      const token = localStorage.getItem('token'); 

      try {
        const response = await axios.get('http://localhost:8081/results', {
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

    fetchUserRole();
  }, [navigate]); 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container m-auto mt-5 All_exams">
      <h3 className="my-4">students' results</h3>
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
