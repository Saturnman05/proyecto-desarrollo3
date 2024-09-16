import { Button, Container, Card, Col, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { useCart } from '../../hooks/useCart'

export default function Cart () {
  const { products, loadUserCartProducts, removeFromCart } = useCart()

  useEffect(() => {
    loadUserCartProducts()
  })

  return (
    <Container className='flex-grow-1 py-2'>
      <h1 className='text-center mb-5'>Cart Page</h1>
      <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
        {
          (products) ? (
            products.map((product) => (
            <Col key={product.productId}>
              <Card className='h-100 clickable' onClick={() => navigate(`/product/${product.productId}`)}>
                <Card.Img variant='top' src={product.imageUrl} />
                <Card.Body className='d-flex flex-column'>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className='text-muted mb-4'>${product.unitPrice}</Card.Text>
                  <Button variant='danger' className='mt-auto'>Remove from Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))) : (
            <p>Error...</p>
          )
        }
      </Row>
    </Container>
  )
}
