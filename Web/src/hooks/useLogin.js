import { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../constants/constantes'

export function useLogin () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') // Estado para el error
  const navigate = useNavigate()

  const { setUserVal } = useContext(UserContext)

  const handleSubmit = async (e, loginUsername, loginPassword) => {
    if (e?.preventDefault) e.preventDefault()

    const loginData = {
      username: loginUsername || username,
      password: loginPassword || password
    }

    try {
      const response = await fetch(`${API_URL}api/Users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      if (response.ok){
        const userData = await response.json()

        if (userData.userId && userData.userId !== 0) {
          setUserVal({ userId: userData.userId, userName: userData.userName, fullName: userData.fullName, password: userData.password })
          navigate('/')
        } else {
          setError('Error logging in: incorrect data')
        }
        console.log(userData)
      } else {
        setError('Error logging in: server response was not successful')
      }
    } catch (error) {
      console.error('Error al realizar el login', error)
      setError('Error logging in: An unexpected error occurred')
    }
  }

  return { username, setUsername, password, setPassword, handleSubmit, error }
}
