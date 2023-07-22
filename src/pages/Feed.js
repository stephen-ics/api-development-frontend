import React from 'react'
import { useState, useEffect } from 'react'
import Post from '../components/Post'
import Logo from '../pictures/Logo.png'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://www.api-development.xyz/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then((response) => {
      if (response.status == 401) {
        navigate('/login')
      }
    })
  }, [])

  useEffect(() => {
    fetch('https://www.api-development.xyz/posts/', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }    
    }).then(response => response.json())
    .then(data => setData(data))
    
  }, [])


  return (
    <div className='flex justify-center'>
      <div className='w-1/2 mx-0'>
      {data &&
        data.map((post, index) => (
          <Post key={index} id={post.Post.id} user={post.Post.user.email} user_id={post.Post.user_id} date={post.Post.created_at} title={post.Post.title} content={post.Post.content} pfp={Logo} image={post.Post.image} />
        ))
      }    
      </div>     
    </div>
  )
}

export default Feed