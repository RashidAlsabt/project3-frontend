import { useState } from 'react'
import Navbar from './components/Navbar'
import {Routes ,Route} from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
