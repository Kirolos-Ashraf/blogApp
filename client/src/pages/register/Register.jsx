import React, {useState} from "react";
import{Link}  from 'react-router-dom'
import axios from 'axios'
import './register.css'

export default function Register() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e)=> { 
    e.preventDefault();
setError(false)
    try{

      const res = await axios.post('/auth/register', {
        username,
        email,
        password
      })

      res.data && window.location.replace('/login')

    } catch(err){ 
setError(true)
      
    }
  }
  

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={(e)=> handleSubmit(e)}>
      <label htmlFor="name">Username</label>
        <input
          className="registerInput"
          type="text"
          id="name"
          name="name"
          placeholder="Enter your username..."
          onChange={e=>(setUsername(e.target.value))}
        />
        <label htmlFor="email">Email</label>
        <input
          className="registerInput"
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email..."
          onChange={e=>(setEmail(e.target.value))}
        />
        <label htmlFor="password">Password</label>
        <input
          className="registerInput"
          type="password"
          id="password"
          name="pass"
          placeholder="Enter your password..."
          onChange={e=>(setPassword(e.target.value))}
        />
        <button type="submit" className="registerButton">
          Register
        </button>
      </form>
      <button className="registerLoginButton" type="submit">
        <Link className="link" to="/login">Login</Link>
      </button>
      {error &&  
      <span className="err" style={{color: "red", fontSize: "15px"}}>Something went wrong!...</span>
      
      }
    </div>
  );
}
