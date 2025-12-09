import React, { useContext, useState } from 'react'
import assets from '../assets/assets.js';
import {Navigate, useNavigate} from "react-router"
import { AuthContext } from '../../context/AuthContext.js';

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext);

  if(!authUser)
  {
    return(
      <Navigate to="/login"/>
    )
  }

  const[selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name , setName] = useState(authUser.fullname);
  const [bio, setBio] = useState(authUser.bio);

  const submitHandler = async (e) => {

    e.preventDefault();
    if(!selectedImage)
    {
      try
      {
        await updateProfile({fullname:name, bio});
        navigate("/");
        return;
      }
      catch(error)
      {
        console.log("failed");
      }
    }

    //Covert Image to base64
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({profilePic:base64Image, fullname:name, bio});
      navigate("/");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">

      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">

        <form onSubmit={submitHandler} className="flex flex-col gap-5 p-10 flex-1 max-sm:w-full">

          <h3 className="text-large">Profile Details</h3>

          <label htmlFor="avtar" className="flex items-center gap-3 cursor pointer">
            <input onChange={(e)=>{setSelectedImage(e.target.files[0])}} type="file" id="avtar" accept='.jpg, .png, .jpeg' hidden></input>
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} className={`w-12 h-12 ${selectedImage && 'rounded-full'}`}></img>
            Upload Profile Picture
          </label>

          <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Your Name..." className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" required />
          <textarea value={bio} onChange={(e)=>{setBio(e.target.value)}} rows={3} placeholder="Your Bio..." className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" required />

            <button type="Submit" className="p-2 bg-gradient-to-r from-purple-400 to-violet-600 rounded-full text-lg cursor-pointer">Save!</button>

        </form>

        <div className='p-10'>
          <img src={assets.logo_icon} className='sm:w-30 max-sm:w-20  aspect-square'></img>
        </div>
        

      </div>

    </div>
  )
}

export default ProfilePage
