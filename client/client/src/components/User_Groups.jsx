import React, { useEffect ,useState} from 'react'
import "./myStyles.css"
import SearchIcon from '@mui/icons-material/Search';
import { Icon, IconButton, duration } from '@mui/material';
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../Images/logo.png";
import { useDispatch,useSelector } from 'react-redux';
import {AnimatePresence, motion} from "framer-motion";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { refreshSidebarFun } from '../Features/refreshSidebar';
import { myContext

 } from './MainContainer';
function User_Groups() {
  const [refresh,setRefresh] =useState(myContext);
  const [users,setUsers] =useState([]);
  const lightTheme = useSelector((state)=> state.themeKey);
  const userData=JSON.parse(localStorage.getItem("userData"));
  const nav=useNavigate();
  const dispatch=useDispatch();
  if(!userData){
    console.log("User not Authenticated");
    nav(-1);
  }

  useEffect(()=>{
    console.log("User refreshed");
    const config={
      headers:{
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios.get("http://localhost:8080/user/fetchUsers",config).then((data)=>{
      console.log("User data from API",data);
      setUsers(data.data);
    });
  }, [refresh]);
  return (
      <div
        // initial={{opacity: 0 , scale:0}}
        // animate={{opacity:1, scale:1}}
        // exit={{opacity:0 ,scale:0}}
        // transition={{
        //   duration: "0.3s",
        // }}
        className="list-container"
      >
      <div className={"ug-header" + ((lightTheme)?"":" dark")}>
        <img src={logo} style={{height:"2rem",width:"2rem",marginLeft:"10px"}}/>
        <p className={"ug-title" + ((lightTheme)?"":" dark")}>Available Users</p>
        <IconButton
              className={"icon" +(lightTheme?"" :" dark")}
              onClick={()=>{
                setRefresh(!refresh);
              }}
            >
                <RefreshIcon/>
            </IconButton>
      </div>
        <div className={"sb-search" + ((lightTheme)?"":" dark")}>
          <IconButton className={"icon"+(lightTheme?"":" dark")}>
            <SearchIcon/>
          </IconButton>
            <input placeholder='search' className={"search-box" + ((lightTheme)?"":" dark")}></input>
        </div>
        <div className={"ug-list"}>
          {users.map((user,index)=>{
            return (
              <div
                // whileHover={{scale:1.01}}
                // whileTap={{scale: 0.98}}
                className={"list-item"+(lightTheme?" ": " dark")}
                key={index}
                onClick={()=>{
                  console.log("Creating chat with ",user.name);
                  const config={
                    headers:{
                      Authorization :`Bearer ${userData.data.token}`
                    },
                  };
                  axios.post(
                    "http://localhost:8080/chat/",
                    {
                      userId: user._id,
                    },
                    config
                  );
                  dispatch(refreshSidebarFun());
                }}
              >
                <p className={"con-icon" + ((lightTheme)?"":" dark")}>T</p>
                <p className={"con-title" + ((lightTheme)?"":" dark")}>{user.name}</p>
              </div>
            );
          })}
    </div>
      </div>
  );
}

export default User_Groups;
