const mongoose = require('mongoose')
const validator = require('validator');


const jobApplySchema = mongoose.Schema({
  First_Name:{
    type: String,
    required: true,
    trim: true
  },
  Last_Name:{
    type: String,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    }
  },
  contact:{
    type: String,
    required: true,
    trim: true
  },
  cv: {
    type:String
  },
  companyEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Company Email');
      }
    }
  },
  category:{
    type: String, 
    required: true 
  },
  title:{
    type: String, 
    required: true 
  }
});


const ApplyJob = mongoose.model('jobApply',jobApplySchema)
module.exports = ApplyJob


