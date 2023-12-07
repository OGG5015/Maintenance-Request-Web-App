import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Axios from 'axios';

import { useCookies } from 'react-cookie'



const Login2 = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const onSubmitMaintenance = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/loginMaintenance", {
        email,
        password,
      });

      setCookies("access_token", response.data.token);
      //window.localStorage.setItem("userID", response.data.userID)
      localStorage.setItem('userID', response.data.userID);

      navigate("/MaintenanceRequestsMT", { state: { userID: response.data.userID } })
    } catch (err) {
      console.error(err);
    }
  }

  const onSubmitAdmin = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/loginAdmin", {
        email,
        password,
      });

      setCookies("access_token", response.data.token);
      //window.localStorage.setItem("userID", response.data.userID)
      localStorage.setItem('userID', response.data.userID);

      navigate("/UsersDisplay", { state: { userID: response.data.userID } })
    } catch (err) {
      console.error(err);
    }
  }

  const logout = () => {
    setCookies("access_token", "")
    //window.localStorage.removeItem("userID")
    localStorage.removeItem('userID');
    navigate('/');
  }

  return (
    <div className='maintenance-login-container'>
      
      <div >
        <form className="maintenance-login" onSubmit={onSubmitMaintenance}>
          <h3>Maintenance Login</h3>

          <div className='emailpassword'>
            <div>
              <label className='emailLabel' htmlFor='emailField'><b>Email:</b></label>
              <input
                className='emailField'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </div>

          </div>
          <div>
            <label className='passwordFieldLabel' htmlFor='passwordField'>Password:</label>
            <input
              type='password'
              className='passwordField set-width'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>

          {/*error && <div className='error'>{error}</div>*/}

          <button className='loginButton' type='submit'>Login</button>
        </form>
      </div>


      <div className='admin-login-container'>
        <form className="admin-login" onSubmit={onSubmitAdmin}>
          <h3>Admin Login</h3>

          <div className='emailpassword'>
            <div>
              <label className='emailLabel' htmlFor='emailField'><b>Email:</b></label>
              <input
                className='emailField'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </div>

          </div>
          <div>
            <label className='passwordFieldLabel' htmlFor='passwordField'>Password:</label>
            <input
              type='password'
              className='passwordField set-width'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>

          {/*error && <div className='error'>{error}</div>*/}

          <button className='loginButton' type='submit'>Login</button>
        </form>
        
      </div>
      <div className='not-resident-text'>
          <p>
            Not an admin? <span className='login-link' onClick={() => navigate('/')}>Login here </span>
          </p>
        </div>
    </div>
    
  )
}

export default Login2