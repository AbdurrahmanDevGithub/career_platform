import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jobApply } from '../API ROUTES/ApiRoutes';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Navbar/navbar';
import { CircularProgress, Typography } from '@mui/material';

const JobApply = () => {
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    email: '',
    contact: '',
    cv: null,
  });

  const [loading, setLoading] = useState(false);

  const { id, companyEmail, category, title } = useParams();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToApply = new FormData();
    for (const key in formData) {
      formDataToApply.append(key, formData[key]);
    }

    formDataToApply.append('category', category);
    formDataToApply.append('title', title);

    try {
      const response = await axios.post(
        `${jobApply}/${companyEmail}`,
        formDataToApply,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('Applied successfully!');
      setFormData({
        First_Name: '',
        Last_Name: '',
        email: '',
        contact: '',
        cv: null,
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Sorry.. Try again later');
      } else if (error.response && error.response.status === 500) {
        toast.error('Internal server error');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .job-apply-container {
        width: 100%;
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        font-family: 'Arial', sans-serif;
      }

      h2 {
        text-align: center;
        margin-bottom: 20px;
        color: #333;
      }

      label {
        font-weight: bold;
        margin-bottom: 6px;
        display: block;
        color: #555;
      }

      .input-field {
        width: 100%;
        padding: 12px;
        margin: 10px 0;
        border-radius: 6px;
        border: 1px solid #ddd;
        font-size: 14px;
        transition: border-color 0.3s ease;
      }

      .input-field:focus {
        border-color: #007bff;
        outline: none;
      }

      .submit-button {
        width: 100%;
        padding: 14px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }

      .submit-button:hover {
        background-color: #0056b3;
      }

      .loading-indicator {
        text-align: center;
        margin-top: 30px;
      }

      .loading-indicator .MuiCircularProgress-root {
        margin-bottom: 12px;
      }

      h6 {
        font-size: 16px;
        color: #555;
        margin-top: 12px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="job-apply-container">
        <h2>Apply for Job</h2>
        {loading ? (
          <div className="loading-indicator">
            <CircularProgress size={60} color="primary" />
            <Typography variant="h6" style={{ marginTop: '12px' }}>
              Processing your application...
            </Typography>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="First_Name"
                value={formData.First_Name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>

            <label>
              Last Name:
              <input
                type="text"
                name="Last_Name"
                value={formData.Last_Name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>

            <label>
              Contact Number:
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>

            <label>
              CV (PDF):
              <input
                type="file"
                name="cv"
                onChange={handleChange}
                required
                className="input-field"
              />
            </label>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobApply;
