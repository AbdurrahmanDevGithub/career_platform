import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchJobDetailsById } from '../API ROUTES/ApiRoutes';
import { toast } from 'react-toastify';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Navbar from '../Navbar/navbar';
import './JobDetail.css'; // CSS file import

const JobDetails = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobDetails = async () => {
      console.log("Fetching job details for ID:", job_id);
     
      
      try {
        setLoading(true);
        const response = await axios.get(`${fetchJobDetailsById}/fetchjobdetails/${job_id}`);
        console.log("Response received from backend:", response.data);
        console.log("Company email",response.data.details.email);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        if (error.response && error.response.status === 404) {
          toast.error("No details found for this job");
        } else if (error.response && error.response.status === 500) {
          toast.error("Internal server error");
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);


  const handleApply=(id,companyEmail,category,title)=>{
    navigate(`/applyjob/${id}/${companyEmail}/${category}/${title}`)
  }


  if (loading) {
    return (
      <div className="loading-indicator">
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          Loading job details...
        </Typography>
      </div>
    );
  }

  if (!job) {
    return <Typography variant="h6">No job details available.</Typography>;
  }

  return (
    <div>
      <Navbar />
      <div className="job-details-container">
  <div className="job-header">
    <h1>{job.details.title}</h1>
    <h2>{job.details.company}</h2>
  </div>

  <div className="job-content">
    <div className="apply-section">
      <button onClick={()=>handleApply(job.details._id,job.details.email,job.details.category,job.details.title)}>Apply Now</button>
    </div>

    <div className="job-details">
      <div className="detail">
        <h3>Category</h3>
        <p>{job.details.category || 'N/A'}</p>
      </div>
      <div className="detail">
        <h3>Environment</h3>
        <p>{job.details.environment || 'N/A'}</p>
      </div>
      <div className="detail">
        <h3>Skills</h3>
        <p>{job.details.skills || 'N/A'}</p>
      </div>
      <div className="detail">
        <h3>Expiration Date</h3>
        <p>{job.details.exp_date ? new Date(job.details.exp_date).toLocaleDateString() : 'N/A'}</p>
      </div>
      <div className="detail">
        <h3>Responsibilities</h3>
        <p>{job.details.responsibilities || 'N/A'}</p>
      </div>
      <div className="detail">
        <h3>Requirements</h3>
        <p>{job.details.requirements || 'N/A'}</p>
      </div>
    </div>

    <div className="job-description">
      <h3>Description</h3>
      <p>{job.details.description || 'N/A'}</p>
    </div>
  </div>
</div>
    </div>
  );
};

export default JobDetails;
