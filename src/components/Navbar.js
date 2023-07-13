import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './component-styles/Navbar.css'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa"


function Navbar() {
  const [fillNavbar, setFillNavbar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(false)

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
    if (localStorage.getItem('access_token') != 'none') {
      setLoggedIn(true)
    }
    else setLoggedIn(false)
  })

  const links = [
    {
        name: "Home",
        link: "/",
        id: "home",
        priority: false
    },
    {
        name: "Explore",
        link: "/explore",
        id: "explore",
        priority: false
    },
    {
        name: "Messages",
        link: "/messages",
        id: "messages",
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
    localStorage.setItem('access_token', 'none')
  };

  const signIn = () => {

  };



    return (
      <header className="w-full bg-blue-300 py-4">
      <div className="">

          <button
              className="px-3 py-1 rounded text-gray opacity-50 hover:opacity-75 lg:hidden cursor-pointer"
              onClick={
                  () => {
                      setShowDropdown(!showDropdown);
                  }}
          >
              <FaBars />
          </button>
   
          <div className={`${showDropdown ? "flex" : "hidden"} flex-col lg:flex  lg:flex-row lg:ml-auto mt-3 lg:mt-0`} >
               {loggedIn === true ? (
                   <div className='flex justify-between w-full'>
                      <Link className="mx-16" to="/">
                        ICON
                      </Link>
                      <div className='mx-16'>
                        {links.map(({ name, link, priority, id }) => 
                            <Link key={name} className={'text-center mx-4'} to={link}>
                                {name}
                            </Link>
                        )}
                        
                        <Link to='/'>
                            <button
                                className=""
                                onClick={() => signOut()}
                            >
                                Log out
                            </button>
                        </Link>
                       </div>
                   </div>

               ) : (
                <div>
                   <Link to='/login' className='w-full text-right mx-16'>
                      <button
                          className=""
                          onClick={(e) => signIn()}
                      >
                          Log in
                      </button>
                   </Link>
                   <Link to='/register' className='w-full text-right mx-16'>
                      <button
                          className=""
                      >
                          Register
                      </button>
                   </Link>
                  </div>
          
                )}
          </div>
          
      </div>
  </header>
    );
  }

  export default Navbar