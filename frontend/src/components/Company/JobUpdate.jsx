import axios from 'axios'
import React, { useEffect } from 'react'
import { signinRoute } from '../API ROUTES/ApiRoutes'

const JobUpdate = () => {
  
  
  useEffect(()=>{
    const fetchDatas = async()=>{
      const response = await axios.get(signinRoute)
    }
  },[])
  
  
  return (
    <div>
      <div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default JobUpdate