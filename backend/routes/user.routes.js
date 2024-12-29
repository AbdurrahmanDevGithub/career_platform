const express = require('express')
const router = express.Router()
const multerMiddleware = require('../middleware/multer')
const jobController = require('../controllers/job.controller')


const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    const uploadPath = path.join(__dirname, '../Public/PDF');
    cb(null, uploadPath);
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage,
  fileFilter:(req,file,cb)=>{
    if(file.mimetype !== 'application/pdf'){
      return cb(new Error('Onlly PDFs are allowedd'),false)
    }
    cb(null,true)
  }
})



router.post('/applyjob/:companyEmail',upload.single('cv'),jobController.jobApply)



//JOB APPLY
// router.post('/applyjob/:companyEmail',multerMiddleware.jobApply,jobController.jobApply)

module.exports = router