const Jobs = require('../models/jobPost.model')

const fetchalljobs=async(category)=>{
  try{
    const data=await Jobs.find({category})
    if(!data || data.length === 0){
      return ({error:"No jobs found in this category",statuscode:404})
    }
    return data;
  }catch(error){
    console.log("errror comes from fetchalljobs services",error);
    return { error: "An error occurred while fetching the jobs", statusCode: 500 };
  }
}

module.exports = {
  fetchalljobs
}