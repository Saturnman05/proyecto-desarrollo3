import { Button, Form } from 'react-bootstrap'
import { usePublishProduct } from '../../hooks/useProducts'

import './PublishProduct.css'

export default function PublishProduct () {
  const { name, setName, description, setDescription, imageUrl, setImageUrl, unitPrice, setUnitPrice, stock, setStock, handleSubmit } = usePublishProduct()

  return (
    <main className='center-column-publish'>
      <h1>Publish Product</h1>
      <div className='publish-product'>
        <Form onSubmit={handleSubmit} method='post'>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(n) => {setName(n.target.value)}} placeholder='Product name' value={name} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' onChange={(d) => {setDescription(d.target.value)}} rows={3} value={description} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Image URL</Form.Label>
            <Form.Control onChange={(i) => {setImageUrl(i.target.value)}} value={imageUrl} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Unit Price</Form.Label>
            <Form.Control type='number' step='0.01' onChange={(u) => setUnitPrice(u.target.value)} value={unitPrice} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Stock</Form.Label>
            <Form.Control type='number' step='1' min='0' onChange={(s) => setStock(parseInt(s.target.value, 10))} value={stock} />
          </Form.Group>

          <Button variant='primary' type='submit'>Publish</Button>
        </Form>
      </div>
    </main>
  )
}
