import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupRoute } from '../API ROUTES/ApiRoutes';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = formData;
    if (!email || !username || !password) {
      toast.error('You must fill in all the fields');
      return;
    }

    try {
      const user = await axios.post(signupRoute, formData);
      console.log('Account created', user.data);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('This email is already taken!');
        setFormData({
          email: '',
          password: '',
          username: '',
        });
      } else if (error.response && error.response.status === 500) {
        toast.error('Internal server error');
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Account</button>
        <p>
          Already have an account?  <Link to="/login">Go to login</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
