import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../css/Questions/SharedLayout.css';
import { BiBook, BiCheckDouble, BiClipboard } from 'react-icons/bi';
import Logout from '../../Auth/logout';



export function SharedLayout() {
  return (
    <>
      <div className="d-flex" id="wrapper">
      
        <div className="sideBar" id="sidebar-wrapper">
          <div className="sidebar-heading text-white">
            <h3>ExamMaster</h3>
          </div>
          <div className="list-group list-group-flush">
        
              <Link to="/admin/questions" className="list-group-item list-group-item-action bg-transparent text-white">
                <BiBook className="me-2" /> Questions
              </Link>
              <Link to="/admin/exams" className="list-group-item list-group-item-action bg-transparent text-white">
                <BiClipboard className="me-2" />  Exams
              </Link>
              <Link to="/admin/results" className="list-group-item list-group-item-action bg-transparent text-white">
                <BiCheckDouble className="me-1" style={{ fontSize: '1.5rem' }} />  Results
              </Link>
              <Logout  />
        
          </div>
        </div>
        
        <div id="page-content-wrapper">
        
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
  
}
