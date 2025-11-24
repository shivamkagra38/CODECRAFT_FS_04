import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const[currState, setCurrState] = useState("Sign up");
  const[fullName, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[bio, setBio] = useState("");

  const[isDataSubmitted, setIsDataSubmitted] = useState(true);


  return (
    <div className="h-screen flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">

      <img src={assets.logo_icon} className="w-20"></img>

      <form className="text-white border-2 bg-white/8 border-gray-500 p-8 flex flex-col rounded-lg shadow-lg gap-5 hover:bg-white/10 transition-all ease-in-out ">
      <div className="text-gray-100 text-2xl flex items-center justify-center">
        {currState}
        <img src={assets.arrow_icon} className="w-5"></img>
      </div>
      {
        currState === "Sign up" && !isDataSubmitted && 
        <input onChange={(e)=>{setFullName(e.target.value)}} type="text" placeholder="Full Name" className=" outline-0 border-b border-gray-500 focus:ring-1 focus:ring-indigo-200 p-1"></input>
      }
      {
        !isDataSubmitted && 
        <>
        <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="E-mail" className="outline-0  border-b border-gray-500 focus:ring-1 focus:ring-indigo-200 p-1" required></input>
        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" className=" outline-0  border-b border-gray-500 focus:ring-1 focus:ring-indigo-200 p-1" required></input>
        </>
      }

      {
       currState === "Sign up" && isDataSubmitted &&  
       <textarea onChange={(e)=>{setBio(e.target.value)}} rows="3" className='p-1 border border-gray-500 rounded-md outline-0 focus:ring-1 focus:ring-indigo-200' placeholder="Bio..."></textarea>
      }
      
      <button type="submit">
        {
          currState === "Sign up" ? "Create Account" : "Login Now"
        }
      </button>

      </form>

    </div>
  )
}

export default LoginPage
