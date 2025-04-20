import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router'
import { login } from '../api/auth'
import './Auth.css'
import { authContext } from '../context/AuthContext'

function Signin() {
  const {validateToken} = useContext(authContext)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(formData)
      localStorage.setItem('token', res.data.token)
      validateToken()      
      navigate('/dashboard')
      window.location.reload()
    } catch (err) {
      setError(err.response?.data?.err || 'Login failed')
    }
  }

  return (
    <div className="auth-page">
      <h1 className="auth-title">Sign In</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
        {error && <p className="auth-error">{error}</p>}
      </form>
      <p className="auth-footer">
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  )
}

export default Signin
