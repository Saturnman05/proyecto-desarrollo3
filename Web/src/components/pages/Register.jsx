import { Button, Form } from 'react-bootstrap'
import { useRegister } from '../../hooks/useRegister'
import './Register.css'

export default function Register () {
  const { username, setUsername, fullName, setFullName, password, setPassword, email, setEmail, handleSubmit } = useRegister()

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

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='your@mail.com' />
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
