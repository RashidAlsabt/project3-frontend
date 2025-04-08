import {useContext, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authContext } from '../context/AuthContext'

function Homepage() {
    const { user } = useContext(authContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('dashboard')
        }
    }, [user, navigate])
}
