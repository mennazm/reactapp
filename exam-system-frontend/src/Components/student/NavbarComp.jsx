import React from 'react'
import '../../css/SharedStudentComp.css'
import { Link } from 'react-router-dom'

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
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
