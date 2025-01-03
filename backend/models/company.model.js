const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt')

const companySchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    }
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    trim: true,
    maxLength: 100
  }
});


//HASHING PASSWRD
companySchema.pre('save',async function(next){
  let company = this
  if(company.isModified('password')){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(company.password,salt)
    company.password = hash
  }
  next()
})


//CHECK EMAIL
companySchema.statics.emailIsTaken = async function(email){
  const user = await this.findOne({email});
  return !!user
}


//COMPARE PASSWORD
companySchema.methods.comparePassword = async function(candidatePassword){
  const company = this;
  const match = bcrypt.compare(candidatePassword,company.password)
  return match
} 


const Company = mongoose.model('company',companySchema)


module.exports = Company