import React from 'react'
import { Link } from "react-router"

function Navbar() {
  return (
    <div className='navbar'>
        <div className="dashboard-content">
            <Link to="/dashboard"><h4>Dashboard</h4></Link>
            <Link to="/transactions"><h4>Transactions</h4></Link>
            <Link to="/dashboard"><h4>Customization</h4></Link>
            <Link to="/dashboard"><h4>Logout</h4></Link>
        </div>
    </div>
  )
}

export default Navbar
