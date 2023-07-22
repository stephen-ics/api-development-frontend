import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Post from '../components/Post'
import Logo from '../pictures/Logo.png'

const Profile = () => {
  const [posts, setPosts] = useState([])
  const [profileData, setProfileData] = useState()
  const [openProfile, setOpenProfile] = useState(false)
  const [openPasswordChange, setOpenPasswordChange] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('access_token') === 'none') {
        navigate('/login')
    }
    
  }, [])

  useEffect(() => {
    fetch('https://www.api-development.xyz/posts/profile', {
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
      setPosts(data);
    })
  }, [])

  useEffect(() => {
    fetch('https://www.api-development.xyz/users/profile-info', {
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

  const handleClick = () => {
    setOpenProfile(!openProfile)
  }

  const handlePasswordReset = () => {
    setOpenPasswordChange(!openPasswordChange)
  }

  const resetPassword = (e) => {
    e.preventDefault()

    fetch(`https://www.api-development.xyz/users/password-reset`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword
      })
    }).then(response => {
      if (response.status == 200) {
        alert('Password successfully changed!')
      }
      else {
        alert('Password reset was unsuccessful')
      }
      return response.json()
    })
    .then(data => console.log(data))
  }

  return (
    <div className='flex justify-center w-full bg-opacity-50'>
      <div className='flex flex-col items-start w-1/2'>
        <div className='flex items-center border-b-gray-600 border-b-2 border-solid lg:px-40 relative'>
          <img src={Logo} className='lg:w-56 lg:h-56 w-32 h-32 rounded-full m-10'/>
          <div className='flex flex-col'>
            <div className='flex flex-col lg:flex-row'>
              <h1 className='text-4xl lg:m-10 my-2'>{localStorage.getItem('first_name')}</h1>

                <button className='text-2xl m-10 border-solid border-gray-200 border-2 px-8 py-2 shadow-inner bg-white rounded-lg whitespace-nowrap' onClick={handleClick}>Edit Profile</button>
                { openProfile && (
                    <div className='bg-white px-4 py-2 rounded-lg z-50 absolute -right-10 top-0'>
                        <div className='flex flex-col'>
                            <button className='border-solid border-gray-200 border-2 px-8 py-2 shadow-inner' onClick={handlePasswordReset}>Password Reset</button>
                            {
                                openPasswordChange && (
                                    <div>
                                          <form
                                            className="flex flex-col gap-2 mt-2"
                                            onSubmit={resetPassword}
                                          >
                                            <label htmlFor='email' className='text-xl'>Old Password</label>
                                            <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type='password' placeholder='Your old password' className='text-black p-2 rounded-xl'/>
                                            <label htmlFor='password' className='text-xl'>New Password</label>
                                            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type='password' placeholder='Your new password' className='text-black p-2 rounded-xl'/>
                                            <button type='submit' className='border-black border-2 border-solid px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Reset</button>
                                        </form>                                                                     
                                    </div>                                            
                                ) 
                            }
                        </div>
                        
                    </div>
                    ) 
                }
   
            </div>
              { profileData ? (
                <div className='flex'>
                  <h1 className='text-4xl m-10 lg:block hidden'>Posts: {profileData['num_posts']}</h1>
                  <h1 className='text-4xl m-10 lg:block hidden'>Likes: {profileData['num_votes']}</h1>
                </div>
              ) : (
                <div className='flex'>
                  <h1 className='text-4xl m-10 lg:block hidden'>Posts: </h1>
                  <h1 className='text-4xl m-10 lg:block hidden'>Likes: </h1>
                </div>
              )}
            </div>
        </div>
        <div className='flex flex-col'>
          <h1 className='text-4xl my-4'>My Posts</h1>
          {posts &&
            posts.map((post, index) => (
              <Post key={index} id={post.Post.id} user={post.Post.user.email} user_id={post.Post.user_id} date={post.Post.created_at} title={post.Post.title} content={post.Post.content} pfp={Logo} image={post.Post.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Profile