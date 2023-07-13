import React from 'react'
import { icons } from 'react-icons'
import { HiHeart, HiDotsHorizontal } from "react-icons/hi";

const Post = ({ user, date, title, content, pfp, image }) => {
  return (
    <div className='bg-white my-4 px-8 py-4'>
            <div className='flex items-center'>
                <div className='flex w-full justify-between'>
                    <div className='flex items-center'>
                        <img className='w-8 mr-2' src={pfp}/>
                        <span className='font-bold mr-2 text-xl'>{user}</ span>
                        <span className='font-bold text-gray-600 text-xl'>{date}</span>
                    </div>
                    <div className='flex items-center'>
                        <HiDotsHorizontal size={25}/>
                    </div>
                </div>
            </div>
            <div className='mt-1'>
                <h1 className='text-xl font-bold'>{title}</h1>
                <p className='text-xl'>{content}</p>
                <img src={image} className=''/>
            </div>
            <div>
                <HiHeart size={25} color={'gray'}/>
            </div>
    </div>
  )
}

export default Post