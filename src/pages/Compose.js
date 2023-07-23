import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";
import { Link, useNavigate } from 'react-router-dom'

const Compose = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUpload, setImageUpload] = useState();

    const navigate = useNavigate()

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

    const uploadFile = () => {
      if (imageUpload == null) return;

      const maxImageSize = 1000 * 1024; //1 MB

      if (imageUpload.size > maxImageSize) {
        alert('Image size exeeds 1MB limit')
        throw new Error("Imagize size exceeeds 1MB limit")
      }

      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
      return uploadBytes(imageRef, imageUpload).then((snapshot) => {
        return getDownloadURL(snapshot.ref).then(url => {
          console.log('url', url)
          return url
        })
      })
    };

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
          const imageUrl = await uploadFile()

          const response = await fetch('https://www.api-development.xyz/posts/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              },
              body: JSON.stringify({
                  title: title,
                  content: content,
                  image: imageUrl
              })
          }).catch(error => console.log(error))
  
          navigate('/feed')
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <div className='flex justify-center items-center h-full w-full'>
        <div className='border-white border-solid border-2 p-24 rounded-xl text-black w-1/2 min-w-fit'>
            <h1 className='text-center text-3xl font-semibold'>Compose</h1>
           <form
                className="flex flex-col gap-2 mt-2"
                onSubmit={onSubmit}
            >
                <label htmlFor='title' className='text-xl'>title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type='' placeholder='Your title' className='text-black p-2 rounded-xl'/>
                <label htmlFor='content' className='text-xl'>content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} type='' placeholder='Your content' className='text-black p-2 rounded-xl h-24'/>
                <label htmlFor='images' className='text-xl'>image</label>
                <input type="file" onChange={(e) => { setImageUpload(e.target.files[0])}} />
                <button type='submit' className='px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Post</button>            
            </form>
        </div>
    </div>
  )
}

export default Compose