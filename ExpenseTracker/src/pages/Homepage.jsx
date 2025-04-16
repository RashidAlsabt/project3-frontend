import { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { authContext } from '../context/AuthContext'
import './Homepage.css'
import defaultLogo from '../assets/default_transparent_765x625.png'
import svgLogo from '../assets/logo-favicon.svg'

function Homepage() {
  const { user } = useContext(authContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate('/')])

  return (
    <div className='main-content'>
      <main>
        <img src={defaultLogo} alt="Main Logo"/>
      </main>
    </div>
  )
}

export default Homepage
