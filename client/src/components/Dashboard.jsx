import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const Dashboard = () => {
    let navigate=useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:3000/dashboard',{withCredentials:true})
        .then(res=>{
            if(!res.data.valid){
                navigate('/login')
            }
        })
        .catch((error)=>{
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                console.log("Error:", error);
            }
        })
    })
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard