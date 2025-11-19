import React, { useState } from 'react'
import Sidebar from './Sidebar'
import ChatContainer from './ChatContainer'
import RightSideBar from './RightSideBar'

const HomePage = () => {

  const[selectedUser, setSelectedUser] = useState(true);

  return (
    <div className="h-screen w-full sm:px-[15%] sm:py-[5%]" >

      <div className = "h-full border-2 border-gray-600 backdrop-blur-3xl rounded-2xl overflow-hidden relative flex">
        <Sidebar />
        {selectedUser && <ChatContainer />}
        <RightSideBar />
      </div>

    </div>
  )
}

export default HomePage
