import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { jobsbyaTutor } from '../API ROUTES/ApiRoutes';
import './UploadJobs.css';
import { Box, TextField, CircularProgress,Typography } from '@mui/material';

const UploadedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchMyJobs = async () => {
      setLoading(true)
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Invalid token');
        return;
      }
      try {
        const response = await axios.get(`${jobsbyaTutor}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('my jobs are:', response.data);
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };
    fetchMyJobs();
  }, []);

  return (
    <div>
      {loading ? (
        <div className='loading-indicator'>
          <CircularProgress size={60} color="primary" />
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Loading jobs...
          </Typography>
        </div>
      ) : (
        <div className="container">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div className="job-card" key={job._id}>
                <h3>{job.title}</h3>
                <p><strong>Category:</strong> {job.category}</p>
                <p><strong>Email:</strong> {job.email}</p>
                <p><strong>Expiration Date:</strong> {job.exp_date}</p>
                <p className="skills"><strong>Skills:</strong> {job.skills}</p>
              </div>
            ))
          ) : (
            <p className="empty-message text-center">No jobs uploaded yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadedJobs;
