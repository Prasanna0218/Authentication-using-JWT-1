import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let [name, setname] = useState("");
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let navigate=useNavigate();
  let handlesubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:3000/register", { name, email, password })
        .then((res) => {
          if(!res.data.value)
          {
            navigate('/register')
          }
          else{
            navigate('/login')
          }
          setname("");
          setemail("");
          setpassword("");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter your Full name"
          name="fullname"
          onChange={(e) => setname(e.target.value)}
        />
        <br />
        <input
          type="email"
          value={email}
          placeholder="Enter your Email"
          name="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="*****"
          value={password}
          name="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
