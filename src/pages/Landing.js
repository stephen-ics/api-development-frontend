import React from 'react'
import HomeSection from '../components/HomeSection'
import Logo from '../pictures/Logo.png'

const Landing = () => {
  return (
    <div>
      <div className="flex flex-col items-center text-white">
        <div className='bg-white bg-opacity-20 rounded-lg lg:p-32 flex flex-col items-center'>
          <h1 className='lg:text-8xl text-6xl font-bold'>ConnectX</h1>
          <h2 className='lg:text-6xl text-4xl my-4'>X marks the Spot: ConnectX, Your Social Destination!</h2>
          <button className='lg:text-6xl text-4xl my-6 bg-blue-400 lg:px-10 lg:py-6 px-4 py-4 rounded-lg'>Get Started!</button>
        </div>
      </div>
      <div className='lg:mx-72 mb-10'>
        <HomeSection title="Explore Communities" subheading="Make new friends" description="Engage in discussions, share experiences, and connect with like-minded individuals who share your passions. " image={Logo} reversed={false} />
        <HomeSection title="Stay Informed" subheading="Filled with the latest trends and hot topics" description="Discover what's buzzing, explore trending debates, and join the conversations that matter most to you." image={Logo} reversed={true} />
      </div>
    </div>

  )
}

export default Landing