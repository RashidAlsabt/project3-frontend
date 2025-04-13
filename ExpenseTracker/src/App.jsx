import { useState } from 'react'
import Navbar from './components/Navbar'
import {Routes ,Route} from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
      </Routes>
    </>
  )
}

export default App
