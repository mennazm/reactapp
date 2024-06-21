import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../../css/SharedStudentComp.css'


export default function FooterComp() {
    return (
        <footer className="footer text-white mt-5">
          <div className="container py-4">
            <div className="row">
              <div className="col-md-4 mb-4">
                <h5>About Us</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
              </div>
              <div className="col-md-4 mb-4">
                <h5>Contact</h5>
                <ul className="list-unstyled">
                  <li>Email: ExamMaster@gmail.com</li>
                  <li>Phone: (123) 456-7890</li>
                  <li>Address: 123 Main St, Anytown, USA</li>
                </ul>
              </div>
              <div className="col-md-4 mb-4">
                <h5>Follow Us</h5>
                <div className="social-links">
                  <a href="https://facebook.com" className="text-white mx-2"><FaFacebook size={32} /></a>
                  <a href="https://twitter.com" className="text-white mx-2"><FaTwitter size={32} /></a>
                  <a href="https://instagram.com" className="text-white mx-2"><FaInstagram size={32} /></a>
                  <a href="https://linkedin.com" className="text-white mx-2"><FaLinkedin size={32} /></a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center mt-3">
                <p>&copy; 2024 ExamMaster. All Rights Reserved.</p>
                <a href="/privacy" className="text-white mx-2">Privacy Policy</a>
                <a href="/terms" className="text-white mx-2">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
    
  )
}
