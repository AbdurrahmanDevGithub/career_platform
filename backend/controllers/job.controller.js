const jobServices = require('../services/job.services')

const jobController = {
  jobUpload:async(req,res)=>{
    try{
      const { category, company, title, description, environment, exp_date, skills,responsibilities,requirements } = req.body
      const image = req.file ? req.file.filename : null
      const email = req.company.email

      const jobData ={
        category, company, title, description, environment, exp_date, email, skills,responsibilities,requirements,image
      }

      const job = await jobServices.jobUpload(jobData)
      if(job.error){
        res.status(job.statuscode).json({ error: job.error });
      }
      res.status(201).json({ message: 'Job created successfully', job });
    }catch(error){
      console.log("error from jobUpload2 controller",error);
      
    }
  },


  ////////////////////////////////////////////////////////////
  updateJobUpload:async(req,res)=>{
    try{
      const { id } = req.params
      const { category, company, title, description, environment, exp_date, skills,responsibilities,requirements } = req.body
      const image = req.file ? req.file.filename : null
      const email = req.company.email
  
      const updatejobData = {
        category,
        company,
        title,
        image,
        description,
        environment,
        exp_date,
        email:email,
        skills,
        responsibilities,
        requirements,
      };
  
      const job = await jobServices.updateJobUpload(id,updatejobData)
      if(job.error){
        res.status(job.statuscode).json({ error: job.error });
      }
      res.status(201).json({ message: 'Job created successfully', job });

    }catch(error){
      console.error('Error in updateJobUpload controller:', error); // Log error for debugging
      res.status(500).status(500).json({ error: 'Error in updateJobUpload controller', details: error.message });
    }
  },

  ////////////////////////////////////////////////////
  jobApply:async(req,res)=>{
    try{
      const {First_Name,Last_Name,email,contact,category,title} = req.body
      const cv=req.file ? req.file.filename : null
      const { companyEmail } = req.params

    const applicationData = {
      First_Name,
      Last_Name,
      email,
      contact,
      cv, 
      companyEmail,
      category,
      title,
  };

    const application = await jobServices.jobApply(applicationData)
    if(application.error){
      res.status(application.statuscode).json({ error: application.error });
    }
    res.status(201).json({ message: 'Job application submitted successfully', application });

    }catch(error){
      console.error(error); 
      res.status(500).status(500).json({ error: "Error in jobApply controller", details: error.message });
    }
  },


  ////////////////////////////////////////////////////////////////
  viewApplications:async(req,res)=>{
    try{
      const email = req.company.email
      const job = await jobServices.viewApplications(email)
      if(job.error){
        res.status(job.statuscode).json({ error: job.error });
      }
      res.status(200).json(job);

    }catch(error){
      res.status(500).json({error:"Error in viewApplications controller",details: error.message})
    }
  },

  allJobsByATutor:async(req,res)=>{
    try{
      const email = req.company.email
      const job = await jobServices.allJobsByATutor(email)
      if(job.error){
        res.status(job.statuscode).json({ error: job.error });
      }
      res.status(200).json(job);

    }catch(error){
      res.status(500).json({error:"Error in fetchAllJobs controller",details: error.message})
    }
  },

  deleteJob:async(req,res)=>{
    try{
      const {id} = req.params
      const job = await jobServices.deleteJob(id)
      if(job.error){
        res.status(job.statuscode).json({ error: job.error });
      }
      res.status(200).json({ message: job });   //it should be job.data

    }catch(error){
      res.status(500).json({error:"Error in fetchAllJobs controller",details: error.message})
    }
  },

  //////////////////////////////////////////////////////
  fetchCourseById:async(req,res)=>{
    try{
      const {id} = req.params;
      const data = await jobServices.fetchCourseById(id)
      if(!data.success){
        return res.status(data.statuscode) .json({error:data.error})
      }
      return res.status(201) .json({message: "Data fetched successfully", data: data.data })
    }catch(error){
      console.log("error in fetchCourseById services");
      return res.status(500).json({error:"error in fetchCourseById services"})
    }
  },

  
  fetchCourseDetails:async(req,res)=>{
    try{
      const jobId = req.params.job_id;
      if(!jobId){
        return res.status(404).json({error:"job id not found"})
      }
      
      const details = await jobServices.fetchCourseDetails(jobId)
      if(details.error){
        return res.status(details.statuscode || 500) .json({error:details.error})
      }

      return res.status(200).json(details);


    }catch(error){
      console.log("error comes from fetchCourseDetails controller",error);
      return res.status(500) .json({error:"error comes from fetchCourseDetails controller"})
    }
  }

}

module.exports = jobController