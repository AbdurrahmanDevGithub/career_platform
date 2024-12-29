const express = require('express')
const router = express.Router()
// const multerMiddleware = require('../middleware/multer')
 const jobController = require('../controllers/job.controller')
// const authentication = require('../middleware/authentication')
const userController = require('../controllers/User.controller')


router.get('/fetchalljobs/:category',userController.fetchAllJobs)

router.get('/fetchjobdetails/:job_id',jobController.fetchCourseDetails)



module.exports = router