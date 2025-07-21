// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Players from './pages/Players'
import Grounds from './pages/Grounds'
import Achievements from './pages/Achievements'
import Shop from './pages/Shop'
import Clubs from './pages/Clubs'
import LiveScore from './pages/LiveScore'
import Contact from './pages/Contact'
import Rules from './pages/Rules'
import Footer from './components/Footer'
import History from './pages/History'
import Events from './pages/Events'
import Teams from './pages/Teams'
import './App.css'
import Login from './pages/Login';
import Signup from './pages/signup'




  

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/grounds" element={<Grounds />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/livescore" element={<LiveScore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rules" element={<Rules />} />
        <Route path='/history'element={<History/>} />
        <Route path='/events'element={<Events/>} />
         <Route path="/signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
