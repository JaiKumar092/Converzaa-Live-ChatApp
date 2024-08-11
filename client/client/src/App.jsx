import React from 'react';
import './App.css'
import MainContainer from './components/MainContainer';
import Login from './components/Login';
import { Routes, Route } from 'react-router';
import Welcome from './components/Welcome';
import ChatArea from './components/ChatArea';
import User_Groups from './components/User_Groups';
import CreateGroups from './components/CreateGroups';
import SignUp from './components/SignUp';
import Groups from './components/Groups';
function App() {
  return (
    <>
      <div className='App'>
        {/* <MainContainer/> */}
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="app" element={<MainContainer/>}>
            <Route path="welcome" element={<Welcome/>}></Route>
            <Route path="chat/:_id" element={<ChatArea/>}></Route>
            <Route path="users" element={<User_Groups/>}></Route>
            <Route path="groups" element={<Groups/>}></Route>
            <Route path="create-groups" element={<CreateGroups/>}></Route>
          </Route>
        </Routes>
        {/* <Login/> */}
      </div>
    </>
  )
}

export default App
