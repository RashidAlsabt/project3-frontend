import { useContext, useEffect } from 'react'
import { Link } from "react-router"
import { authContext } from '../context/AuthContext'
import defaultLogo from '../assets/default_transparent_765x625.png'

function Navbar() {

  const {user, logout} = useContext(authContext)

  return (
    <div className='navbar' style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    }}>
        <div className="dashboard-content" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '97%'
        }}>
          <div className="navbar-logo">
            <Link to="/">
              <img src={defaultLogo} alt="Logo" className="logo-image" />
            </Link>
          </div>
          {!user && (
            <div className="navbar-right">
              <Link to="/signin"><h4>Login</h4></Link>
              <br />
              <br />
              <Link to="/signup"><h4>Sign Up</h4></Link>
            </div>
          )}
          {user && (
            <div className="navbar-right">
              <Link to="/dashboard"><h4>Dashboard</h4></Link>
              <Link to="/transactions"><h4>Transactions</h4></Link>
              <Link to="/customization"><h4>Customization</h4></Link>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
    </div>
  )
}

export default Navbar
