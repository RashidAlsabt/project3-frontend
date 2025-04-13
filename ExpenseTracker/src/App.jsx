import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  )
}

export default App
