const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./routes/route')
const cors = require('cors')
const path = require('path')


const { xss } = require('express-xss-sanitizer')
const mongoSanitize = require('express-mongo-sanitize')
app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(xss())
app.use(mongoSanitize())

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};

app.use(cors(corsOptions)); 


app.use('/image',express.static(path.join(__dirname,'/Public/Images')))
app.use('/pdfs', express.static(path.join(__dirname, 'Public/PDFs')));

MONGO_URI = 'mongodb://localhost:27017/Job_portal'

app.use("/api",routes)



const dbConnection = async()=>{
  try{
    await mongoose.connect(MONGO_URI)
    console.log("DB connected successfully");
  }catch(error){
    console.log("error in db connection",error);
  }
}

dbConnection()



const PORT = process.env.SERVER_PORT

app.listen(PORT,()=>{
  console.log(`server runs on port ${PORT}`);
})