import React from 'react'
import logo from "../Images/logo.png" 
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

function Welcome() {
  const lightTheme = useSelector((state)=> state.themeKey);
  const userData=JSON.parse(localStorage.getItem("userData"));
  const nav=useNavigate();
  console.log(userData);
  if(!userData){
    nav("/");
  }
  return (
    <div className={"welcome-container" + ((lightTheme)?"":" dark")}>
      <img src={logo} alt="Logo" className={"welcome-logo" + ((lightTheme)?"":" dark")}/>
      <b style={{color:'white'}}>Welcome back , {userData.data.name}</b>
      <p style={{color:'white'}}>View and text directly to people present in the chat Rooms.</p>
    </div>
  )
}

export default Welcome;
