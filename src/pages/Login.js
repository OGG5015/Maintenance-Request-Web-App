import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Axios from 'axios';

import { useCookies } from 'react-cookie'



const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/login", {
        email,
        password,
      });
  
      setCookies("access_token", response.data.token);
      localStorage.setItem('userID', response.data.userID);
  
      navigate("/MaintenanceRequestsTT", { state: { userID: response.data.userID } })
    } catch (err) {
      console.error(err.response); // Log the response to see if there's more information
    }
  }
  

  const logout = () => {
    setCookies("access_token", "")
    //window.localStorage.removeItem("userID")
    localStorage.removeItem('userID');
    navigate('/');
  }



  return (
    <div className='login-containter'>
      <div>
        <form className="login" onSubmit={onSubmit}>
          <h3>Resident Login</h3>

          <div className='emailpassword'>
            <div>
              <label className='emailLabel' htmlFor='emailField'><b>Email:</b></label>
              <input
                name='email'
                className='emailField'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </div>

          </div>
          <div>
            <label className='passwordFieldLabel' htmlFor='passwordField'>Password:</label>
            <input
            name='password'
              type='password'
              className='passwordField'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>

          {/*error && <div className='error'>{error}</div>*/}

          <button className='loginButton' type='submit'>Login</button>
          
        </form>
        <div className='not-resident-text'>
          <p>
            Not a resident? <span className='login-link' onClick={() => navigate('/Login2')}>Login here </span>
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default Login