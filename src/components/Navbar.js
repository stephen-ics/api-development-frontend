import React from 'react'
import { Link } from 'react-router-dom'
import './component-styles/Navbar.css'
import { useState, useEffect } from 'react';
import { FaBars, FaWindows } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import Logo from '../pictures/Logo.png'


const Navbar = () => {
  const [fillNavbar, setFillNavbar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      if (window.scrollY > threshold) {
        setFillNavbar(true)
      }
      else {
        setFillNavbar(false)
      }
    }

    window.addEventListener('scroll', handleScroll);
  
  }, [fillNavbar])

  useEffect(() => {
    fetch('https://www.api-development.xyz/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then((response) => {
      if (response.status == 401) {
        setLoggedIn(false)
      }
      else if (response.status == 200) {
        setLoggedIn(true)
      }
    })
    

  }, [])

  const links = [
    {
        name: "Feed",
        link: "/feed",
        id: "feed",
        priority: false
    },
    {
      name: "Compose",
      link: "/compose",
      id: "compose",
      priority: false
    },
    {
        name: "Profile",
        link: "/profile",
        id: "profile",
        priority: false
    }
  ]

  const signOut = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
    window.location.reload(); 
  };

    return (
      <div className='flex justify-center mb-40 text-2xl'>
        <div className={`navbar z-[99999999] py-2 lg:py-2 fixed w-full top-0 navbar ${fillNavbar ? 'fill' : ''}`} >
          <button
            className="px-3 py-1 rounded text-gray opacity-50 hover:opacity-75 lg:hidden cursor-pointer"
            onClick={
              () => {
                  setShowDropdown(!showDropdown);
              }}
          >
            <div className='py-2 px-2'>
              <FaBars/>
            </div>
          </button>
    
          <div className={`${showDropdown ? "flex" : "hidden"} flex-col lg:flex lg:flex-row`} >
            {loggedIn === true ? (
              <div className='flex justify-between w-full flex-col lg:flex-row'>
                <Link className="mx-16 hidden lg:block py-2 px-2" to="/">
                  ConnectX
                </Link>
                <div className='mx-16 lg:flex-row flex-col flex'>
                  {links.map(({ name, link, priority, id }) => 
                      <Link key={name} className={'lg:mx-2 transition ease-in hover:bg-gray-200 duration-200 rounded-xl py-2 px-2'} to={link}>
                          {name}
                      </Link>
                  )}
                  
                  <Link to='/'>
                      <button
                          className="transition ease-in hover:bg-gray-200 duration-200 w-full rounded-xl py-2 px-2"
                          onClick={() => signOut()}
                      >
                          Logout
                      </button>
                  </Link>
                </div>
              </div>
            ) : (
            <div className='flex justify-between w-full'>
              <Link className="mx-16 hidden lg:block py-2 px-2" to="/">
                    ICON
              </Link>
              <div className='mx-16 lg:flex-row flex-col flex w-full lg:justify-end'>
                <Link to='/login' className=''>
                  <button
                    className="lg:mx-4 transition ease-in hover:bg-gray-200 duration-200 rounded-xl w-full py-2 px-2" 
                  >
                      Login
                  </button>
                </Link>
                <Link to='/register' className=''>
                  <button
                    className="lg:mx-4 transition ease-in hover:bg-gray-200 duration-200 rounded-xl w-full py-2 px-2"
                  >
                      Register
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  }

  export default Navbar