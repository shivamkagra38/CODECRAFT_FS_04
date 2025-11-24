import React from 'react'
import assets, { imagesDummyData } from '../assets/assets.js';

const RightSideBar = (props) => {

  const {selectedUser} = props;

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 basis-3xs text-white relative overflow-y-scroll  ${selectedUser ? "max-md:hidden" : ""}`}>
      
      {/* Image Section */}
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        
        <img src={selectedUser?.profilePic || assets.avatar_icon }
        className="w-15 aspect-square rounded-full"
        />

        <h1 className="px-10 text-lg font-medium mx-auto flex items-center gap-2 text-center">
          {selectedUser.fullName}
        </h1>

        <p className="px-10 mx-auto text-center">{selectedUser.bio}</p>

      </div>

      <div className='m-5 bg-gray-200 h-[1px]'/>
      {/* Image Section */}

      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll gap-3 flex flex-wrap opacity-80">
          {imagesDummyData.map( (url, idx)=> {

            return (
              <div key={idx} className='cursor-pointer rounded' onClick={()=>{window.open(url)}}>
                <img src={url} className='max-lg:w-10 lg:w-15 rounded' />
              </div>
            );

          })}
        </div>
      </div>

      <button className="absolute bg-red-400 bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600
      text-white border-none text-sm font-light sm:py-2 sm:px-4 lg:py-2 lg:px-8 rounded-full cursor-pointer ">Log out !</button>

    </div>
  )
}

export default RightSideBar
