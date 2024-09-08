import { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../constants/constantes'

export function useLogin () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
  
    const { setUserVal } = useContext(UserContext)
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      const loginData = {
        username,
        password
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
          console.log(userData)
          setUserVal({ userId: userData.userId, userName: userData.userName, fullName: userData.fullName, password: userData.password })
          
          // redirigir con el user a la pagina de inicio
          navigate('/')
        }
      } catch (error) {
        console.error('Error al realizar la solicitud', error)
      }
    }
  
    return { username, setUsername, password, setPassword, handleSubmit }
}
