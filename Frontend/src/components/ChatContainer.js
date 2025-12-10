import React, { useContext, useEffect, useRef, useState } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import formatMessageTime from "../lib/utils.js"
import { ChatContext } from '../../context/ChatContext.js';
import { AuthContext } from '../../context/AuthContext.js';
import toast from 'react-hot-toast';

const ChatContainer = (props) => {

  const{selectedUser, setSelectedUser,messages, sendMessages, getMessages} = useContext(ChatContext);
  const {authUser, onlineUsers} = useContext(AuthContext);

  const scrollEnd = useRef();

  const [input, setInput] = useState(" ");

  useEffect( ()=>{

    if(scrollEnd.current && messages)
    {
      scrollEnd.current.scrollIntoView({behavior:"smooth"});
    }

  },[messages]);

  useEffect(()=>{

    if(selectedUser)
    {
      getMessages(selectedUser._id);
    }

  },[selectedUser])

  //Sending a message
  const handleSendMessage = async(e) => {

    e.preventDefault();

    if(!input.trim())
    {
      return null;
    }

    await sendMessages({text:input.trim(), image:""});
    setInput("");

  }

  //Sending an image 5:22
  const handleSendImage = async (e) => {

    const file = e.target.files[0];

    if(!file || !file.type.startsWith("image/"))
    {
      toast.error("Select an image file only!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({image: reader.result})
    }

    reader.readAsDataURL(file);
    e.target.value = "";

  }

  return selectedUser ? (

    <div className='flex flex-col flex-1 relative backdrop-blur-3xl h-full'>

      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-3 border-b border-stone-500">
        <img src={selectedUser.profilePic?"":assets.avatar_icon} alt="profilePic" className="w-8 rounded-full"></img>
         <p className="text-white flex-1 text-shadow-md flex items-center gap-2">
          {selectedUser.fullname}
          {onlineUsers.includes(selectedUser._id) ? <span className="w-2 h-2 rounded-full bg-green-500"></span> :""}
         </p>
         <img onClick={()=>{setSelectedUser(null)}} src={assets.arrow_icon} className="md:hidden max-w-5"></img>
         <img src={assets.help_icon} className=" cursor-pointer max-md:hidden max-w-5"></img>
      </div>
      {/* Header */}

      {/* Chat Window */}
      <div className="overflow-scroll flex flex-col h-[calc(100%-120px)] p-3 pb-6 mt-2 mx-3">
        {messages.map((message, idx)=>{

          return (
            <div key={idx} className={` flex items-end gap-2 mb-3 justify-end ${message.senderId !== authUser._id && 'flex-row-reverse'}`}>
              {

                message.image ? (

                <img src={message.image} className="max-w-[150px] border border-gray-700 rounded-lg mb-8"></img>

              ) : (
                <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/60 text-white ${message.senderId == authUser._id ? 'rounded-br-none' : 'rounded-bl-none' }` }>{message.text}</p>
              )

              } 

              <div className='text-xs' >
                <img src={message.senderId == authUser._id ? assets.avatar_icon : assets.profile_martin} className="w-7 rounded-full"></img>
                <p className="text-gray-500">{formatMessageTime(message.createdAt)}</p>
              </div>

            </div>
          )

        })}
        <div ref={scrollEnd}></div>
      </div>
      {/* Chat Window */}

      {/* Message Send Bar */}
      <div className=" absolute bottom-0 w-[100%] flex items-center gap-2 p-3">
        
      <div className="flex flex-1 items-center bg-gray-100/12 rounded-full">
        <input onKeyDown={(e)=>{e.key === "Enter" ? handleSendMessage(e) : null}} value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Send a message" className=" flex-1 text-sm py-2 pl-2 border-none rounded-lg outline-none text-white placeholder-gray-400"></input>
        <input onChange={(e)=>{handleSendImage(e)}} type="file" id='image' accept="image/png, image/jpeg" hidden></input>
        <label htmlFor="image"><img src={assets.gallery_icon} className="cursor-pointer w-4 mr-3" /></label>
      </div>
      
      <img onClick={handleSendMessage} src={assets.send_button} className="w-7 cursor-pointer"></img>
      
      </div>
      
      {/* Message Send Bar */}

    </div>
  ) : (
    <div className='flex-1 flex items-center justify-center flex-col gap-3 bg-white/10'>
      <img src={assets.logo_icon} className='max-w-16'></img>
      <p className="text-md font-medium text-white"> Welcome to Pingo !</p>
    </div>
  )
}

export default ChatContainer
