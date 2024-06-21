import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <a onClick={handleLogout} className='text-white text-decoration-none mx-3 cursor-pointer'>
       <FiLogOut className="me-2" /> <span >Logout</span>
    </a>
  );
};

export default Logout;
