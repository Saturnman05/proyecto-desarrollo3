import { Button, Form } from 'react-bootstrap'
import './Login.css'

export default function PublishProduct () {
  const handleSubmit = (event) => {
    event?.preventDefault()
    console.log('hola')
  }

  return (
    <main className='center-column'>
      <h1>Publish Product</h1>
      <div className='register'>
        <Form onSubmit={handleSubmit} method='get'>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder='Enter username'/>
          </Form.Group>

          <Button variant='primary' type='submit'>Publish</Button>
        </Form>
      </div>
    </main>
  )
}
