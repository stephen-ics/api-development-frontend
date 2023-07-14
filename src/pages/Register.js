import React from 'react'
import { useState } from 'react'
import { FaImage } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    


    const onSubmit = async (e) => {
        e.preventDefault()
        console.log('hi')
        const response = await fetch('https://www.api-development.xyz/users/', {
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
        console.log(data)
    }
    
  return (
    <div className='flex justify-center items-center h-full w-full'>
        <div className='border-white border-solid border-2 p-24 rounded-xl text-white mt-64'>
            <h1 className='text-center text-3xl font-semibold'>Register</h1>
           <form
                className="flex flex-col gap-2 mt-2"
                onSubmit={onSubmit}
            >
                <label for='email' className='text-xl'>email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Your email' className='text-black p-2 rounded-xl'/>
                <label for='password' className='text-xl'>password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Your password' className='text-black p-2 rounded-xl'/>
                <button type='submit' className='px-10 py-3 bg-white text-black rounded-xl text-2xl opacity-80 hover:opacity-100 transition ease-in-out duration-100 mt-4'>Register</button>
            </form>
            <Link to='/login' className=''>
                <p className='text-center underline mt-4 text-white'>Already have an account? Log in here</p>
            </Link>

        </div>
    </div>
  )
}

export default Register