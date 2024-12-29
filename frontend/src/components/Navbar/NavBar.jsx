import React from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate()

  const handleMyJobsClick = ()=>{
    const token = localStorage.getItem('authToken')
    if(token){
      navigate('/myjobs')
    }else{
      toast.error('Sorry! only Organizations can access this')
      return null;
    }
  }


  return (
    <div className="navbar">
      <div className="logo">
        <Link to={'/'}>JobConnect.LK</Link>
      </div>
      <ul>
        <Link to={'/'}> <li>Home</li> </Link>
        <Link to={'/jobs'}> <li>Jobs</li> </Link>
        <Link to={'/about'}><li>About Us</li> </Link>
        <Link to={'/login'}><li>SignUp</li> </Link>
        <li onClick={()=>handleMyJobsClick()}>MyJobs</li>

      </ul>
      <ToastContainer />
    </div>
  );
}

export default Navbar;
