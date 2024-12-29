const express = require('express');
const router = express.Router();

//Routes
const companyRoute = require('./company.routes')
const userRoute = require('./user.routes')
const jobsRoute = require('./Jobs.routes')

const routes = [
  {
    path:'/company',
    route:companyRoute
  },
  {
    path:'/user',
    route:userRoute
  },
  {
    path:'/jobs',
    route:jobsRoute
  }
]


routes.forEach((route)=>{
  router.use(route.path,route.route)
})

module.exports = router