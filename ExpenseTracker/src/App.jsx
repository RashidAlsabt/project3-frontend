import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { useState } from 'react'
import Navbar from './components/Navbar'
import {Routes ,Route} from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
      </Routes>
    </>
  )
}

export default App
