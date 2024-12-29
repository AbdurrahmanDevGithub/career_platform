import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './JobUpload.css';
import Navbar from '../Navbar/NavBar';


const JobUpload = () => {
  const [formData, setFormData] = useState({
    category: '',
    company: '',
    title: '',
    image: null,
    description: '',
    environment: '',
    exp_date: '',
    skills: '',
    responsibilities:'',
    requirements:'',
  });

  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          setAuthenticated(false);
          toast.error("You need to sign up to upload your job post.");
          return;
        }

        const response = await axios.get('http://127.0.0.1:3001/api/company/tokentest', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          toast.error("You need to sign up to upload your job post.");
        }
      } catch (error) {
        setAuthenticated(false);
        console.error('Error checking login:', error);
        toast.error("You need to sign up to upload your job post.");
      }
    };

    checkLogin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToUpload = new FormData();

      for (const key in formData) {
        formDataToUpload.append(key, formData[key]);
      }

      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        'http://127.0.0.1:3001/api/company/jobupload2',
        formDataToUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setFormData({
        category: '',
        company: '',
        title: '',
        image: null,
        description: '',
        environment: '',
        exp_date: '',
        skills: '',
        responsibilities:'',
        requirements:'',
      });

      toast.success('Your job uploaded successfully!')

      console.log('Uploaded data:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Something went wrong!! Job not uploaded");
      } else if (error.response && error.response.status === 500) {
        toast.error("Internal server error");
      }
      console.error('Error in uploading job post frontend:', error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  if (!authenticated) {
    return (
      <div className="unauthenticated">
        <h2>You need to log in to upload your job post. If you want to create an account? <Link to={'/signup'}> click me </Link></h2>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div>
      <Navbar /> 
    
    <div className="job-upload">
      <h2>Upload Your Job</h2>
      <form onSubmit={handleSubmit} className="job-upload-form">
        <label>
          Category: <br />
          <select name="category" value={formData.category} onChange={handleChange} required className="input-field">
            <option value="">Select a category</option>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Marketing">Marketing</option>
            <option value="Supply chain">Supply chain</option>
            <option value="Retail">Retail</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Creative Arts">Creative Arts</option>
          </select>
        </label> <br /><br />

        <label>
          Company: <br />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label><br /><br />

        <label>
          Title: <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label><br /><br />

        <label>
          Image: <br />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="input-field"
          />
        </label> <br /><br />

        <label>
          Description: <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="input-field"
          ></textarea>
        </label> <br /><br />

        <label>
        Key Responsibilities: <br />
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            required
            className="input-field"
          ></textarea>
        </label> <br /><br />


        <label>
        Requirements: <br />
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
            className="input-field"
          ></textarea>
        </label> <br /><br />



        <label>
          Work Environment: <br />
          <input
            type="text"
            name="environment"
            value={formData.environment}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label> <br /><br />

        <label>
          Expiration Date: <br />
          <input
            type="date"
            name="exp_date"
            value={formData.exp_date}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label> <br /><br />

        <label>
          Skills: <br />
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className="input-field"
          ></textarea>
        </label> <br /><br />

        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default JobUpload;
