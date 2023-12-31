import React from 'react'
import { useState } from 'react'
import { FaImage } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('https://www.api-development.xyz/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json()

        const first_name = data['first_name']
        const access_token = data['access_token']
        const user_id = data['user_id']

        if (access_token != undefined)
        {
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('first_name', first_name)
            localStorage.setItem('user_id', user_id)

            navigate('/feed')
            window.location.reload(); 
        }
    }
    
  return (
    <div className='flex justify-center items-center h-full w-full'>
        <div className='border-white border-solid border-2 p-24 rounded-xl text-black'>
            <h1 className='text-center text-3xl font-semibold'>Login</h1>
           <form
                className="flex flex-col gap-2 mt-2"
                onSubmit={onSubmit}
            >
                <label htmlFor='email' className='text-xl'>email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Your email' className='text-black p-2 rounded-xl'/>
                <label htmlFor='password' className='text-xl'>password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Your password' className='text-black p-2 rounded-xl'/>
                <button type='submit' className='px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Log In</button>
            </form>
            <Link to='/register' className=''>
                <p className='text-center underline mt-4 text-black'>Don't have an account? Register here</p>
            </Link>

        </div>
    </div>
  )
}

export default Login