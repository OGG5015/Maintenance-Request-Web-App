import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const response = await Axios.post('/login', {
            email: email,
            password: password,
          });
      
          if (response.data.token) {
            // Successful login, store the token in local storage or cookies
            localStorage.setItem('token', response.data.token);
            // Redirect to the desired page using react-router-dom
            navigate('/MaintenanceRequests');
          } else {
            // Invalid credentials, display error message
            setError(response.data.message || 'Invalid credentials');
          }
        } catch (error) {
          // Handle network or server errors
          console.error(error);
          setError('An unexpected error occurred');
        }
      };



    return (
        <div>
            <form className="login" onSubmit={handleLogin}>
                <h3>Login</h3>

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

                {error && <div className='error'>{error}</div>}

                <button className='loginButton' type='submit'>Login</button>
            </form>



        </div>
    )
}

export default Login