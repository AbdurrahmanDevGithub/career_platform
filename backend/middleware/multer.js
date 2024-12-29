const multer = require('multer')

const storage = multer.memoryStorage()  


const multerMiddleware = {

jobupload : multer({
  storage:storage
}).single('image'),  


jobApply : multer({
  storage:storage
}).single('cv')

}


module.exports = multerMiddleware