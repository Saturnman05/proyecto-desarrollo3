import { Button, Form } from 'react-bootstrap'
import { usePublishProduct } from '../../hooks/useProducts'

import './PublishProduct.css'

export default function PublishProduct () {
  const { product, setProduct, handleSubmit } = usePublishProduct()

  return (
    <main className='center-column-publish'>
      <h1>Publish Product</h1>
      <div className='publish-product'>
        <Form onSubmit={handleSubmit} method='post'>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(n) => {setProduct({ ...product, name: n.target.value })}} placeholder='Product name' value={product.name} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control as='textarea' onChange={(d) => {setProduct({ ...product, description: d.target.value })}} rows={3} value={product.description} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Image URL</Form.Label>
            <Form.Control onChange={(i) => {setProduct({ ...product, imageUrl: i.target.value })}} value={product.imageUrl} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Unit Price</Form.Label>
            <Form.Control type='number' step='0.01' onChange={(u) => setProduct({ ...product, unitPrice: parseFloat(u.target.value)} )} value={product.unitPrice} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Stock</Form.Label>
            <Form.Control type='number' step='1' min='0' onChange={(s) => setProduct({ ...product, stock: parseInt(s.target.value, 10) })} value={product.stock} />
          </Form.Group>

          <Button variant='primary' type='submit'>Publish</Button>
        </Form>
      </div>
    </main>
  )
}
