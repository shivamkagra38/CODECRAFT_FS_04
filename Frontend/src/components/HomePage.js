import React, { useContext, useState } from 'react'
import Sidebar from './Sidebar'
import ChatContainer from './ChatContainer'
import RightSideBar from './RightSideBar'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router'

const HomePage = () => {

  const {authUser} = useContext(AuthContext);

  return authUser ? (
    <div className="h-screen w-full sm:px-[15%] sm:py-[5%]" >   
       
      <div className = "h-full border-2 border-gray-600 backdrop-blur-3xl rounded-2xl overflow-hidden relative flex">
        <Sidebar />
        <ChatContainer />
        <RightSideBar />
      </div>

    </div>
  ): <Navigate to="/login" />
}

export default HomePage
