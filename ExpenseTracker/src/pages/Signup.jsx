import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'
import './Auth.css'

function Signup() {
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    password: '',
    salary: ''
  })

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
      await register(formData)
      navigate('/signin')
    } catch (err) {
      setError(err.response?.data?.err || 'Registration failed')
    }
  }

  return (
    <div className="auth-page">
      <h1 className="auth-title">Sign Up</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="company_name"
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
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
        <input
          name="salary"
          type="number"
          placeholder="Salary (optional)"
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
        {error && <p className="auth-error">{error}</p>}
      </form>
      <p className="auth-footer">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  )
}

export default Signup
