import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [data, setData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('access_token') == 'none') {
        navigate('/login')
    }
    
}, [])

  // useEffect(() => {
  //   const response = fetch('https://www.api-development.xyz/posts/', {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('first_name')}`
  //     }    
  //   }).then(response => {
  //     console.log('Response status:', response.status); // Add this line
  //     return response.json()
  //   })
  //   .then(data => {
  //     console.log('data', data)
  //     setData(data);
  //   })
  // }, [])

  // const convertByteArrayToImage = () => {
  //   const blob = new Blob([localStorage.getItem('bytes')], { type: 'image/png' });
  //   const imageUrl = URL.createObjectURL(blob);
  //   console.log('heya', imageUrl)
  //   return imageUrl;
  // };

  //      <img src={`data:image/png;base64,${localStorage.getItem('base64')}`} alt="Converted Image" />


    
  return (
    <div className='mt-64'>
      <h1 className='text-9xl text-center'>Hello {localStorage.getItem('first_name')}</h1>
    </div>
  )
}

export default Profile