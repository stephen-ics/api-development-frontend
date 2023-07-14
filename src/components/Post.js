import React from 'react'
import { icons } from 'react-icons'
import { HiHeart, HiDotsHorizontal } from "react-icons/hi";
import { useState } from 'react'

const Post = ({ user, date, title, content, pfp, image }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const maxLength = 100
    const shouldTruncate = content.length > maxLength;

  return (
    <div className='bg-white my-4 lg:px-12 px-8 pt-8 pb-4 rounded-xl border-gray-200 border-2 border-solid w-full'>
            <div className='flex items-center'>
                <div className='flex w-full justify-between'>
                    <div className='flex items-center'>
                        <img className='w-8 mr-2 hidden md:block' src={pfp}/>
                        <div className='flex flex-wrap'>
                        <span className='mr-2 text-xl'>Posted by {user}</ span>
                        <span className='text-xl'>{date}</span>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <HiDotsHorizontal size={25}/>
                    </div>
                </div>
            </div>
            <div className='mt-1'>
                <h1 className='text-3xl font-semibold'>{title}</h1>
                {shouldTruncate && !isExpanded ? (
                    <div>
                        <p className='text-lg'>{content.slice(0, maxLength)}...</p>
                        <button className="text-lg" onClick={handleToggleExpand}>
                        View More
                        </button>
                    </div>
                ) : (
                    <p className='text-lg'>{content}</p>
                )}
                <img src={image} className=''/>
            </div>
            <div className='mt-4'>
                <HiHeart size={25} color={'gray'}/>
            </div>
    </div>
  )
}

export default Post