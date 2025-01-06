import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './Auth/Login'
import Register from './Auth/Register'

const App = () => {
  return (
   <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='register' element={<Register />} />
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App