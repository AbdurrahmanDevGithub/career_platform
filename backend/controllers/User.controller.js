const userService = require('../services/User.services')


const userController = {
  fetchAllJobs:async(req,res)=>{
    try{
      const {category} = req.params;
      const data = await userService.fetchalljobs(category)
      if(data.error){
        return res.status(data.statuscode) .json({error:data.error})
      }
      return res.json(data);
    }catch(error){
      console.log("error comes from fetchAllJobs controller",error);
      return res.status(500) .json({error:"error comes from fetchAllJobs controller"})
    }
  }


}

module.exports = userController