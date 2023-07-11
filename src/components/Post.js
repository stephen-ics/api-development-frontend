import React from 'react'

const Post = ({ user, title, content, pfp, image }) => {
  return (
    <div className='my-8'>
        <div className='flex items-center'>
            <img className='w-8 mx-2' src={pfp}/>
            <h1>pfp</h1>
            <h1>{user}</h1>
        </div>
        <div>
            <h1 className='bold'>{title}</h1>
            <p>
                {content}
            </p>
            <img src={image}/>
        </div>
    </div>
  )
}

export default Post