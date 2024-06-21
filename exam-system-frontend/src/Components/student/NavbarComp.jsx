import React from 'react'
import '../../css/SharedStudentComp.css'
import { Link } from 'react-router-dom'
import Logout from '../../Auth/logout'

export default function NavbarComp() {
  return (
    <nav className="navbar navbar-expand-lg text-light">
      <a className="navbar-brand" href="/">ExamMaster</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/student/exams" className="nav-link" >
            Exams
                  </Link>
          </li>
          <li className="nav-item">
          <Link to="/student/results" className="nav-link" >
          Results
          </Link>
          </li>
        </ul>
      </div>
      <div className="nav-item" style={{ cursor: 'pointer', marginRight:100 }}>
            <Logout />
          </div>
    </nav>
  )
}
