import React from 'react'
import Post from '../components/Post'

import Logo from '../pictures/Logo.png'

const Home = () => {
  return (
    <div className='flex justify-center lg:justify-normal'>
      <div className='w-1/2 lg:mx-48 mx-0'>
        <Post user='river' date='September' title='rivers post' content='river wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden centr wants to go to eden center' pfp={Logo} image={Logo}/>
        <Post user='stephen' date='September' title='stephens post' content='stephen wants to code' pfp={Logo} image={Logo}/>
        <Post user='stephen' date='September' title='stephens post' content='stephen wants to code' pfp={Logo}/>
        <Post user='stephen' date='September' title='stephens post' content='stephen wants to code' pfp={Logo}/>
        <Post user='stephen' date='September' title='stephens post' content='stephen wants to code' pfp={Logo}/>
        <Post user='stephen' date='September' title='stephens post' content='stephen wants to code' pfp={Logo}/>
        <Post user='stephen' date='September' title='stephens post' content='stephen wants to code' pfp={Logo}/>
        <Post user='stephen' date='September' title='stephens post' content='stephen wants to code' pfp={Logo}/>
        <Post user='stephen' date='September' title='stephens post' content='stephen wants to code' pfp={Logo}/>
      </div>
      
    </div>
  )
}

export default Home