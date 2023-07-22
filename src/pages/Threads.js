import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Post from '../components/Post'
import Logo from '../pictures/Logo.png'

const Threads = () => {
    const { id } = useParams();
    const [mainPost, setMainPost] = useState();
    const [threadPosts, setThreadPosts] = useState();
    const navigate = useNavigate();
  
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
        fetch(`https://www.api-development.xyz/posts/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }    
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            setMainPost(data)
        })
        
      }, [])

    
    useEffect(() => {
        fetch(`https://www.api-development.xyz/posts/threads/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            } 
        }).then(response => response.json())
        .then(data => setThreadPosts(data))

      })

      const handleThread = () => {
        fetch(`https://www.api-development.xyz/posts/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                title: 'cool title',
                content: 'cool content'
            })
        })

      }

  return (
    <div className=''>
        <div className='flex justify-center'>
            <div>
                { mainPost &&
                    <Post id={mainPost.Post.id} user={mainPost.Post.user.email} user_id={mainPost.Post.user_id} date={mainPost.Post.created_at} title={mainPost.Post.title} content={mainPost.Post.content} pfp={Logo} image={mainPost.Post.image} />
                }
                <button onClick={handleThread} className='border-black border-solid border-2 bg-white px-2 py-2'>Add to Thread</button>
                { threadPosts &&
                    threadPosts.map((post, index) => (
                        <Post key={index} id={post.Post.id} user={post.Post.user.email} user_id={post.Post.user_id} date={post.Post.created_at} title={post.Post.title} content={post.Post.content} pfp={Logo} image={post.Post.image}/>
                    ))
                }
            </div>
        </div>

      

    </div>
  )
}

export default Threads