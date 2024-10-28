import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../constants/constantes'

export function useRegister () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('test@mail.com')

  const navigate = useNavigate()

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()

    if (username === '' || fullName === '' || password === '') return

    const registerData = {
      userId: 0,
      fullName: fullName || 'test full name',
      userName: username || 'test1',
      password: password || '1234',
      email: email || 'test@mail.com',
      rolId: 2,
      rolName: 'string',
      dateCreated: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }

    console.log(JSON.stringify(registerData))

    try {
      const response = await fetch(`${API_URL}api/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData)
      })

      if (!response.ok) {
        const errorDetails = await response.json()
        console.log('Error details:', errorDetails) // Detalles del error
        return
      }

      navigate('/login')
    } catch (error) {
      console.log('Error al realizar la solicitud', error)
    }
  }

  return { username, setUsername, password, setPassword, fullName, setFullName, email, setEmail, handleSubmit: handleRegisterSubmit }
}
