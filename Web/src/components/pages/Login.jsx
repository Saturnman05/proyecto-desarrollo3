import { Alert, Button, Form } from 'react-bootstrap'
import { useLogin } from '../../hooks/useLogin';

import './Login.css'

export default function Login () {
  const { username, setUsername, password, setPassword, handleSubmit, error } = useLogin()

  return (
    <main className='center-column'>
      <h1>Log In Form</h1>
      <div className='login'>
        <Form onSubmit={handleSubmit} method='get'>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control value={username} onChange={(u) => setUsername(u.target.value)} type='username' placeholder='placeh0ldernam3'/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(p) => setPassword(p.target.value)} type="password" placeholder="********" />
          </Form.Group>

          <Button variant='primary' type='submit'>Log In</Button>
        </Form>
      </div>
      {error && <Alert variant='danger' className='mt-3 alert'>{error}</Alert>}
    </main>
  )
}
