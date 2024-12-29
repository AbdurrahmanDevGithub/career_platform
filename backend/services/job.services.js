const Job = require('../models/jobPost.model')
const ApplyJob = require('../models/jobApply.model')


const jobUpload = async(jobdata)=>{
  try{
    const job = new Job(jobdata);
    console.log(jobdata)
    if(!await job.save()){
      return {error:"Job not uploaded",statuscode:409}
    }
    return job;
  }catch(error){
    return {error:"Error in jobUpload services",satuscode:500}
  }
}


const jobApply=async(applicationData)=>{
  try{
    const applyJob = new ApplyJob(applicationData)
    if(!await applyJob.save()){
      return {error:"Job not applied! ",satuscode:409}
    }
    return applyJob;
  }catch(error){
    console.log(error);
    return {error:"Error in job apply services",error_msg: error.message,satuscode:500}
  }
};

const updateJobUpload=async(id,updatejobdata)=>{
  try{
    const updatedData = await Job.findByIdAndUpdate({_id:id},updatejobdata)
    if(!updatedData){
      return {error:"Doesnt updated",statuscode:409}
    }
    return updatedData;
  }catch(error){
    console.log(error);
    return {error:"Error in updateJobUpload services",error_msg:error,satuscode:500}
  }
}

const viewApplications=async(email)=>{
  try{
    const data = await ApplyJob.find({companyEmail:email})
    if(!data || data.legth < 0){
      return {error:"no applications found",statuscode:404}
    }
    return data
  }catch(error){
    console.log(error);
    return {error:"Error in view job services",error_msg: error.message,satuscode:500}
  }
}

const allJobsByATutor = async(email)=>{
  try{
    console.log("Fetching jobs for email:", email);  
    const data = await Job.find({ email: email });
    if(!data){
      console.log("no data:", email);
      return {error:"no jobs found on this user",statuscode:404}
    }  
    return data
  }catch(error){
    console.log(error);
    return {error:"Error in fetchAllJobs services",error_msg: error.message,satuscode:500}
  }
}

const deleteJob = async(id)=>{
  try{
    const data = await Job.findByIdAndDelete(id);
    if(!data){
      return {error:"data not found to delete",statuscode:404}
    }
    return data
  }catch(error){
    console.log(error);
    return {error:"Error in deleteJob services",error_msg: error.message,satuscode:500}
  }
}

const fetchCourseById = async(id)=>{
  try{
    const data = await Job.findById({_id:id})
    if(!data){
      return {success: false, error:"There is no data found on this ID",statuscode:404}
    }
    return { success: true, data };
  }catch(error){
    console.log("Error in fetchCourseById services");
    return {success:false, error:"Error in fetchCourseById services",statuscode:500}
  }
}

const fetchCourseDetails = async(id)=>{
  try{
    const details = await Job.findById({_id:id})
    if(!details){
      return {success: false, error:"There is no job found on this ID",statuscode:404}
    }
    
    return {success:true,details}
  }catch(error){
    console.log("Error in fetchCourseById services");
    return {success:false, error:"Error in fetchCourseById services",statuscode:500}
  }
}


module.exports = {
  jobUpload,
  updateJobUpload,
  jobApply,
  viewApplications,
  allJobsByATutor,
  deleteJob,
  fetchCourseById,
  fetchCourseDetails,
}
