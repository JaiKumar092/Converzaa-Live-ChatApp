import React from 'react'
import logo from "../Images/logo.png" 
import { TextField } from '@mui/material';
import {Button} from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';

function SignUp() {
  const navigate = useNavigate();
  const lightTheme = useSelector((state)=> state.themeKey);
  return (
    <div className={"login-container" + ((lightTheme)?"":" dark")}>
      <div className={"image-container" + ((lightTheme)?"":" dark")}>
        <img src={logo} alt="Logo" className={"welcome-logo" + ((lightTheme)?"":" dark")}/>
      </div>
      <div className={"login-box" + ((lightTheme)?"":" dark")}>
        <p className={"login-text" + ((lightTheme)?"":" dark")}>Create your Account</p>
        <TextField id="standard-basic" label="Enter User Name" variant="outlined" />
        <TextField id="standard-basic" label="Enter Email Address" variant="outlined" />
        <TextField id="outlined-password-input" label="Password" type="password" autoComplete='current-password' />
        <Button variant="outlined">SIGN UP</Button>
        <p className={"signup-text" + ((lightTheme)?"":" dark")}>Already hane an account?</p>
        <a href="/" className='signup-text'>Login</a>
      </div>
    </div>
  )
}

export default SignUp;
