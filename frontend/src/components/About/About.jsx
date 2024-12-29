import React from 'react';
import './About.css';
import { Button } from '@mui/material';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Welcome to <strong>JobConnect</strong>, a leading platform that connects talented job seekers
          with companies offering great career opportunities. We’re dedicated to providing a
          <span className="highlight"> free</span> and seamless experience for job seekers, empowering
          them to find their dream jobs with ease and confidence.
        </p>
        <p className="about-description">
          For companies, <strong>JobConnect</strong> offers a comprehensive hiring solution. Whether you’re
          a small business or a large corporation, our platform allows you to post job listings, search for
          qualified candidates, and manage your recruitment process efficiently.
        </p>
        <div className="about-footer">
          <p className="footer-text">Join JobConnect today and transform your career or your business hiring process!</p>
          <Button variant="contained" color="primary" className="cta-button">Start Now</Button>
        </div>
      </div>
      <div className="about-graphic">
        <img src="https://etimg.etb2bimg.com/photo/90207210.cms" className="about-image" />
      </div>
    </div>
    
  );
};

export default About;
