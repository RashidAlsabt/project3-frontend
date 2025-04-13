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
    <div className="homepage">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={svgLogo} alt="Logo" className="logo" />
          <span className="brand">SpeckTrack</span>
        </div>
        {!user && (
          <div className="navbar-right">
            <Link to="/signin" className="link">Sign In</Link>
            <Link to="/signup" className="signup-button">Sign Up</Link>
          </div>
        )}
      </nav>
      <main className="main-logo-section">
        <img src={defaultLogo} alt="Main Logo" className="main-centered-logo" />
      </main>
    </div>
  )
}

export default Homepage
