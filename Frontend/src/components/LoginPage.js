import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const[currState, setCurrState] = useState("Sign up");
  const[fullName, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[bio, setBio] = useState("");

  const[isDataSubmitted, setIsDataSubmitted] = useState(false);

  const SubmitHandler = (e) => {

    e.preventDefault();

    if(currState === "Sign up" && !isDataSubmitted)
    {
      setIsDataSubmitted(true);
      return;
    }



  }


  return (
    <div className="h-screen flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">

      <img src={assets.logo_icon} className="w-20"></img>

      <form onSubmit={SubmitHandler} className="text-white border-2 bg-white/8 border-gray-500 p-8 flex flex-col rounded-lg shadow-lg gap-5 hover:bg-white/10 transition-all ease-in-out ">
      <div className="text-gray-100 text-2xl flex items-center justify-between">
        {currState}
        {
          currState === "Sign up" && isDataSubmitted ? <img onClick={()=>{setIsDataSubmitted(false)}} src={assets.arrow_icon} className="w-5 cursor-pointer"></img> : ""
        }
      </div>
      {
        currState === "Sign up" && !isDataSubmitted && 
        <input value={fullName} onChange={(e)=>{setFullName(e.target.value)}} type="text" placeholder="Full Name" className=" outline-0 border-b border-gray-500 focus:ring-1 focus:ring-indigo-200 p-1"></input>
      }
      {
        !isDataSubmitted && 
        <>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="E-mail" className="outline-0  border-b border-gray-500 focus:ring-1 focus:ring-indigo-200 p-1" required></input>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" className=" outline-0  border-b border-gray-500 focus:ring-1 focus:ring-indigo-200 p-1" required></input>
        </>
      }

      {
       currState === "Sign up" && isDataSubmitted &&  
       <textarea value={bio} onChange={(e)=>{setBio(e.target.value)}} rows="3" className='p-1 border border-gray-500 rounded-md outline-0 focus:ring-1 focus:ring-indigo-200' placeholder="Bio..."></textarea>
      }
      
      <button type="submit" className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer">
        {
          currState === "Sign up" ? "Create Account" : "Login Now"
        }
      </button>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <input type="checkbox" />
        <p>I agree to the terms of use and privacy policy</p>
      </div>

      <div className="flex flex-col gap-2 items-center">
        {
          currState === "Sign up" ? (
            <p className="text-sm text-gray-600">Already a user? <span className="font-medium text-violet-500 cursor-pointer" onClick={()=>{setCurrState("Log in")}}> Log in</span></p>
          ) : (
            <p>Don't have an account ? <span className="font-medium text-violet-500 cursor-pointer" onClick={()=>{setCurrState("Sign up")}}> Sign up</span></p>
          )
        }
      </div>

      </form>

    </div>
  )
}

export default LoginPage
