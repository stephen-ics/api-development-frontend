import React from 'react'
import { useState } from 'react'
import { FaImage } from "react-icons/fa";

const Login = () => {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    


    const onSubmit = async (e) => {
        e.preventDefault()
        console.log('hi')
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

        const access_token = data['access_token']

        if (access_token != undefined)
        {
            localStorage.setItem('access_token', (data['access_token']))
            window.location.reload(); // Refresh the page
        }
        console.log('hi', localStorage.getItem('access_token'))

        


    }
    
  return (
    <div className='flex justify-center'>
           <form
                className="flex flex-col gap-2 self-center mt-4 w-full p-16 pt-4 xl:w-5/6"
                onSubmit={onSubmit}
            >
                <label for='email'>email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Your email'/>
                <label for='password'>password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Your password'/>
                <button type='submit'>Log In</button>
            </form>
    </div>
  )
}

export default Login