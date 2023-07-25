import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Post from '../components/Post'

const Users = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState()
  const [posts, setPosts] = useState()

  useEffect(() => {
    if (id == localStorage.getItem('user_id')) {
      navigate('/profile')
    }
  }, [])
  
  useEffect(() => {
    fetch(`https://www.api-development.xyz/users/profile-info/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}    
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      setProfileData(data)
    })
  }, [])

  useEffect(() => {
    fetch(`https://www.api-development.xyz/posts/profile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
      }).then(response => response.json())
      .then(data => {
        setPosts(data)
      })
  }, [])

  return (
  <div className='flex justify-center w-full bg-opacity-50'>
    <div className='flex flex-col w-1/2'>
      <div className='flex flex-col lg:flex-row items-center justify-around border-b-gray-600 border-b-2 border-solid lg:px-40'>
          { profileData && profileData['profile_photo'] && (    
            <img src={profileData['profile_photo']} alt='pfp' className='lg:w-56 lg:h-56 w-32 h-32 rounded-full object-cover my-4'/>
          )}
        <div className='flex flex-col lg:relative'>
          <div className='flex flex-col lg:flex-row items-center'>
            { profileData && profileData['first_name'] && (
              <h1 className='text-4xl'>{profileData['first_name']}</h1>
            )}
          </div>
          { profileData ? (
            <div className='mt-4'>
              <h1 className='text-2xl lg:text-left text-center'>Bio: {profileData['biography']}</h1>
              <div className='flex flex-col lg:flex-row items-center my-4'>
                <h1 className='text-4xl'>Posts: {profileData['num_posts']}</h1>
                <h1 className='text-4xl ml-0 lg:ml-8'>Likes: {profileData['num_votes']}</h1>
              </div>
            </div>
          ) : (
            <div className='mt-4'>
              <div className='flex my-4'>
                <h1 className='text-2xl'>Bio: </h1>
                <h1 className='text-4xl'>Posts: </h1>
                <h1 className='text-4xl'>Likes: </h1>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col'>
        {profileData && profileData['first_name'] && ( 
          <h1 className='text-4xl my-4 text-center lg:text-left'>{profileData['first_name']}'s posts</h1>
        )}
        {posts &&
          posts.map((post, index) => (
            <Post key={index} id={post.Post.id} firstName={post.Post.user.first_name} user={post.Post.user.email} user_id={post.Post.user_id} date={post.Post.created_at} title={post.Post.title} content={post.Post.content} pfp={post.Post.user.profile_photo} image={post.Post.image}/>
          ))
        }
      </div>
    </div>
  </div>
  )
}

export default Users