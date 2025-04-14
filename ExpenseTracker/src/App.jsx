import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Navbar from './components/Navbar'
import {Routes ,Route} from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import EditTransaction from './pages/EditTransaction'
import CreateTransaction from './pages/CreateTransaction'

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
        <Route path="/transaction/:transactionId/edit" element={<EditTransaction/>}/>
        <Route path="/transaction/create" element={<CreateTransaction/>}/>
      </Routes>
    </>
  )
}

export default App
