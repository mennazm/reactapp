import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../css/Questions/SharedLayout.css';
import { BiBook, BiClipboard } from 'react-icons/bi';



export function SharedLayout() {
  return (
    <>
      <div className="d-flex" id="wrapper">
      
        <div className="sideBar" id="sidebar-wrapper">
          <div className="sidebar-heading text-white">
            <h3>ExamMaster</h3>
          </div>
          <div className="list-group list-group-flush">
        
              <Link to="/questions" className="list-group-item list-group-item-action bg-transparent text-white">
                <BiBook className="me-2" /> Questions
              </Link>
              <Link to="/exams" className="list-group-item list-group-item-action bg-transparent text-white">
                <BiClipboard className="me-2" />  Exams
              </Link>
        
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
