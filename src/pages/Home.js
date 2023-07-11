import React from 'react'
import Post from '../components/Post'

import Logo from '../pictures/Logo.png'

const Home = () => {
  return (
    <div className='flex'>
        <div className='w-1/3'>
            something

        </div>
        <div className='w-1/3'>
        <Post user='river' title='rivers post' content='river wants to go to eden center' pfp={Logo} image={Logo}/>
        <Post user='stephen' title='stephens post' content='stephen wants to code' pfp={Logo} image={Logo}/>

        <Post />
        </div>
        <div className='w-1/3'>
            something

        </div>
    </div>
  )
}

export default Home