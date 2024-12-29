const companyServices = require('../services/company.services')



const controller = {

  register: async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = await companyServices.companyRegiter(email, password, username);
        if(user.error){
          return res.status(user.statuscode).json({error:user.error})
        }

        return res.status(201).json({ user });
    } catch (error) {
        console.log("Error in register controller:", error);
        return res.status(500).json({ message: 'Error in register controller', error: error.message });
    }
  },
  
  signin:async(req,res)=>{
    try{
      const {email,password} = req.body
      const result = await companyServices.companySignIn(email,password)
      
      if(result.error){
        return res.status(result.statuscode).json({ error: result.error });
      }

      const {company,token} = result
      return res.json({company,token})
      
    }catch(error){
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // checkLoggedOrNot:async(req,res)=>{
    
  // }
}


module.exports = controller