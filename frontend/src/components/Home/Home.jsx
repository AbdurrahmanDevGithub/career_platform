import React from 'react';
import Navbar from '../Navbar/navbar';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Job</h1>
          <p className="hero-description">Explore job opportunities across various industries, and take the next step in your career today.</p>
          <Link to={'/jobs'}> <button className="hero-button">Get Started</button>  </Link>
        </div>
      </header>

      <section className="job-categories">
        <h2 className="section-title">Browse by Category</h2>
        <div className="category-cards">
          <div className="category-card">
            <h3>Technology</h3>
            <p>Explore the latest tech roles.</p>
          </div>
          <div className="category-card">
            <h3>Healthcare</h3>
            <p>Find career opportunities in healthcare.</p>
          </div>
          <div className="category-card">
            <h3>Marketing</h3>
            <p>Join the marketing and advertising industry.</p>
          </div>
          <div className="category-card">
            <h3>Finance</h3>
            <p>Shape your career in the finance sector.</p>
          </div>
        </div>
      </section>

      <section className="featured-jobs">
        <h2 className="section-title">Featured Jobs</h2>
        <div className="job-list">
          <div className="job-card">
            <h3>Software Engineer</h3>
            <p>Company: XYZ Tech</p>
            <p>Location: Remote</p>
            <button className="job-button">Apply Now</button>
          </div>
          <div className="job-card">
            <h3>Marketing Manager</h3>
            <p>Company: ABC Corp</p>
            <p>Location: New York</p>
            <button className="job-button">Apply Now</button>
          </div>
          <div className="job-card">
            <h3>Data Scientist</h3>
            <p>Company: Data Inc.</p>
            <p>Location: San Francisco</p>
            <button className="job-button">Apply Now</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 JobPortal. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
