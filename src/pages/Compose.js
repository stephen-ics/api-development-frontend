import React from 'react'
import { useState } from 'react'
import { FaImage } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'

const Compose = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        fetch('https://www.api-development.xyz/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })

        navigate('/')

    }
  return (
    <div className='flex justify-center items-center h-full w-full'>
        <div className='border-white border-solid border-2 p-24 rounded-xl text-white mt-64'>
            <h1 className='text-center text-3xl font-semibold'>Compose</h1>
           <form
                className="flex flex-col gap-2 mt-2"
                onSubmit={onSubmit}
            >
                <label htmlFor='title' className='text-xl'>title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type='' placeholder='Your title' className='text-black p-2 rounded-xl'/>
                <label htmlFor='content' className='text-xl'>content</label>
                <input value={content} onChange={(e) => setContent(e.target.value)} type='' placeholder='Your content' className='text-black p-2 rounded-xl'/>
                <button type='submit' className='px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Post</button>
            </form>
        </div>
    </div>
  )
}

export default Compose