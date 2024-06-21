import React from 'react'
import '../styles/welcome.css'
import { useNavigate } from 'react-router-dom';
export default function Welcome() {
    const navigate = useNavigate();

    const navigateToAdminLogin = () => {
      navigate('/login');
    };
    const navigateTouserLogin = () => {
        navigate('/register');
      };
  
  return (
    <div className="welcome">
      <div className="welcome-container">
        <div className="row">
            <div className="col-6 welcome-text">
            <h1>Welcome to ExamMaster !</h1>
        <p>We are excited to have you here.</p>
        <button className="admin-button w-100" onClick={navigateToAdminLogin}>Login as Admin</button>
        <button className="user-button w-100" onClick={navigateTouserLogin}>Login as User</button>
            </div>
            <div className="col-6">
            <div className="illustration">
          <img src="images/welcomee.png" alt="Robot illustration" />
        </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}
