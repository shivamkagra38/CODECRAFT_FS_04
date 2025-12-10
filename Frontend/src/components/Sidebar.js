import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import logo from "url:../assets/logo.png";
import menu_icon from "url:../assets/menu_icon.png"
import search_icon from "url:../assets/search_icon.png"
import assets, {userDummyData} from "../assets/assets.js"
import { AuthContext } from '../../context/AuthContext.js';
import { ChatContext } from '../../context/ChatContext.js';

const Sidebar = (props) => {
    
    const {logout, onlineUsers} = useContext(AuthContext);
    const{getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages} = useContext(ChatContext);

    const[input, setInput] = useState(false);

    const filteredUsers = input ? users.filter((user)=>{return user.fullname.toLowerCase().includes(input.toLowerCase())}) : users ;

    const navigate = useNavigate();

    useEffect(()=>{

        getUsers();

    },[onlineUsers]);

  return (

    <div className= {`bg-[#818582]/20 h-full p-5 rounded-r-xl overflow-y-scroll text-white max-sm:w-full` + (selectedUser ? " max-md:hidden" : "")}> {/* max-md:hidden */ }

        
        <div className="pb-5">

            <div className="flex justify-between items-center ">

                <img src={logo} className="max-w-35"></img>

                <div className="relative py-2 group">

                    <img src={menu_icon} className="max-h-4 cursor-pointer" />

                    <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md
                    bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">

                        <p onClick={()=>{navigate("/profile")}} className="cursor-pointer text-sm">Edit Profile</p>
                        <hr className="border border-gray-600 my-1" />
                        <p className="cursor-pointer text-sm" onClick={()=>{logout()}}>Logout</p>

                    </div>

                </div>

            </div>

            {/*Search Bar*/}
            <div className="bg-[#282142] rounded-full flex items-center gap-2 p-2 mt-3 ">
                <img src={search_icon} alt="search" className="w-4"></img>
                <input onChange={(e)=>{setInput(e.target.value)}} type="text" className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1" placeholder="Search"  />
            </div>
            {/*Search Bar*/}

            {/*Users profile list*/}
            <div className="flex flex-col gap-2 mt-5">
                {
                    filteredUsers.map( (user, idx)=> {

                        return ( 

                            <div onClick={()=>{setSelectedUser(user); setUnseenMessages( {...unseenMessages, [user._id] : 0}) }} key={idx} className={`relative flex items-center gap-2 p-2 rounded cursor-pointer max-sm:text-xs ${selectedUser == user  ? "bg-[#282142]/30 shadow-lg shadow-violet-300/30" : "bg-transparent"}`}>
                                <img src={user?.profilePic || assets.avatar_icon } className="rounded-full aspect-square w-[35px]" />
                                <div className="flex flex-col leading-5">
                                    <p>{user.fullname}</p>
                                    {onlineUsers.includes(user._id) ? 
                                    <span className="text-green-400 text-xs">Online</span>
                                    : <span className="text-gray-500 text-xs">Offline</span>
                                    }
                                </div>
                               {
                                  unseenMessages[user._id] ?
                                 <p className="absolute right-1 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">{unseenMessages[user._id]}</p>
                                : ""
                               }
                            </div>
                        )

                    })
                }
            </div>
            {/*Users profile list*/}




        </div>

    </div>
  )
}

export default Sidebar
