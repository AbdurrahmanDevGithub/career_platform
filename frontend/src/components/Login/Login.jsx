import React, { useState } from 'react';
import axios from 'axios';
import { signinRoute } from '../API ROUTES/ApiRoutes';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      const user = await axios.post(signinRoute, {
        email,
        password,
      });

      const token = user.data.token;

      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user-data', JSON.stringify(user.data));
        navigate('/');
      } else {
        toast.error('There is a problem with your login. Token problem.');
      }

      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email or password incorrect');
      } else if (error.response && error.response.status === 500) {
        toast.error('Internal server error.');
      }
      console.log('Error from login frontend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          required
        />
        <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
        <p>
          Don't have an account? <Link to={'/signup'}>Create Account</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
