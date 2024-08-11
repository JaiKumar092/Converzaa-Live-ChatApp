import React, { createContext, useState } from "react";
import "./myStyles.css";
import Sidebar from "./Sidebar";
// import WorkArea from "./WorkArea";
// import ChatArea from "./ChatArea";
// import Welcome from "./Welcome";
// import CreateGroups from "./CreateGroups";
// import User_Groups from "./User_Groups";
import { Outlet } from "react-router";
import { useDispatch,useSelector } from "react-redux";
export const myContext = createContext();
function MainContainer(){
    const dispatch =useDispatch();
    const lightTheme =useSelector((state)=> state.themekey);
    const [refresh,setRefresh]=useState(true);
    return(
        <div className={"main-container"+ (lightTheme?"":" dark")}>
            <myContext.Provider value={{refresh:refresh,setRefresh:setRefresh}}>
                <Sidebar/>
                <Outlet/>
            </myContext.Provider>
        </div>
    );
}

export default MainContainer;