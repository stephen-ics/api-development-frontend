import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Post from '../components/Post'
import Logo from '../pictures/Logo.png'

const Profile = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('access_token') === 'none') {
        navigate('/login')
    }
    
  }, [])

  useEffect(() => {
    const response = fetch('https://www.api-development.xyz/posts/', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }    
    }).then(response => {
      console.log('Response status:', response.status); // Add this line
      
      return response.json()
    })
    .then(data => {
      console.log('data for homepage', data)
      setData(data);
    })
  }, [])



    
  return (
    <div className='flex justify-center w-full'>
      <div className='flex flex-col items-start w-1/2'>
        <div className='flex items-center border-b-gray-600 border-b-2 border-solid lg:px-40'>
          <img src={Logo} className='lg:w-56 lg:h-56 w-32 h-32 rounded-full m-10'/>
          <div className='flex flex-col'>
            <div className='flex flex-col lg:flex-row'>
              <h1 className='text-4xl lg:m-10 my-2'>{localStorage.getItem('first_name')}</h1>
              <button className='text-3xl border-black border-2 border-solid px-4 py-2 lg:m-10 my-2 rounded-xl'>Edit Profile</button>
            </div>
            <div className='flex'>
              <h1 className='text-4xl m-10 lg:block hidden'>Posts: 10</h1>
              <h1 className='text-4xl m-10 lg:block hidden'>Likes: 10</h1>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <h1 className='text-4xl my-4'>My Posts</h1>
          {data.map((post, index) => (
            <Post key={index} id={post.Post.id} user={post.Post.user.email} user_id={post.Post.user_id} date={post.Post.created_at} title={post.Post.title} content={post.Post.content} pfp={Logo} image={post.Post.image}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile