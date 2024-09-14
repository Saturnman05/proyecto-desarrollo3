import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { API_URL } from '../../constants/constantes'
import { useNavigate } from 'react-router-dom'
import './Register.css'

export default function Register () {
  // const [newUser, setNewUser] = useState({ userId: null, userName: null, fullName: null, password: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('test@mail.com')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (username === '' || fullName === '' || password === '') return

    const registerData = { 
      userId: 0,
      fullName: fullName,
      userName: username,  
      password: password,
      email: email,
      rolId: 2,
      rolName: 'user',
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
        body: JSON.stringify(registerData),
      })

      if (!response.ok) {
        const errorDetails = await response.json()
        console.log('Error details:', errorDetails) // Detalles del error
        return
      }

      const data = await response.json()
      console.log('User registered:', data)
      navigate('/')
    } catch (error) {
      console.log('Error al realizar la solicitud', error)
    }
  }

  return (
    <main className='center-column'>
      <h1>Registretion Form</h1>
      <div className='register'>
        <Form onSubmit={handleSubmit} method='get'>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={(u) => setUsername(u.target.value)} type='username' placeholder='Enter username'/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control value={fullName} onChange={(u) => setFullName(u.target.value)} type='fullName' placeholder='Enter full name'/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(p) => setPassword(p.target.value)} type="password" placeholder="Password" />
          </Form.Group>

          <Button variant='primary' type='submit'>Register</Button>
        </Form>
      </div>
    </main>
  )
}
