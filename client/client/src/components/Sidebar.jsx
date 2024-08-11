import {useContext,useEffect,React,useState} from 'react';
import "./myStyles.css";
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from './ConversationItem';
import { useNavigate } from 'react-router';
import { light } from '@mui/material/styles/createPalette';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import axios from "axios";
import {refreshSidebarFun} from "../Features/refreshSidebar";
import {myContext} from "./MainContainer";

function Sidebar() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const lightTheme = useSelector((state)=> state.themeKey);
    const {refresh,setRefresh} = useContext(myContext);
    const [conversations,setConversations] =useState([]);
    const userData=JSON.parse(localStorage.getItem("userData"));
    const nav = useNavigate();
    
    if(!userData){
        nav("/");
    }

    const user=userData.data;
    useEffect(() => {
        // console.log("Sidebar : ", user.token);
        const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        };

        axios.get("http://localhost:8080/chat/", config).then((response) => {
        console.log("Data refresh in sidebar ", response.data);
        setConversations(response.data);
        // setRefresh(!refresh);
        });
    }, [refresh]);

    return (
        <div className="sidebar-container">
        <div className={"sb-header" + (lightTheme ? "" : " dark")}>
            <div className="other-icons">
            <IconButton
                onClick={() => {
                nav("/app/welcome");
                }}
            >
                <AccountCircleIcon
                className={"icon" + (lightTheme ? "" : " dark")}
                />
            </IconButton>

            <IconButton
                onClick={() => {
                navigate("users");
                }}
            >
                <PersonAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
            <IconButton
                onClick={() => {
                navigate("groups");
                }}
            >
                <GroupAddIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
            <IconButton
                onClick={() => {
                navigate("create-groups");
                }}
            >
                <AddCircleIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>

            <IconButton
                onClick={() => {
                dispatch(toggleTheme());
                }}
            >
                {lightTheme && (
                <NightlightIcon
                    className={"icon" + (lightTheme ? "" : " dark")}
                />
                )}
                {!lightTheme && (
                <LightModeIcon className={"icon" + (lightTheme ? "" : " dark")} />
                )}
            </IconButton>
            <IconButton
                onClick={() => {
                localStorage.removeItem("userData");
                navigate("/");
                }}
            >
                <ExitToAppIcon className={"icon" + (lightTheme ? "" : " dark")} />
            </IconButton>
            </div>
        </div>
        <div className={"sb-search" + (lightTheme ? "" : " dark")}>
            <IconButton className={"icon" + (lightTheme ? "" : " dark")}>
            <SearchIcon />
            </IconButton>
            <input
            placeholder="Search"
            className={"search-box" + (lightTheme ? "" : " dark")}
            />
        </div>
        <div className={"sb-conversations" + (lightTheme ? "" : " dark")}>
            {conversations.map((conversation, index) => {
            // console.log("current convo : ", conversation);
            if (conversation.users.length === 1) {
                return <div key={index}></div>;
            }
            if (conversation.latestMessage === undefined) {
                // console.log("No Latest Message with ", conversation.users[1]);
                return (
                <div
                    key={index}
                    onClick={() => {
                    console.log("Refresh fired from sidebar");
                    // dispatch(refreshSidebarFun());
                    setRefresh(!refresh);
                    }}
                >
                    <div
                    key={index}
                    className={"conversation-container"+(lightTheme ? "" : " dark")}
                    onClick={() => {
                        navigate(
                        "chat/" +
                            conversation._id +
                            "&" +
                            conversation.users[1].name
                        );
                    }}
                    // dispatch change to refresh so as to update chatArea
                    >
                    <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                        {conversation.users[1].name[0]}
                    </p>
                    <p className={"con-title" + (lightTheme ? "" : " dark")}>
                        {conversation.users[1].name}
                    </p>

                    <p className={"con-lastMessage " + (lightTheme ? "" : " dark")}>
                        No previous Messages, click here to start a new chat
                    </p>
                    {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                    {conversation.timeStamp}
                </p> */}
                    </div>
                </div>
                );
            } else {
                return (
                <div
                    key={index}
                    className="conversation-container"
                    onClick={() => {
                    navigate(
                        "chat/" +
                        conversation._id +
                        "&" +
                        conversation.users[1].name
                    );
                    }}
                >
                    <p className={"con-icon" + (lightTheme ? "" : " dark")}>
                    {conversation.users[1].name[0]}
                    </p>
                    <p className={"con-title" + (lightTheme ? "" : " dark")}>
                    {conversation.users[1].name}
                    </p>

                    <p className="con-lastMessage">
                    {conversation.latestMessage.content}
                    </p>
                    {/* <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>
                    {conversation.timeStamp}
                </p> */}
                </div>
                );
            }
            })}
        </div>
        </div>
    );
}

export default Sidebar;
//     return (
//     <div className='sidebar-container'>
//         <div className={"sb-header" + ((lightTheme)?"":" dark")}>
//             <div>
//             <IconButton>
//                 <AccountCircleIcon className={'icon' + ((lightTheme)?"":" dark")}/>
//             </IconButton>
//             </div>

//             <div>
//             <IconButton onClick={()=>{navigate('users')}}>
//                 <PersonAddIcon className={'icon' + ((lightTheme)?"":" dark")}/>
//             </IconButton>
//             <IconButton onClick={()=>{navigate('users')}}>
//                 <GroupAddIcon className={'icon' + ((lightTheme)?"":" dark")}/>
//             </IconButton>
//             <IconButton onClick={()=>{navigate('create-group')}}>
//                 <AddCircleIcon className={'icon' + ((lightTheme)?"":" dark")}/>
//             </IconButton>
//             <IconButton onClick={()=>{dispatch(toggleTheme())}}>
//                 {lightTheme && <NightlightIcon className={'icon' + ((lightTheme)?"":" dark")}/>}
//                 {!lightTheme && <LightModeIcon className={'icon' + ((lightTheme)?"":" dark")}/>}</IconButton>
//             </div>
//         </div>
//         <div className={'sb-search' + ((lightTheme)?"":" dark")}>
//             <IconButton>
//                 <SearchIcon/>
//             </IconButton>
//             <input placeholder='search' className={'search-box' + ((lightTheme)?"":" dark")}></input>
//         </div>
//         <div className={'sb-conversations' + ((lightTheme)?"":" dark")}>
//             {conversations.map((conversation)=>{
//                 return <ConversationItem props={conversation} key={conversation.name}/>
//             })}
//         </div>
//     </div>
//   )
// }

// export default Sidebar;
