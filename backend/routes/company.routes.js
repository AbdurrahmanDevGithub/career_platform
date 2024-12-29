const express = require('express')
const router = express.Router()
const companyController = require('../controllers/company.controller')
const jobController = require('../controllers/job.controller')
const authentication = require('../middleware/authentication')
const multerMiddleware = require('../middleware/multer')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    const uploadPath = path.join(__dirname, '../Public/Images');
    cb(null, uploadPath);
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage
})


//REGISTER AND SIGN IN
router.post('/register',companyController.register)
router.post('/signin',companyController.signin)
router.get('/tokentest', authentication.verifyToken, async (req, res) => {
  try {
    res.status(200).json({ message: 'Correct token' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    
  }
})

//JOB UPLOAD, UPDTE, DELETE
router.post('/jobupload2',authentication.verifyToken,upload.single('image'),jobController.jobUpload)
router.put('/jobuploadupdate/:id',authentication.verifyToken,upload.single('image'),jobController.updateJobUpload)

router.delete('/deletejob/:id',authentication.verifyToken,jobController.deleteJob)

//VIEW JOB APPLICATIONS
router.get('/fetchjobapplications',authentication.verifyToken,jobController.viewApplications)

//VIEW POSTED JOBS
router.get('/fetchjobbyid/:id',authentication.verifyToken,jobController.fetchCourseById)
router.get('/jobsbyatutor',authentication.verifyToken,jobController.allJobsByATutor)


module.exports = router