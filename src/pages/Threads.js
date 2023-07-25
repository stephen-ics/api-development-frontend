import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";

import Post from '../components/Post'
import Logo from '../pictures/Logo.png'

const Threads = () => {
    const { id } = useParams();
    
    const [mainPost, setMainPost] = useState();
    const [threadPosts, setThreadPosts] = useState();
    const [addThread, setAddThread] = useState(false);
    const [threadTitle, setThreadTitle] = useState('');
    const [threadContent, setThreadContent] = useState('');
    const [threadImage, setThreadImage] = useState();
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

    const uploadFile = () => {
      if (threadImage == null) return;

      const maxImageSize = 1000 * 1024; //1 MB

      if (threadImage.size > maxImageSize) {
        alert('Image size exeeds 1MB limit')
        throw new Error("Imagize size exceeeds 1MB limit")
      }

      const imageRef = ref(storage, `images/${threadImage.name + v4()}`)
      return uploadBytes(imageRef, threadImage).then((snapshot) => {
        return getDownloadURL(snapshot.ref).then(url => {
          console.log('url', url)
          return url
        })
      })
    };
  

      const handleThread = () => {
        setAddThread(!addThread)
      }

      const submitThread = async (e) => {
        e.preventDefault()

        try {
          const imageUrl = await uploadFile()

          const response = await fetch(`https://www.api-development.xyz/posts/${id}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              },
              body: JSON.stringify({
                  title: threadTitle,
                  content: threadContent,
                  image: imageUrl
              })
          }).then(res =>  window.location.reload())
        } catch (error) {
          console.log(error)
        }

        
      }

  return (
    <div className=''>
        <div className='flex justify-center'>
            <div>
                { mainPost &&
                    <Post id={mainPost.Post.id} firstName={mainPost.Post.user.first_name} user={mainPost.Post.user.email} user_id={mainPost.Post.user_id} date={mainPost.Post.created_at} title={mainPost.Post.title} content={mainPost.Post.content} pfp={mainPost.Post.user.profile_photo} image={mainPost.Post.image} />
                }
                <button onClick={handleThread} className='border-black border-solid border-2 bg-white px-2 py-2'>Add to Thread</button>
                { addThread && 
                  <form
                      className="flex flex-col gap-2 mt-2"
                      onSubmit={submitThread}
                  >
                      <label htmlFor='title' className='text-xl'>title</label>
                      <input value={threadTitle} onChange={(e) => setThreadTitle(e.target.value)} type='' placeholder='Your title' className='text-black p-2 rounded-xl'/>
                      <label htmlFor='content' className='text-xl'>content</label>
                      <textarea value={threadContent} onChange={(e) => setThreadContent(e.target.value)} type='' placeholder='Your content' className='text-black p-2 rounded-xl h-24'/>
                      <label htmlFor='images' className='text-xl'>image</label>
                      <input type="file" onChange={(e) => { setThreadImage(e.target.files[0])}} />
                      <button type='submit' className='px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Post</button>            
                  </form>
                }
                { threadPosts &&
                    threadPosts.map((post, index) => (
                        <Post key={index} id={post.Post.id} firstName={post.Post.user.first_name} user={post.Post.user.email} user_id={post.Post.user_id} date={post.Post.created_at} title={post.Post.title} content={post.Post.content} pfp={Logo} image={post.Post.image}/>
                    ))
                }
            </div>
        </div>

      

    </div>
  )
}

export default Threads