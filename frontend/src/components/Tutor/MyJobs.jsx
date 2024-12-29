import React from 'react';
import { Link } from 'react-router-dom';
import UploadedJobs from './UploadedJobs';
import './MyJobs.css';
import Navbar from '../Navbar/NavBar';

const MyJobs = () => {
  return (
    <div>   
      <Navbar /> 
    <div className="myjobs-container">
      <div className="myjobs-links">
        <Link to="/jobupload">Upload Job Post</Link>
        <Link to="/viewapplications">View Applications</Link>
      </div>
      
      <div className="uploaded-jobs">
        <UploadedJobs />
      </div>
      
      <h1 className="myjobs-title">Jobs uploaded by me</h1>
    </div>
  </div>
  );
};

export default MyJobs;
