import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Users = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState()
  const [posts, setPosts] = useState()
  
  useEffect(() => {
    fetch(`https://www.api-development.xyz/users/profile-info/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }    
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      setProfileData(data)
    })
  }, [])

  useEffect(() => {
    if (id == localStorage.getItem('user_id')) {
      navigate('/profile')
    }
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
  </div>
</div>
  )
}

export default Users