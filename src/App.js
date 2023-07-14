import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from 'framer-motion'

import Home from './pages/Home'
import Explore from './pages/Explore'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'

function App() {
  return (
    <HelmetProvider>
      <div className=''>
        <Helmet>
          <title>Api-development Frontend</title>
          <meta name="description" content="Hello! I'm Stephen! I'm a high school student at John Fraser Secondary School and an aspiring full-stack developer."></meta>
        </Helmet>
        <BrowserRouter>
          <Navbar />
          <AnimatePresence 
          wait
          >
            <Routes>
                <Route path='/' exact element={<Home />}></Route>
                <Route path='/explore' exact element={<Explore />}></Route>
                <Route path='/messages' exact element={<Messages />}></Route>
                <Route path='/profile' exact element={<Profile />}></Route>
                <Route path='/login' exact element={<Login />}></Route>
                <Route path='/register' exact element={<Register />}></Route>
                <Route path='/landing' exact element={<Landing />}></Route>
            </Routes>
      </AnimatePresence>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}



export default App;