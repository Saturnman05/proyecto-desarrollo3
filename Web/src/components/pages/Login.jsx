import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useLogin } from '../../hooks/useLogin';

export default function Login () {
  const { username, setUsername, password, setPassword, handleSubmit } = useLogin()

  return (
    <Form onSubmit={handleSubmit} method='get'>
      <Form.Group>
        <Form.Label>Username</Form.Label>
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
