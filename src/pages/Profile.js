import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";
import Post from '../components/Post'
import Logo from '../pictures/Logo.png'

const Profile = () => {
  const [posts, setPosts] = useState([])
  const [profileData, setProfileData] = useState()

  const [openProfile, setOpenProfile] = useState(false)

  const [openBiographyChange, setOpenBiographyChange] = useState(false)
  const [biographyChange, setBiographyChange] = useState('')

  const [openProfilePhotoChange, setOpenProfilePhotoChange] = useState(false)
  const [profilePhotoChange, setProfilePhotoChange] = useState([])

  const [openPasswordChange, setOpenPasswordChange] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
      fetch('https://www.api-development.xyz/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then((response) => {
        if (response.status === 401) {
          navigate('/login')
        }
      })
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
    setOpenProfilePhotoChange(false)
    setOpenBiographyChange(false)
    setOpenPasswordChange(false)
  }

  const handlePasswordReset = () => {
    setOpenProfilePhotoChange(false)
    setOpenBiographyChange(false)
    setOpenPasswordChange(!openPasswordChange)
  }

  const handleBiographyChange  = () => {
    setOpenProfilePhotoChange(false)
    setOpenPasswordChange(false)
    setOpenBiographyChange(!openBiographyChange)
  }

  const handleProfilePhotoChange = () => {
    setOpenBiographyChange(false)
    setOpenPasswordChange(false)
    setOpenProfilePhotoChange(!openProfilePhotoChange)
  }

  const resetPassword = (e) => {
    e.preventDefault()

    fetch('https://www.api-development.xyz/users/password-reset', {
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
      if (response.status === 200) {
        alert('Password successfully changed!')
      }
      else {
        alert('Password reset was unsuccessful')
      }
      return response.json()
    })
    .then(data => console.log(data))
  }

  const changeBiography = (e) => {
    e.preventDefault()

    fetch('https://www.api-development.xyz/users/biography', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({
        new_biography: biographyChange
      })
    }).then(response => response.json()).then(data => {
      console.log(data)
      window.location.reload();
    })
    
  }

  const uploadFile = () => {
    if (profilePhotoChange == null) return;

    const maxImageSize = 1000 * 1024; //1 MB

    if (profilePhotoChange.size > maxImageSize) {
      alert('Image size exeeds 1MB limit')
      throw new Error("Imagize size exceeeds 1MB limit")
    }

    const imageRef = ref(storage, `images/${profilePhotoChange.name + v4()}`)
    return uploadBytes(imageRef, profilePhotoChange).then((snapshot) => {
      return getDownloadURL(snapshot.ref).then(url => {
        console.log('url', url)
        return url
      })
    })
  };

  const changeProfilePhoto = async (e) => {
    try {
      e.preventDefault()
      const imageUrl = await uploadFile()

      const response = await fetch('https://www.api-development.xyz/users/profile-photo', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify({
              new_profile_photo: imageUrl
          })
      }).then(response => response.json()).then(data => {
        console.log(data)
        setProfilePhotoChange(data)
        window.location.reload()
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center w-full bg-opacity-50'>
      <div className='flex flex-col w-1/2'>
        <div className='flex flex-col lg:flex-row items-center justify-around border-b-gray-600 border-b-2 border-solid lg:px-40'>

            { profileData && profileData['profile_photo'] && (    
              <img src={profileData['profile_photo']} alt='pfp' className='lg:w-56 lg:h-56 w-32 h-32 rounded-full object-cover my-4'/>
            )}
    
          <div className='flex flex-col lg:relative'>
            <div className='flex flex-col lg:flex-row items-center'>
              <h1 className='text-4xl'>{localStorage.getItem('first_name')}</h1>
              <button className='text-2xl mx-4 border-solid border-gray-200 border-2 px-8 shadow-inner bg-white rounded-lg whitespace-nowrap h-16 lg:mt-0 mt-6' onClick={handleClick}>Edit Profile</button>
            
              { openProfile && (
                  <div className='px-4 py-2 rounded-lg z-50 bg-gray-100 lg:mt-0 mt-6 lg:absolute lg:top-0 lg:ml-96 w-3/4'>
                      <div className='flex flex-col'>
                        <button className='border-solid border-gray-200 border-2 px-8 py-2 shadow-inner bg-white' onClick={handleProfilePhotoChange}>Change Profile Photo</button>
                        <button className='border-solid border-gray-200 border-2 px-8 py-2 shadow-inner bg-white' onClick={handleBiographyChange}>Change Bio</button>
                        <button className='border-solid border-gray-200 border-2 px-8 py-2 shadow-inner bg-white' onClick={handlePasswordReset}>Password Reset</button>
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
                          {
                            openBiographyChange && (
                              <div>
                                <form
                                  className="flex flex-col gap-2 mt-2"
                                  onSubmit={changeBiography}
                                >
                                    <label htmlFor='email' className='text-xl'>New Biography</label>
                                    <textarea value={biographyChange} onChange={(e) => setBiographyChange(e.target.value)} type='' placeholder='Your old password' className='text-black p-2 rounded-xl h-24'/>
                                    <button type='submit' className='border-black border-2 border-solid px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Change</button>
                                </form>  
                              </div>
                            )
                          }
                          {
                            openProfilePhotoChange && (
                              <div>
                                <form
                                  className="flex flex-col gap-2 mt-2"
                                  onSubmit={changeProfilePhoto}
                                >
                                    <label htmlFor='email' className='text-xl'>New Profile Photo</label>
                                    <input type="file" className='p-2' onChange={(e) => { setProfilePhotoChange(e.target.files[0])}} />
                                    <button type='submit' className='border-black border-2 border-solid px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Change</button>
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
          <h1 className='text-4xl my-4 text-center lg:text-left'>My Posts</h1>
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