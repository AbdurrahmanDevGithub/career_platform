import React, { useState } from 'react';
import Navbar from '../Navbar/NavBar';
import { Box, TextField, CircularProgress, Typography } from '@mui/material';
import { fetchJobsByCategory } from '../API ROUTES/ApiRoutes';
import axios from 'axios';
import './Jobs.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Jobs = () => {
  const [categories, setCategories] = useState([
    'Engineering',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Supply chain',
    'Retail',
    'Hospitality',
    'Human Resources',
    'Creative Arts',
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const jobHandle = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`${fetchJobsByCategory}/fetchalljobs/${category}`);
      
      setJobs([...response.data]);
      setFilteredJobs([...response.data]);
  
    } catch (error) {

      if (error.response) {
        if (error.response.status === 404) {
          toast.error('No jobs found in this category');
        } else if (error.response.status === 500) {
          toast.error('Server error, try again later');
        }
      } else {
        toast.error('Something went wrong, please try again');
      }
    } finally {
      setLoading(false);
    }
  };
  
  console.log(filteredJobs);
  

  const navigatePage = (job_id) => {
    navigate(`/jobdetails/${job_id}`);
  };

  const searchHandler = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (!searchValue) {
      setFilteredJobs([...jobs]);
    } else {
      setFilteredJobs(
        jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchValue) ||
            job.company.toLowerCase().includes(searchValue) ||
            job.category.toLowerCase().includes(searchValue)
        )
      );
    }
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
        <TextField
          value={searchTerm}
          onChange={searchHandler}
          label="Search"
          variant="outlined"
          placeholder="Search your job"
          fullWidth
          sx={{ maxWidth: '600px' }}
        />
      </Box>

      <div className="container">
        <div className="categories">
          <ul>
            {categories.map((category) => (
              <li key={category} className="category-item" onClick={() => jobHandle(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="jobs">
          {loading ? (
            <div className="loading-indicator">
              <CircularProgress size={60} color="primary" />
              <Typography variant="h6" style={{ marginTop: '10px' }}>
                Loading jobs...
              </Typography>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job._id} className="job-card" onClick={() => navigatePage(job._id)}>
                <h3>{job.title}</h3>
                <p>
                  <strong>Company:</strong> {job.company}
                </p>
                <p>
                  <strong>Category:</strong> {job.category}
                </p>
                <img src={`http://localhost:3001/image/${job.image}`} alt="Job" className="job-image" />
              
                <p>
                  <strong>Skills:</strong> {job.skills}
                </p>

                <p>
                  <strong>Requirements:</strong> {job.requirements}
                </p>

              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Jobs;