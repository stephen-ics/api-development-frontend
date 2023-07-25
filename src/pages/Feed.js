import React from 'react'
import { useState, useEffect } from 'react'
import Post from '../components/Post'
import Logo from '../pictures/Logo.png'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
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
    fetch(`https://www.api-development.xyz/posts/main?search=${encodeURIComponent(searchQuery)}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }    
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      setData(data)}
    )
    
  }, [searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }


  return (
    <div className='flex justify-center'>
      <div className='w-1/2 mx-0'>
      <form className='w-full'>
        <input type='text' className='bg-white w-full pl-8 py-5 rounded-2xl' placeholder='Search for a Post' value={searchQuery} onChange={handleSearchChange}/>
      </form>
      {data &&
        data.map((post, index) => (
          <Post key={index} id={post.Post.id} firstName={post.Post.user.first_name} user={post.Post.user.email} user_id={post.Post.user_id} date={post.Post.created_at} title={post.Post.title} content={post.Post.content} pfp={post.Post.user.profile_photo} image={post.Post.image} />
        ))
      }    
      </div>     
    </div>
  )
}

export default Feed