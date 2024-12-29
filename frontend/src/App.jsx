import JobUpload from './components/Company/JobUpload';
import Login from './components/Login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Login/SignUp';
import Home from './components/Home/Home';
import Jobs from './components/Jobs/Jobs';
import JobDetails from './components/Jobs/JobDetails';
import JobApply from './components/Jobs/JobApply';
import ViwApplications from './components/Tutor/ViwApplications';
import UploadedJobs from './components/Tutor/UploadedJobs';
import MyJobs from './components/Tutor/MyJobs';

import './App.css'
import About from './components/About/About';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/jobupload' element={<JobUpload />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/jobdetails/:job_id' element={<JobDetails />} />
          <Route path='/applyjob/:id/:companyEmail/:category/:title' element={<JobApply />} />
          <Route path='/myjobs' element={<MyJobs />} />
          <Route path='/viewapplications' element={<ViwApplications />} />
          <Route path='/myjobs' element={<UploadedJobs />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App


