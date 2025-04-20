import axios from 'axios'

const API_BASE = 'http://localhost:3000/auth'

export const register = (formData) => {
  return axios.post(`${API_BASE}/register`, formData)
}

export const login = (formData) => {
  return axios.post(`${API_BASE}/login`, formData)
}

export const verifyToken = (token) => {
  return axios.get(`${API_BASE}/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
