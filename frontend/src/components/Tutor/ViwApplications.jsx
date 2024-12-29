import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { viewJobApplications } from '../API ROUTES/ApiRoutes';
import { toast, ToastContainer } from 'react-toastify';
import { CircularProgress, Typography } from '@mui/material';
import './ViewApplications.css';

const ViwApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('No token');
        return;
      }

      try {
        const response = await axios.get(`${viewJobApplications}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched', response.data);
        setJobs(response.data);
        
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error('Invalid token! Need proper SignIn');
        } else if (error.response?.status === 404) {
          toast.error('No applications found!');
        } else if (error.response?.status === 500) {
          toast.error('There is a problem in your server');
        } else {
          toast.error('Something went wrong!');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="view-applications-container">
      <h1>Job Applications</h1>

      {loading ? (
        <div className="loading-indicator">
          <CircularProgress size={60} color="primary" />
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Loading jobs...
          </Typography>
        </div>
      ) : (
        <div>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="job-application">
                <p>
                  <strong>Name:</strong> {job.First_Name} {job.Last_Name} |{' '}
                  <strong>Email:</strong> {job.email} | <strong>Contact:</strong>{' '}
                  {job.contact} | <strong>Category:</strong> {job.category} |{' '}
                  <strong>Title:</strong> {job.title} | <strong>Company Email:</strong>{' '}
                  {job.companyEmail} | <strong>CV Filename:</strong> {job.cv}
                  <button color='blue'> Download CV </button>
                </p>
              </div>
            ))
          ) : (
            <p className="no-applications">No applications found.</p>
          )}
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default ViwApplications;
