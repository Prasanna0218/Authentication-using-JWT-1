import axios from 'axios';
import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'


const Login = () => {
    let [email,setemail]=useState("")
    let [password,setpassword]=useState("");
    let navigate=useNavigate();

    let handlesubmit=(event)=>{
        event.preventDefault();
        try{
            axios.post('http://localhost:3000/login',{email,password},{ withCredentials: true })
            .then(res=>{
                if(!res.data.valid){
                    navigate('/login')
                    alert(`${res.data.message}`);
                }
                else{
                    navigate('/dashboard')
                }
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }
  return (
    <div>
        <form action="" onSubmit={handlesubmit}>
            <input type="email" value={email} placeholder='Enter your email' name='email' onChange={(e)=>setemail(e.target.value)}/>
            <br />
            <input type="password" value={password} placeholder='*****' name='password' onChange={(e)=>setpassword(e.target.value)}/>
            <br />
            <button type='submit'>Login</button>
            <div>
                Dont have account <Link to='/register'>Register User</Link>
            </div>
        </form>
    </div>
  )
}

export default Login