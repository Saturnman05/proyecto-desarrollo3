import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './Register.css'

export default function Register () {
  // const [newUser, setNewUser] = useState({ userId: null, userName: null, fullName: null, password: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const handleSubmit = async (e) => {
    if (username === '' || fullName === '' || password === '') return
    // TODO: registrar al usuario en base a los campos llenados
  }

  return (
    <main className='center-column'>
      <h1>Registretion Form</h1>
      <div className='register'>
        <Form onSubmit={handleSubmit} method='get'>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={(u) => setUsername(u.target.value)} type='username' placeholder='Enter username'/>
            <Form.Text classname='text-muted'>
              Enter your username
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control value={fullName} onChange={(u) => setFullName(u.target.value)} type='fullName' placeholder='Enter full name'/>
            <Form.Text classname='text-muted'>
              Enter your full name
            </Form.Text>
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
