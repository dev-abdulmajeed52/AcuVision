import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './Auth/Login'
import Register from './Auth/Register'
import PrepTips from './ui/PrepTips'
import CallToAction from './ui/CallToAction'
import Role from './Auth/Role'

const App = () => {
  return (
   <>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/prep" element={<PrepTips />} />
      <Route path="/mock" element={<CallToAction />} />
      <Route path="/iam" element={<Role />} />
      <Route path='/login' element={<Login />} />
      <Route path='register' element={<Register />} />
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App