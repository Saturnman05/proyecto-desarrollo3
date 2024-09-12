import { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'

export default function Register () {
  const [newUser, setNewUser] = useEffect({ userId: null, userName: null, fullName: null, password: null })

  const handleSubmit = async (e) => {
    // TODO: registrar al usuario en base a los campos llenados
  }

  return (
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
        <Form.Control value={username} onChange={(u) => setUsername(u.target.value)} type='username' placeholder='Enter username'/>
        <Form.Text classname='text-muted'>
          Enter your username
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(p) => setPassword(p.target.value)} type="password" placeholder="Password" />
      </Form.Group>

      <Button variant='primary' type='submit'>Log In</Button>
    </Form>
  )
}
