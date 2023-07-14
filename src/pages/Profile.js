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
      console.log('data', data)
      setData(data);
    })
  }, [])

  
  return (
    <div>Profile</div>
  )
}

export default Profile