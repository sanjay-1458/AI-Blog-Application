import React, { useState } from 'react'
import { assets } from '../../assets/assets'

function AddBlog() {
  const [image,setImage]=useState(false);
  const [title,setTitle]=useState('');
  const [subTitle,setSubTitle]=useState('');
  const [blog,setBlog]=useState('');
  const [category,setCategory]=useState('Startup');
  const [isPublished,setIsPublished]=useState(false);
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor='image'>
          <img src={!image?assets.upload_area:URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer'></img>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required></input>
        </label>
        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e)=>setTitle(e.target.value)} value={title}></input>
        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e)=>setSubTitle(e.target.value)} value={subTitle}></input>

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            <button type='button'>Generate with AI</button>
        </div>
      </div>
    </form>
  )
}

export default AddBlog